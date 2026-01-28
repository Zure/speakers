import type { Session } from '../types'
import { ProfileSessionCard } from './ProfileSessionCard'

interface ProfileSessionsGridProps {
  sessions: Session[]
  onSessionClick: (sessionId: string) => void
  onCoSpeakerClick: (speakerId: string) => void
}

export function ProfileSessionsGrid({ sessions, onSessionClick, onCoSpeakerClick }: ProfileSessionsGridProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-50">
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          This speaker is currently developing new sessions. Check back soon or contact us for custom topics.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sessions.map((session) => (
        <ProfileSessionCard
          key={session.id}
          session={session}
          onSessionClick={onSessionClick}
          onCoSpeakerClick={onCoSpeakerClick}
        />
      ))}
    </div>
  )
}
