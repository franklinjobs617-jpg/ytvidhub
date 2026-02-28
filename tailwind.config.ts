import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-body), system-ui, sans-serif',
            lineHeight: '1.8',
            letterSpacing: '-0.01em',
            h1: { fontFamily: 'var(--font-display), sans-serif', letterSpacing: '-0.02em', lineHeight: '1.15' },
            h2: { fontFamily: 'var(--font-display), sans-serif', letterSpacing: '-0.02em', lineHeight: '1.25', marginTop: '2.5em' },
            h3: { fontFamily: 'var(--font-display), sans-serif', letterSpacing: '-0.01em', lineHeight: '1.35' },
            p: { marginTop: '1.25em', marginBottom: '1.25em' },
            a: { color: '#2563eb', textDecoration: 'none', fontWeight: '500', '&:hover': { textDecoration: 'underline' } },
            blockquote: { fontStyle: 'normal', borderLeftColor: '#3b82f6', borderLeftWidth: '3px' },
            code: { fontWeight: '500', fontSize: '0.875em' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;