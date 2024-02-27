import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { users } from './schema'

dotenv.config()

const pgClient = postgres(process.env.DB_CONNECTION ?? '')
const db = drizzle(pgClient)
const usersData: Array<typeof users.$inferInsert> = Array.from({ length: 20 }, () => ({
  name: faker.person.fullName(),
  username: faker.internet.userName(),
  password: bcrypt.hashSync('password', bcrypt.genSaltSync())
}))

const seed = async () => {
  await db.insert(users).values(usersData)

  console.log('Seeding successful.')
}

seed()
