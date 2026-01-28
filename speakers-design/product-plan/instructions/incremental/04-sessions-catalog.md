# Milestone 4: Sessions Catalog

Implement the sessions browsing page with a grid of session cards.

## Goal

Create the Sessions Catalog page that displays all sessions in a responsive grid. Users can click sessions to view details or click speaker names to view profiles.

## Reference Files

- Specification: `product-plan/sections/sessions-catalog/spec.md`
- Sample Data: `product-plan/sections/sessions-catalog/data.json`
- Types: `product-plan/sections/sessions-catalog/types.ts`
- Components: `product-plan/sections/sessions-catalog/components/`
- Tests: `product-plan/sections/sessions-catalog/tests.md`

## Design Requirements

- Responsive grid (1 col mobile, 2-3 col desktop)
- Session cards with title, abstract, and speaker info
- Clickable session cards and speaker names
- Hover effects
- Empty state handling

## Implementation

### 1. Create SessionCard Component

Reference: `product-plan/sections/sessions-catalog/components/SessionCard.tsx`

Create `src/components/SessionCard.tsx`:

```tsx
import type { Session, Speaker } from '../types'

interface SessionCardProps {
  session: Session
  speakers: Speaker[]
  onSessionClick: (id: string) => void
  onSpeakerClick: (id: string) => void
}

export function SessionCard({ session, speakers, onSessionClick, onSpeakerClick }: SessionCardProps) {
  const sessionSpeakers = speakers.filter(s => session.speakerIds.includes(s.id))
  
  return (
    <div className="group border-b border-current pb-6 mb-6">
      {/* Session Content - clickable */}
      <button
        onClick={() => onSessionClick(session.id)}
        className="w-full text-left"
      >
        <h3 className="text-xl font-bold mb-3 group-hover:underline">
          {session.title}
        </h3>
        <p className="text-sm opacity-80 leading-relaxed mb-4">
          {session.abstract}
        </p>
      </button>
      
      {/* Speaker(s) */}
      {sessionSpeakers.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {sessionSpeakers.map((speaker) => (
            <button
              key={speaker.id}
              onClick={(e) => {
                e.stopPropagation()
                onSpeakerClick(speaker.id)
              }}
              className="flex items-center gap-2 hover:opacity-70"
            >
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-bold hover:underline">
                {speaker.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

### 2. Create SessionsGrid Component

Create `src/components/SessionsGrid.tsx`:

```tsx
import { SessionCard } from './SessionCard'
import type { Session, Speaker } from '../types'

interface SessionsGridProps {
  sessions: Session[]
  speakers: Speaker[]
  onSessionClick: (id: string) => void
  onSpeakerClick: (id: string) => void
}

export function SessionsGrid({ sessions, speakers, onSessionClick, onSpeakerClick }: SessionsGridProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl opacity-50">No sessions yet</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          speakers={speakers}
          onSessionClick={onSessionClick}
          onSpeakerClick={onSpeakerClick}
        />
      ))}
    </div>
  )
}
```

### 3. Create Sessions Catalog Page

**Next.js App Router** (`app/sessions/page.tsx`):

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { SessionsGrid } from '@/components/SessionsGrid'
import { sessions, speakers } from '@/lib/data'

export default function SessionsCatalog() {
  const router = useRouter()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-heading font-bold mb-16">Sessions</h1>
      <SessionsGrid
        sessions={sessions}
        speakers={speakers}
        onSessionClick={(id) => router.push(`/sessions/${id}`)}
        onSpeakerClick={(id) => router.push(`/speakers/${id}`)}
      />
    </div>
  )
}
```

**Vite + React Router**:

```tsx
import { useNavigate } from 'react-router-dom'
import { SessionsGrid } from '../components/SessionsGrid'
import { sessions, speakers } from '../lib/data'

export function SessionsCatalog() {
  const navigate = useNavigate()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-heading font-bold mb-16">Sessions</h1>
      <SessionsGrid
        sessions={sessions}
        speakers={speakers}
        onSessionClick={(id) => navigate(`/sessions/${id}`)}
        onSpeakerClick={(id) => navigate(`/speakers/${id}`)}
      />
    </div>
  )
}
```

## Validation Checklist

- [ ] Session cards display titles, abstracts, and speaker info
- [ ] Grid is responsive (1 col mobile, 2 col desktop)
- [ ] Clicking session navigates to `/sessions/:id`
- [ ] Clicking speaker name navigates to `/speakers/:id`
- [ ] Hover effects work on session title and speaker names
- [ ] Empty state displays when sessions array is empty
- [ ] Dark mode colors are correct
- [ ] No console errors

## Testing

See `product-plan/sections/sessions-catalog/tests.md` for detailed test specifications.

**Key test cases:**
- Renders all sessions from data
- Displays correct speakers for each session
- Handles empty sessions array
- Navigates on session click
- Navigates on speaker click (without triggering session click)

## Next Steps

Proceed to **Milestone 5: Speaker Profile**.
