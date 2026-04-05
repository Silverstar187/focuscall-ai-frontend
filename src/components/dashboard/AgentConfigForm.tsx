'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Bot, 
  Key, 
  MessageCircle, 
  FileText, 
  Save, 
  Rocket,
  Loader2,
  CheckCircle2
} from 'lucide-react'

interface AgentConfigFormProps {
  initialConfig?: {
    agentName?: string
    agentType?: string
    description?: string
    systemPrompt?: string
    agentContext?: string
    agentQuickref?: string
    configToml?: string
  }
  onSuccess: () => void
}

export function AgentConfigForm({ initialConfig, onSuccess }: AgentConfigFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [activeTab, setActiveTab] = useState<'basic' | 'markdown' | 'keys'>('basic')
  
  const [formData, setFormData] = useState({
    agentName: initialConfig?.agentName || 'Mein Agent',
    agentType: initialConfig?.agentType || 'productivity',
    description: initialConfig?.description || '',
    systemPrompt: initialConfig?.systemPrompt || '',
    telegramBotToken: '',
    llmApiKey: '',
    llmProvider: 'openai',
    llmModel: 'gpt-4o-mini',
    agentContext: initialConfig?.agentContext || '',
    agentQuickref: initialConfig?.agentQuickref || '',
    configToml: initialConfig?.configToml || '',
  })

  const handleSave = async (deploy: boolean = false) => {
    if (deploy) {
      setIsDeploying(true)
    } else {
      setIsSaving(true)
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Save agent to database
      const { data: agent, error } = await supabase
        .from('user_agents')
        .insert({
          user_id: user.id,
          agent_name: formData.agentName,
          telegram_bot_token: formData.telegramBotToken,
          llm_api_key: formData.llmApiKey,
          llm_provider: formData.llmProvider,
          llm_model: formData.llmModel,
          status: deploy ? 'deploying' : 'ready',
          config_markdown: {
            agent_context: formData.agentContext,
            agent_quickref: formData.agentQuickref,
            config_toml: formData.configToml,
            system_prompt: formData.systemPrompt,
            description: formData.description,
          }
        })
        .select()
        .single()

      if (error) throw error

      if (deploy) {
        // Trigger deployment via Edge Function
        const { error: deployError } = await supabase.functions.invoke('provision-agent', {
          body: {
            agent_id: agent.id,
            telegram_bot_token: formData.telegramBotToken,
            llm_api_key: formData.llmApiKey,
            llm_provider: formData.llmProvider,
          }
        })

        if (deployError) throw deployError
      }

      onSuccess()
    } catch (error) {
      console.error('Error saving agent:', error)
      alert('Fehler beim Speichern. Bitte versuche es erneut.')
    } finally {
      setIsSaving(false)
      setIsDeploying(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'basic' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Bot className="inline w-4 h-4 mr-2" />
          Basis
        </button>
        <button
          onClick={() => setActiveTab('keys')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'keys' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Key className="inline w-4 h-4 mr-2" />
          API Keys
        </button>
        <button
          onClick={() => setActiveTab('markdown')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'markdown' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="inline w-4 h-4 mr-2" />
          Markdown
        </button>
      </div>

      {/* Basic Tab */}
      {activeTab === 'basic' && (
        <Card>
          <CardHeader>
            <CardTitle>Basis-Konfiguration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name</Label>
              <Input
                id="agentName"
                value={formData.agentName}
                onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                placeholder="z.B. Mein Productivity Coach"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agentType">Agent Typ</Label>
              <Select
                value={formData.agentType}
                onValueChange={(value) => setFormData({ ...formData, agentType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productivity">Productivity Coach</SelectItem>
                  <SelectItem value="health">Health Coach</SelectItem>
                  <SelectItem value="finance">Finance Coach</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Was macht dieser Agent?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                value={formData.systemPrompt}
                onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                placeholder="Der System Prompt für den Agent..."
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys Tab */}
      {activeTab === 'keys' && (
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telegramBotToken">
                <MessageCircle className="inline w-4 h-4 mr-2" />
                Telegram Bot Token
              </Label>
              <Input
                id="telegramBotToken"
                type="password"
                value={formData.telegramBotToken}
                onChange={(e) => setFormData({ ...formData, telegramBotToken: e.target.value })}
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              />
              <p className="text-xs text-muted-foreground">
                Erstelle einen Bot bei @BotFather auf Telegram
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="llmApiKey">
                <Key className="inline w-4 h-4 mr-2" />
                LLM API Key
              </Label>
              <Input
                id="llmApiKey"
                type="password"
                value={formData.llmApiKey}
                onChange={(e) => setFormData({ ...formData, llmApiKey: e.target.value })}
                placeholder="sk-..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="llmProvider">Provider</Label>
                <Select
                  value={formData.llmProvider}
                  onValueChange={(value) => setFormData({ ...formData, llmProvider: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="openrouter">OpenRouter</SelectItem>
                    <SelectItem value="deepseek">DeepSeek</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="llmModel">Modell</Label>
                <Input
                  id="llmModel"
                  value={formData.llmModel}
                  onChange={(e) => setFormData({ ...formData, llmModel: e.target.value })}
                  placeholder="gpt-4o-mini"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Markdown Tab */}
      {activeTab === 'markdown' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AGENT_CONTEXT.md</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.agentContext}
                onChange={(e) => setFormData({ ...formData, agentContext: e.target.value })}
                rows={10}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AGENT_QUICKREF.md</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.agentQuickref}
                onChange={(e) => setFormData({ ...formData, agentQuickref: e.target.value })}
                rows={10}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>config.toml</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.configToml}
                onChange={(e) => setFormData({ ...formData, configToml: e.target.value })}
                rows={10}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => handleSave(false)}
          disabled={isSaving || isDeploying}
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Speichern
        </Button>
        
        <Button
          onClick={() => handleSave(true)}
          disabled={isSaving || isDeploying || !formData.telegramBotToken || !formData.llmApiKey}
        >
          {isDeploying ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Rocket className="mr-2 h-4 w-4" />
          )}
          Deploy & Starten
        </Button>
      </div>

      {!formData.telegramBotToken || !formData.llmApiKey ? (
        <p className="text-sm text-muted-foreground text-right">
          Füge Telegram Bot Token und LLM API Key hinzu, um zu deployen
        </p>
      ) : null}
    </div>
  )
}
