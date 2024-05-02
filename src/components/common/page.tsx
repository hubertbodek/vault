import { Route } from '@/lib/routes'
import { Header } from './header'

interface PageContainerProps {
  children: React.ReactNode
  breadcrumbs: (string | Route)[]
}

export const Page = ({ children, breadcrumbs }: PageContainerProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20 pb-24">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <Header breadcrumbs={breadcrumbs} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
