'use client'

import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { routes } from '@/lib/routes'
import { Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-border/40 bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {routes.map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.path

          return (
            <TooltipProvider key={route.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={route.path}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                      isActive && 'bg-primary text-white hover:text-white/80'
                    )}
                  >
                    <Icon className="h-5 w-5 " />
                    <span className="sr-only">{route.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}
