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
      className="group w-full text-left bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
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
      <div className="flex-1 flex flex-col px-5 pb-5">
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
