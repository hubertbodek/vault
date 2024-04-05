import { auth } from '@/auth'
import { Page } from '../components/common/page'

export default async function Home() {
  const session = await auth()

  return <Page>Home</Page>
}
