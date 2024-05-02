'use server'

import { auth } from '@/auth'
import { db } from '@/db'
import { media } from '@/db/schemas/media'
import { eq } from 'drizzle-orm'

type DeleteMediaActionArgs = {
  id: string
}

export async function deleteMedia(params?: DeleteMediaActionArgs) {
  const session = await auth()

  if (!session || !params) return

  const data = await db.delete(media).where(eq(media.id, params.id)).returning()

  return data
}

export type DeleteMediaAction = typeof deleteMedia
