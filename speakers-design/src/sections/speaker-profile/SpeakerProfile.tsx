import { ProfileSessionsGrid } from './components'
import type { Speaker, Session } from './types'
import sampleData from '../../../product/sections/speaker-profile/data.json'

interface SpeakerProfileProps {
  speaker: Speaker
  sessions: Session[]
}

function SpeakerProfileView({ speaker, sessions }: SpeakerProfileProps) {
  const handleSessionClick = (sessionId: string) => {
    console.log('Navigate to session detail:', sessionId)
    // In real app: navigate to /sessions/${sessionId}
  }

  const handleCoSpeakerClick = (speakerId: string) => {
    console.log('Navigate to co-speaker profile:', speakerId)
    // In real app: navigate to /speakers/${speakerId}
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-start">
            {/* Speaker Photo */}
            <div className="lg:col-span-3">
              <div className="w-2/3 max-w-xs mx-auto lg:w-full lg:max-w-none">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Speaker Info & Bio */}
            <div className="lg:col-span-9 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {speaker.name}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-200 dark:text-neutral-700 mb-8">
                {speaker.title}
              </p>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-neutral-200 dark:text-neutral-700 leading-relaxed whitespace-pre-line">
                  {speaker.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-12">
          {speaker.name.split(' ')[0]}'s Sessions
        </h2>
        <ProfileSessionsGrid
          sessions={sessions}
          onSessionClick={handleSessionClick}
          onCoSpeakerClick={handleCoSpeakerClick}
        />
      </section>
    </div>
  )
}

// Preview component that loads sample data
export default function SpeakerProfile() {
  const speaker = sampleData.speaker as Speaker
  const sessions = sampleData.sessions as Session[]
  return <SpeakerProfileView speaker={speaker} sessions={sessions} />
}
