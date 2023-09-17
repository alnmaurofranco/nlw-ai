import 'dotenv/config'
import { z } from 'zod'

const _enviromnentFromSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  OPENAI_API_SECRET_KEY: z.string(),
  ORIGIN_BASEURL_ALLOWED: z.string(),
})

const hasEnvironmentVariables = _enviromnentFromSchema.safeParse(process.env)
if (!hasEnvironmentVariables.success) {
  throw new Error(hasEnvironmentVariables.error.message)
}
export const environment = hasEnvironmentVariables.data
