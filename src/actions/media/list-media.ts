import { auth } from '@/auth'
import { db } from '@/db'
import { media } from '@/db/schemas/media'
import { WithPagination } from '@/types/pagination'
import { desc, eq } from 'drizzle-orm'

type ListMediaAction = WithPagination<{}>

export async function listMedia(params?: ListMediaAction) {
  const session = await auth()

  if (!session) return

  const data = await db
    .select()
    .from(media)
    .where(eq(media.userId, session.user.id))
    .orderBy(desc(media.createdAt))
    .offset(params?.pagination?.offset ?? 0)
    .limit(params?.pagination?.limit ?? 10)
    .all()

  return data
}
