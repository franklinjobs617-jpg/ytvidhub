---
name: YTVidHub Design System
description: Design tokens and editorial component patterns for the YTVidHub platform
version: 1.0.0

tokens:
  color:
    brand-50: { value: "#eff6ff" }
    brand-100: { value: "#dbeafe" }
    brand-200: { value: "#bfdbfe" }
    brand-300: { value: "#93c5fd" }
    brand-400: { value: "#60a5fa" }
    brand-500: { value: "#3b82f6" }
    brand-600: { value: "#2563eb" }
    brand-700: { value: "#1d4ed8" }
    text-primary: { value: "#0f172a" }
    text-secondary: { value: "#334155" }
    text-muted: { value: "#64748b" }
    text-on-dark: { value: "#f8fafc" }
    surface-page: { value: "#f8fafc" }
    surface-card: { value: "#ffffff" }
    surface-subtle: { value: "#f1f5f9" }
    border-default: { value: "#e2e8f0" }
    footer-bg: { value: "#0f172a" }

  typography:
    body: { font: "Cereal, Airbnb Cereal App, Circular Std, Avenir Next", size: "1rem", leading: "1.7" }
    heading: { font: "Zain, Space Grotesk, Inter", weight: 700 }
    heading-cjk: { font: "PingFang SC, Hiragino Sans GB, Noto Sans SC, Microsoft YaHei" }
    h1: { size: "clamp(2.1rem, 5.8vw, 3.75rem)", leading: 1.1, tracking: "-0.03em" }
    h2: { size: "clamp(1.55rem, 3.4vw, 2.5rem)", leading: 1.2, tracking: "-0.025em" }
    h3: { size: "clamp(1.2rem, 2.3vw, 1.6rem)", leading: 1.28, tracking: "-0.018em" }

  spacing:
    article-max-width: "48rem"
    editorial-max-width: "52rem"
    hub-max-width: "74rem"
    section-gap: "clamp(2.25rem, 6vw, 4rem)"
    page-padding: "clamp(1rem, 4vw, 1.5rem)"

  radius:
    card: "1rem"
    pill: "9999px"
    hero: "1.2rem"

  shadow:
    card: "0 18px 35px -34px rgba(15, 23, 42, 0.35)"
    hero: "0 28px 50px -38px rgba(15, 23, 42, 0.5)"
    card-hover: "0 24px 42px -30px rgba(15, 23, 42, 0.45)"

components:
  editorial-hub:
    description: Blog/Guide index page layout
    classes: editorial-hub, editorial-hub-inner, editorial-hub-hero, editorial-hub-kicker, editorial-hub-title, editorial-hub-subtitle
    pattern: Radial gradient background + centered hero + card grid

  editorial-page:
    description: Individual article page layout
    classes: editorial-page, editorial-main, article-shell, article-hero, article-section, article-kicker, article-h1, article-h2, article-body
    pattern: Card-style sections with borders, shadows, rounded corners

  editorial-card:
    description: Content card for index pages
    classes: editorial-card, editorial-card-media-wrap, editorial-card-tag, editorial-card-title, editorial-card-excerpt, editorial-card-foot
    pattern: Image + tag + title + excerpt + footer with hover elevation

  article-cta:
    description: Call-to-action button
    classes: article-cta
    pattern: Blue background, white text, rounded corners, hover darkening
---

# YTVidHub Design System

## Principles

1. **Content-first**: Typography and spacing prioritize readability over decoration
2. **Progressive disclosure**: Card grids on index pages, deep content in article sections
3. **Consistent rhythm**: Uniform section spacing, card padding, and border radius
4. **Accessible contrast**: Text colors meet WCAG AA against all surface colors

## Editorial Page Structure

### Index Pages (Blog/Guide)
```
.editorial-hub
  .editorial-hub-inner
    .editorial-hub-hero
      .editorial-hub-kicker     (category label)
      .editorial-hub-title      (page h1)
      .editorial-hub-subtitle   (description)
    EditorialCardList            (filtered card grid)
```

### Article Pages (Blog/Guide Posts)
```
.editorial-page.article-body
  .editorial-main
    header.article-shell.article-hero
      .article-kicker            (category label)
      h1.article-h1             (post title)
      p                          (subtitle/description)
      .article-meta             (reading time, date, author)
    article.article-shell.article-section  (repeat for each section)
      h2.article-h2             (section heading)
      content...
    EditorialToc                 (floating ToC, desktop only)
    UnifiedFaqSection            (FAQ accordion)
    EditorialRelatedArticles     (related content cards)
    section.article-cta-section  (dark CTA block)
```

## Color Usage

| Context | Background | Text | Accent |
|---------|-----------|------|--------|
| Page | surface-page | text-secondary | brand-600 |
| Card | surface-card | text-primary | brand-700 |
| Section (dark) | slate-900 | text-on-dark | brand-400 |
| Kicker | transparent | brand-700 | — |
| Link | transparent | brand-600 | brand-700 (hover) |
| Muted | transparent | text-muted | — |

## Typography Scale

- **H1**: serif stack, `clamp(2.1rem, 5.8vw, 3.75rem)`, weight 700, tight tracking
- **H2**: display stack, `clamp(1.55rem, 3.4vw, 2.5rem)`, weight 700
- **H3**: display stack, `clamp(1.2rem, 2.3vw, 1.6rem)`, weight 700
- **Body**: sans stack, `1rem` / `1.0625rem` in articles, leading 1.7-1.8
- **Kicker**: `0.8rem`, weight 650, uppercase, wide tracking
- **Caption/Meta**: `0.78rem`-`0.85rem`, weight 520, muted color

## Spacing Rhythm

- Section margin: `clamp(1.05rem, 3.2vw, 1.4rem)` in editorial-page mode
- Section padding: `clamp(1.05rem, 3vw, 1.45rem)` x `clamp(0.95rem, 2.8vw, 1.3rem)`
- Hero padding: `clamp(2rem, 5vw, 3rem)` x `clamp(1.1rem, 3.5vw, 2rem)`
- Card gap: `1.15rem` (mobile) / `1.25rem` (desktop)
