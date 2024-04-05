'use client'

import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { routes } from '@/lib/routes'
import { LucideIcon, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChevronsRight } from 'lucide-react'

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded((prev) => !prev)

  return (
    <aside
      className={cn(
        'ease-[--var(--ease-out-quint)] relative inset-y-0 left-0 z-40 hidden flex-col border-r border-border/40 bg-background transition-all duration-500 sm:flex',
        expanded ? 'w-48' : 'w-16'
      )}
    >
      <nav className="flex flex-col items-center gap-4 px-3 py-4">
        {routes.map((route) => (
          <SidebarItem
            expanded={expanded}
            key={route.name}
            icon={route.icon}
            name={route.name}
            path={route.path}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-3 py-4">
        <SidebarItem
          expanded={expanded}
          name="Toggle menu"
          as="button"
          onClick={toggleExpanded}
          renderIcon={
            <ChevronsRight className={cn('ml-1 size-4 transition-all', expanded && 'rotate-180')} />
          }
        />

        <SidebarItem expanded={expanded} name="Settings" path="#" icon={Settings} />
      </nav>
    </aside>
  )
}

interface SidebarItemBase {
  name: string
  expanded: boolean
}

interface WithLink {
  as?: 'link'
  onClick?: undefined
  path: string
}

interface WithButton {
  as?: 'button'
  onClick?: () => void
  path?: undefined
}

type SidebarItemProps = SidebarItemBase &
  (WithLink | WithButton) &
  ({ icon: LucideIcon; renderIcon?: undefined } | { icon?: undefined; renderIcon: React.ReactNode })

const SidebarItem = ({
  expanded,
  path,
  name,
  icon,
  as = 'link',
  onClick,
  renderIcon,
}: SidebarItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === path
  const className = cn(
    'flex h-9 w-full items-center rounded-xl text-muted-foreground transition-colors hover:text-foreground px-2 relative overflow-hidden',
    isActive &&
      'bg-neutral-200/60 text-neutral-600 dark:bg-emerald-600 dark:text-white dark:hover:text-white/80'
  )

  const renderIconComponent = () => {
    if (icon !== undefined) {
      const Icon = icon

      return <Icon className="ml-1 size-4" />
    }

    return renderIcon
  }

  const renderTitle = () => {
    return (
      <span
        className={cn(
          'absolute left-10 top-1/2 w-32 -translate-y-1/2 text-left text-sm font-normal transition-opacity',
          expanded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {name}
      </span>
    )
  }

  return (
    <TooltipProvider delayDuration={expanded ? 9999 : 250} key={name}>
      <Tooltip>
        <TooltipTrigger asChild>
          {as === 'link' && path ? (
            <Link href={path} className={className}>
              {renderIconComponent()}
              <span className="sr-only">{name}</span>
              {renderTitle()}
            </Link>
          ) : (
            <button onClick={onClick} className={className}>
              {renderIconComponent()}
              <span className="sr-only">{name}</span>
              {renderTitle()}
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
