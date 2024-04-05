import { Home, Package2 } from 'lucide-react'

export const routesMap = {
  home: {
    path: '/',
    name: 'Home',
    icon: Home,
  },
  about: {
    path: '/library',
    name: 'Library',
    icon: Package2,
  },
} as const

export const routes = Object.values(routesMap)

export type Routes = typeof routesMap
export type RouteKey = keyof Routes
export type Route = Routes[RouteKey]
