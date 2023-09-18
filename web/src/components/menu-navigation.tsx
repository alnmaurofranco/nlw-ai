import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiClient } from '@/lib/axios'
import { CreatePrompt, createPromptFromSchema } from '@/types/prompt'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Github, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

export function MenuNavigation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isSubmitted },
    reset,
  } = useForm<CreatePrompt>({
    resolver: zodResolver(createPromptFromSchema),
    defaultValues: {
      title: '',
      template: '',
    },
    context: {
      isSubmitSuccessful: false,
    },
  })

  async function handleCreatePrompt(data: CreatePrompt) {
    try {
      await apiClient.post('/prompts', data)
      if (isSubmitSuccessful) {
        reset()
        Promise.resolve(setTimeout(() => setIsDialogOpen(false), 1800))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">NLW AI 💫</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido com 💚 no NLW da Rocketseat
        </span>
        <Separator orientation="vertical" className="h-6" />
        <Dialog
          defaultOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          open={isDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Criar prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Prompt</DialogTitle>
              <DialogDescription>
                Crie um prompt para que a IA possa gerar uma transcrição
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleCreatePrompt)}
              className="flex flex-col gap-4 py-4"
              id="create-prompt"
            >
              <div className="flex flex-col gap-4">
                <Label htmlFor="title" className="text-left">
                  Título
                </Label>
                <Input
                  placeholder="Dê um título para o prompt..."
                  id="title"
                  {...register('title')}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label htmlFor="template" className="text-left">
                  Tema
                </Label>
                <Textarea
                  id="template"
                  className="resize-none h-36"
                  placeholder="Escreva o prompt aqui e inclua '''{transcription}''' ao final para que a IA possa gerar uma transcrição."
                  {...register('template')}
                />
              </div>
            </form>
            <DialogFooter>
              <Button
                data-success={!!isSubmitSuccessful}
                form="create-prompt"
                type="submit"
                disabled={isSubmitting}
                className="data-[success=true]:bg-emerald-500 data-[success=true]:hover:bg-emerald-600 data-[success=true]:focus:bg-emerald-700"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Criando...
                  </>
                ) : isSubmitted && isSubmitSuccessful ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Prompt criado!
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar prompt
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="outline">
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
      </div>
    </div>
  )
}
