import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { type Route } from '@/lib/routes'
import React from 'react'
import { HeaderProfileActions } from './header-profile-actions'
import { UploadButton } from './upload-button'

interface HeaderProps {
  breadcrumbs: Array<Route | string>
}

export const Header = ({ breadcrumbs }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
      <div className="ml-auto flex items-center gap-4">
        <UploadButton />
        <HeaderProfileActions />
      </div>
    </header>
  )
}
