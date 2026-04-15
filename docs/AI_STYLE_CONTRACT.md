# AI Style Contract (YTVidHub)

This document defines the non-negotiable style rules for AI-generated pages.
Goal: keep visual consistency across all blog, guide, and landing pages.

## 1) Typography Rules

- Body font: use project default body stack (Cereal + Inter fallback).
- Heading font:
  - Latin headings (English): display stack (`Zain` fallback + Space Grotesk).
  - CJK headings (Chinese/Japanese/Korean): CJK stack (`Noto Sans SC`/system CJK fonts).
- Do not hardcode random font families in page files.
- Follow this scale:
  - `h1`: `clamp(2.1rem, 5.8vw, 3.75rem)`
  - `h2`: `clamp(1.55rem, 3.4vw, 2.5rem)`
  - `h3`: `clamp(1.2rem, 2.3vw, 1.6rem)`
  - body line height: `1.7`

## 2) Color Rules

- Single brand hue: blue only.
- Use token variables from `src/app/globals.css`:
  - `--brand-100`, `--brand-400`, `--brand-500`, `--brand-600`, `--brand-700`
- Do not introduce purple/pink brand accents in new pages.
- Footer colors must use footer tokens:
  - `--footer-bg`, `--footer-border`, `--footer-text`, `--footer-muted`

## 3) Layout and Spacing Rules

- Use stable spacing rhythm:
  - section gap: `clamp(2.25rem, 6vw, 4rem)`
  - content max width: `48rem`
- Prefer reusable classes already defined in `globals.css`:
  - `.article-shell`
  - `.article-hero`
  - `.article-h1`
  - `.article-h2`
  - `.article-body`
  - `.article-section`
  - `.article-card`
  - `.article-cta`

## 4) Component Usage Rules

- Navigation active/primary states must use `--brand-600`.
- Primary buttons must use:
  - default: `--brand-600`
  - hover: `--brand-700`
- Markdown callouts, bullets, and code accents must use brand blue tokens.

## 5) Forbidden Patterns

- Hardcoded `text-violet-*`, `bg-violet-*`, `text-purple-*`, `bg-purple-*`.
- Per-page custom font declarations that bypass global font stacks.
- Random ad-hoc heading sizes inconsistent with the global scale.

## 6) AI Prompt Snippet (for content page generation)

Use this instruction whenever generating a new content page:

```txt
Generate a Next.js page that follows YTVidHub style contract.
Constraints:
- Use existing global typography and color tokens only.
- Keep content structure flexible, but use article utility classes:
  article-shell, article-hero, article-h1, article-h2, article-body, article-section, article-card, article-cta.
- Do not use violet/purple classes.
- Mobile-first spacing and readable typography are required.
```

## 7) Quick QA Checklist

- No violet/purple utility classes in changed files.
- Header/footer active and hover states use brand blue tokens.
- Chinese and English headings are both readable and visually balanced.
- Mobile widths (320/375/768) keep heading wraps and button tap areas usable.
