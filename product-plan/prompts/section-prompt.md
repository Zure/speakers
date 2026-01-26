# Section Implementation Prompt Template

I need you to implement the **[SECTION NAME]** section for the Zure Speakers & Sessions website.

## Context

I'm building the Zure Speakers & Sessions website incrementally, one section at a time. I've already completed:

- [X] Foundation (project setup, design system, base configuration)
- [X] Application Shell (header, footer, navigation)
- [ ] *List which sections are complete and which are pending*

Now I need you to build the **[SECTION NAME]** section.

## What I'm Providing

I have a product plan export that includes:

- Section specification in `sections/[section-id]/spec.md`
- Sample data in `sections/[section-id]/data.json`
- TypeScript types in `sections/[section-id]/types.ts`
- Reference components (if available) in `sections/[section-id]/components/`
- Test specifications in `sections/[section-id]/tests.md`
- Implementation instructions in `instructions/incremental/[NN]-[section-id].md`

## What I Need From You

Please implement this section following the instructions in `instructions/incremental/[NN]-[section-id].md`.

This includes:

1. **Component Implementation**
   - Create all components specified in the section spec
   - Ensure components are props-based (no hardcoded data)
   - Use the design system tokens (colors and typography)
   - Implement mobile responsive layouts
   - Support light and dark mode

2. **Routing Integration**
   - Add the route to the application
   - Update navigation if needed
   - Handle navigation between sections

3. **Data Integration**
   - Load sample data from the provided JSON file
   - Pass data to components via props
   - Handle empty states

4. **Testing** (if applicable)
   - Implement tests based on `tests.md`
   - Cover user flows and edge cases

## Design Requirements

- **Mobile Responsive:** Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- **Light & Dark Mode:** Use `dark:` variants for all colors
- **Design Tokens:** 
  - Colors: neutral/zinc/slate palette (pure black and white)
  - Typography: Space Grotesk (headings), Inter (body), JetBrains Mono (mono)
- **Tailwind CSS v4:** No `tailwind.config.js`, use built-in utility classes only

## Questions?

If you need clarification on any aspect of the implementation, please ask before you start coding.

Ready to build the **[SECTION NAME]** section?
