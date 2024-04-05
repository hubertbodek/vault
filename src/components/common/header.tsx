import Link from 'next/link'
import { Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2 } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { type Route } from '@/lib/routes'
import React from 'react'
import { HeaderProfileActions } from './header-profile-actions'

interface HeaderProps {
  breadcrumbs: Array<Route | string>
}

export const Header = ({ breadcrumbs }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground">
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>
                    {typeof breadcrumb === 'string' ? breadcrumb : breadcrumb.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              )
            }

            if (typeof breadcrumb === 'string') {
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem key={index}>{breadcrumb}</BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              )
            }

            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <ThemeToggle /> */}
      <HeaderProfileActions />
    </header>
  )
}
