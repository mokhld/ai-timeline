# AI World — SEO Strategy & On-Page Optimization Plan

**Prepared by:** CMO
**Date:** 2026-03-11
**Status:** Ready for engineering implementation

---

## 1. Keyword Research

### 1.1 Primary Keywords (Head Terms)

| Keyword | Est. Monthly Volume | Intent | Target Page |
|---|---|---|---|
| history of artificial intelligence | 12,000+ | Informational | Home / Timeline |
| AI timeline | 5,000+ | Informational | Timeline index |
| artificial intelligence milestones | 2,000+ | Informational | Timeline index |
| AI developments | 3,000+ | Informational | Timeline index |
| evolution of AI | 4,000+ | Informational | Home / Timeline |

### 1.2 Long-Tail Keywords (Programmatic Targets)

These follow repeatable patterns mapped to the timeline data structure:

**By era:**
- "birth of artificial intelligence 1956"
- "first AI winter 1970s"
- "deep learning breakthrough 2012"
- "generative AI revolution 2022"
- "agentic AI era 2025"

**By milestone/event:**
- "when was [milestone] released" (e.g., "when was ChatGPT released")
- "[milestone] impact on AI" (e.g., "AlphaGo impact on AI")
- "history of [technology]" (e.g., "history of neural networks")

**By category:**
- "AI research breakthroughs timeline"
- "AI product launches history"
- "AI regulation history"
- "open source AI history"
- "AI competitions and benchmarks"

**By person/org:**
- "[person] contributions to AI" (e.g., "Alan Turing contributions to AI")
- "[organization] AI history" (e.g., "OpenAI history")

### 1.3 Keyword Mapping to Page Types

| Page Type | Primary Keywords | Secondary Keywords |
|---|---|---|
| **Home** | history of AI, AI timeline, evolution of artificial intelligence | AI milestones, AI developments tracker |
| **Era page** (`/era/[era-id]`) | [era name] AI, AI [decade], [era name] artificial intelligence | key events, breakthroughs, impact |
| **Milestone page** (`/timeline/[id]`) | [milestone title], [milestone] AI history, [milestone] [year] | impact, significance, people involved |
| **Category page** (`/category/[cat]`) | AI [category] history, [category] in artificial intelligence | timeline, breakthroughs, milestones |
| **Person/Org page** (`/people/[slug]`) | [person] AI, [person] artificial intelligence contributions | biography, milestones, impact |
| **About** | about AI World, AI history website | mission, methodology |

---

## 2. Meta Tag Templates

### 2.1 Title Tag Patterns

Consistent format: `{Page-Specific Title} | AI World`

| Page Type | Title Pattern | Example |
|---|---|---|
| **Home** | `AI World — The Complete History of Artificial Intelligence` | — |
| **Era** | `{Era Name} ({yearStart}–{yearEnd}) — AI History \| AI World` | `The Transformer Era (2018–2021) — AI History \| AI World` |
| **Milestone** | `{Title} ({Year}) — AI Timeline \| AI World` | `GPT-3 Release (2020) — AI Timeline \| AI World` |
| **Category** | `{Category} in AI History — Timeline & Milestones \| AI World` | `Research Breakthroughs in AI History — Timeline & Milestones \| AI World` |
| **Person/Org** | `{Name} — Contributions to AI \| AI World` | `Geoffrey Hinton — Contributions to AI \| AI World` |
| **About** | `About AI World — Tracking the Evolution of Artificial Intelligence` | — |

**Rules:**
- Keep titles under 60 characters where possible
- Front-load the unique keyword (milestone name, era name)
- Always include "AI" or "Artificial Intelligence" for relevance
- Brand suffix: `| AI World` (or `— AI World` for home)

### 2.2 Meta Description Patterns

| Page Type | Description Pattern | Max Length |
|---|---|---|
| **Home** | `Explore the complete history of artificial intelligence from {earliest year} to today. {total count} milestones across {era count} eras — research breakthroughs, product launches, and cultural moments that shaped AI.` | 155 chars |
| **Era** | `Discover the {era name} era of AI ({yearStart}–{yearEnd}). {milestone count} key milestones including {top 2-3 milestone names}. Learn how this period shaped artificial intelligence.` | 155 chars |
| **Milestone** | `{description — first 120 chars}. Learn about the impact of {title} on the history of artificial intelligence.` | 155 chars |
| **Category** | `Explore {count} {category} milestones in AI history. From {earliest} to {latest}, track every major {category} that shaped artificial intelligence.` | 155 chars |

**Rules:**
- Always under 160 characters
- Include primary keyword naturally
- Include a number (milestone count, year range) for click-through appeal
- End with a call to discovery ("Explore", "Discover", "Learn")

---

## 3. Open Graph & Twitter Card Specifications

### 3.1 Default OG Tags (all pages)

```html
<meta property="og:site_name" content="AI World" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
```

### 3.2 Per-Page OG Tags

| Tag | Home | Era | Milestone | Category |
|---|---|---|---|---|
| `og:title` | Same as title tag | Same as title tag | Same as title tag | Same as title tag |
| `og:description` | Same as meta description | Same as meta description | Same as meta description | Same as meta description |
| `og:image` | `/og/home.png` | `/og/era/{era-id}.png` | `/og/milestone/{id}.png` | `/og/category/{cat}.png` |
| `og:url` | Canonical URL | Canonical URL | Canonical URL | Canonical URL |
| `og:type` | `website` | `article` | `article` | `website` |

### 3.3 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@aiworld" />
<meta name="twitter:title" content="{og:title}" />
<meta name="twitter:description" content="{og:description}" />
<meta name="twitter:image" content="{og:image}" />
```

### 3.4 OG Image Specifications

| Asset | Dimensions | Format | Notes |
|---|---|---|---|
| **Default OG image** | 1200×630px | PNG | Used as fallback for all pages |
| **Per-era OG images** | 1200×630px | PNG | Era name + date range + visual style matching era color |
| **Per-milestone OG images** | 1200×630px | PNG | Can be auto-generated from title + year + category badge |
| **Category OG images** | 1200×630px | PNG | Category icon + milestone count |

**Auto-generation recommendation:** Use Next.js `ImageResponse` (from `next/og`) to dynamically generate OG images from milestone data. This ensures every page gets a unique, SEO-optimized social image without manual design work.

---

## 4. Content Structure Recommendations

### 4.1 Heading Hierarchy

#### Home Page
```
H1: The Complete History of Artificial Intelligence
  H2: [Era Name] (yearStart–yearEnd)     ← one per era
    H3: [Milestone Title] (year)          ← top milestones per era
```

#### Era Page (`/era/[era-id]`)
```
H1: [Era Name]: [Era Description Tagline]
  H2: Overview                            ← era description
  H2: Key Milestones                      ← milestone listing
    H3: [Milestone Title] (year)          ← individual milestone
  H2: Key People & Organizations
  H2: Legacy & Impact
```

#### Milestone Page (`/timeline/[id]`)
```
H1: [Milestone Title]
  H2: What Happened                       ← description
  H2: Why It Mattered                     ← impact
  H2: Key People                          ← people[]
  H2: Related Milestones                  ← internal links
```

#### Category Page (`/category/[cat]`)
```
H1: [Category Name] in AI History
  H2: [Era Name]                          ← group by era
    H3: [Milestone Title] (year)
```

### 4.2 Semantic HTML Guidelines

```html
<!-- Milestone page example -->
<article itemscope>
  <header>
    <h1>{title}</h1>
    <time datetime="{year}-{month}-{day}">{formatted date}</time>
    <span class="category">{category}</span>
    <span class="impact-level" aria-label="Impact: {impactLevel}/5">
      {impactLevel visual}
    </span>
  </header>

  <section aria-labelledby="what-happened">
    <h2 id="what-happened">What Happened</h2>
    <p>{description}</p>
  </section>

  <section aria-labelledby="impact">
    <h2 id="impact">Why It Mattered</h2>
    <p>{impact}</p>
  </section>

  <aside aria-labelledby="people">
    <h2 id="people">Key People</h2>
    <ul>{people links}</ul>
  </aside>

  <nav aria-labelledby="related">
    <h2 id="related">Related Milestones</h2>
    <ul>{related milestone links}</ul>
  </nav>
</article>
```

**Key rules:**
- One `<h1>` per page — always the primary content title
- Use `<article>` for milestone entries
- Use `<time>` elements with `datetime` attribute for all dates
- Use `<nav>` for related links / internal navigation sections
- Use `aria-labelledby` for screen reader accessibility
- Use `<aside>` for supplementary content (people, tags)

---

## 5. Internal Linking Strategy

### 5.1 Automatic Cross-References

Every milestone page should link to related milestones. Determine relatedness by:

1. **Same era** — link to other milestones in the same era (chronological neighbors)
2. **Same category** — link to milestones of the same category across eras
3. **Same people/organizations** — link to other milestones involving the same people or orgs
4. **Same tags** — link to milestones sharing tags
5. **Impact chain** — manually curate "led to" / "built upon" connections where obvious

### 5.2 Link Placement

| Location | Links To | Purpose |
|---|---|---|
| **Milestone page → Related section** | 3–5 related milestones | Deep topical linking |
| **Milestone page → Breadcrumb** | Home → Era → Milestone | Navigation + schema |
| **Era page → Milestone cards** | All milestones in that era | Category index |
| **Category page → Milestone cards** | All milestones in that category | Category index |
| **Home page → Era sections** | Era pages | Top-level navigation |
| **Person/Org mentions** | Person/Org aggregate page | Entity linking |
| **Footer** | All era pages, all category pages | Site-wide crawlability |

### 5.3 Anchor Text Guidelines

- Use descriptive anchor text, not "click here" or "read more"
- Include the milestone name or era name in the link text
- Vary anchor text slightly across pages to avoid over-optimization
- Example: `<a href="/timeline/gpt-3">GPT-3's release in 2020</a>` rather than `<a href="/timeline/gpt-3">click here</a>`

### 5.4 Breadcrumb Structure

```
Home > [Era Name] > [Milestone Title]
Home > [Category Name] > [Milestone Title]
Home > [Person/Org Name]
```

Implement as a `<nav aria-label="Breadcrumb">` with `BreadcrumbList` JSON-LD (see Section 6).

---

## 6. Structured Data Specifications (JSON-LD)

### 6.1 WebSite Schema (Home page only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AI World",
  "url": "https://aiworld.com",
  "description": "The complete history of artificial intelligence from 1943 to today.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aiworld.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 6.2 Article Schema (Every milestone page)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{milestone.title}",
  "description": "{milestone.description}",
  "datePublished": "{milestone.year}-{milestone.month || '01'}-{milestone.day || '01'}",
  "author": {
    "@type": "Organization",
    "name": "AI World"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AI World",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aiworld.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://aiworld.com/timeline/{milestone.id}"
  },
  "about": {
    "@type": "Event",
    "name": "{milestone.title}",
    "startDate": "{milestone.year}",
    "description": "{milestone.impact}",
    "organizer": [
      {
        "@type": "Organization",
        "name": "{milestone.organizations[0]}"
      }
    ]
  },
  "keywords": "{milestone.tags.join(', ')}"
}
```

### 6.3 BreadcrumbList Schema (All pages except home)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://aiworld.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{era.name}",
      "item": "https://aiworld.com/era/{era.id}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{milestone.title}",
      "item": "https://aiworld.com/timeline/{milestone.id}"
    }
  ]
}
```

### 6.4 ItemList Schema (Era & Category index pages)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "{era.name} — AI Milestones",
  "description": "{era.description}",
  "numberOfItems": "{milestones.length}",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "{milestone.title}",
      "url": "https://aiworld.com/timeline/{milestone.id}"
    }
  ]
}
```

### 6.5 Person Schema (Person aggregate pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{person.name}",
  "description": "Contributions to artificial intelligence",
  "knowsAbout": ["Artificial Intelligence", "{related tags}"],
  "sameAs": []
}
```

### 6.6 Implementation Notes

- Render JSON-LD server-side inside `<script type="application/ld+json">` in Next.js `generateMetadata` or layout head
- Each page can have multiple JSON-LD blocks (e.g., Article + BreadcrumbList on a milestone page)
- Test all schemas with [Google Rich Results Test](https://search.google.com/test/rich-results) before launch
- Validate with [Schema.org validator](https://validator.schema.org/) for completeness

---

## 7. URL Structure

### 7.1 Recommended URL Patterns

| Page Type | URL Pattern | Example |
|---|---|---|
| Home | `/` | `/` |
| Timeline (all) | `/timeline` | `/timeline` |
| Milestone | `/timeline/{milestone-id}` | `/timeline/gpt-3-release` |
| Era | `/era/{era-id}` | `/era/transformer` |
| Category | `/category/{category-id}` | `/category/research` |
| Person | `/people/{person-slug}` | `/people/geoffrey-hinton` |
| Organization | `/orgs/{org-slug}` | `/orgs/openai` |
| About | `/about` | `/about` |
| Search | `/search?q={query}` | `/search?q=neural+networks` |

**Rules:**
- Use hyphens, not underscores
- All lowercase
- Derive slugs from the milestone `id` field (already kebab-case in the data)
- No trailing slashes
- Canonical URL on every page: `<link rel="canonical" href="{full URL}" />`

---

## 8. Technical SEO Checklist (for Engineering)

- [ ] `robots.txt` — allow all crawlers, reference sitemap
- [ ] `sitemap.xml` — auto-generated, include all milestone/era/category/person pages
- [ ] Canonical URLs on every page
- [ ] SSG (Static Site Generation) for all timeline content pages
- [ ] `<html lang="en">` on root element
- [ ] Viewport meta tag for mobile
- [ ] `theme-color` meta tag matching brand
- [ ] Image `alt` text on all images
- [ ] Lazy loading for below-fold images
- [ ] Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] No JavaScript-only content for critical SEO pages
- [ ] 404 page with helpful navigation
- [ ] Redirect strategy for any future URL changes (301 redirects)

---

## 9. Content Priorities (Launch Order)

1. **Home page** — hero + era overview with milestone counts
2. **Era pages** (11 eras) — each with milestone listings
3. **Milestone pages** (~200+ from timeline data) — programmatically generated
4. **Category pages** (7 categories) — auto-generated index pages
5. **Person/Org pages** — aggregate pages from `people[]` and `organizations[]` fields
6. **Search** — on-site search with `SearchAction` schema

---

## 10. Measurement & KPIs

| Metric | Target | Tool |
|---|---|---|
| Indexed pages | 100% of published pages within 30 days | Google Search Console |
| Organic impressions | 10K/month within 3 months | Google Search Console |
| Click-through rate | > 3% average | Google Search Console |
| Core Web Vitals | All "Good" | PageSpeed Insights |
| Rich results | Active for Article + BreadcrumbList | Rich Results Test |
| Structured data errors | 0 | Google Search Console |
