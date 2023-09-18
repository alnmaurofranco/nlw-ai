import { FastifyInstance } from 'fastify'
import { getAllPromptHandler } from '../handlers/get-all-prompt'
import { createPromptHandler } from '../handlers/create-prompt'

export async function promptsRoute(app: FastifyInstance) {
  app.get('/', getAllPromptHandler)
  app.post('/', createPromptHandler)
}
