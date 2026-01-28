# Milestone 5: Speaker Profile

Implement the individual speaker detail page with bio and sessions list.

## Goal

Create a detailed speaker profile page showing the speaker's photo, bio, and all sessions they deliver.

## Reference Files

- Specification: `product-plan/sections/speaker-profile/spec.md`
- Sample Data: `product-plan/sections/speaker-profile/data.json`
- Types: `product-plan/sections/speaker-profile/types.ts`
- Components: `product-plan/sections/speaker-profile/components/`
- Tests: `product-plan/sections/speaker-profile/tests.md`

## Design Requirements

- Large hero section with photo, name, title
- Full bio text section
- Grid of sessions by this speaker
- Contact/booking CTA
- Responsive layout

## Implementation

### 1. Create ProfileSessionCard Component

Similar to SessionCard but optimized for profile view:

```tsx
interface ProfileSessionCardProps {
  session: {
    id: string
    title: string
    abstract: string
  }
  onClick: (id: string) => void
}

export function ProfileSessionCard({ session, onClick }: ProfileSessionCardProps) {
  return (
    <button
      onClick={() => onClick(session.id)}
      className="group w-full text-left border-b border-current pb-6"
    >
      <h3 className="text-xl font-bold mb-3 group-hover:underline">
        {session.title}
      </h3>
      <p className="text-sm opacity-80 leading-relaxed line-clamp-4">
        {session.abstract}
      </p>
    </button>
  )
}
```

### 2. Create Speaker Profile Page

**Next.js App Router** (`app/speakers/[id]/page.tsx`):

```tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { getSpeakerById, getSessionsBySpeakerId } from '@/lib/data'
import { ProfileSessionCard } from '@/components/ProfileSessionCard'

export default function SpeakerProfile() {
  const params = useParams()
  const router = useRouter()
  const speaker = getSpeakerById(params.id as string)
  
  if (!speaker) {
    return <div className="text-center py-16">Speaker not found</div>
  }
  
  const sessions = getSessionsBySpeakerId(speaker.id)
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="mb-16 flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-80 flex-shrink-0">
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            {speaker.name}
          </h1>
          <p className="text-xl opacity-70 mb-8">{speaker.title}</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border-2 border-current font-heading font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Book This Speaker
          </a>
        </div>
      </div>
      
      {/* Bio Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-6">About</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {speaker.bio}
          </p>
        </div>
      </div>
      
      {/* Sessions Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-8">Sessions Available</h2>
        {sessions.length === 0 ? (
          <p className="text-lg opacity-50">
            This speaker is currently developing new sessions. Check back soon or contact us for custom topics.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {sessions.map((session) => (
              <ProfileSessionCard
                key={session.id}
                session={session}
                onClick={(id) => router.push(`/sessions/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Contact Section */}
      <div id="contact" className="border-t border-current pt-16 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Book This Speaker</h2>
        <p className="text-lg mb-8">
          Interested in having {speaker.name} at your event? Get in touch with us.
        </p>
        <a
          href="mailto:contact@zure.com"
          className="inline-block px-8 py-3 border-2 border-current font-heading font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  )
}
```

**Vite + React Router**:

```tsx
import { useParams, useNavigate } from 'react-router-dom'
import { getSpeakerById, getSessionsBySpeakerId } from '../lib/data'
import { ProfileSessionCard } from '../components/ProfileSessionCard'

export function SpeakerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const speaker = getSpeakerById(id!)
  
  // Same implementation as above
}
```

## Validation Checklist

- [ ] Speaker photo, name, and title display correctly
- [ ] Full bio text is readable and formatted
- [ ] Sessions grid shows all sessions by this speaker
- [ ] Clicking session navigates to `/sessions/:id`
- [ ] "Book This Speaker" button scrolls to contact section
- [ ] Empty state displays when speaker has no sessions
- [ ] 404 or redirect when speaker ID is invalid
- [ ] Responsive layout (photo stacks on mobile, side-by-side on desktop)
- [ ] Dark mode works correctly

## Testing

See `product-plan/sections/speaker-profile/tests.md` for detailed test specifications.

**Key test cases:**
- Displays correct speaker data
- Shows all sessions by speaker
- Handles speaker with no sessions
- Handles invalid speaker ID
- Navigation to sessions works

## Next Steps

Proceed to **Milestone 6: Session Detail** (final milestone).
