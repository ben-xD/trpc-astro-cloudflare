
import type { InferModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  bio: text('bio'),
//   completionAt: integer('completion_at', { mode: 'timestamp' }),
})

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;