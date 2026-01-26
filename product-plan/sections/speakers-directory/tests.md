# Test Specifications: Speakers Directory

This document outlines the test cases for the Speakers Directory section.

## Test Framework

Choose your testing framework based on project setup:
- **Unit/Integration:** Vitest, Jest, React Testing Library
- **E2E:** Playwright, Cypress

## Component Tests

### SpeakerCard Component

**Test: Renders speaker data correctly**
- Given a speaker object with name, title, and photo
- When the component renders
- Then it displays the speaker's photo, name, and title

**Test: Handles click event**
- Given a speaker card with an onClick handler
- When the user clicks the card
- Then the onClick handler is called with the speaker's ID

**Test: Shows hover effects**
- Given a speaker card
- When the user hovers over it
- Then the photo opacity changes and name shows underline

### SpeakersGrid Component

**Test: Renders multiple speakers**
- Given an array of 10 speakers
- When the grid renders
- Then it displays 10 speaker cards

**Test: Responsive layout**
- Given a grid of speakers
- When viewed at different screen sizes
- Then it shows 1 column on mobile, 2-3 on tablet, 3-4 on desktop

**Test: Empty state**
- Given an empty speakers array
- When the grid renders
- Then it displays "No speakers yet" message

**Test: Calls click handler**
- Given a grid with speakers and an onSpeakerClick handler
- When a speaker card is clicked
- Then onSpeakerClick is called with the correct speaker ID

## Page Tests

### Speakers Directory Page

**Test: Loads and displays speakers**
- Given sample speaker data
- When the page loads
- Then all speakers are displayed in the grid

**Test: Navigation on click**
- Given a speakers directory page
- When a speaker card is clicked
- Then the user navigates to `/speakers/:id`

**Test: Page title**
- Given the speakers directory page
- When it renders
- Then it displays "Speakers" heading

## User Flow Tests (E2E)

**User Flow: Browse speakers and view profile**
1. Navigate to homepage (speakers directory)
2. Verify speaker cards are visible
3. Click on a speaker card
4. Verify navigation to speaker profile page
5. Verify speaker details are displayed

**User Flow: Responsive behavior**
1. Load speakers directory
2. Resize to mobile width (375px)
3. Verify grid shows 1 column
4. Resize to desktop (1440px)
5. Verify grid shows 3-4 columns

## Edge Cases

**Test: No speakers data**
- Given no speakers in data source
- When page loads
- Then empty state message displays

**Test: Missing speaker photo**
- Given a speaker with no photo URL
- When card renders
- Then it handles missing image gracefully (alt text, placeholder)

**Test: Very long speaker name**
- Given a speaker with a very long name
- When card renders
- Then name wraps or truncates appropriately

**Test: Special characters in name**
- Given a speaker with special characters in name
- When card renders
- Then special characters display correctly

## Accessibility Tests

**Test: Keyboard navigation**
- Given the speakers grid
- When using Tab key
- Then focus moves between speaker cards

**Test: Screen reader support**
- Given a speaker card
- When using a screen reader
- Then speaker name and title are announced correctly

**Test: Alt text on images**
- Given speaker photos
- When images load
- Then alt attributes contain speaker names

## Performance Tests

**Test: Large dataset**
- Given 100+ speakers
- When page loads
- Then page renders within acceptable time (< 2 seconds)

**Test: Image loading**
- Given speakers with large photos
- When page loads
- Then images load progressively without blocking UI

## Implementation Example (Vitest + React Testing Library)

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { SpeakerCard } from './SpeakerCard'
import { describe, it, expect, vi } from 'vitest'

describe('SpeakerCard', () => {
  const mockSpeaker = {
    id: '1',
    name: 'John Doe',
    title: 'Senior Developer',
    photo: '/photo.jpg',
    bio: 'Bio text'
  }
  
  it('renders speaker data correctly', () => {
    render(<SpeakerCard speaker={mockSpeaker} onClick={() => {}} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/photo.jpg')
  })
  
  it('handles click event', () => {
    const handleClick = vi.fn()
    render(<SpeakerCard speaker={mockSpeaker} onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledWith('1')
  })
})
```

## Test Coverage Goals

- **Unit Tests:** 80%+ coverage for components
- **Integration Tests:** All user interactions
- **E2E Tests:** Critical user flows
