# Milestone 2: Application Shell

Build the persistent navigation and layout that wraps all sections.

## Goal

Create the Header, Footer, and AppShell components that provide consistent navigation and layout across all pages.

## Reference Files

- Specification: `product-plan/shell/spec.md`
- Components: `product-plan/shell/components/`

## Design Requirements

- Pure black and white aesthetic
- Fixed header at top
- Footer at bottom with contact CTA
- Mobile responsive with hamburger menu
- Dark mode support (inverted colors)

## Steps

### 1. Create Header Component

Create `src/components/Header.tsx` (or `src/shell/Header.tsx`):

```tsx
import Link from 'next/link' // or your framework's Link component

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white dark:bg-white dark:text-black border-b border-white dark:border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-heading font-bold hover:opacity-80 transition-opacity">
            Zure
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Speakers
            </Link>
            <Link href="/sessions" className="hover:opacity-80 transition-opacity">
              Sessions
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
```

**Optional:** Implement mobile menu with state:

```tsx
'use client' // if using Next.js App Router

import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // ... header code above
  
  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="md:hidden border-t border-white dark:border-black">
      <nav className="px-4 py-4 space-y-2">
        <Link href="/" className="block py-2 hover:opacity-80">
          Speakers
        </Link>
        <Link href="/sessions" className="block py-2 hover:opacity-80">
          Sessions
        </Link>
      </nav>
    </div>
  )}
}
```

### 2. Create Footer Component

Create `src/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="bg-black text-white dark:bg-white dark:text-black border-t border-white dark:border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Need a speaker for your event?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Contact us to book one of our expert speakers for your next event.
          </p>
          <a
            href="mailto:contact@zure.com"
            className="inline-block px-8 py-3 border-2 border-current font-heading font-bold hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </footer>
  )
}
```

### 3. Create AppShell Component

Create `src/components/AppShell.tsx`:

```tsx
import { Header } from './Header'
import { Footer } from './Footer'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white dark:bg-black">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

### 4. Integrate AppShell with Routing

**Next.js App Router:**

Update `app/layout.tsx`:

```tsx
import { AppShell } from '@/components/AppShell'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
```

**Vite + React Router:**

Update `src/App.tsx`:

```tsx
import { AppShell } from './components/AppShell'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  // ... your routes
])

function App() {
  return (
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  )
}
```

### 5. Style Adjustments

Ensure consistent spacing and typography throughout:

```css
/* In your main CSS file */
@layer base {
  body {
    @apply antialiased;
  }
}

@layer utilities {
  .shadow-lift {
    box-shadow: 4px 4px 0 0 currentColor;
  }
  
  .shadow-lift-hover:hover {
    box-shadow: 4px 4px 0 0 currentColor;
  }
}
```

## Validation Checklist

- [ ] Header displays on all pages with logo and navigation
- [ ] Footer displays on all pages with contact CTA
- [ ] Navigation links navigate to correct routes
- [ ] Mobile menu button appears on small screens (< 768px)
- [ ] Mobile menu opens/closes when clicked (if implemented)
- [ ] Dark mode inverts header/footer colors correctly
- [ ] Hover states work on navigation links and contact button
- [ ] Layout is responsive across screen sizes
- [ ] No layout shift or content overlap

## Testing

**Manual Testing:**

1. Navigate to each page and verify header/footer appear
2. Click navigation links and verify routing works
3. Resize browser to test responsive behavior
4. Toggle dark mode and verify color inversion
5. Test on actual mobile device if possible

## Troubleshooting

**Header not sticky:**
- Ensure `sticky top-0 z-50` classes are applied
- Check for conflicting CSS

**Navigation links not working:**
- Verify route paths match your routing configuration
- Check for JavaScript errors in console

**Mobile menu not appearing:**
- Test with browser DevTools responsive mode
- Verify `md:hidden` and `hidden md:flex` classes

## Next Steps

Proceed to **Milestone 3: Speakers Directory** to build the main speakers browsing page.
