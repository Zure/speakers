'use client'

import { useState } from 'react'
import type { Session, Speaker } from '@/lib/types'
import { SessionCard } from './SessionCard'

interface SessionsGridProps {
  sessions: Session[]
  speakers: Speaker[]
}

export function SessionsGrid({ sessions, speakers }: SessionsGridProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter sessions based on search query (title or abstract)
  const filteredSessions = sessions.filter((session) => {
    const query = searchQuery.toLowerCase()
    return (
      session.title.toLowerCase().includes(query) ||
      session.abstract.toLowerCase().includes(query)
    )
  })

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-2xl font-bold text-neutral-900 mb-2 font-heading">
            No sessions yet
          </p>
          <p className="text-neutral-600">
            Check back soon for our available sessions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Filter */}
      <div className="max-w-xl">
        <label htmlFor="session-search" className="block text-sm font-bold text-neutral-900 mb-2">
          Search Sessions
        </label>
        <input
          id="session-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by title or keyword..."
          className="w-full px-4 py-3 border-2 border-neutral-900 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-neutral-600">
          {filteredSessions.length} {filteredSessions.length === 1 ? 'session' : 'sessions'} found
        </p>
      )}

      {/* Sessions Grid */}
      {filteredSessions.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-xl font-bold text-neutral-900 mb-2 font-heading">
              No sessions found
            </p>
            <p className="text-neutral-600">
              Try a different search term
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              speakers={speakers}
            />
          ))}
        </div>
      )}
    </div>
  )
}
