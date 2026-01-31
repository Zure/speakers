# Zure Speakers & Sessions

A modern, responsive website showcasing Zure's expert speakers and their available sessions for events and conferences.

## Features

- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🎨 **Pure Black & White Design** - Bold, high-contrast aesthetic
- 🔍 **Session Search** - Client-side filtering to find sessions by keyword
- 🖼️ **Grayscale Image Effects** - Photos transition to color on hover
- 🌓 **Dark Mode Support** - Respects system dark mode preferences
- ⚡ **Static Generation** - Fast, SEO-friendly pages built with Next.js
- 🧪 **Tested** - Component tests with Vitest and React Testing Library

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (mono)
- **Testing**: Vitest + React Testing Library
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm test          # Watch mode
npm run test:run  # Run once
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout with AppShell
│   ├── page.tsx              # Home (Speakers Directory)
│   ├── sessions/
│   │   ├── page.tsx          # Sessions Catalog
│   │   └── [id]/page.tsx     # Session Detail
│   └── speakers/
│       └── [id]/page.tsx     # Speaker Profile
├── components/
│   ├── shell/                # Header, Footer, AppShell
│   ├── speakers/             # SpeakerCard, SpeakersGrid
│   ├── sessions/             # SessionCard, SessionsGrid (with search)
│   ├── profile/              # ProfileSessionCard, ProfileSessionsGrid
│   └── session-detail/       # SpeakerCard (horizontal layout)
├── lib/
│   ├── types.ts              # TypeScript types
│   └── data.ts               # Data loading utilities
├── data/
│   └── speakers.json         # Static speaker and session data
└── tests/                    # Vitest tests
```

## Pages

- **`/`** - Speakers Directory (homepage)
- **`/speakers/[id]`** - Individual speaker profile
- **`/sessions`** - Sessions catalog with search
- **`/sessions/[id]`** - Individual session detail

## Data Management

The site uses a single static JSON file (`data/speakers.json`) containing all speakers and sessions. Update this file to add/modify speakers and sessions.

### Update From Sessionize

Scrape the Sessionize speakers directory and generate a new JSON file (does not overwrite `data/speakers.json`):

```bash
npm run scrape:sessionize -- --in data/speakers.json --out data/speakers.json
```

## Design System

### Colors
- Pure black (`#000000`) and white (`#FFFFFF`)
- Neutral/zinc/slate for minimal grays

### Typography
- **Headings**: Space Grotesk (bold)
- **Body**: Inter (400, 600, 700)
- **Mono**: JetBrains Mono

### Effects
- Grayscale images → color on hover
- Shadow-lift hover effects
- 4px borders on speaker photos

## Contact

For bookings or inquiries, contact us at [info@zure.com](mailto:info@zure.com)

## License

© Zure. All rights reserved.
