# Milestone 1: Foundation

Set up the project with design system, routing, and base configuration.

## Goal

Create a new React project configured with Tailwind CSS v4, TypeScript, routing, and the Zure Speakers design system tokens.

## Prerequisites

- Node.js installed
- Package manager (npm, yarn, or pnpm)
- Code editor

## Steps

### 1. Initialize Project

Choose your framework and initialize:

**Option A: Next.js (App Router)**
```bash
npx create-next-app@latest zure-speakers --typescript --tailwind --app
cd zure-speakers
```

**Option B: Vite + React**
```bash
npm create vite@latest zure-speakers -- --template react-ts
cd zure-speakers
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Option C: Remix**
```bash
npx create-remix@latest zure-speakers
cd zure-speakers
```

### 2. Configure Tailwind CSS v4

**Important:** We use Tailwind CSS v4, which does not use `tailwind.config.js`.

Create or update your main CSS file (e.g., `src/app.css` or `src/index.css`):

```css
@import "tailwindcss";

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

@layer base {
  :root {
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  
  body {
    @apply font-body bg-white text-black dark:bg-black dark:text-white;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
```

If you need to configure font families in your framework's configuration (e.g., Tailwind config in v3 style), use:

```javascript
// Only if absolutely necessary for your framework
{
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
```

### 3. Set Up Dark Mode

Configure dark mode using the class strategy. In your root layout or app component:

```tsx
// Example for Next.js App Router (app/layout.tsx)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark"> {/* Add 'dark' class to enable dark mode */}
      <body>{children}</body>
    </html>
  )
}
```

Create a dark mode toggle component if desired (optional for MVP).

### 4. Set Up Routing

Configure routes based on your framework:

**Routes needed:**
- `/` or `/speakers` → Speakers Directory (homepage)
- `/sessions` → Sessions Catalog
- `/speakers/:id` → Speaker Profile
- `/sessions/:id` → Session Detail

**Next.js App Router:**
```
app/
├── page.tsx (Speakers Directory)
├── speakers/
│   └── [id]/
│       └── page.tsx (Speaker Profile)
├── sessions/
│   ├── page.tsx (Sessions Catalog)
│   └── [id]/
│       └── page.tsx (Session Detail)
```

**Vite + React Router:**
```tsx
// src/main.tsx or src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <SpeakersDirectory /> },
  { path: '/speakers/:id', element: <SpeakerProfile /> },
  { path: '/sessions', element: <SessionsCatalog /> },
  { path: '/sessions/:id', element: <SessionDetail /> },
])

function App() {
  return <RouterProvider router={router} />
}
```

### 5. Add Type Definitions

Copy the TypeScript types from `data-model/types.ts` into your project:

```bash
mkdir -p src/types
cp ../product-plan/data-model/types.ts src/types/
```

Or manually create `src/types/index.ts`:

```typescript
export interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  photo: string
}

export interface Session {
  id: string
  title: string
  abstract: string
  speakerIds: string[]
}
```

### 6. Add Sample Data

Copy sample data from `data-model/sample-data.json`:

```bash
mkdir -p src/data
cp ../product-plan/data-model/sample-data.json src/data/
```

Create data loading utilities in `src/lib/data.ts`:

```typescript
import speakersData from '../data/sample-data.json'
import type { Speaker, Session } from '../types'

export const speakers: Speaker[] = speakersData.speakers
export const sessions: Session[] = speakersData.sessions

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find(s => s.id === id)
}

export function getSessionById(id: string): Session | undefined {
  return sessions.find(s => s.id === id)
}

export function getSessionsBySpeakerId(speakerId: string): Session[] {
  return sessions.filter(s => s.speakerIds.includes(speakerId))
}

export function getSpeakersBySessionId(sessionId: string): Speaker[] {
  const session = getSessionById(sessionId)
  if (!session) return []
  return session.speakerIds.map(id => getSpeakerById(id)).filter(Boolean) as Speaker[]
}
```

### 7. Create Placeholder Pages

Create basic placeholder components for each route to verify routing works:

```tsx
// Example: src/app/page.tsx or src/pages/SpeakersDirectory.tsx
export default function SpeakersDirectory() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-heading font-bold">Speakers Directory</h1>
      <p className="mt-4">Coming soon...</p>
    </div>
  )
}
```

Repeat for:
- Sessions Catalog
- Speaker Profile (with ID param)
- Session Detail (with ID param)

## Validation Checklist

- [ ] Project builds without errors (`npm run dev` or equivalent)
- [ ] Tailwind CSS classes apply correctly (test with utility classes)
- [ ] Fonts load properly (inspect in browser DevTools)
- [ ] Dark mode toggles colors when class changes
- [ ] All routes are accessible (navigate to each URL)
- [ ] TypeScript types are recognized (no import errors)
- [ ] Sample data loads successfully (can import and use in components)

## Troubleshooting

**Fonts not loading:**
- Verify Google Fonts URLs in CSS
- Check network tab in DevTools
- Ensure CSS file is imported in app entry point

**Routing not working:**
- Check framework-specific routing setup
- Verify route paths match your configuration
- Test with browser navigation and direct URL access

**Dark mode not working:**
- Ensure `dark:` class is present on `<html>` element
- Test by adding `dark:bg-black dark:text-white` to a component

## Next Steps

Proceed to **Milestone 2: Application Shell** to build the header, footer, and layout.
