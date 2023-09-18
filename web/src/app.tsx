import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from './components/ui/button'

import { CopyCheckIcon, CopyIcon, Wand2 } from 'lucide-react'
import { Label } from './components/ui/label'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'

import { useCompletion } from 'ai/react'
import { useState } from 'react'
import { MenuNavigation } from './components/menu-navigation'
import { PromptSelect } from './components/prompt-select'
import { VideoInputForm } from './components/video-input-form'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  async function handleCopyText(textCompletion: string) {
    try {
      await navigator.clipboard.writeText(textCompletion)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.log('Erro ao copiar texto')
    }
  }

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/completion',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <div className="min-h-screen flex flex-col">
      <MenuNavigation />

      <main className="flex-1 p-6 flex gap-6">
        {/* Sidebar */}
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={(videoId) => setVideoId(videoId)} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="model">Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="model">Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-Turbo 16K</SelectItem>
                  <SelectItem value="gpt4.0">GPT 4.0</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs text-muted-foreground italic">
                Você podera customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label htmlFor="model">Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possiveis erros.
              </span>
            </div>

            <Separator />

            <Button
              disabled={isLoading}
              variant="secondary"
              type="submit"
              className="w-full"
            >
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              value={input}
              onChange={handleInputChange}
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
              value={completion}
            />
            <Button type="button" onClick={() => handleCopyText(completion)}>
              {copied ? (
                <>
                  <CopyCheckIcon className="w-4 h-4 mr-2" />
                  Copiado
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
          </div>

          <p className="text-sm to-muted-foreground">
            Lembre-se: você pode utilizar a váriavel{' '}
            <code className="text-violet-400">{`{transcription}`}</code> no seu
            prompt para adicionar o conteúdo de transcrição do video
            selecionado.
          </p>
        </div>
      </main>
    </div>
  )
}
