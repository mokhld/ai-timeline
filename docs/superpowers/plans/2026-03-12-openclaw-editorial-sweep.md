# OpenClaw Editorial Sweep Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an `OpenClaw` milestone and improve the site's milestone/article content quality through a focused editorial pass.

**Architecture:** Treat `src/data/timeline.ts` as the single source of truth for article-like content. Research `OpenClaw`, add the new milestone in the `agentic` era, then patch weak existing milestones and any small dependent metadata copy that should reflect the updated dataset.

**Tech Stack:** Next.js 14, TypeScript, static timeline dataset, web research, existing JSON-LD helpers

---

## Chunk 1: Research And Content Targets

### Task 1: Confirm OpenClaw facts and target files

**Files:**
- Modify: `src/data/timeline.ts`
- Review: `src/app/page.tsx`
- Review: `src/app/layout.tsx`
- Review: `src/lib/structured-data.ts`

- [ ] **Step 1: Verify OpenClaw source facts**

Run web research against the GitHub repo and project docs. Capture:
- repository creation date
- current star count
- core positioning as a personal AI assistant
- notable capabilities that support the milestone framing
- a stable image source or fallback avatar

- [ ] **Step 2: Identify weak milestone entries**

Review `src/data/timeline.ts` for:
- thin `description` or `impact` fields
- missing images on otherwise important entries
- outdated or overly absolute claims
- inconsistent tags or organization references

- [ ] **Step 3: Define edit list**

Create a short list of entries to improve:
- the new `OpenClaw` milestone
- recent `2021-2026` milestones that need clearer framing
- older milestones with obvious quality gaps

## Chunk 2: Timeline Data Updates

### Task 2: Add the OpenClaw milestone

**Files:**
- Modify: `src/data/timeline.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the new milestone entry**

Add an `agentic` era milestone with:
- accurate year/month
- `open-source` category if that best matches the project
- researched organizations/people
- description focused on what launched
- impact focused on why it mattered historically
- tags that improve discovery without being redundant
- verified `imageUrl` and `imageAlt`

- [ ] **Step 2: Place it chronologically**

Insert the milestone in the correct `2025-2026` position so year/era/category pages remain coherent.

- [ ] **Step 3: Review for tone and consistency**

Make sure the new entry sounds like the rest of the timeline: concise, specific, and historically framed.

### Task 3: Improve existing milestone copy

**Files:**
- Modify: `src/data/timeline.ts`
- Test: `npm run build`

- [ ] **Step 1: Patch high-signal recent milestones**

Improve weak or dated recent entries first, especially where stronger historical context helps the timeline read as current and credible.

- [ ] **Step 2: Patch obvious older weak entries**

Improve older entries only where changes clearly add value:
- clearer descriptions
- stronger impact framing
- better tags
- image or alt additions where justified

- [ ] **Step 3: Avoid unnecessary churn**

Leave strong entries unchanged. Do not rewrite for style alone.

## Chunk 3: Supporting Site Copy And Verification

### Task 4: Update any dependent copy if needed

**Files:**
- Modify: `src/app/layout.tsx` if milestone counts/message should change
- Modify: `src/app/page.tsx` if home fallback copy should be tightened
- Review: `src/lib/structured-data.ts`

- [ ] **Step 1: Check aggregate copy**

Review global text like milestone counts and site description. Update only if the new milestone or editorial pass makes the wording meaningfully better.

- [ ] **Step 2: Keep changes minimal**

Do not expand scope into broader design or feature work.

### Task 5: Verify the result

**Files:**
- Test: `src/data/timeline.ts`
- Test: `src/app/page.tsx`
- Test: `src/app/layout.tsx`

- [ ] **Step 1: Run the build**

Run: `npm run build`

Expected: successful production build with no TypeScript or Next.js errors.

- [ ] **Step 2: Read lints for touched files**

Use lints on recently edited files and fix any new problems introduced by the edits.

- [ ] **Step 3: Review final diff**

Check the final changes for unnecessary churn, factual phrasing, and consistency with the rest of the timeline.
