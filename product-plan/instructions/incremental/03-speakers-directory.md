# Milestone 3: Speakers Directory

Implement the main speakers browsing page with a grid of speaker cards.

## Goal

Create the Speakers Directory page that displays all speakers in a responsive grid. Users can click on any speaker to view their full profile.

## Reference Files

- Specification: `product-plan/sections/speakers-directory/spec.md`
- Sample Data: `product-plan/sections/speakers-directory/data.json`
- Types: `product-plan/sections/speakers-directory/types.ts`
- Components: `product-plan/sections/speakers-directory/components/`
- Tests: `product-plan/sections/speakers-directory/tests.md`

## Design Requirements

- Responsive grid (1 col mobile, 2-3 col tablet, 3-4 col desktop)
- Speaker cards with photo, name, and title
- Hover effects on cards
- Click navigates to speaker profile
- Empty state handling

## Implementation

### 1. Create SpeakerCard Component

Reference: `product-plan/sections/speakers-directory/components/SpeakerCard.tsx`

Create `src/components/SpeakerCard.tsx`:

```tsx
interface SpeakerCardProps {
  speaker: {
    id: string
    name: string
    title: string
    photo: string
  }
  onClick: (id: string) => void
}

export function SpeakerCard({ speaker, onClick }: SpeakerCardProps) {
  return (
    <button
      onClick={() => onClick(speaker.id)}
      className="group w-full text-left transition-all duration-200 flex flex-col"
    >
      {/* Speaker Photo */}
      <div className="aspect-square w-full overflow-hidden mb-4">
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      
      {/* Speaker Info */}
      <div>
        <h3 className="text-lg font-bold mb-2 group-hover:underline">
          {speaker.name}
        </h3>
        <p className="text-sm opacity-70">
          {speaker.title}
        </p>
      </div>
    </button>
  )
}
```

### 2. Create SpeakersGrid Component

Create `src/components/SpeakersGrid.tsx`:

```tsx
import { SpeakerCard } from './SpeakerCard'
import type { Speaker } from '../types'

interface SpeakersGridProps {
  speakers: Speaker[]
  onSpeakerClick: (id: string) => void
}

export function SpeakersGrid({ speakers, onSpeakerClick }: SpeakersGridProps) {
  if (speakers.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl opacity-50">No speakers yet</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {speakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          onClick={onSpeakerClick}
        />
      ))}
    </div>
  )
}
```

### 3. Create Speakers Directory Page

**Next.js App Router** (`app/page.tsx`):

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { SpeakersGrid } from '@/components/SpeakersGrid'
import { speakers } from '@/lib/data'

export default function SpeakersDirectory() {
  const router = useRouter()
  
  const handleSpeakerClick = (id: string) => {
    router.push(`/speakers/${id}`)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-heading font-bold mb-16">Speakers</h1>
      <SpeakersGrid speakers={speakers} onSpeakerClick={handleSpeakerClick} />
    </div>
  )
}
```

**Vite + React Router**:

```tsx
import { useNavigate } from 'react-router-dom'
import { SpeakersGrid } from '../components/SpeakersGrid'
import { speakers } from '../lib/data'

export function SpeakersDirectory() {
  const navigate = useNavigate()
  
  const handleSpeakerClick = (id: string) => {
    navigate(`/speakers/${id}`)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-5xl font-heading font-bold mb-16">Speakers</h1>
      <SpeakersGrid speakers={speakers} onSpeakerClick={handleSpeakerClick} />
    </div>
  )
}
```

## Validation Checklist

- [ ] Speaker cards display with photos, names, and titles
- [ ] Grid is responsive (test at 375px, 768px, 1440px widths)
- [ ] Clicking a speaker card navigates to `/speakers/:id`
- [ ] Hover effects work (opacity change, underline on name)
- [ ] Empty state displays when speakers array is empty
- [ ] Dark mode colors are correct
- [ ] No console errors

## Testing

See `product-plan/sections/speakers-directory/tests.md` for detailed test specifications.

**Key test cases:**
- Renders all speakers from data
- Handles empty speakers array
- Navigates on card click
- Responsive layout at different breakpoints

## Next Steps

Proceed to **Milestone 4: Sessions Catalog**.
