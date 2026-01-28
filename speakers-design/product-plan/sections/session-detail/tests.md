# Test Specifications: Session Detail

This document outlines the test cases for the Session Detail section.

## Component Tests

### SpeakerCard Component (for session detail)

**Test: Renders speaker data correctly**
- Given a speaker object
- When the component renders
- Then it displays photo, name, title, and bio excerpt

**Test: Handles click event**
- Given a speaker card with onClick handler
- When the user clicks the card
- Then onClick is called with the speaker ID

**Test: Truncates bio appropriately**
- Given a speaker with long bio
- When card renders
- Then bio is truncated to ~150 characters with ellipsis

**Test: Shows hover effects**
- Given a speaker card
- When the user hovers over it
- Then opacity changes and name shows underline

## Page Tests

### Session Detail Page

**Test: Loads and displays session data**
- Given a session ID
- When the page loads
- Then it displays the session title and full abstract

**Test: Displays session speakers**
- Given a session with 2 speakers
- When the page loads
- Then it displays both speaker cards

**Test: Single speaker label**
- Given a session with 1 speaker
- When the page loads
- Then section heading says "Speaker" (singular)

**Test: Multiple speakers label**
- Given a session with 2+ speakers
- When the page loads
- Then section heading says "Speakers" (plural)

**Test: Invalid session ID**
- Given an invalid session ID
- When the page loads
- Then it displays "Session not found" message or redirects to 404

**Test: Navigation to speaker**
- Given a session detail with speakers
- When a speaker card is clicked
- Then the user navigates to `/speakers/:id`

**Test: Book This Session button**
- Given a session detail page
- When "Book This Session" button is clicked
- Then it scrolls to contact section or opens contact action

## Layout Tests

**Test: Responsive layout**
- Given a session detail page
- When viewed on mobile
- Then all sections stack vertically
- When viewed on desktop
- Then layout is centered with max width

**Test: Abstract formatting**
- Given a session with multi-paragraph abstract
- When abstract renders
- Then paragraphs are properly formatted

**Test: Multiple speakers layout**
- Given a session with 3 speakers
- When viewed on mobile
- Then speaker cards stack vertically
- When viewed on desktop
- Then speaker cards may display side-by-side (optional)

## User Flow Tests (E2E)

**User Flow: View session and navigate to speaker**
1. Navigate to session detail page
2. Verify session details are displayed
3. Scroll to speakers section
4. Click on a speaker card
5. Verify navigation to speaker profile

**User Flow: Book session**
1. Navigate to session detail
2. Scroll to contact section
3. Click "Book This Session" button
4. Verify mailto link or contact form opens

**User Flow: Navigate from catalog**
1. Load sessions catalog
2. Click on a session
3. Verify session detail loads
4. Verify all speakers are displayed

**User Flow: Multi-speaker session**
1. Find a session with multiple speakers
2. Load session detail
3. Verify all speakers are displayed
4. Click on second speaker
5. Verify correct speaker profile loads

## Edge Cases

**Test: Session not found**
- Given a non-existent session ID
- When page attempts to load
- Then 404 page or "Session not found" message displays

**Test: Session with no speakers**
- Given a session with empty speakerIds array
- When page loads
- Then it handles gracefully (shows message or hides speakers section)

**Test: Session with invalid speaker IDs**
- Given a session with speaker IDs that don't exist
- When page loads
- Then it filters out invalid speakers and displays valid ones

**Test: Very long session title**
- Given a session with 100+ character title
- When page renders
- Then title wraps appropriately and is readable

**Test: Very long abstract**
- Given a session with 2000+ word abstract
- When page renders
- Then abstract displays fully and is readable

**Test: Speaker photo missing**
- Given a speaker with no photo URL
- When speaker card renders
- Then it handles missing image gracefully

## Accessibility Tests

**Test: Keyboard navigation**
- Given a session detail page
- When using Tab key
- Then focus moves through speaker cards and buttons in logical order

**Test: Screen reader support**
- Given a session detail page
- When using a screen reader
- Then title, abstract, and speaker info are announced properly

**Test: Alt text on speaker photos**
- Given speaker photos
- When page loads
- Then alt attributes contain speaker names

**Test: Heading hierarchy**
- Given a session detail page
- When page renders
- Then headings follow proper hierarchy (h1 for title, h2 for sections)

## Performance Tests

**Test: Long abstract**
- Given a session with very long abstract
- When page loads
- Then page renders quickly without layout shift

**Test: Many speakers**
- Given a session with 5+ speakers
- When page loads
- Then all speaker cards render without performance issues

## Data Integration Tests

**Test: Correct speakers loaded**
- Given a session ID
- When page loads
- Then all speakers listed in session.speakerIds are displayed

**Test: Speaker data completeness**
- Given speaker IDs from session
- When loading speaker data
- Then full speaker objects (with bio, photo, etc.) are loaded

## Implementation Example (Vitest + React Testing Library)

```typescript
import { render, screen } from '@testing-library/react'
import { SessionDetail } from './SessionDetail'
import { describe, it, expect, vi } from 'vitest'

// Mock router
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'sess1' }),
  useRouter: () => ({ push: vi.fn() })
}))

// Mock data functions
vi.mock('@/lib/data', () => ({
  getSessionById: (id: string) => ({
    id: 'sess1',
    title: 'Test Session',
    abstract: 'This is a comprehensive session about testing.',
    speakerIds: ['s1', 's2']
  }),
  getSpeakersBySessionId: (id: string) => [
    { id: 's1', name: 'Speaker One', title: 'Dev', bio: 'Bio 1', photo: '/s1.jpg' },
    { id: 's2', name: 'Speaker Two', title: 'Architect', bio: 'Bio 2', photo: '/s2.jpg' }
  ]
}))

describe('SessionDetail', () => {
  it('displays session data correctly', () => {
    render(<SessionDetail />)
    
    expect(screen.getByText('Test Session')).toBeInTheDocument()
    expect(screen.getByText(/comprehensive session about testing/)).toBeInTheDocument()
  })
  
  it('displays all speakers', () => {
    render(<SessionDetail />)
    
    expect(screen.getByText('Speaker One')).toBeInTheDocument()
    expect(screen.getByText('Speaker Two')).toBeInTheDocument()
  })
  
  it('uses plural "Speakers" for multiple speakers', () => {
    render(<SessionDetail />)
    
    expect(screen.getByText('Speakers')).toBeInTheDocument()
  })
  
  it('uses singular "Speaker" for single speaker', () => {
    vi.mocked(getSpeakersBySessionId).mockReturnValue([
      { id: 's1', name: 'Speaker One', title: 'Dev', bio: 'Bio', photo: '/s1.jpg' }
    ])
    
    render(<SessionDetail />)
    
    expect(screen.getByText('Speaker')).toBeInTheDocument()
  })
  
  it('shows not found message for invalid session ID', () => {
    vi.mocked(getSessionById).mockReturnValue(undefined)
    
    render(<SessionDetail />)
    
    expect(screen.getByText('Session not found')).toBeInTheDocument()
  })
})
```

## Test Coverage Goals

- **Unit Tests:** 80%+ coverage for components
- **Integration Tests:** Data loading, navigation, speaker associations
- **E2E Tests:** Complete user flows including multi-speaker scenarios
