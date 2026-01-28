# Session Detail

## Purpose
Display the complete details of a single session, including the full abstract, description, format, and information about the speaker(s) who deliver it. This page helps event organizers understand the session content and decide if it's the right fit for their event.

## User Stories
- As an event organizer, I want to read the full session description so I can understand what the session covers
- As an event organizer, I want to see who delivers the session so I can learn about the speaker's expertise
- As an event organizer, I want to contact the speaker(s) about booking this session for my event

## Components

### Hero Section
- **Session title**: Large bold heading (text-4xl md:text-5xl lg:text-6xl)
- **Session format tags**: Pills/badges showing format (e.g., "Workshop", "Talk", "Hands-on Demo")
- **Duration**: If specified (e.g., "Full Day", "60 minutes", "90 minutes")

### Abstract Section
- **Section heading**: "Overview"
- **Full abstract**: Complete session description with proper formatting
- **Key topics**: Bullet list of main topics covered (if available)

### Speaker(s) Section
- **Section heading**: "Delivered By" or "Speaker(s)"
- **Speaker cards**: Horizontal card layout for each speaker
  - Square speaker photo (grayscale, color on hover)
  - Speaker name (bold, clickable to profile)
  - Speaker title/credentials
  - Short bio excerpt (2-3 lines)
- **Layout**: Stack vertically on mobile, side-by-side on larger screens if multiple speakers

### Learning Outcomes Section (Optional)
- **Section heading**: "What You'll Learn"
- **Bullet list**: Key takeaways and learning objectives

### Contact Section
- **Section heading**: "Book This Session"
- **Call to action**: Email or contact info for Zure
- **Simple message**: "Interested in having this session at your event? Get in touch with us."
- **Contact button**: Links to email or contact form
- **Speaker reference**: Include speaker name(s) in the message

## Design Requirements
- **Mobile responsive**: Stack all sections vertically on mobile, use columns where appropriate on larger screens
- **Light & dark mode**: Full dark mode support with inverted black/white
- **Bold black/white aesthetic**: Maintain pure contrast design
- **Grayscale images**: Speaker photos are grayscale by default, color on hover
- **Shadow-lift hover effects**: Apply to all interactive cards (4px offset)
- **Typography**: Space Grotesk for headings, Inter for body text

## Data Requirements
- **Session**: Full session object with id, title, abstract, format, duration
- **Speakers**: Array of full speaker objects who deliver this session
- **Learning outcomes**: Optional array of strings
- **Key topics**: Optional array of strings

## Interactions
- **Click speaker name or photo**: Navigate to that speaker's profile
- **Click "Book This Session" button**: Scroll to contact section or trigger contact action
- **Hover speaker photo**: Transition from grayscale to color

## Empty States
- Not applicable (session detail page requires a valid session)

## Technical Notes
- Component accepts session data and speakers array via props
- No internal navigation in exportable components (parent handles routing)
- Speaker data must be complete (not just IDs)
