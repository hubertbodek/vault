import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { db } from './db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

// @ts-ignore https://authjs.dev/reference/nextjs
export const { handlers, auth } = NextAuth({
  // @ts-ignore https://authjs.dev/reference/nextjs
  providers: [GitHub],
  // @ts-ignore https://authjs.dev/reference/nextjs
  adapter: DrizzleAdapter(db),
})
