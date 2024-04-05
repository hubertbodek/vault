import { Header } from './header'

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20 pb-24">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header breadcrumbs={['test', 'test2']} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
