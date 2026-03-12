# OpenClaw And Editorial Sweep Design

## Goal
Add a new `OpenClaw` milestone to the AI timeline and perform a full editorial quality pass across existing milestone content, improving factual clarity, specificity, and consistency without rewriting strong entries unnecessarily.

## Current State
The site's article-like content is primarily generated from `src/data/timeline.ts`. Individual milestone pages, era pages, year pages, tag pages, category pages, the home fallback, and structured data all consume that shared milestone dataset. There is no separate article CMS in this repository, and there is no `Bolter` reference in the codebase.

## Proposed Approach
Add one new milestone for `OpenClaw` in the `agentic` era using repo-backed web research. Frame it as an open-source/personal-assistant milestone rather than a generic agent milestone, emphasizing the combination of local control, multi-channel messaging surfaces, and rapid adoption by GitHub stars.

Review the rest of the milestone dataset as an editorial source file. Improve entries that are weak, thin, dated, or inconsistent. Keep already-strong entries mostly unchanged. Prioritize recent and high-interest milestones first, then patch obvious gaps in older eras.

## Scope
- Add `OpenClaw` milestone with researched description, impact, tags, organizations, and image metadata.
- Strengthen weaker milestone descriptions and impacts where there is clear room for improvement.
- Add or improve images and alt text only where it materially improves the content.
- Make small supporting copy updates elsewhere only if the new milestone changes aggregate site messaging.

## Non-Goals
- Rebuild the site structure or add a full CMS.
- Rewrite every milestone for style alone.
- Introduce large unrelated refactors.

## Quality Bar
- Prefer factual, historically grounded wording over hype.
- Preserve existing style and chronology.
- Avoid touching lines that do not need improvement.
- Ensure all edits remain compatible with existing page generation and structured data.
