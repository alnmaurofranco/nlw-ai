import { z } from 'zod'

export const statusMessages = {
  waiting: 'Aguardando...',
  converting: 'Convertendo...',
  uploading: 'Carregando...',
  generating: 'Transcrevendo...',
  success: 'Transcrição concluída',
  error: 'Error',
}
export const statusFromSchema = z.enum([
  'waiting',
  'converting',
  'uploading',
  'generating',
  'success',
  'error',
])

export type Status = z.infer<typeof statusFromSchema>
