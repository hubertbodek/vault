'use client'

import { getSignedURL } from '@/actions/s3'
import { useState } from 'react'
import { Button } from '../ui/button'
import { ALLOWED_AUDIO_FILE_TYPES } from '@/constants'
import { computeSHA256 } from '@/lib/sha256'

export const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
      const signedURLResult = await getSignedURL({
        fileSize: file.size,
        fileType: file.type,
        checksum: await computeSHA256(file),
      })

      if (signedURLResult.failure !== undefined) {
        console.error(signedURLResult.failure)
        return
      }

      const { url } = signedURLResult.success

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFile(file)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }

    console.log({ file, previewUrl })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="flex">
        UPLOAD
        <input
          className="hidden flex-1 border-none bg-transparent outline-none"
          name="media"
          type="file"
          accept={ALLOWED_AUDIO_FILE_TYPES.join(',')}
          onChange={handleFileChange}
        />
      </label>
      <Button type="submit">Submit</Button>
    </form>
  )
}
