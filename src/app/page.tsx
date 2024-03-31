import { db } from '@/db'
import { posts as postsTable } from '@/db/schemas/posts'

export default async function Home() {
  const posts = await db.select().from(postsTable).orderBy(postsTable.createdAt).limit(10)

  console.log({ posts })

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">elo</main>
}
