# Speaker Profile

## Purpose
Display a detailed profile for an individual speaker, including their full bio, credentials, and all sessions they can deliver. This page helps event organizers understand the speaker's expertise and find the right session for their event.

## User Stories
- As an event organizer, I want to see a speaker's full background and credentials so I can evaluate if they're the right fit for my event
- As an event organizer, I want to browse all sessions a speaker offers so I can find topics that match my event's theme
- As an event organizer, I want to contact the speaker about booking them for my event

## Components

### Hero Section
- **Large speaker photo**: Square format, max height 320px, bold 4px border, grayscale with color on hover
- **Speaker name**: Large bold heading (text-4xl md:text-5xl lg:text-6xl)
- **Title/Role**: Subtitle showing credentials and position
- **Contact CTA**: Bold button "Book This Speaker" (or similar) that scrolls to contact section

### Bio Section
- **Section heading**: "About" or "Background"
- **Full bio text**: Multi-paragraph format, readable line-height
- **Emphasis**: Use bold text for key credentials (MVP, MCT, etc.) if they appear in bio

### Sessions Section
- **Section heading**: "Sessions Available"
- **Session cards**: List of all sessions this speaker can deliver
  - Session title (bold, clickable to session detail)
  - Session abstract (truncated to 4 lines with "Read more..." link)
  - Tag if multi-speaker session: "Co-presented with [Other Speaker Names]"
- **Layout**: 1-2 column grid (same as Sessions Catalog)

### Contact Section
- **Section heading**: "Book This Speaker"
- **Call to action**: Email or contact info for Zure
- **Simple message**: "Interested in having [Speaker Name] at your event? Get in touch with us."
- **Contact button**: Links to email or contact form

## Design Requirements
- **Mobile responsive**: Stack all sections vertically on mobile, side-by-side where appropriate on larger screens
- **Light & dark mode**: Full dark mode support with inverted black/white
- **Bold black/white aesthetic**: Maintain pure contrast design
- **Grayscale images**: Speaker photo is grayscale by default, color on hover
- **Shadow-lift hover effects**: Apply to all interactive cards (4px offset)
- **Typography**: Space Grotesk for headings, Inter for body text

## Data Requirements
- **Speaker**: Full speaker object with id, name, title, bio, photo
- **Sessions**: Array of session objects where this speaker is listed in speakerIds
- **Co-speakers**: For multi-speaker sessions, include other speaker names

## Interactions
- **Click session title**: Navigate to session detail page
- **Click co-speaker name**: Navigate to that speaker's profile
- **Click "Book This Speaker" button**: Scroll to contact section or trigger contact action
- **Hover speaker photo**: Transition from grayscale to color

## Empty States
- **No sessions**: Display message "This speaker is currently developing new sessions. Check back soon or contact us for custom topics."

## Technical Notes
- Component accepts speaker data and sessions array via props
- No internal navigation in exportable components (parent handles routing)
- Session filtering happens in parent (pass only sessions for this speaker)
