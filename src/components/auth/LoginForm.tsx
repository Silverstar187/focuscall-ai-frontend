'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '@/lib/supabase'
import { Loader2, Mail, Lock, Globe } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail(email, password)
        if (error) throw error
        setSuccess('Account erstellt! Bitte bestätige deine E-Mail.')
      } else {
        const { error } = await signInWithEmail(email, password)
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
      // OAuth redirect happens automatically
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten')
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {isSignUp ? 'Account erstellen' : 'Anmelden'}
        </CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Erstelle deinen FocusCall Account' 
            : 'Melde dich an um deinen Agent zu konfigurieren'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Google Sign In */}
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          Mit Google fortfahren
        </Button>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            oder
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600 bg-green-100 p-3 rounded-md">
              {success}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? 'Account erstellen' : 'Anmelden'}
          </Button>
        </form>

        {/* Toggle Sign In/Up */}
        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Bereits einen Account?' : 'Noch keinen Account?'}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
              setSuccess(null)
            }}
            className="text-primary hover:underline font-medium"
          >
            {isSignUp ? 'Anmelden' : 'Registrieren'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
