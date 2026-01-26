# Test Specifications: Sessions Catalog

This document outlines the test cases for the Sessions Catalog section.

## Component Tests

### SessionCard Component

**Test: Renders session data correctly**
- Given a session with title, abstract, and speaker IDs
- When the component renders
- Then it displays the session title, abstract, and speaker info

**Test: Displays multiple speakers**
- Given a session with 2 speakers
- When the component renders
- Then it displays both speaker photos and names

**Test: Handles session click**
- Given a session card with onSessionClick handler
- When the user clicks the session area
- Then onSessionClick is called with the session ID

**Test: Handles speaker click**
- Given a session card with speakers
- When the user clicks a speaker name
- Then onSpeakerClick is called with the speaker ID
- And onSessionClick is NOT called (event stopped)

**Test: Shows hover effects**
- Given a session card
- When the user hovers over the title
- Then the title shows underline

### SessionsGrid Component

**Test: Renders multiple sessions**
- Given an array of 8 sessions
- When the grid renders
- Then it displays 8 session cards

**Test: Responsive layout**
- Given a grid of sessions
- When viewed at different screen sizes
- Then it shows 1 column on mobile, 2-3 on desktop

**Test: Empty state**
- Given an empty sessions array
- When the grid renders
- Then it displays "No sessions yet" message

**Test: Passes speakers to cards**
- Given sessions and speakers arrays
- When cards render
- Then each card receives the full speakers array for lookups

## Page Tests

### Sessions Catalog Page

**Test: Loads and displays sessions**
- Given sample session data
- When the page loads
- Then all sessions are displayed in the grid

**Test: Navigation to session detail**
- Given a sessions catalog page
- When a session card is clicked
- Then the user navigates to `/sessions/:id`

**Test: Navigation to speaker profile**
- Given a session with speakers
- When a speaker name is clicked
- Then the user navigates to `/speakers/:id`

**Test: Page title**
- Given the sessions catalog page
- When it renders
- Then it displays "Sessions" heading

## User Flow Tests (E2E)

**User Flow: Browse sessions and view detail**
1. Navigate to /sessions
2. Verify session cards are visible
3. Click on a session card
4. Verify navigation to session detail page
5. Verify session details are displayed

**User Flow: Navigate from session to speaker**
1. Load sessions catalog
2. Click on a speaker name in a session card
3. Verify navigation to speaker profile
4. Verify speaker details are displayed

**User Flow: Multiple speakers**
1. Find a session with multiple speakers
2. Verify all speakers are displayed
3. Click on second speaker
4. Verify correct speaker profile loads

## Edge Cases

**Test: No sessions data**
- Given no sessions in data source
- When page loads
- Then empty state message displays

**Test: Session with no speakers**
- Given a session with empty speakerIds array
- When card renders
- Then it displays session info without speaker section

**Test: Session with invalid speaker IDs**
- Given a session with speaker IDs that don't exist
- When card renders
- Then it handles missing speakers gracefully (skips or shows placeholder)

**Test: Very long session title**
- Given a session with a very long title
- When card renders
- Then title wraps appropriately

**Test: Very long abstract**
- Given a session with a very long abstract
- When card renders
- Then abstract displays fully or truncates with "Read more"

**Test: Speaker photo missing**
- Given a speaker with no photo URL
- When displayed in session card
- Then it handles missing image gracefully

## Accessibility Tests

**Test: Keyboard navigation**
- Given the sessions grid
- When using Tab key
- Then focus moves between session cards and speaker links

**Test: Screen reader support**
- Given a session card with speakers
- When using a screen reader
- Then session title, abstract, and speaker names are announced

**Test: Alt text on speaker photos**
- Given speaker photos in session cards
- When images load
- Then alt attributes contain speaker names

## Performance Tests

**Test: Large dataset**
- Given 50+ sessions
- When page loads
- Then page renders within acceptable time

**Test: Many speakers per session**
- Given sessions with 5+ speakers each
- When page loads
- Then all speakers render without performance issues

## Implementation Example (Vitest + React Testing Library)

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionCard } from './SessionCard'
import { describe, it, expect, vi } from 'vitest'

describe('SessionCard', () => {
  const mockSession = {
    id: '1',
    title: 'Test Session',
    abstract: 'Session description',
    speakerIds: ['s1', 's2']
  }
  
  const mockSpeakers = [
    { id: 's1', name: 'Speaker One', title: 'Dev', photo: '/s1.jpg', bio: 'Bio 1' },
    { id: 's2', name: 'Speaker Two', title: 'Architect', photo: '/s2.jpg', bio: 'Bio 2' }
  ]
  
  it('renders session data correctly', () => {
    render(
      <SessionCard
        session={mockSession}
        speakers={mockSpeakers}
        onSessionClick={() => {}}
        onSpeakerClick={() => {}}
      />
    )
    
    expect(screen.getByText('Test Session')).toBeInTheDocument()
    expect(screen.getByText('Session description')).toBeInTheDocument()
    expect(screen.getByText('Speaker One')).toBeInTheDocument()
    expect(screen.getByText('Speaker Two')).toBeInTheDocument()
  })
  
  it('handles session click', () => {
    const handleSessionClick = vi.fn()
    render(
      <SessionCard
        session={mockSession}
        speakers={mockSpeakers}
        onSessionClick={handleSessionClick}
        onSpeakerClick={() => {}}
      />
    )
    
    fireEvent.click(screen.getByText('Test Session'))
    
    expect(handleSessionClick).toHaveBeenCalledWith('1')
  })
  
  it('handles speaker click without triggering session click', () => {
    const handleSessionClick = vi.fn()
    const handleSpeakerClick = vi.fn()
    
    render(
      <SessionCard
        session={mockSession}
        speakers={mockSpeakers}
        onSessionClick={handleSessionClick}
        onSpeakerClick={handleSpeakerClick}
      />
    )
    
    fireEvent.click(screen.getByText('Speaker One'))
    
    expect(handleSpeakerClick).toHaveBeenCalledWith('s1')
    expect(handleSessionClick).not.toHaveBeenCalled()
  })
})
```

## Test Coverage Goals

- **Unit Tests:** 80%+ coverage for components
- **Integration Tests:** All user interactions (session click, speaker click)
- **E2E Tests:** Critical user flows
