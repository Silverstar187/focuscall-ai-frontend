export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_agents: {
        Row: {
          id: string
          user_id: string
          agent_name: string
          telegram_bot_token: string | null
          llm_api_key: string | null
          llm_provider: string
          llm_model: string
          status: 'pending' | 'configuring' | 'ready' | 'deploying' | 'running' | 'error'
          config_markdown: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_name: string
          telegram_bot_token?: string | null
          llm_api_key?: string | null
          llm_provider?: string
          llm_model?: string
          status?: 'pending' | 'configuring' | 'ready' | 'deploying' | 'running' | 'error'
          config_markdown?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_name?: string
          telegram_bot_token?: string | null
          llm_api_key?: string | null
          llm_provider?: string
          llm_model?: string
          status?: 'pending' | 'configuring' | 'ready' | 'deploying' | 'running' | 'error'
          config_markdown?: Json
          created_at?: string
          updated_at?: string
        }
      }
      voice_recordings: {
        Row: {
          id: string
          user_id: string
          agent_id: string | null
          audio_url: string | null
          transcription: string | null
          generated_markdown: Json | null
          status: 'pending' | 'transcribed' | 'processed' | 'error'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id?: string | null
          audio_url?: string | null
          transcription?: string | null
          generated_markdown?: Json | null
          status?: 'pending' | 'transcribed' | 'processed' | 'error'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string | null
          audio_url?: string | null
          transcription?: string | null
          generated_markdown?: Json | null
          status?: 'pending' | 'transcribed' | 'processed' | 'error'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
