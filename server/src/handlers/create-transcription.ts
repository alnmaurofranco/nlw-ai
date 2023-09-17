import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { createReadStream } from 'fs'
import { openai } from '../lib/openai'

const createTranscriptionFromParams = z.object({
  videoId: z.string().uuid(),
})

const createTranscriptionFromBody = z.object({
  prompt: z.string(),
})

export const createTranscriptionHandler = async (request: FastifyRequest) => {
  const { videoId } = createTranscriptionFromParams.parse(request.params)
  const { prompt } = createTranscriptionFromBody.parse(request.body)
  const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: videoId,
    },
  })
  const videoPath = video.path
  const audioReadStream = createReadStream(videoPath)
  const response = await openai.audio.transcriptions.create({
    file: audioReadStream,
    model: 'whisper-1',
    language: 'pt',
    response_format: 'json',
    temperature: 0,
    prompt,
  })
  const transcription = response.text ?? ''
  await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      transcription,
    },
  })

  return {
    transcription,
  }
}
