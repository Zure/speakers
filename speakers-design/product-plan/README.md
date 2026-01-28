# Zure Speakers & Sessions — Product Plan Export

This package contains everything you need to implement the **Zure Speakers & Sessions** website in your codebase.

## What's Inside

This export includes:

- **Product Overview** — Core description, problems solved, and key features
- **Ready-to-Use Prompts** — Copy/paste prompts for coding agents (one-shot or incremental)
- **Implementation Instructions** — Step-by-step guides for building each milestone
- **Design System** — Color palette and typography tokens
- **Data Model** — Entity definitions, TypeScript types, and sample data
- **Shell Components** — Navigation, header, footer, and layout
- **Section Components** — Complete UI components for all 4 sections
- **Test Instructions** — TDD specs for each section with user flows and edge cases

## Quick Start

### Option 1: One-Shot Implementation

Use this approach if you want to build the entire product in one session with a coding agent.

1. Copy the contents of `prompts/one-shot-prompt.md`
2. Paste it into your coding agent (Claude, OpenCode, Cursor, etc.)
3. Answer the clarifying questions about authentication, tech stack, etc.
4. The agent will implement the complete product following `instructions/one-shot-instructions.md`

### Option 2: Incremental Implementation

Use this approach to build the product milestone by milestone.

1. Start with `prompts/section-prompt.md` as a template
2. Follow the instructions in `instructions/incremental/` in order:
   - `01-foundation.md` — Project setup and design system
   - `02-shell.md` — Application shell and navigation
   - `03-speakers-directory.md` — Speakers browsing
   - `04-sessions-catalog.md` — Sessions browsing
   - `05-speaker-profile.md` — Individual speaker pages
   - `06-session-detail.md` — Individual session pages

Each milestone includes:
- Implementation instructions
- Test specifications (`tests.md`)
- Component exports and sample data

## Product Summary

**Zure Speakers & Sessions** is a public-facing, view-only website that showcases Zure's speakers and their sessions. It helps event organizers discover engaging speakers and topics for their events.

**Key Features:**
- Browse all Zure speakers with profiles and expertise
- Explore available sessions organized by topic or speaker
- View detailed speaker bios and session descriptions
- Contact Zure to book speakers for events

**Design:** Bold black and white aesthetic with pure contrast, Space Grotesk headings, and Inter body text.

## Implementation Notes

- **Framework Agnostic:** Components are React-based but can be adapted to Next.js, Remix, or any React framework
- **Props-Based:** All components accept data via props (no internal data fetching)
- **Mobile Responsive:** Full responsive design using Tailwind CSS v4
- **Light & Dark Mode:** Complete dark mode support with `dark:` variants
- **No Authentication:** Entire site is publicly accessible
- **Data Source:** All data comes from an external automation script (not managed in the UI)

## Tech Stack Recommendations

The prompts will ask you to specify:
- **Framework:** Next.js, Remix, Vite + React Router, etc.
- **Styling:** Tailwind CSS v4 (required)
- **Data Fetching:** Static data files, CMS, API, etc.
- **Testing:** Vitest, Jest, Playwright, etc.

## Questions or Issues?

This export was generated from Design OS, a product planning and design tool. The components and instructions here are meant to be integrated into your actual product codebase.

For questions about implementation, consult the detailed instructions in the `instructions/` directory.
