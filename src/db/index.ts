import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import * as dotenv from 'dotenv'

dotenv.config({
  path: '../../.env.local',
})

const isDev = process.env.NODE_ENV === 'development'
const url = isDev ? process.env.TURSO_DATABASE_URL_LOCAL! : process.env.TURSO_DATABASE_URL!

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL_LOCAL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(turso)
