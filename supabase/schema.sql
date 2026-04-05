-- ZeroClaw Agent Management Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table: user_agents
-- Stores agent configurations for each user
-- ============================================
CREATE TABLE IF NOT EXISTS user_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  agent_name TEXT NOT NULL,
  telegram_bot_token TEXT,
  llm_api_key TEXT,
  llm_provider TEXT DEFAULT 'openai',
  llm_model TEXT DEFAULT 'gpt-4o-mini',
  status TEXT DEFAULT 'pending',
  config_markdown JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Status validation
  CONSTRAINT valid_status CHECK (status IN ('pending', 'configuring', 'ready', 'deploying', 'running', 'error'))
);

-- Enable RLS
ALTER TABLE user_agents ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only access their own agents
CREATE POLICY "Users can only access their own agents"
  ON user_agents
  FOR ALL
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_user_agents_user_id ON user_agents(user_id);
CREATE INDEX idx_user_agents_status ON user_agents(status);

-- ============================================
-- Table: voice_recordings
-- Stores voice recordings for agent configuration
-- ============================================
CREATE TABLE IF NOT EXISTS voice_recordings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES user_agents(id) ON DELETE SET NULL,
  audio_url TEXT,
  transcription TEXT,
  generated_markdown JSONB,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Status validation
  CONSTRAINT valid_recording_status CHECK (status IN ('pending', 'transcribed', 'processed', 'error'))
);

-- Enable RLS
ALTER TABLE voice_recordings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only access their own recordings
CREATE POLICY "Users can only access their own recordings"
  ON voice_recordings
  FOR ALL
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_voice_recordings_user_id ON voice_recordings(user_id);
CREATE INDEX idx_voice_recordings_agent_id ON voice_recordings(agent_id);

-- ============================================
-- Function: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_agents
DROP TRIGGER IF EXISTS update_user_agents_updated_at ON user_agents;
CREATE TRIGGER update_user_agents_updated_at
  BEFORE UPDATE ON user_agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Storage: Create bucket for voice recordings
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-recordings', 'voice-recordings', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Users can only upload their own recordings
CREATE POLICY "Users can upload their own voice recordings"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'voice-recordings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policy: Users can only read their own recordings
CREATE POLICY "Users can read their own voice recordings"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'voice-recordings' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- Grant permissions
-- ============================================
GRANT ALL ON TABLE user_agents TO authenticated;
GRANT ALL ON TABLE voice_recordings TO authenticated;
GRANT ALL ON TABLE user_agents TO service_role;
GRANT ALL ON TABLE voice_recordings TO service_role;
