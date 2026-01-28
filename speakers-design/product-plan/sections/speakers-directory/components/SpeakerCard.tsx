import type { Speaker } from '../types'

interface SpeakerCardProps {
  speaker: Speaker
  onClick: (speakerId: string) => void
}

export function SpeakerCard({ speaker, onClick }: SpeakerCardProps) {
  return (
    <button
      onClick={() => onClick(speaker.id)}
      className="group w-full text-left bg-white dark:bg-neutral-950 transition-all duration-200 flex flex-col"
    >
      {/* Speaker Photo */}
      <div className="aspect-square w-full overflow-hidden mb-4">
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="w-full h-full object-cover object-center transition-opacity duration-200 group-hover:opacity-80"
        />
      </div>

      {/* Speaker Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2 group-hover:underline">
          {speaker.name}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {speaker.title}
        </p>
      </div>
    </button>
  )
}
