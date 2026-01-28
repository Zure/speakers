import { SpeakersGrid } from '@/components/speakers'
import { getAllSpeakers } from '@/lib/data'

export default function Home() {
  const speakers = getAllSpeakers()

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 font-heading">
            Speakers
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Discover expert speakers from Zure ready to share their knowledge at your next event
          </p>
        </div>
        
        <SpeakersGrid speakers={speakers} />
      </div>
    </div>
  )
}
