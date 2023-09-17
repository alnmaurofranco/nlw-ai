import { z } from 'zod'

const promptFromSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  template: z.string(),
})
const getAllPromptsSuccessResponseFromSchema = z.object({
  prompts: z.array(promptFromSchema),
})

export type Prompt = z.infer<typeof promptFromSchema>
export type GetAllPromptsSuccessResponse = z.infer<
  typeof getAllPromptsSuccessResponseFromSchema
>
