# Test Specifications: Speaker Profile

This document outlines the test cases for the Speaker Profile section.

## Component Tests

### ProfileSessionCard Component

**Test: Renders session data correctly**
- Given a session object
- When the component renders
- Then it displays the session title and abstract

**Test: Handles click event**
- Given a session card with onClick handler
- When the user clicks the card
- Then onClick is called with the session ID

**Test: Shows hover effects**
- Given a session card
- When the user hovers over it
- Then the title shows underline

## Page Tests

### Speaker Profile Page

**Test: Loads and displays speaker data**
- Given a speaker ID
- When the page loads
- Then it displays the speaker's photo, name, title, and bio

**Test: Displays speaker's sessions**
- Given a speaker with 3 sessions
- When the page loads
- Then it displays all 3 sessions in the grid

**Test: Empty sessions state**
- Given a speaker with no sessions
- When the page loads
- Then it displays "This speaker is currently developing new sessions..." message

**Test: Invalid speaker ID**
- Given an invalid speaker ID
- When the page loads
- Then it displays "Speaker not found" message or redirects to 404

**Test: Navigation to session**
- Given a speaker profile with sessions
- When a session card is clicked
- Then the user navigates to `/sessions/:id`

**Test: Book This Speaker button**
- Given a speaker profile
- When "Book This Speaker" button is clicked
- Then it scrolls to contact section or opens contact action

## Layout Tests

**Test: Responsive hero section**
- Given a speaker profile
- When viewed on mobile
- Then photo and info stack vertically
- When viewed on desktop
- Then photo and info are side-by-side

**Test: Bio formatting**
- Given a speaker with multi-paragraph bio
- When bio renders
- Then paragraphs are properly formatted with line breaks

**Test: Sessions grid responsive**
- Given a speaker with 6 sessions
- When viewed on mobile
- Then sessions display in 1 column
- When viewed on desktop
- Then sessions display in 2 columns

## User Flow Tests (E2E)

**User Flow: View speaker profile and session**
1. Navigate to speaker profile page
2. Verify speaker details are displayed
3. Scroll to sessions section
4. Click on a session
5. Verify navigation to session detail

**User Flow: Book speaker**
1. Navigate to speaker profile
2. Click "Book This Speaker" button
3. Verify scroll to contact section
4. Click contact button
5. Verify mailto link or contact form opens

**User Flow: Navigate from sessions list**
1. Load sessions catalog
2. Click on a speaker name in a session card
3. Verify speaker profile loads
4. Verify all speaker's sessions are displayed

## Edge Cases

**Test: Speaker not found**
- Given a non-existent speaker ID
- When page attempts to load
- Then 404 page or "Speaker not found" message displays

**Test: Speaker with no photo**
- Given a speaker with missing photo URL
- When profile renders
- Then it handles missing image gracefully

**Test: Speaker with very long bio**
- Given a speaker with 1000+ word bio
- When profile renders
- Then bio is readable and properly formatted

**Test: Speaker with special characters in name**
- Given a speaker with unicode characters in name
- When profile renders
- Then name displays correctly

**Test: Session with multiple co-presenters**
- Given a session co-presented with other speakers
- When displayed on profile
- Then it indicates co-presenters (optional feature)

## Accessibility Tests

**Test: Keyboard navigation**
- Given a speaker profile
- When using Tab key
- Then focus moves through sessions and buttons in logical order

**Test: Screen reader support**
- Given a speaker profile
- When using a screen reader
- Then name, title, bio, and sessions are announced properly

**Test: Alt text on photo**
- Given a speaker photo
- When page loads
- Then alt attribute contains speaker name

**Test: Heading hierarchy**
- Given a speaker profile
- When page renders
- Then headings follow proper hierarchy (h1 for name, h2 for sections)

## Performance Tests

**Test: Large bio text**
- Given a speaker with very long bio
- When page loads
- Then page renders quickly without layout shift

**Test: Many sessions**
- Given a speaker with 20+ sessions
- When page loads
- Then all sessions render without performance issues

## Data Integration Tests

**Test: Correct sessions filtered**
- Given a speaker ID
- When page loads
- Then only sessions where speaker is listed in speakerIds are displayed

**Test: Sessions from multiple speakers**
- Given a session with multiple speakers
- When viewing one speaker's profile
- Then that session appears on their profile

## Implementation Example (Vitest + React Testing Library)

```typescript
import { render, screen } from '@testing-library/react'
import { SpeakerProfile } from './SpeakerProfile'
import { describe, it, expect, vi } from 'vitest'

// Mock router
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 's1' }),
  useRouter: () => ({ push: vi.fn() })
}))

// Mock data functions
vi.mock('@/lib/data', () => ({
  getSpeakerById: (id: string) => ({
    id: 's1',
    name: 'John Doe',
    title: 'Senior Developer',
    bio: 'Experienced developer with 10+ years.',
    photo: '/john.jpg'
  }),
  getSessionsBySpeakerId: (id: string) => [
    { id: 'sess1', title: 'Session 1', abstract: 'Description 1' },
    { id: 'sess2', title: 'Session 2', abstract: 'Description 2' }
  ]
}))

describe('SpeakerProfile', () => {
  it('displays speaker data correctly', () => {
    render(<SpeakerProfile />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByText(/Experienced developer/)).toBeInTheDocument()
  })
  
  it('displays all sessions by speaker', () => {
    render(<SpeakerProfile />)
    
    expect(screen.getByText('Session 1')).toBeInTheDocument()
    expect(screen.getByText('Session 2')).toBeInTheDocument()
  })
  
  it('shows empty state when speaker has no sessions', () => {
    vi.mocked(getSessionsBySpeakerId).mockReturnValue([])
    
    render(<SpeakerProfile />)
    
    expect(screen.getByText(/currently developing new sessions/)).toBeInTheDocument()
  })
})
```

## Test Coverage Goals

- **Unit Tests:** 80%+ coverage for components
- **Integration Tests:** Data loading, navigation, empty states
- **E2E Tests:** Complete user flows
