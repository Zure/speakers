import type { Session, Speaker } from '@/lib/types'
import { ProfileSessionCard } from './ProfileSessionCard'

interface ProfileSessionsGridProps {
  sessions: Session[]
  currentSpeakerId: string
  allSpeakers: Speaker[]
}

export function ProfileSessionsGrid({ sessions, currentSpeakerId, allSpeakers }: ProfileSessionsGridProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-neutral-50 border-2 border-neutral-900">
        <p className="text-neutral-600 text-lg">
          This speaker is currently developing new sessions. Check back soon or contact us for custom topics.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sessions.map((session) => {
        // Get co-speakers (all speakers except the current one)
        const coSpeakers = allSpeakers.filter(
          speaker => session.speakerIds.includes(speaker.id) && speaker.id !== currentSpeakerId
        )
        
        return (
          <ProfileSessionCard
            key={session.id}
            session={session}
            coSpeakers={coSpeakers}
          />
        )
      })}
    </div>
  )
}
