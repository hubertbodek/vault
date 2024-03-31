import { auth } from '@/auth'
import { Page } from './_components/layout/page'

export default async function Home() {
  const session = await auth()

  return <Page>elo</Page>
}
