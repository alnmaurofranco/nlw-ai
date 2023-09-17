import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { apiClient } from '@/lib/axios'
import { GetAllPromptsSuccessResponse, Prompt } from '@/types/prompt'
import { useEffect, useState } from 'react'

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {
    async function loadPrompts() {
      const response =
        await apiClient.get<GetAllPromptsSuccessResponse>('/prompts')
      setPrompts(response.data.prompts)
    }
    loadPrompts()
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)
    if (!selectedPrompt) return
    onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts &&
          prompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
