# YTVidHub

## Project Overview
YouTube subtitle extraction and processing platform built with Next.js and Python backend.

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Backend**: Python (app.py)
- **Database**: Prisma
- **i18n**: next-intl (English, Spanish)

## Development Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure
- `src/app/[locale]/` - Internationalized pages
- `src/app/api/` - API routes
- `src/components/` - React components
- `src/i18n/` - i18n configuration
- `src/messages/` - Translation files
- `app.py` - Python backend
- `prisma/` - Database schema

## Key Features
- Bulk subtitle downloads from playlists
- Multiple formats: SRT, VTT, TXT, JSON
- AI-ready data preparation
- Multi-language support (100+ languages)

## Instructions for Claude
- Use TypeScript for all new code
- Follow existing component patterns in src/components
- Maintain i18n support when adding features
- Run `prisma generate` before building
