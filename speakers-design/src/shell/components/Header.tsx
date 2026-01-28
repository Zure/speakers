import { ZureLogo } from './ZureLogo'

interface HeaderProps {
  onNavigate?: (path: string) => void
}

export function Header({ onNavigate }: HeaderProps) {
  const handleNavClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    } else {
      console.log('Navigate to:', path)
    }
  }

  return (
    <header className="bg-neutral-900 dark:bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/speakers')}
            className="text-white dark:text-neutral-900 hover:opacity-70 transition-opacity"
            aria-label="Zure Home"
          >
            <ZureLogo className="h-8" />
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => handleNavClick('/speakers')}
              className="text-white dark:text-neutral-900 font-bold text-lg hover:underline transition-all"
            >
              Speakers
            </button>
            <button
              onClick={() => handleNavClick('/sessions')}
              className="text-white dark:text-neutral-900 font-bold text-lg hover:underline transition-all"
            >
              Sessions
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
