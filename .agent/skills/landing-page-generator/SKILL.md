---
name: SEO Landing Page Generator
description: Generate high-converting, SEO-optimized landing pages with structured data (Schema.org), modern UI (Tailwind CSS), and persuasive copy.
---

# SEO Landing Page Generator

Use this skill to create "How-to" or "Comparison" landing pages that rank high on Google and convert visitors into users.

## 🚀 Usage

When the user asks to generate a landing page, follow these steps:

1.  **Analyze Request**: Identify the `Primary Keyword`, `Pain Points`, `Solution`, and `Target Audience`.
2.  **Structure Content**: Use the "Trust -> Pain -> Solution" funnel.
3.  **Generate Code**: Produce a complete `page.tsx` file using Next.js App Router + Tailwind CSS.

## 📋 Standard Requirements (MUST FOLLOW)

### 1. SEO & Metadata
-   **Title Tag**: Must include Primary Keyword + Clickbait (e.g., "Free Guide", "2024 Update").
-   **Description**: < 160 chars, natural keyword integration.
-   **Canonical Link**: Always include `<link rel="canonical" href="..." />`.
-   **JSON-LD Schema**:
    -   `HowTo`: For step-by-step instructions.
    -   `FAQPage`: For Q&A section.
    -   **Inject** using `<script type="application/ld+json">` in the head.

### 2. UI/UX Design System
-   **Typography**: `prose-lg`, `leading-relaxed` for readability.
-   **Colors**: Use `slate-900` for text, `blue-600` for primary actions, `red-500/50` for pain points.
-   **Components**:
    -   **Hero**: Gradient text title (`text-transparent bg-clip-text`), breadcrumbs.
    -   **Cards**: `rounded-2xl`, `shadow-sm`, `hover:shadow-lg` transition.
    -   **Images**: Use `next/image` with `unoptimized={true}` (CRITICAL for screenshots) and `w-full h-auto`.
    -   **Comparison Table**: Highlight YOUR product column with a subtle background color.

### 3. Content Structure (The Funnel)
-   **Hero Section**: Hook the user with the main benefit.
-   **The Manual Way (Trust)**: Show the "official" method first (builds trust). Use numbered steps.
-   **The Pivot (Pain)**: Use an "Alert Box" style to highlight continuous pain points (e.g., "No batch download", "Slow").
-   **The Solution (Conversion)**: Introduce YOUR tool as the "Fast Way". Use checkmarks ✅.
-   **FAQ (SEO)**: 3-5 questions targeting long-tail keywords. Use `<details>` for accordion style.

## 📝 Template Structure

```tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CheckCircle, AlertTriangle, Download, HelpCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      {/* SEO Metadata */}
      <title>...</title>
      <meta name="description" content="..." />
      <link rel="canonical" href="..." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([...]) }} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
           {/* Content */}
        </section>

        {/* Trust Section (Manual Way) */}
        <section>
           {/* Steps with Images */}
        </section>

        {/* Pivot Section (Pain Points) */}
        <section>
           {/* Alert Box */}
        </section>

        {/* Solution Section (CTA) */}
        <section>
           {/* Comparison Table */}
        </section>

        {/* FAQ Section */}
        <section>
           {/* <details> Accordion */}
        </section>
      </main>
    </div>
  );
}
```
