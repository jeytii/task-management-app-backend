import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()

const pgClient = postgres(process.env.DB_CONNECTION ?? '')

async function execute () {
  await migrate(drizzle(pgClient), { migrationsFolder: 'src/database/migrations' })
  await pgClient.end()
}

execute()
