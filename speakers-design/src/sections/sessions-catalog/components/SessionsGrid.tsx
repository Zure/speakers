import type { Session, Speaker } from '../types'
import { SessionCard } from './SessionCard'
import { useState } from 'react'

interface SessionsGridProps {
  sessions: Session[]
  speakers: Speaker[]
  onSessionClick: (sessionId: string) => void
  onSpeakerClick: (speakerId: string) => void
}

export function SessionsGrid({ sessions, speakers, onSessionClick, onSpeakerClick }: SessionsGridProps) {
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
          <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            No sessions yet
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
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
        <label htmlFor="session-search" className="block text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          Search Sessions
        </label>
        <input
          id="session-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by title or keyword..."
          className="w-full px-4 py-3 border-2 border-neutral-900 dark:border-neutral-50 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-50"
        />
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {filteredSessions.length} {filteredSessions.length === 1 ? 'session' : 'sessions'} found
        </p>
      )}

      {/* Sessions Grid */}
      {filteredSessions.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              No sessions found
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
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
              onSessionClick={onSessionClick}
              onSpeakerClick={onSpeakerClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
