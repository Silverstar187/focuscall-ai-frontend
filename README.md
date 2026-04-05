# focuscall.ai Frontend

ZeroClaw Agent Management Dashboard mit Voice-Konfiguration.

## Features

- 🔐 **Auth**: Google OAuth + Email/Password via Supabase
- 🎙️ **Voice Config**: Browser-basierte Audioaufnahme mit Deepgram STT
- 🤖 **AI Generation**: DeepSeek generiert Markdown-Konfigurationen
- 🚀 **Deploy**: One-Click Deploy zum VPS via Supabase Edge Functions
- 📱 **Responsive**: Mobile-first Design mit Tailwind CSS

## Tech Stack

- Next.js 15 + React 19
- TypeScript
- Tailwind CSS 4
- Supabase (Auth, Database, Edge Functions)
- Deepgram (Speech-to-Text)
- DeepSeek (Text Generation)

## Setup

### 1. Environment Variables

```bash
cp .env.example .env.local
```

Fülle die Werte in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ahdzxabztewqqdajjtsn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

DEEPSEEK_API_KEY=sk-...
DEEPGRAM_API_KEY=...
```

### 2. Supabase Setup

```bash
# Login
supabase login

# Link project
supabase link --project-ref ahdzxabztewqqdajjtsn

# Deploy database schema
supabase db push

# Deploy edge functions
supabase functions deploy provision-agent

# Set secrets
supabase secrets set VPS_WEBHOOK_URL=https://vps.focuscall.ai/provision
supabase secrets set WEBHOOK_SECRET=your-webhook-secret
supabase secrets set DEEPSEEK_API_KEY=sk-...
```

### 3. Database Schema

Führe `supabase/schema.sql` im Supabase SQL Editor aus.

### 4. Storage Bucket

Erstelle einen Storage Bucket namens `voice-recordings` (private).

### 5. Auth Providers

Aktiviere im Supabase Dashboard:
- Google OAuth (unter Auth > Providers)
- Email/Password (unter Auth > Providers)

### 6. Run Dev Server

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

## Projektstruktur

```
src/
├── app/
│   ├── api/
│   │   └── process-voice/     # Deepgram + DeepSeek API Route
│   ├── auth/
│   │   └── callback/          # OAuth Callback Handler
│   ├── dashboard/
│   │   ├── agents/
│   │   │   └── new/           # Neuer Agent mit Voice
│   │   └── page.tsx           # Dashboard Übersicht
│   ├── login/
│   │   └── page.tsx           # Login Seite
│   └── page.tsx               # Landing Page
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx      # Login/Register Form
│   │   └── UserMenu.tsx       # User Dropdown Menu
│   ├── dashboard/
│   │   ├── AgentConfigForm.tsx # Agent Konfiguration
│   │   ├── AgentList.tsx      # Agent Übersicht
│   │   └── DashboardLayout.tsx # Dashboard Layout
│   ├── ui/                    # shadcn/ui Komponenten
│   └── voice/
│       └── VoiceRecorder.tsx  # Audio Recorder
├── hooks/
│   └── useAuth.ts             # Auth Hook
├── lib/
│   ├── database.types.ts      # Supabase Types
│   ├── supabase.ts            # Supabase Client
│   └── utils.ts               # Utilities
└── ...

supabase/
├── functions/
│   └── provision-agent/       # VPS Deployment Edge Function
│       └── index.ts
└── schema.sql                 # Datenbank Schema
```

## Flow: Neuer Agent erstellen

1. User klickt "Neuer Agent" im Dashboard
2. Voice Recording Komponente wird angezeigt
3. User nimmt Audio auf (30-60 Sekunden Beschreibung)
4. Audio wird an `/api/process-voice` gesendet
5. Deepgram transkribiert Audio → Text
6. DeepSeek generiert daraus:
   - Agent Name & Typ
   - System Prompt
   - AGENT_CONTEXT.md
   - AGENT_QUICKREF.md
   - config.toml
7. User kann Konfiguration im Formular bearbeiten
8. User fügt Telegram Bot Token & LLM Key hinzu
9. "Deploy & Starten" triggert Edge Function
10. Edge Function sendet HMAC-signierten Webhook an VPS
11. VPS erstellt Docker Container mit ZeroClaw

## API Endpoints

### POST /api/process-voice

Verarbeitet Audio-Upload und generiert Agent-Konfiguration.

**Request:**
```http
Content-Type: multipart/form-data

audio: Blob (WebM/MP4)
```

**Response:**
```json
{
  "transcription": "Ich will einen Productivity Coach...",
  "agentName": "Focus Coach",
  "agentType": "productivity",
  "description": "...",
  "systemPrompt": "...",
  "agentContext": "# Agent Context\\n...",
  "agentQuickref": "# Quick Reference\\n...",
  "configToml": "[agent]\\n..."
}
```

### POST /functions/v1/provision-agent

Triggert VPS Deployment.

**Request:**
```json
{
  "agent_id": "uuid",
  "telegram_bot_token": "...",
  "llm_api_key": "...",
  "llm_provider": "openai"
}
```

**Response:**
```json
{
  "success": true,
  "status": "deploying"
}
```

## Auth Flow

1. User klickt "Mit Google fortfahren" oder gibt Email/Passwort ein
2. Supabase Auth erstellt Session
3. Bei OAuth: Redirect zu `/auth/callback`
4. Callback verifiziert Session und leitet zu `/dashboard`
5. Dashboard zeigt Agent-Übersicht

## Datenbank Schema

### user_agents

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| user_id | UUID | Referenz zu auth.users |
| agent_name | Text | Anzeigename |
| telegram_bot_token | Text | Telegram Bot API Token |
| llm_api_key | Text | OpenAI/Anthropic/etc. Key |
| llm_provider | Text | openai, anthropic, etc. |
| llm_model | Text | gpt-4o-mini, etc. |
| status | Text | pending/configuring/ready/deploying/running/error |
| config_markdown | JSONB | {agent_context, agent_quickref, config_toml} |

### voice_recordings

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| user_id | UUID | Referenz zu auth.users |
| agent_id | UUID | Optional: Referenz zu agent |
| audio_url | Text | Supabase Storage URL |
| transcription | Text | Deepgram Transkription |
| generated_markdown | JSONB | DeepSeek Output |
| status | Text | pending/transcribed/processed/error |

## Security

- **RLS Policies**: Users können nur eigene Daten sehen
- **Storage**: Voice recordings sind private
- **API Keys**: Werden verschlüsselt in Supabase Vault gespeichert (empfohlen)
- **Webhook**: HMAC-SHA256 Signatur für VPS Kommunikation
- **CORS**: Konfiguriert in Supabase Auth Settings

## License

Private - focuscall.ai
