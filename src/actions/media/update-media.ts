import { auth } from '@/auth'
import { db } from '@/db'
import { media } from '@/db/schemas/media'
import { eq } from 'drizzle-orm'

type UpdateMediaAction = {
  id: string
  name: string
}

export async function updateMedia(params?: UpdateMediaAction) {
  const session = await auth()

  if (!session || !params) return

  const data = await db
    .update(media)
    .set({ name: params.name })
    .where(eq(media.id, params.id))
    .returning()

  return data
}
