import { FileVideo, Upload } from 'lucide-react'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { loaderFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { apiClient } from '@/lib/axios'
import { VideoSuccessResponse } from '@/types/video'
import { Status, statusMessages } from '@/types/status'

interface VideoInputFormProps {
  onVideoUploaded: (videoId: string) => void
}

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget
    if (!files) return
    const selectedFile = files.item(0)
    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    const ffmpeg = await loaderFFmpeg()
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))
    ffmpeg.on('progress', (progress) => {
      console.log(`Processing: ${Math.round(progress.progress * 100)}%`)
    })
    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20K',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])
    const data = await ffmpeg.readFile('output.mp3')
    const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
    const audioFile = new File([audioFileBlob], 'output.mp3', {
      type: 'audio/mpeg',
    })
    return audioFile
    // ffmpeg.on('log', log => {
    //     console.log(log)
    // })
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const prompt = promptInputRef.current?.value
    if (!videoFile) return
    setStatus('converting')
    const audioFile = await convertVideoToAudio(videoFile)
    const data = new FormData()
    data.append('file', audioFile)
    setStatus('uploading')
    const response = await apiClient.post<VideoSuccessResponse>(
      '/videos/upload',
      data,
    )
    const { video } = response.data
    const videoId = video.id
    setStatus('generating')
    await apiClient.post(`/videos/${videoId}/transcription`, {
      prompt,
    })
    setStatus('success')
    onVideoUploaded(videoId)
    setTimeout(() => {
      setStatus('waiting')
    }, 3000)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="border relative flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {videoFile && (
          <video
            src={previewURL ?? 'Preview URL not found'}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        )}
        {!videoFile && (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input
        id="video"
        type="file"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-3">
        <Label htmlFor="prompt">Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          disabled={status !== 'waiting'}
          id="prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras chaves mencionadas no vídeo para a IA gerar um texto mais preciso (,)"
        />

        <Button
          variant={status === 'error' ? 'destructive' : 'default'}
          data-success={status === 'success'}
          disabled={status !== 'waiting'}
          type="submit"
          className="w-full data-[success=true]:bg-emerald-400 data-[success=true]:text-emerald-950"
        >
          {status === 'waiting' ? (
            <>
              Carregar vídeo
              <Upload className="w-4 h-4 ml-2" />
            </>
          ) : (
            statusMessages[status]
          )}
        </Button>
      </div>
    </form>
  )
}
