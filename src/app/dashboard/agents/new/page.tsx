'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { VoiceRecorder } from '@/components/voice/VoiceRecorder'
import { AgentConfigForm } from '@/components/dashboard/AgentConfigForm'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Sparkles, Mic, Type } from 'lucide-react'
import Link from 'next/link'

export default function NewAgentPage() {
  const router = useRouter()
  const [step, setStep] = useState<'voice' | 'config' | 'processing'>('voice')
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice')
  const [textInput, setTextInput] = useState('')
  const [generatedConfig, setGeneratedConfig] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const processText = async (text: string) => {
    setStep('processing')
    setIsProcessing(true)
    try {
      const response = await fetch('/api/process-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!response.ok) throw new Error('Processing failed')
      const data = await response.json()
      setGeneratedConfig(data)
      setStep('config')
    } catch (error) {
      console.error('Error processing text:', error)
      alert('Fehler bei der Verarbeitung. Bitte versuche es erneut.')
      setStep('voice')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRecordingComplete = async (blob: Blob) => {
    setStep('processing')
    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'recording.webm')
      const response = await fetch('/api/process-voice', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Processing failed')
      const data = await response.json()
      setGeneratedConfig(data)
      setStep('config')
    } catch (error) {
      console.error('Error processing voice:', error)
      alert('Fehler bei der Verarbeitung. Bitte versuche es erneut.')
      setStep('voice')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Neuen Agent erstellen</h1>
          <p className="text-muted-foreground">
            Konfiguriere deinen ZeroClaw Agent per Voice oder manuell
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'voice' || step === 'processing' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'voice' || step === 'processing' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <span className="text-sm font-medium">Voice</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className={`flex items-center gap-2 ${step === 'config' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'config' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="text-sm font-medium">Konfiguration</span>
            </div>
          </div>
        </div>

        {/* Voice Recording Step */}
        {step === 'voice' && (
          <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex gap-2 justify-center">
              <Button
                variant={inputMode === 'voice' ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
                onClick={() => setInputMode('voice')}
              >
                <Mic className="h-4 w-4" /> Voice
              </Button>
              <Button
                variant={inputMode === 'text' ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
                onClick={() => setInputMode('text')}
              >
                <Type className="h-4 w-4" /> Text
              </Button>
            </div>

            {inputMode === 'voice' ? (
              <VoiceRecorder
                onRecordingComplete={handleRecordingComplete}
                isProcessing={isProcessing}
              />
            ) : (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Beschreibe deinen Agent — was soll er können, wie soll er heißen, welche Persönlichkeit soll er haben?
                  </p>
                  <Textarea
                    placeholder="z.B. Ich will einen Productivity Coach der mir hilft meine Aufgaben zu priorisieren. Er soll strukturiert und motivierend sein..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <Button
                    className="w-full gap-2"
                    disabled={textInput.trim().length < 20}
                    onClick={() => processText(textInput)}
                  >
                    <Sparkles className="h-4 w-4" />
                    Agent generieren
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Processing Step */}
        {step === 'processing' && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                KI analysiert deine Beschreibung...
              </h3>
              <p className="text-muted-foreground">
                DeepSeek erstellt deine Agent-Konfiguration und Markdown-Dateien.
                Das dauert etwa 10-20 Sekunden.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Config Form Step */}
        {step === 'config' && generatedConfig && (
          <AgentConfigForm 
            initialConfig={generatedConfig}
            onSuccess={() => router.push('/dashboard')}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
