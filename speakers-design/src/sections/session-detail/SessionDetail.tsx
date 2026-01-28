import { SpeakerCard } from './components'
import type { Session, Speaker } from './types'
import sampleData from '../../../product/sections/session-detail/data.json'

interface SessionDetailProps {
  session: Session
  speakers: Speaker[]
}

function SessionDetailView({ session, speakers }: SessionDetailProps) {
  const handleSpeakerClick = (speakerId: string) => {
    console.log('Navigate to speaker profile:', speakerId)
    // In real app: navigate to /speakers/${speakerId}
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {session.title}
          </h1>
        </div>
      </section>

      {/* Abstract Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
          {session.abstract}
        </p>
      </section>

      {/* Speakers Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-12">
          {speakers.length > 1 ? 'Speakers' : 'Speaker'}
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              onSpeakerClick={handleSpeakerClick}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

// Preview component that loads sample data
export default function SessionDetail() {
  const session = sampleData.session as Session
  const speakers = sampleData.speakers as Speaker[]
  return <SessionDetailView session={session} speakers={speakers} />
}
