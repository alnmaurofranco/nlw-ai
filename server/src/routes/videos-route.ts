import fastifyMultipart from '@fastify/multipart'
import { FastifyInstance } from 'fastify'
import { uploadVideoHandler } from '../handlers/upload-video'
import { createTranscriptionHandler } from '../handlers/create-transcription'

export async function videosRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb,
    },
  })
  app.post('/upload', uploadVideoHandler)
  app.post('/:videoId/transcription', createTranscriptionHandler)
}
