# Brand Assets Integration Guide

**For:** CTO / Engineering team
**Assets location:** `/public/`

## Files Created

| File | Size | Purpose |
|---|---|---|
| `favicon.ico` | 16x16 + 32x32 | Browser tab icon (legacy format) |
| `favicon.svg` | Scalable | Modern browser favicon |
| `favicon-16x16.png` | 16x16 | Small favicon fallback |
| `favicon-32x32.png` | 32x32 | Standard favicon |
| `apple-touch-icon.png` | 180x180 | iOS home screen icon |
| `android-chrome-192x192.png` | 192x192 | Android home screen icon |
| `android-chrome-512x512.png` | 512x512 | Android splash screen icon |
| `site.webmanifest` | — | PWA manifest with icon refs |
| `og-default.png` | 1200x630 | Default Open Graph social image |
| `og-default.svg` | — | Source SVG for OG image |

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| Primary | `#6366f1` | Brand accent, theme-color, links |
| Primary dark | `#4f46e5` | Hover states |
| Primary light | `#818cf8` | Highlights |
| Background | `#0f172a` | Page background (dark theme) |
| Manifest background | `#0f172a` | Splash screen background |

## Next.js Integration

### Option A: App Router Metadata API (Recommended)

In `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AI World — The Complete History of Artificial Intelligence',
    template: '%s | AI World',
  },
  description: 'Explore the complete history of artificial intelligence from 1943 to today.',
  metadataBase: new URL('https://aiworld.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'AI World',
    locale: 'en_US',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AI World — The Complete History of Artificial Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.png'],
  },
  other: {
    'theme-color': '#6366f1',
  },
}
```

### Theme Color

Add to the `<head>` (or via metadata API):

```html
<meta name="theme-color" content="#6366f1" />
```

This colors the browser chrome on mobile (Android Chrome, Safari on iOS 15+).
