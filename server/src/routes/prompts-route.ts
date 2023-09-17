import { FastifyInstance } from 'fastify'
import { getAllPromptHandler } from '../handlers/get-all-prompt'

export async function promptsRoute(app: FastifyInstance) {
  app.get('/', getAllPromptHandler)
}
