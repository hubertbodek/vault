export const routes = {
  home: {
    path: '/',
    name: 'Home',
  },
  about: {
    path: '/about',
    name: 'About',
  },
} as const

export type Routes = typeof routes
export type RouteKey = keyof Routes
export type Route = Routes[RouteKey]
