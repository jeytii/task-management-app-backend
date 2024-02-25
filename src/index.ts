import fastify from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const app = fastify({ logger: true })

const start = async () => {
  try {
    await app.listen({ port: 8000 })
  } catch (err) {
    app.log.error(err)
    throw new Error('Something went wrong.')
  }
}

start()
