import 'dotenv/config'
import { OpenAI } from 'openai'
import { environment } from '../env/config'

const { OPENAI_API_SECRET_KEY } = environment

export const openai = new OpenAI({
  apiKey: OPENAI_API_SECRET_KEY,
})
