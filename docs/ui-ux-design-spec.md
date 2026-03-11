# AI Timeline — UI/UX Design Specification

**Prepared by:** CTO
**Date:** 2026-03-11
**Implements:** ACM-4 (UI/UX Designs), feeds ACM-7 (Front End Redesign)

---

## 1. Design Vision

**"Entering the Matrix of AI History"** — A cinematic, dark, data-driven single-page experience that tells the story of AI from 1943 to 2026. The user scrolls through time, and the page transforms around them.

### Core Principles
- **Immersive first** — every interaction should feel like exploring a living data visualization
- **Scroll IS navigation** — no traditional nav; the scroll drives the entire experience
- **Information on demand** — clean at a glance, rich on interaction (hover/click)
- **Performance-conscious 3D** — graceful degradation on mobile/low-power devices

---

## 2. Color System

| Token | Value | Usage |
|---|---|---|
| `--bg-void` | `#030712` | Deep space background |
| `--bg-surface` | `#0f172a` | Card/panel backgrounds |
| `--bg-elevated` | `#1e293b` | Hover states, modals |
| `--accent-primary` | `#6366f1` | Brand accent, CTAs |
| `--accent-glow` | `#818cf8` | Neon glow effects |
| `--accent-cyan` | `#22d3ee` | Data highlights, connections |
| `--accent-emerald` | `#34d399` | Positive impact indicators |
| `--accent-amber` | `#fbbf24` | Warning, high-impact markers |
| `--text-primary` | `#f1f5f9` | Body text |
| `--text-muted` | `#94a3b8` | Secondary text |
| `--text-dim` | `#475569` | Tertiary text |

### Era-Specific Color Coding
Each era gets a distinct accent color that tints the entire section as the user scrolls through it. These are already defined in `src/data/timeline.ts` era colors.

---

## 3. Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Hero title | Inter or Space Grotesk | 72–96px | 800 |
| Section title | Inter | 48px | 700 |
| Era name | Inter | 36px | 700 |
| Milestone title | Inter | 24px | 600 |
| Body | Inter | 16px | 400 |
| Year labels | JetBrains Mono | 14px | 500 |
| Tags/badges | Inter | 12px | 500 |

---

## 4. Page Structure (Single-Page Scroll Flow)

### 4.1 Entry Experience (0vh–100vh)
**Goal:** Jaw-dropping first impression

- Full-viewport 3D scene: Matrix-style digital rain (green/cyan particles falling) or a neural network visualization using Three.js/R3F
- Title "AI Timeline" emerges from the particle field, large and luminous
- Subtitle fades in: "The Complete History of Artificial Intelligence"
- Stats ribbon: "80+ milestones · 11 eras · 1943–2026"
- Scroll indicator: animated chevron/arrow pulsing downward
- On scroll-down, particles transition from random rain → organized timeline axis

### 4.2 Timeline Navigator (100vh–200vh)
**Goal:** Orient the user in time

- Horizontal minimap bar (sticky at top after scrolling past hero) showing all 11 eras as colored segments
- Current era highlighted with glow effect
- Clickable to jump between eras
- Shows year labels at key breakpoints (1950, 1970, 1990, 2010, 2026)

### 4.3 Era Chapters (scrolling sections, ~150vh each)
**Goal:** Each era is a visual chapter

For each of the 11 eras:
- **Era intro card**: Full-width section with era name, date range, description
  - Background tint shifts to era's color
  - Parallax layer with subtle floating particles/icons
- **Milestone cards** within the era:
  - Appear sequentially as user scrolls (staggered fade-in)
  - Left-aligned timeline spine with year markers
  - Each card shows: year, title, impact stars, description preview
  - **Hover state**: Card expands slightly, shows full description + key people
  - **Click**: Opens modal/drawer with full milestone detail (or navigates to `/timeline/[slug]`)
- **Landmark milestones (impact 5)** get special treatment:
  - Larger card size (2x)
  - Glowing border animation
  - Optional: full-width "breakout" moment with large typography

### 4.4 Impact Visualization
**Goal:** Show magnitude of change

- Impact level (1–5 stars) rendered as a visual intensity indicator:
  - Impact 1–2: Subtle, small card
  - Impact 3: Standard card
  - Impact 4: Emphasized card with accent border
  - Impact 5: Full-width breakout with glow effects
- Optional: vertical "impact magnitude" bar alongside the timeline that spikes at landmark moments

### 4.5 Connections & Internal Linking
**Goal:** Show relationships between milestones

- Subtle animated lines connecting related milestones (same category/tags)
- Visible on hover over a milestone card
- Category badges as clickable filters

### 4.6 Footer / End State
**Goal:** Satisfying conclusion + CTA

- "The story continues..." message
- Current date marker
- Category summary: counts per category
- Link to full timeline index (for SEO crawlers)

---

## 5. Interaction Design

### Scroll Behavior
- GSAP ScrollTrigger or Framer Motion scroll-linked animations
- Smooth, 60fps parallax and fade transitions
- Each era section triggers on scroll-enter:
  1. Background color tint transition
  2. Era title reveal animation
  3. Milestone cards stagger in

### Hover States
- Cards: subtle lift (translateY -2px), border glow, slight scale
- Timeline points: expand + tooltip with date detail
- Navigation minimap: era segment highlights

### Mobile Adaptations
- 3D hero: reduced to 2D particle animation or static gradient
- Timeline: vertical single-column layout
- Milestone cards: full-width, tap to expand
- Minimap: horizontal scrollable bar at top
- All GSAP animations: simplified or disabled via `prefers-reduced-motion`

---

## 6. Animation Specifications

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| Hero particles | Page load | Fade in + animate | 2s | ease-out |
| Hero title | Load + 0.5s | Scale 0.8→1, opacity 0→1 | 1s | ease-out |
| Era transition | Scroll enter | Background color tint | 0.6s | ease-in-out |
| Era title | Scroll enter | Slide up + fade | 0.5s | ease-out |
| Milestone card | Scroll enter | Slide up + fade, staggered 0.1s each | 0.4s | ease-out |
| Landmark breakout | Scroll enter | Scale + glow | 0.8s | spring |
| Connection lines | Hover | Draw SVG path | 0.3s | ease-out |

---

## 7. Tech Stack for Implementation

| Tool | Purpose |
|---|---|
| **Three.js / React Three Fiber** | Hero 3D scene, neural network viz |
| **GSAP + ScrollTrigger** | Scroll-linked animations, parallax |
| **Framer Motion** | Component enter/exit, hover states |
| **TailwindCSS** | Utility styling, responsive |
| **next/font** | Font loading (Inter, JetBrains Mono) |

### Performance Budget
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- 3D scene: lazy-loaded, renders only when visible
- Images: `next/image` with lazy loading
- Fonts: preloaded, display=swap

---

## 8. Component Hierarchy

```
<App>
  <HeroScene />           ← Three.js 3D entry
  <TimelineNavigator />   ← Sticky minimap bar
  <EraSection>            ← Repeated per era
    <EraIntro />
    <MilestoneCard />     ← Repeated per milestone
    <LandmarkBreakout />  ← Impact 5 milestones
  </EraSection>
  <Footer />
</App>
```

---

## 9. Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| < 640px (mobile) | Single column, no 3D, simplified animations |
| 640–1024px (tablet) | Two-column grid for milestones, reduced 3D |
| > 1024px (desktop) | Full experience with 3D, parallax, multi-column |

---

## 10. Accessibility

- `prefers-reduced-motion`: disable all scroll animations, show static layout
- `prefers-color-scheme`: dark only (matches brand), but ensure WCAG AA contrast
- Semantic HTML: proper heading hierarchy (h1→h2→h3), landmark roles
- Keyboard navigation: all interactive elements focusable
- Screen reader: aria-labels on 3D canvas, alt text on all visual elements
