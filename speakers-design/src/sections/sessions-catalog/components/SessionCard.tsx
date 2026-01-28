import type { Session, Speaker } from '../types'

interface SessionCardProps {
  session: Session
  speakers: Speaker[]
  onSessionClick: (sessionId: string) => void
  onSpeakerClick: (speakerId: string) => void
}

export function SessionCard({ session, speakers, onSessionClick, onSpeakerClick }: SessionCardProps) {
  // Get speakers for this session
  const sessionSpeakers = speakers.filter(s => session.speakerIds.includes(s.id))

  return (
    <div className="group bg-white dark:bg-neutral-950 transition-all duration-200 flex flex-col pb-6 border-b border-neutral-200 dark:border-neutral-800">
      {/* Session Content - clickable */}
      <button
        onClick={() => onSessionClick(session.id)}
        className="w-full text-left py-6 flex-1 flex flex-col"
      >
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3 group-hover:underline leading-tight">
          {session.title}
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
          {session.abstract}
        </p>
      </button>

      {/* Speaker(s) - clickable separately */}
      {sessionSpeakers.length > 0 && (
        <div className="pt-4">
          <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wide">
            {sessionSpeakers.length > 1 ? 'Speakers' : 'Speaker'}
          </p>
          <div className="flex flex-wrap gap-3">
            {sessionSpeakers.map((speaker) => (
              <button
                key={speaker.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onSpeakerClick(speaker.id)
                }}
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                {/* Speaker Photo in Circle */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Speaker Name */}
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50 hover:underline text-left">
                  {speaker.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
