import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'
import { streamToResponse, OpenAIStream } from 'ai'
import { environment } from '../env/config'

const { ORIGIN_BASEURL_ALLOWED } = environment

const generateAICompletionFromBody = z.object({
  videoId: z.string().uuid(),
  prompt: z.string(),
  temperature: z.number().min(0).max(1).default(0.5),
})

export const generateAICompletionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { temperature, videoId, prompt } = generateAICompletionFromBody.parse(
    request.body,
  )
  const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: videoId,
    },
  })
  const transcription = video.transcription
  if (!transcription) {
    return reply.status(400).send({
      error: 'Video does not have a transcription yet',
    })
  }
  const promptMessage = prompt.replace('{transcription}', transcription)
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature,
    messages: [
      {
        role: 'user',
        content: promptMessage,
      },
    ],
    stream: true,
  })
  const stream = OpenAIStream(response)
  streamToResponse(stream, reply.raw, {
    headers: {
      'Access-Control-Allow-Origin': ORIGIN_BASEURL_ALLOWED,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  })
}
