import { boolean, date, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    username: varchar('username').unique().notNull(),
    password: varchar('password').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    usernameIdx: uniqueIndex('usernameIdx').on(table.username)
  })
)

export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: varchar('userId').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    parentId: varchar('parentId'),
    priorityId: varchar('priorityId').references(() => priorities.id),
    title: varchar('title').notNull(),
    description: text('description').notNull(),
    startDate: date('startDate', { mode: 'string' }),
    dueDate: date('dueDate', { mode: 'string' }),
    finished: boolean('finished').default(false)
  }
)

export const priorities = pgTable(
  'priorities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    color: varchar('color').notNull()
  }
)
