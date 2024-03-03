import fp from 'fastify-plugin'
import postgres from 'postgres'
import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import type { FastifyPluginCallback } from 'fastify'
import type { DrizzleConfig } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type * as schema from '#src/database/schema'

declare module 'fastify' {
  interface FastifyInstance {
    drizzle: PostgresJsDatabase<typeof schema>
  }
}

dotenv.config()

const plugin: FastifyPluginCallback<DrizzleConfig<typeof schema>> = (fastify, options, done) => {
  const pgClient = postgres(process.env.DB_CONNECTION ?? '')

  fastify.decorate('drizzle', drizzle(pgClient, options))

  done()
}

export default fp(plugin)
