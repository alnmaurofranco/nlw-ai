import { prisma } from '../lib/prisma'

export const getAllPromptHandler = async () => {
  const prompts = await prisma.prompt.findMany()
  return {
    prompts,
  }
}
