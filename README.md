# Evidence Request Preview App

A Next.js application for previewing and generating GitHub issues for VA evidence request improvements. Built with the [VA Design System](https://design.va.gov/).

## Prerequisites

- Node.js 22.17.0 (see `.nvmrc`)
- pnpm

## Getting Started

```bash
# Use correct Node version
nvm use

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3002 |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm sync` | Sync components from vets-website |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI**: [VA Design System](https://design.va.gov/) (component-library, css-library)
- **Styling**: Tailwind CSS, Sass
- **Language**: TypeScript
- **React**: React 19

## VA Design System Integration

This project uses the VA Design System for UI components and styling:

- `@department-of-veterans-affairs/component-library` - Web components and React bindings
- `@department-of-veterans-affairs/css-library` - CSS utilities and design tokens
- `@uswds/uswds` - USWDS fonts

Web components are initialized in `components/WebComponentsInit.tsx`.

## Project Structure

```
app/                  # Next.js App Router pages and layouts
components/           # React components
  form/              # Form input components
  preview/           # Preview display components
  ui/                # Shared UI components
hooks/               # Custom React hooks
lib/                 # Utilities and types
styles/              # SCSS stylesheets
vets-website-sync/   # Scripts to sync from vets-website
```

## Known Issues

- VA component library peer dependencies show warnings (library lists React 19 but sub-packages expect React 17) - components work correctly despite warnings
- Sass deprecation warnings from VA css-library are expected (upstream issue)
