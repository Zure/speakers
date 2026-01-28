import { SpeakersGrid } from './components'
import type { Speaker } from './types'
import sampleData from '../../../product/sections/speakers-directory/data.json'

interface SpeakersDirectoryProps {
  speakers: Speaker[]
}

function SpeakersDirectoryView({ speakers }: SpeakersDirectoryProps) {
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
            Our Speakers
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl text-neutral-200 dark:text-neutral-700">
            Meet the expert consultants from Zure ready to share their knowledge at your next event.
          </p>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SpeakersGrid speakers={speakers} onSpeakerClick={handleSpeakerClick} />
      </section>
    </div>
  )
}

// Preview component that loads sample data
export default function SpeakersDirectory() {
  const speakers = sampleData.speakers as Speaker[]
  return <SpeakersDirectoryView speakers={speakers} />
}
