import { NextRequest, NextResponse } from 'next/server'

// DeepSeek API Konfiguration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1'

// Deepgram STT Konfiguration
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let transcription = ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      transcription = body.text || ''
    } else {
      const formData = await request.formData()
      const audioFile = formData.get('audio') as File
      if (!audioFile) {
        return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
      }
      transcription = await transcribeAudio(audioFile)
    }

    if (!transcription) {
      return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
    }

    const config = await generateAgentConfig(transcription)
    return NextResponse.json({ transcription, ...config })

  } catch (error) {
    console.error('Error processing voice:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&language=de', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': audioFile.type,
      },
      body: await audioFile.arrayBuffer(),
    })

    if (!response.ok) {
      throw new Error(`Deepgram API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results?.channels[0]?.alternatives[0]?.transcript || ''

  } catch (error) {
    console.error('Deepgram transcription error:', error)
    return ''
  }
}

async function generateAgentConfig(transcription: string) {
  const prompt = `Basierend auf dieser Voice-Beschreibung eines AI Agents, erstelle eine vollständige Konfiguration im JSON Format.

Beschreibung: "${transcription}"

Erstelle folgende Felder:
- agentName: Ein passender Name für den Agent
- agentType: Einer von: productivity, health, finance, custom
- description: Kurze Zusammenfassung (2-3 Sätze)
- systemPrompt: Ein detaillierter System Prompt für den Agent
- agentContext: Markdown-Inhalt für AGENT_CONTEXT.md (Überblick über die Umgebung und Best Practices)
- agentQuickref: Markdown-Inhalt für AGENT_QUICKREF.md (Kurzreferenz)
- configToml: Inhalt für config.toml (ZeroClaw Konfiguration)

Antworte NUR mit gültigem JSON, keine Erklärungen:

{
  "agentName": "...",
  "agentType": "...",
  "description": "...",
  "systemPrompt": "...",
  "agentContext": "...",
  "agentQuickref": "...",
  "configToml": "..."
}`

  try {
    const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Du bist ein Experte für AI Agent Konfiguration und erstellst Markdown-Dateien für ZeroClaw Agents.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    throw new Error('Invalid JSON response from DeepSeek')

  } catch (error) {
    console.error('DeepSeek generation error:', error)
    
    // Return default config as fallback
    return {
      agentName: 'Mein Agent',
      agentType: 'custom',
      description: transcription.slice(0, 200),
      systemPrompt: `Du bist ein hilfreicher AI Agent. ${transcription}`,
      agentContext: `# Agent Context\\n\\n${transcription}`,
      agentQuickref: `# Quick Reference\\n\\n- Agent basiert auf: ${transcription.slice(0, 100)}`,
      configToml: `[agent]\\nname = \\"Mein Agent\\"\\ntype = \\"custom\\"`,
    }
  }
}
