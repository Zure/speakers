import { Header } from './Header'
import { Footer } from './Footer'

interface AppShellProps {
  children: React.ReactNode
  onNavigate?: (path: string) => void
}

export function AppShell({ children, onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Header onNavigate={onNavigate} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
