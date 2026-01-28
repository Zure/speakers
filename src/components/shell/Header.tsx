'use client'

import Link from 'next/link'
import { ZureLogo } from './ZureLogo'

export function Header() {
  return (
    <header className="bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-white hover:opacity-70 transition-opacity"
            aria-label="Zure Home"
          >
            <ZureLogo className="h-8" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-white font-bold text-lg hover:underline transition-all"
            >
              Speakers
            </Link>
            <Link
              href="/sessions"
              className="text-white font-bold text-lg hover:underline transition-all"
            >
              Sessions
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
