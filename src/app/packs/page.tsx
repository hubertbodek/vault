import { Page } from '@/components/common/page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Packs() {
  return (
    <Page breadcrumbs={['Packs']}>
      <Card>
        <CardHeader>
          <CardTitle>Your packs</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className="flex aspect-square cursor-default items-center justify-center rounded-lg border border-neutral-700 bg-muted transition-all hover:border-neutral-600 hover:shadow-xl hover:shadow-emerald-700/10"
              key={i}
            >
              pack {i}
            </div>
          ))}
        </CardContent>
      </Card>
    </Page>
  )
}
