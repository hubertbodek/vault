import { auth } from '@/auth'
import { Page } from '@/components/common/page'
import { UploadButton } from '@/components/common/upload-button'
import { db } from '@/db'
import { media as mediaTable } from '@/db/schemas/media'
import { TracksList } from './tracks-list'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { desc, eq } from 'drizzle-orm'

export default async function Home() {
  const session = await auth()

  if (!session) return

  const media = await db
    .select()
    .from(mediaTable)
    .where(eq(mediaTable.userId, session.user.id))
    .orderBy(desc(mediaTable.createdAt))
    .all()

  return (
    <Page>
      <Card>
        <CardHeader>
          <CardTitle>Your library</CardTitle>
        </CardHeader>
        <CardContent>
          <TracksList items={media} />
        </CardContent>
      </Card>
    </Page>
  )
}
