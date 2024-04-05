import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './users'
import { sql } from 'drizzle-orm'

export const media = sqliteTable('media', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  size: integer('size').notNull(),
  url: text('url').notNull(),
  tailwindColor: text('tailwind_color'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export type Media = typeof media.$inferSelect
