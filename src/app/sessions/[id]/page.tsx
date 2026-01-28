import { notFound } from 'next/navigation'
import { getSessionById, getSpeakersByIds } from '@/lib/data'
import { SpeakerCard } from '@/components/session-detail'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = getSessionById(id)
  
  if (!session) {
    notFound()
  }

  const speakers = getSpeakersByIds(session.speakerIds)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-neutral-50 border-b-2 border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-8 font-heading max-w-5xl">
            {session.title}
          </h1>
          <a
            href="mailto:info@zure.com"
            className="inline-block bg-neutral-900 text-white font-bold py-4 px-10 hover:opacity-80 transition-opacity text-lg"
          >
            Book This Session
          </a>
        </div>
      </div>

      {/* Abstract Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 font-heading">
          Overview
        </h2>
        <p className="text-lg text-neutral-700 leading-relaxed max-w-4xl">
          {session.abstract}
        </p>
      </div>

      {/* Speakers Section */}
      <div className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 font-heading">
            {speakers.length > 1 ? 'Delivered By' : 'Speaker'}
          </h2>
          <div className="space-y-6">
            {speakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
