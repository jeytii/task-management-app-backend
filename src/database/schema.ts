import { relations } from 'drizzle-orm'
import { type AnyPgColumn, boolean, date, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    username: varchar('username').unique().notNull(),
    password: varchar('password').notNull(),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow().notNull()
  },
  (table) => ({
    usernameIdx: uniqueIndex('usernameIdx').on(table.username)
  })
)

export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    parentId: uuid('parentId').references((): AnyPgColumn => tasks.id),
    priorityId: uuid('priorityId').references(() => priorities.id),
    title: varchar('title').notNull(),
    description: text('description').notNull(),
    startDate: date('startDate', { mode: 'string' }),
    dueDate: date('dueDate', { mode: 'string' }),
    finished: boolean('finished').default(false),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow().notNull()
  }
)

export const priorities = pgTable(
  'priorities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    color: varchar('color').notNull(),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow().notNull()
  }
)

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    name: varchar('name').notNull(),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow().notNull()
  }
)

export const settings = pgTable(
  'settings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    hideFinishedTasks: boolean('hideFinishedTasks').default(true),
    darkMode: boolean('darkMode').default(false),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow().notNull()
  }
)

export const usersRelations = relations(users, ({ one, many }) => ({
  tasks: many(tasks),
  tags: many(tags),
  settings: one(settings)
}))

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  user: one(users),
  priority: one(priorities),
  subtasks: many(tasks),
  parent: one(tasks)
}))

export const prioritiesRelations = relations(priorities, ({ many }) => ({
  tasks: many(tasks)
}))

export const tagsRelations = relations(priorities, ({ one }) => ({
  user: one(users)
}))

export const settingsRelations = relations(settings, ({ one }) => ({
  user: one(users)
}))
