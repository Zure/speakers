# One-Shot Implementation Instructions

This guide provides complete step-by-step instructions for implementing the entire **Zure Speakers & Sessions** website in one session.

## Overview

You will build a public-facing, view-only website that showcases Zure's speakers and their sessions. The site helps event organizers discover speakers and topics for their events.

**Technology Stack:**
- React framework (Next.js, Remix, or Vite + React Router based on user preference)
- Tailwind CSS v4 for styling
- TypeScript for type safety
- Testing framework (based on user preference)

**Design System:**
- Colors: Pure black and white with neutral/zinc/slate for grays
- Typography: Space Grotesk (headings), Inter (body), JetBrains Mono (mono)
- Mobile responsive with full dark mode support

## Implementation Milestones

### Milestone 1: Foundation

**Goal:** Set up the project with design system, routing, and base configuration.

**Steps:**

1. **Initialize Project**
   - Create new React project using chosen framework
   - Install dependencies: `tailwindcss`, `@tailwindcss/typography` (if needed)
   - Set up TypeScript configuration

2. **Configure Tailwind CSS v4**
   - Create `src/app.css` (or equivalent) with:
     ```css
     @import "tailwindcss";
     ```
   - Import Google Fonts (Space Grotesk, Inter, JetBrains Mono)
   - Configure font families using CSS custom properties or Tailwind config
   - Set up dark mode (class-based strategy)

3. **Set Up Routing**
   - Configure routes for:
     - `/` or `/speakers` - Speakers Directory (homepage)
     - `/sessions` - Sessions Catalog
     - `/speakers/:id` - Speaker Profile
     - `/sessions/:id` - Session Detail
   - Set up layout/shell wrapper

4. **Add Sample Data**
   - Copy types from `data-model/types.ts`
   - Copy sample data from `data-model/sample-data.json`
   - Create data loading utilities

**Validation:**
- Project builds without errors
- Routing is functional (can navigate between routes)
- Tailwind CSS classes apply correctly
- Fonts load properly

---

### Milestone 2: Application Shell

**Goal:** Build the persistent navigation and layout that wraps all sections.

**Reference:** `shell/spec.md`, `shell/components/`

**Steps:**

1. **Create Header Component**
   - Zure logo on the left (links to homepage)
   - Main navigation on the right: "Speakers" and "Sessions"
   - Black background with white text
   - Mobile responsive with hamburger menu on small screens
   - Fixed positioning at top

2. **Create Footer Component**
   - Heading: "Need a speaker for your event?"
   - Brief description text
   - Contact button/link
   - Black background with white text
   - Matches header styling

3. **Create AppShell Component**
   - Combines Header and Footer
   - Renders children (page content) in between
   - Full-width main content area with white background
   - Dark mode variants (inverted colors)

4. **Integrate with Routing**
   - Wrap all routes with AppShell
   - Ensure navigation links work correctly
   - Test responsive behavior

**Validation:**
- Header and footer appear on all pages
- Navigation links work correctly
- Mobile menu functions on small screens
- Dark mode toggles header/footer colors appropriately

---

### Milestone 3: Speakers Directory

**Goal:** Implement the main speakers browsing page with a grid of speaker cards.

**Reference:** `sections/speakers-directory/spec.md`, `sections/speakers-directory/components/`

**Steps:**

1. **Create SpeakerCard Component**
   - Accepts speaker data via props: `{ id, name, title, photo }`
   - Displays:
     - Large square photo (grayscale by default, color on hover)
     - Name in bold
     - Title/role
   - Click handler navigates to speaker profile
   - Hover effects (shadow-lift, 4px offset)
   - Responsive sizing

2. **Create SpeakersGrid Component**
   - Accepts array of speakers via props
   - Responsive grid layout:
     - 1 column on mobile
     - 2 columns on tablet
     - 3-4 columns on desktop
   - Maps speakers to SpeakerCard components
   - Handles empty state: "No speakers yet"

3. **Create SpeakersDirectory Page**
   - Loads speaker data
   - Passes data to SpeakersGrid
   - Page title: "Speakers" or "Our Speakers"
   - Optional subtitle/description

4. **Add Routing**
   - Set as homepage (`/` or `/speakers`)
   - Ensure navigation links work

**Validation:**
- Speaker cards display correctly with photos, names, titles
- Grid is responsive across screen sizes
- Clicking a card navigates to speaker profile
- Hover effects work (grayscale to color, shadow-lift)
- Empty state displays when no speakers exist

**Tests to Implement:**
- See `sections/speakers-directory/tests.md`

---

### Milestone 4: Sessions Catalog

**Goal:** Implement the sessions browsing page with a grid of session cards.

**Reference:** `sections/sessions-catalog/spec.md`, `sections/sessions-catalog/components/`

**Steps:**

1. **Create SessionCard Component**
   - Accepts session data via props: `{ id, title, abstract, speakerIds }`
   - Accepts speakers array for lookups
   - Displays:
     - Session title (bold, prominent)
     - Brief abstract (truncated if too long)
     - Speaker names (clickable to profiles)
   - Click on card navigates to session detail
   - Hover effects (shadow-lift, 4px offset)

2. **Create SessionsGrid Component**
   - Accepts array of sessions and speakers via props
   - Responsive grid layout:
     - 1 column on mobile
     - 2-3 columns on desktop
   - Maps sessions to SessionCard components
   - Handles empty state: "No sessions yet"

3. **Create SessionsCatalog Page**
   - Loads session and speaker data
   - Passes data to SessionsGrid
   - Page title: "Sessions" or "Available Sessions"
   - Optional subtitle/description

4. **Add Routing**
   - Route: `/sessions`
   - Add to navigation
   - Ensure navigation works

**Validation:**
- Session cards display titles, abstracts, and speaker names
- Grid is responsive across screen sizes
- Clicking card navigates to session detail
- Clicking speaker name navigates to speaker profile
- Hover effects work
- Empty state displays when no sessions exist

**Tests to Implement:**
- See `sections/sessions-catalog/tests.md`

---

### Milestone 5: Speaker Profile

**Goal:** Implement the individual speaker detail page with bio and sessions list.

**Reference:** `sections/speaker-profile/spec.md`, `sections/speaker-profile/components/`

**Steps:**

1. **Create ProfileSessionCard Component**
   - Similar to SessionCard but optimized for profile view
   - Displays session title, abstract, co-presenters
   - Click navigates to session detail

2. **Create ProfileSessionsGrid Component**
   - Accepts sessions array for this speaker
   - Maps to ProfileSessionCard components
   - 1-2 column grid layout
   - Empty state: "This speaker is currently developing new sessions..."

3. **Create SpeakerProfile Page**
   - Accepts speaker ID from route params
   - Loads speaker data and their sessions
   - Layout sections:
     - **Hero:** Large photo (grayscale/color hover), name, title, "Book This Speaker" button
     - **Bio:** Full bio text with proper formatting
     - **Sessions:** Grid of sessions this speaker delivers
     - **Contact:** "Book This Speaker" section with CTA
   - Mobile responsive layout
   - Dark mode support

4. **Add Routing**
   - Route: `/speakers/:id`
   - Handle invalid IDs (404 or redirect)

**Validation:**
- Speaker photo, name, title, and bio display correctly
- Sessions grid shows all sessions by this speaker
- Clicking session navigates to session detail
- "Book This Speaker" button works (scroll or navigate)
- Photo transitions from grayscale to color on hover
- Responsive layout works on all screen sizes
- Empty state displays when speaker has no sessions

**Tests to Implement:**
- See `sections/speaker-profile/tests.md`

---

### Milestone 6: Session Detail

**Goal:** Implement the individual session detail page with full description and speakers.

**Reference:** `sections/session-detail/spec.md`, `sections/session-detail/components/`

**Steps:**

1. **Create SpeakerCard Component** (for session detail)
   - Horizontal card layout
   - Displays speaker photo (square, grayscale/color hover), name, title, bio excerpt
   - Click navigates to speaker profile
   - Responsive: stacks vertically on mobile

2. **Create SessionDetail Page**
   - Accepts session ID from route params
   - Loads session data and speaker data
   - Layout sections:
     - **Hero:** Session title, format tags, duration
     - **Abstract:** Full session description with formatting
     - **Speakers:** Speaker cards for all who deliver this session
     - **Contact:** "Book This Session" section with CTA
   - Mobile responsive layout
   - Dark mode support

3. **Add Routing**
   - Route: `/sessions/:id`
   - Handle invalid IDs (404 or redirect)

**Validation:**
- Session title, abstract, and metadata display correctly
- Speaker cards show all speakers for this session
- Clicking speaker navigates to their profile
- "Book This Session" button works
- Speaker photos transition from grayscale to color on hover
- Responsive layout works on all screen sizes

**Tests to Implement:**
- See `sections/session-detail/tests.md`

---

## Final Validation

After completing all milestones:

1. **Navigation Flow**
   - Navigate from Speakers Directory → Speaker Profile → Session Detail
   - Navigate from Sessions Catalog → Session Detail → Speaker Profile
   - All links and navigation work correctly

2. **Responsive Design**
   - Test on mobile (375px width)
   - Test on tablet (768px width)
   - Test on desktop (1440px width)
   - All layouts adapt appropriately

3. **Dark Mode**
   - Toggle dark mode on all pages
   - Verify all text is readable
   - Verify all colors invert correctly

4. **Empty States**
   - Test with empty data arrays
   - Verify empty state messages display

5. **Hover Effects**
   - All cards have hover effects
   - Photos transition grayscale to color
   - Shadow-lift effects work

6. **Performance**
   - Page loads quickly
   - No console errors
   - Images load efficiently

## Testing Strategy

Based on user's chosen testing framework:

- **Unit Tests:** Test individual components with various props
- **Integration Tests:** Test page-level components with data loading
- **E2E Tests:** Test complete user flows (browse → detail → back)

Reference the `tests.md` file in each section's directory for specific test cases.

## Deployment

1. Build the production bundle
2. Verify all routes work in production mode
3. Test on actual devices (mobile, tablet, desktop)
4. Deploy to hosting platform

## Notes

- All components are props-based (no internal data fetching)
- Use Tailwind CSS v4 utility classes only (no custom CSS)
- Follow the specifications in each section's `spec.md` file
- Reference the exported components in `sections/*/components/` for implementation patterns
- The sample data in `data-model/sample-data.json` should be used for development and testing
