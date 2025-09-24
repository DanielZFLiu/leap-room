# Leap Room

A lightweight room-visualizer prototype built with Next.js 15 and React 19. The app highlights a drag-enabled carousel for exploring sample interior spaces and a dynamic toolbar that swaps controls as you switch between the primary viewing mode and the carousel.

## Features

- Interactive toolbar with animated button transitions between "main" and "My Spaces" modes
- Drag-and-snap carousel that measures its layout on resize, supports pointer capture, and keeps the active slide centered
- Sample space catalog in `src/data/data.ts` with Unsplash imagery and descriptive metadata (`name`, `floor`, `wall`)
- CSS Module styling with shared variables defined in `src/app/globals.css`
- TypeScript with strict settings, path aliases (`@/*`), and iconography powered by `@phosphor-icons/react`

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, metadata, and global font setup
    page.tsx            # Home view toggling between image and carousel modes
    page.module.css     # Styles for the main canvas and hero image
    globals.css         # Global tokens (colors, fonts, resets)
  components/
    ToolBar.tsx         # Animated toolbar that reconciles button sets
    ToolBar.module.css  # Toolbar and button styling + fade animations
    Carousel.tsx        # Pointer-driven carousel with drag + snapping logic
    Carousel.module.css # Layout, caption, and "add new" button styles
  data/
    data.ts             # Sample `Space` type definition and image entries
```

Supporting configuration lives at the repository root (`tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, etc.).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (Turbopack enabled by default):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to explore the prototype.

### Available Scripts

- `npm run dev` – launch the Turbopack-powered development server
- `npm run build` – produce an optimized production build
- `npm run start` – serve the production build locally
- `npm run lint` – run ESLint using the flat config that extends Next.js defaults

## Usage Notes

- Click **My Spaces** in the toolbar to enter the carousel, then drag or use the action buttons in each slide’s caption.
- The carousel recalculates dimensions on window resize and via `ResizeObserver`, keeping slides centered regardless of viewport.
- The **Done** button exits back to the full-screen hero view that displays the currently selected space.

## Customization

- Update or replace sample content in `src/data/data.ts` to point at your own assets.
- Adjust shared theme tokens (colors, blur levels, typography) in `src/app/globals.css`.
- Extend the toolbar by injecting additional button configs into `mainViewButtons` or `carouselViewButtons` within `src/app/page.tsx`.

## Tooling

- ESLint (flat config) is pre-configured to ignore generated artifacts and align with Next.js guidance.
- TypeScript strict mode is enabled; the app relies on the `@/*` alias set in `tsconfig.json` for ergonomic imports.
- Next.js configuration (`next.config.ts`) currently uses defaults, leaving room for custom build/runtime tweaks as the prototype evolves.
