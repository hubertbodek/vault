'use server'

import crypto from 'crypto'
import { auth } from '@/auth'
import { ALLOWED_AUDIO_FILE_TYPES } from '@/constants'
import { s3Client } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { db } from '@/db'
import { media } from '@/db/schemas/media'
import { getRandomTailwindColor } from '@/lib/random-color'

interface GetSignedURLParams {
  fileName: string
  fileType: string
  fileSize: number
  checksum: string
}

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const maxFileSize = 1024 * 1024 * 5 // 5MB

export async function getSignedURL({ fileName, fileType, fileSize, checksum }: GetSignedURLParams) {
  const session = await auth()

  if (!session) {
    return { failure: 'not authenticated' }
  }

  if (!ALLOWED_AUDIO_FILE_TYPES.includes(fileType)) {
    return { failure: 'File type not allowed' }
  }

  if (fileSize > maxFileSize) {
    return { failure: 'File size too large' }
  }

  const key = generateFileName()

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id,
    },
  })

  const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 })

  const result = await db
    .insert(media)
    .values({
      id: key,
      name: fileName,
      size: fileSize,
      type: fileType,
      tailwindColor: getRandomTailwindColor(),
      url: url.split('?')[0],
      userId: session.user.id,
    })
    .returning()

  return { success: { url, result } }
}
