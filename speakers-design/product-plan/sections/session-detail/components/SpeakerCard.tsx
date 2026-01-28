import type { Speaker } from '../types'

interface SpeakerCardProps {
  speaker: Speaker
  onSpeakerClick: (speakerId: string) => void
}

export function SpeakerCard({ speaker, onSpeakerClick }: SpeakerCardProps) {
  return (
    <button
      onClick={() => onSpeakerClick(speaker.id)}
      className="group w-full bg-white dark:bg-neutral-950 transition-all duration-200 p-6 text-left border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Speaker Photo */}
        <div className="flex-shrink-0 w-32 h-32 overflow-hidden">
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
          />
        </div>

        {/* Speaker Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2 group-hover:underline">
            {speaker.name}
          </h3>
          <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">
            {speaker.title}
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {speaker.bio}
          </p>
        </div>
      </div>
    </button>
  )
}
