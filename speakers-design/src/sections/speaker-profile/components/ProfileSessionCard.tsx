import type { Session } from '../types'

interface ProfileSessionCardProps {
  session: Session
  onSessionClick: (sessionId: string) => void
  onCoSpeakerClick: (speakerId: string) => void
}

export function ProfileSessionCard({ session, onSessionClick, onCoSpeakerClick }: ProfileSessionCardProps) {
  const hasCoSpeakers = session.coSpeakers && session.coSpeakers.length > 0

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

      {/* Co-speakers - if any */}
      {hasCoSpeakers && (
        <div className="pt-4">
          <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wide">
            Co-presented with
          </p>
          <div className="flex flex-col gap-3">
            {session.coSpeakers!.map((coSpeaker) => (
              <button
                key={coSpeaker.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onCoSpeakerClick(coSpeaker.id)
                }}
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                {/* Co-speaker Photo in Circle */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={coSpeaker.photo}
                    alt={coSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Co-speaker Name */}
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50 hover:underline text-left">
                  {coSpeaker.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
