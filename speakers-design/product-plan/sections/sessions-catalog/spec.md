# Sessions Catalog

## Overview

The Sessions Catalog is the main page for browsing all available sessions that Zure speakers can deliver at events. It provides a comprehensive view of topics, formats, and session content to help event organizers find the perfect talk for their event.

## Purpose

Help event organizers and companies:
- Discover all available sessions at a glance
- Browse sessions by title and abstract
- See which speakers deliver each session
- Quickly access individual session detail pages

## User Experience

### Layout
- **Grid of Session Cards**: Responsive grid displaying all sessions
- **Session Card Contents**:
  - Session title (bold, prominent)
  - Brief abstract/description
  - Speaker name(s) who deliver the session
  - Click anywhere on card to view full session details

### Interactions
- Click on any session card to navigate to the full session detail page
- Click on speaker name to navigate to their profile
- Hover states for visual feedback
- Mobile responsive: Grid adjusts from 2-3 columns on desktop to 1 on mobile

## Content Requirements

### Each Session Card Shows:
1. **Title** - Session title
2. **Abstract** - Brief description (truncated if too long)
3. **Speakers** - Name(s) of speaker(s) who deliver this session

### Visual Design
- Bold, high-contrast cards with clean borders
- Black text on white cards for maximum readability
- Generous white space around each card
- Clear hierarchy: Title > Abstract > Speakers

## No Search/Filter (for now)

Keep it simple - just a browsable grid. Future versions could add search and filtering by topic or format.

## States

### Default State
- Grid of all sessions, sorted by title or featured status

### Empty State
- If no sessions exist: "No sessions yet" message

### Hover State
- Card slightly elevates or border becomes bolder
- Cursor changes to pointer indicating clickability

## Success Criteria

- Event organizers can quickly scan all available sessions
- Session titles and topics are immediately clear
- Easy navigation to full session details
- Speaker attribution is visible for each session
