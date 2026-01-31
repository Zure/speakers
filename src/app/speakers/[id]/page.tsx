import { notFound } from 'next/navigation'
import { getAllSpeakers, getSpeakerById, getSessionsBySpeakerId } from '@/lib/data'
import { ProfileSessionsGrid } from '@/components/profile'

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllSpeakers().map((speaker) => ({
    id: speaker.id,
  }))
}

export default async function SpeakerProfilePage({ params }: PageProps) {
  const { id } = await params
  const speaker = getSpeakerById(id)
  
  if (!speaker) {
    notFound()
  }

  const sessions = getSessionsBySpeakerId(id)
  const allSpeakers = getAllSpeakers()

  return (
    <div className="bg-white">
      {/* Hero Section with Bio */}
      <div className="bg-neutral-900 border-b-2 border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Speaker Photo */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Speaker Info and Bio */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading">
                {speaker.name}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-300 mb-8">
                {speaker.title}
              </p>
              
              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
                  About
                </h2>
                <p className="text-lg text-neutral-200 leading-relaxed">
                  {speaker.bio}
                </p>
              </div>

              <a
                href="mailto:info@zure.com"
                className="inline-block bg-white text-neutral-900 font-bold py-4 px-10 hover:opacity-80 transition-opacity text-lg"
              >
                Book This Speaker
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 font-heading">
            Sessions Available
          </h2>
          <ProfileSessionsGrid 
            sessions={sessions} 
            currentSpeakerId={id}
            allSpeakers={allSpeakers}
          />
        </div>
      </div>
    </div>
  )
}
