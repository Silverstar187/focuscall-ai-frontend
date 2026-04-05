'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Play, Settings, Trash2, Bot } from 'lucide-react'
import Link from 'next/link'

interface Agent {
  id: string
  agent_name: string
  status: 'pending' | 'configuring' | 'ready' | 'deploying' | 'running' | 'error'
  created_at: string
  llm_provider: string
}

const statusColors = {
  pending: 'bg-yellow-500',
  configuring: 'bg-blue-500',
  ready: 'bg-green-500',
  deploying: 'bg-purple-500',
  running: 'bg-green-600',
  error: 'bg-red-500',
}

const statusLabels = {
  pending: 'Ausstehend',
  configuring: 'Konfiguration',
  ready: 'Bereit',
  deploying: 'Deploying',
  running: 'Läuft',
  error: 'Fehler',
}

export function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAgents()
  }, [])

  async function fetchAgents() {
    try {
      const { data, error } = await supabase
        .from('user_agents')
        .select('id, agent_name, status, created_at, llm_provider')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAgents(data || [])
    } catch (error) {
      console.error('Error fetching agents:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteAgent(id: string) {
    if (!confirm('Möchtest du diesen Agent wirklich löschen?')) return

    try {
      const { error } = await supabase
        .from('user_agents')
        .delete()
        .eq('id', id)

      if (error) throw error
      setAgents(agents.filter(a => a.id !== id))
    } catch (error) {
      console.error('Error deleting agent:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (agents.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Noch keine Agents</h3>
          <p className="text-muted-foreground mb-4">
            Erstelle deinen ersten ZeroClaw Agent und konfiguriere ihn per Voice.
          </p>
          <Link href="/dashboard/agents/new">
            <Button>Agent erstellen</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <Card key={agent.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${statusColors[agent.status]}`} />
                <div>
                  <CardTitle className="text-lg">{agent.agent_name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {statusLabels[agent.status]}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              Provider: {agent.llm_provider}
              <br />
              Erstellt: {new Date(agent.created_at).toLocaleDateString('de-DE')}
            </div>
            
            <div className="flex gap-2">
              <Link href={`/dashboard/agents/${agent.id}`} className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Konfigurieren
                </Button>
              </Link>
              
              {agent.status === 'ready' && (
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {/* Deploy logic */}}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Starten
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => deleteAgent(agent.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
