'use client'

import Link from 'next/link'
import type { Session, Speaker } from '@/lib/types'

interface SessionCardProps {
  session: Session
  speakers: Speaker[]
}

export function SessionCard({ session, speakers }: SessionCardProps) {
  // Get speakers for this session
  const sessionSpeakers = speakers.filter(s => session.speakerIds.includes(s.id))

  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Session Content - clickable */}
      <Link
        href={`/sessions/${session.id}`}
        className="w-full text-left flex-1 flex flex-col"
      >
        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:underline leading-tight font-heading">
          {session.title}
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed flex-1">
          {session.abstract}
        </p>
      </Link>

      {/* Speaker(s) - clickable separately */}
      {sessionSpeakers.length > 0 && (
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <p className="text-xs font-bold text-neutral-500 mb-3 uppercase tracking-wide">
            {sessionSpeakers.length > 1 ? 'Speakers' : 'Speaker'}
          </p>
          <div className="flex flex-wrap gap-3">
            {sessionSpeakers.map((speaker) => (
              <Link
                key={speaker.id}
                href={`/speakers/${speaker.id}`}
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
                <span className="text-sm font-bold text-neutral-900 hover:underline text-left">
                  {speaker.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
