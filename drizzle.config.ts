import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

const isDev = process.env.NODE_ENV === 'development'
const url = isDev ? process.env.TURSO_DATABASE_URL_LOCAL! : process.env.TURSO_DATABASE_URL!

export default {
  schema: './src/db/schemas',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL_LOCAL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config
