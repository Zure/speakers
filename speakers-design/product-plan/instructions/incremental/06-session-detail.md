# Milestone 6: Session Detail

Implement the individual session detail page with full description and speakers.

## Goal

Create a detailed session page showing the complete session description, format, duration, and all speakers who deliver it.

## Reference Files

- Specification: `product-plan/sections/session-detail/spec.md`
- Sample Data: `product-plan/sections/session-detail/data.json`
- Types: `product-plan/sections/session-detail/types.ts`
- Components: `product-plan/sections/session-detail/components/`
- Tests: `product-plan/sections/session-detail/tests.md`

## Design Requirements

- Hero section with session title
- Full abstract/description section
- Speaker cards showing all speakers
- Contact/booking CTA
- Responsive layout

## Implementation

### 1. Create SpeakerCard Component (for session detail)

Horizontal layout with photo and bio excerpt:

```tsx
interface SpeakerCardProps {
  speaker: {
    id: string
    name: string
    title: string
    bio: string
    photo: string
  }
  onClick: (id: string) => void
}

export function SpeakerCard({ speaker, onClick }: SpeakerCardProps) {
  return (
    <button
      onClick={() => onClick(speaker.id)}
      className="group w-full text-left flex gap-6 items-start hover:opacity-80 transition-opacity"
    >
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-1 group-hover:underline">
          {speaker.name}
        </h3>
        <p className="text-sm opacity-70 mb-2">{speaker.title}</p>
        <p className="text-sm opacity-60 line-clamp-2">
          {speaker.bio.slice(0, 150)}...
        </p>
      </div>
    </button>
  )
}
```

### 2. Create Session Detail Page

**Next.js App Router** (`app/sessions/[id]/page.tsx`):

```tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { getSessionById, getSpeakersBySessionId } from '@/lib/data'
import { SpeakerCard } from '@/components/SpeakerCard'

export default function SessionDetail() {
  const params = useParams()
  const router = useRouter()
  const session = getSessionById(params.id as string)
  
  if (!session) {
    return <div className="text-center py-16">Session not found</div>
  }
  
  const speakers = getSpeakersBySessionId(session.id)
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8">
          {session.title}
        </h1>
      </div>
      
      {/* Abstract Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-6">Overview</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {session.abstract}
          </p>
        </div>
      </div>
      
      {/* Speakers Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-8">
          {speakers.length > 1 ? 'Speakers' : 'Speaker'}
        </h2>
        <div className="space-y-8">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              onClick={(id) => router.push(`/speakers/${id}`)}
            />
          ))}
        </div>
      </div>
      
      {/* Contact Section */}
      <div id="contact" className="border-t border-current pt-16 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Book This Session</h2>
        <p className="text-lg mb-8">
          Interested in having this session at your event? Get in touch with us.
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
import { getSessionById, getSpeakersBySessionId } from '../lib/data'
import { SpeakerCard } from '../components/SpeakerCard'

export function SessionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const session = getSessionById(id!)
  
  // Same implementation as above
}
```

## Validation Checklist

- [ ] Session title displays correctly
- [ ] Full abstract is readable and formatted
- [ ] Speaker cards show all speakers for this session
- [ ] Clicking speaker navigates to `/speakers/:id`
- [ ] "Book This Session" button/link works
- [ ] 404 or redirect when session ID is invalid
- [ ] Responsive layout works on all screen sizes
- [ ] Dark mode works correctly
- [ ] Multiple speakers display correctly

## Testing

See `product-plan/sections/session-detail/tests.md` for detailed test specifications.

**Key test cases:**
- Displays correct session data
- Shows all speakers for session
- Handles sessions with single vs multiple speakers
- Handles invalid session ID
- Navigation to speakers works

## Final Product Validation

After completing all six milestones, perform these final checks:

### Navigation Flows
- [ ] Browse speakers → Click speaker → View profile → Click session → View detail
- [ ] Browse sessions → Click session → View detail → Click speaker → View profile
- [ ] Navigate using header links (Speakers, Sessions)
- [ ] All navigation links work correctly

### Responsive Design
- [ ] Test at 375px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1440px (desktop)
- [ ] All layouts adapt appropriately
- [ ] No horizontal scroll
- [ ] Text is readable at all sizes

### Dark Mode
- [ ] Toggle dark mode on all pages
- [ ] All text is readable
- [ ] All colors invert correctly
- [ ] Hover states work in both modes

### Edge Cases
- [ ] Empty speakers array (should show "No speakers yet")
- [ ] Empty sessions array (should show "No sessions yet")
- [ ] Speaker with no sessions (should show custom message)
- [ ] Invalid speaker ID (should show 404 or redirect)
- [ ] Invalid session ID (should show 404 or redirect)
- [ ] Session with multiple speakers (all display correctly)

### Performance
- [ ] Pages load quickly
- [ ] No console errors or warnings
- [ ] Images load efficiently (consider lazy loading)
- [ ] Smooth navigation between pages

## Deployment

1. Run production build: `npm run build`
2. Test production build locally: `npm run preview` or equivalent
3. Verify all routes work in production mode
4. Test on actual devices (mobile, tablet, desktop)
5. Deploy to your hosting platform (Vercel, Netlify, etc.)

## Congratulations!

You've successfully implemented the complete Zure Speakers & Sessions website. The product is ready for deployment and use.
