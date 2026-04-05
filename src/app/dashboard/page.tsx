'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { AgentList } from '@/components/dashboard/AgentList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Deine Agents</h1>
            <p className="text-muted-foreground">
              Verwalte und konfiguriere deine ZeroClaw Agents
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard/agents/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Neuer Agent
          </Button>
        </div>

        <AgentList />
      </div>
    </DashboardLayout>
  )
}
