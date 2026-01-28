import { SessionsGrid } from '@/components/sessions'
import { getAllSessions, getAllSpeakers } from '@/lib/data'

export default function SessionsPage() {
  const sessions = getAllSessions()
  const speakers = getAllSpeakers()

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 font-heading">
            Sessions
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Explore our catalog of engaging sessions available for your next event
          </p>
        </div>
        
        <SessionsGrid sessions={sessions} speakers={speakers} />
      </div>
    </div>
  )
}
