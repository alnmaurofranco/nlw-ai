import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pipelineAsync = promisify(pipeline)

export const uploadVideoHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = await request.file()
  if (!data) {
    return reply.status(400).send({
      error: 'Missing file input.',
    })
  }
  const extension = path.extname(data.filename)
  const validExtensions = ['.mp3']
  if (!validExtensions.includes(extension)) {
    return reply.status(400).send({
      error: 'Invalid input type, please upload a MP3.',
    })
  }
  const fileBaseName = path.basename(data.filename, extension)
  const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
  const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)
  await pipelineAsync(data.file, fs.createWriteStream(uploadDestination))
  const video = await prisma.video.create({
    data: {
      name: data.filename,
      path: uploadDestination,
    },
  })
  return {
    video,
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    file: () => Promise<{
      filename: string
      file: NodeJS.ReadableStream
    } | null>
  }
}
