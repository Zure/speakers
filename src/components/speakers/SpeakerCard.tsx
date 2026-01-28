'use client'

import Link from 'next/link'
import type { Speaker } from '@/lib/types'

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Link
      href={`/speakers/${speaker.id}`}
      className="group w-full text-left bg-white transition-all duration-200 flex flex-col hover:opacity-90"
    >
      {/* Speaker Photo */}
      <div className="aspect-square w-full overflow-hidden mb-4">
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Speaker Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:underline font-heading">
          {speaker.name}
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {speaker.title}
        </p>
      </div>
    </Link>
  )
}
