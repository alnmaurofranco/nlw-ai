import { fastify } from 'fastify'
import { promptsRoute } from './routes/prompts-route'
import { videosRoute } from './routes/videos-route'
import { generateAICompletionHandler } from './handlers/generate-ai-completion'
import { fastifyCors } from '@fastify/cors'
import { environment } from './env/config'

const { ORIGIN_BASEURL_ALLOWED, PORT } = environment

const app = fastify()

app.register(fastifyCors, {
  origin: ORIGIN_BASEURL_ALLOWED,
})
app.get('/', (request, reply) => {
  reply.send('Hello World!')
})

app.register(promptsRoute, { prefix: '/prompts' })
app.register(videosRoute, { prefix: '/videos' })
app.post('/ai/completion', generateAICompletionHandler)

app
  .listen({
    port: PORT,
  })
  .then((address) => {
    console.log(`Server listening on ${address}`)
  })
