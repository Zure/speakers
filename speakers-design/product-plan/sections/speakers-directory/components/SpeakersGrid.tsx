import type { Speaker } from '../types'
import { SpeakerCard } from './SpeakerCard'

interface SpeakersGridProps {
  speakers: Speaker[]
  onSpeakerClick: (speakerId: string) => void
}

export function SpeakersGrid({ speakers, onSpeakerClick }: SpeakersGridProps) {
  if (speakers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            No speakers yet
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            Check back soon for our expert speakers
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {speakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          onClick={onSpeakerClick}
        />
      ))}
    </div>
  )
}
