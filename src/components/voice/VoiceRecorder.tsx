'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, Square, Loader2, Play, RotateCcw } from 'lucide-react'

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void
  isProcessing?: boolean
}

export function VoiceRecorder({ onRecordingComplete, isProcessing }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') 
          ? 'audio/webm' 
          : 'audio/mp4'
      })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        setAudioBlob(audioBlob)
      }

      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Mikrofon-Zugriff verweigert. Bitte erlaube den Zugriff auf dein Mikrofon.')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      streamRef.current?.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  const handleSubmit = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob)
    }
  }

  const handleReset = () => {
    setAudioUrl(null)
    setAudioBlob(null)
    setRecordingTime(0)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6">
          {/* Recording Indicator */}
          <div className="relative">
            {isRecording ? (
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-destructive/30 flex items-center justify-center">
                    <Mic className="w-8 h-8 text-destructive" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>
            ) : audioUrl ? (
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Mic className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Timer / Status */}
          <div className="text-center">
            {isRecording ? (
              <div className="space-y-1">
                <div className="text-2xl font-mono font-bold">
                  {formatTime(recordingTime)}
                </div>
                <p className="text-sm text-destructive font-medium">
                  Nimmt auf... Beschreibe deinen Agent
                </p>
              </div>
            ) : audioUrl ? (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Aufnahme bereit ({formatTime(recordingTime)})
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="font-medium">Starte die Voice-Konfiguration</p>
                <p className="text-sm text-muted-foreground">
                  Beschreibe in 30-60 Sekunden, was dein Agent können soll
                </p>
              </div>
            )}
          </div>

          {/* Audio Preview */}
          {audioUrl && (
            <audio 
              src={audioUrl} 
              controls 
              className="w-full max-w-xs"
            />
          )}

          {/* Controls */}
          <div className="flex gap-3">
            {!audioUrl ? (
              isRecording ? (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={stopRecording}
                  className="gap-2"
                >
                  <Square className="w-4 h-4 fill-current" />
                  Aufnahme stoppen
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={startRecording}
                  className="gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Aufnahme starten
                </Button>
              )
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Neu aufnehmen
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verarbeite...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Konfiguration erstellen
                    </>
                  )}
                </Button>
              </>
            )}
          </div>

          {/* Tips */}
          {!isRecording && !audioUrl && (
            <div className="text-xs text-muted-foreground text-center max-w-sm">
              <p className="font-medium mb-1">Tipps für eine gute Beschreibung:</p>
              <ul className="space-y-1">
                <li>• Wie soll der Agent heißen?</li>
                <li>• Was ist seine Hauptaufgabe? (z.B. Coaching, Produktivität)</li>
                <li>• Welchen Ton soll er haben? (freundlich, direkt, humorvoll)</li>
                <li>• Welche Tools soll er nutzen können?</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
