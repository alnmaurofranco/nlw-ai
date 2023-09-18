import { z } from 'zod'

const promptFromSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  template: z.string(),
})
const getAllPromptsSuccessResponseFromSchema = z.object({
  prompts: z.array(promptFromSchema),
})
export const createPromptFromSchema = z.object({
  title: z.string(),
  template: z.string(),
})

export type Prompt = z.infer<typeof promptFromSchema>
export type GetAllPromptsSuccessResponse = z.infer<
  typeof getAllPromptsSuccessResponseFromSchema
>
export type CreatePrompt = z.infer<typeof createPromptFromSchema>
