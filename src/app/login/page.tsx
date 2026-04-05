import { LoginForm } from '@/components/auth/LoginForm'
import { Brain } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">FocusCall</span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <LoginForm />
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-sm text-muted-foreground">
        <p>
          Mit dem Login akzeptierst du unsere{' '}
          <Link href="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </Link>
        </p>
      </footer>
    </div>
  )
}
