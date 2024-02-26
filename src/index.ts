import fastify from 'fastify'
import drizzlePlugin from './plugins/drizzle'
import * as schema from './database/schema'

const app = fastify({ logger: true })

app.register(drizzlePlugin, { schema })

const start = async () => {
  try {
    await app.listen({ port: 8000 })
  } catch (err) {
    app.log.error(err)
    throw new Error('Something went wrong.')
  }
}

start()
