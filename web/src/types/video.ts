import { z } from 'zod'

const videoFromSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  transcription: z.string().nullable(),
  createdAt: z.string().nullable(),
})

const videoSuccessResponseFromSchema = z.object({
  video: videoFromSchema,
})

export type Video = z.infer<typeof videoFromSchema>
export type VideoSuccessResponse = z.infer<
  typeof videoSuccessResponseFromSchema
>
