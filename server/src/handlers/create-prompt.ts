import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'

const createPromptFromBody = z.object({
  title: z.string(),
  template: z.string(),
})

export const createPromptHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { title, template } = createPromptFromBody.parse(request.body)
  await prisma.prompt.create({
    data: {
      title,
      template,
    },
  })
  return reply.status(201).send()
}
