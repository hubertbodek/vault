import { Page } from '@/components/common/page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { listMedia } from '@/actions/media/list-media'
import { TracksList } from './tracks-list'

export default async function Library() {
  const media = await listMedia({ pagination: { limit: 10, offset: 0 } })

  return (
    <Page breadcrumbs={['Library']}>
      <Card>
        <CardHeader>
          <CardTitle>Your library</CardTitle>
        </CardHeader>
        <CardContent>
          <TracksList items={media ?? null} />
        </CardContent>
      </Card>
    </Page>
  )
}
