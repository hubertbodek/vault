import { auth } from '@/auth'
import { Page } from '@/components/common/page'
import { UploadButton } from '@/components/common/upload-button'
import { db } from '@/db'
import { media as mediaTable } from '@/db/schemas/media'
import { TracksList } from './tracks-list'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
  const session = await auth()

  const media = await db.select().from(mediaTable).all()

  console.log({ media })

  return (
    <Page>
      <UploadButton />
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
