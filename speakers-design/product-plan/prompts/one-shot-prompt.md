# One-Shot Implementation Prompt

I need you to implement the **Zure Speakers & Sessions** website based on the product plan export I'm providing.

## What I'm Providing

I have a complete product plan export that includes:

- Product overview and feature specifications
- Design system (colors and typography)
- Data model with TypeScript types and sample data
- Application shell components (header, footer, navigation)
- Four section components (Speakers Directory, Sessions Catalog, Speaker Profile, Session Detail)
- Detailed implementation instructions
- Test specifications for each section

## What I Need From You

Before you start implementing, please ask me the following clarifying questions:

### 1. Framework & Routing
- Which React framework should I use? (Next.js App Router, Next.js Pages Router, Remix, Vite + React Router, or something else?)
- Do you have a preference for file structure?

### 2. Data Management
- How should the data be loaded? (Static JSON files, CMS integration, API endpoints, or something else?)
- The product plan includes sample data—should I use that directly or set up a different data structure?

### 3. Styling & Design Tokens
- The design system specifies Tailwind CSS v4 with specific color palettes (neutral/zinc/slate) and typography (Space Grotesk, Inter, JetBrains Mono). Should I set these up as CSS custom properties or use Tailwind's built-in colors?
- Do you want me to include the Google Fonts imports automatically?

### 4. Testing
- What testing framework do you prefer? (Vitest, Jest, Playwright, Cypress, or none?)
- Each section has test specifications—should I implement these as unit tests, integration tests, or e2e tests?

### 5. Deployment & Build
- Do you have any specific build requirements?
- Should I set up any specific environment variables or configuration?

## After You Answer

Once you've answered these questions, I'll implement the complete product following the instructions in `instructions/one-shot-instructions.md`. This includes:

1. **Foundation** — Project setup, design system, and base configuration
2. **Application Shell** — Header, footer, navigation, and layout
3. **Speakers Directory** — Browse all speakers in a grid
4. **Sessions Catalog** — Browse all sessions in a grid
5. **Speaker Profile** — Individual speaker page with bio and sessions
6. **Session Detail** — Individual session page with full description and speakers

Each section will be built with:
- Mobile responsive design
- Light and dark mode support
- Props-based components (no hardcoded data)
- Test coverage (if testing is enabled)

## Files to Reference

All the necessary files are in the export package:

- `product-overview.md` — Product description
- `design-system/` — Color and typography tokens
- `data-model/` — Entity definitions, types, and sample data
- `shell/` — Shell components (Header, Footer, AppShell)
- `sections/` — All section components with tests
- `instructions/one-shot-instructions.md` — Complete implementation guide

Ready to answer my questions?
