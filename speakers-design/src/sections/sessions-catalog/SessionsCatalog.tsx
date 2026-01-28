import { SessionsGrid } from './components'
import type { Session, Speaker } from './types'
import sampleData from '../../../product/sections/sessions-catalog/data.json'

interface SessionsCatalogProps {
  sessions: Session[]
  speakers: Speaker[]
}

function SessionsCatalogView({ sessions, speakers }: SessionsCatalogProps) {
  const handleSessionClick = (sessionId: string) => {
    console.log('Navigate to session detail:', sessionId)
    // In real app: navigate to /sessions/${sessionId}
  }

  const handleSpeakerClick = (speakerId: string) => {
    console.log('Navigate to speaker profile:', speakerId)
    // In real app: navigate to /speakers/${speakerId}
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Our Sessions
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl text-neutral-200 dark:text-neutral-700">
            Explore the talks and workshops our expert speakers can deliver at your event.
          </p>
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SessionsGrid
          sessions={sessions}
          speakers={speakers}
          onSessionClick={handleSessionClick}
          onSpeakerClick={handleSpeakerClick}
        />
      </section>
    </div>
  )
}

// Preview component that loads sample data
export default function SessionsCatalog() {
  const sessions = sampleData.sessions as Session[]
  const speakers = sampleData.speakers as Speaker[]
  return <SessionsCatalogView sessions={sessions} speakers={speakers} />
}
