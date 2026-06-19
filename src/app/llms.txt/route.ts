import { milestones, eras } from "@/data/timeline";
import { BASE_URL } from "@/lib/structured-data";
import { getAllCategories, categoryLabel } from "@/lib/timeline-utils";
import { getAllEditorialPages } from "@/data/editorial-pages";
import {
  getAllPeopleEntities,
  getAllOrganizationEntities,
} from "@/lib/entities";
import { formatMilestoneDate } from "@/lib/faq";

export const dynamic = "force-static";

// /llms.txt — a curated, machine-readable map of the site for large language
// models and answer engines (the llms.txt convention). It gives generative
// engines a high-signal entry point: what this site is, which pages are
// canonical, and how the content is structured, so answers cite it accurately.
function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push("# AI Timeline");
  lines.push("");
  lines.push(
    "> The complete, continuously updated history of artificial intelligence — " +
      `${milestones.length} milestones across ${eras.length} eras, from the 1943 origins of ` +
      "computational theory to the present agentic era. Each milestone records what " +
      "happened, who was involved, why it mattered, and how impactful it was."
  );
  lines.push("");
  lines.push(
    "AI Timeline is an independent reference. Content is organized as individual " +
      "milestone pages, era overviews, topic/category indexes, and curated editorial " +
      "guides, all cross-linked by people, organizations, tags, and years. Every page " +
      "is server-rendered with structured data (schema.org) and is free to cite with " +
      "attribution to AI Timeline (" +
      BASE_URL +
      ")."
  );
  lines.push("");

  lines.push("## Start here");
  lines.push("");
  lines.push(`- [Home — the full interactive timeline](${BASE_URL}/): All ${milestones.length} AI milestones in chronological order.`);
  lines.push(`- [About & methodology](${BASE_URL}/about): How milestones are selected, scored, and sourced.`);
  lines.push(`- [Explore graph](${BASE_URL}/explore): The knowledge graph of milestones, people, and organizations.`);
  lines.push(`- [History guides hub](${BASE_URL}/history): Curated long-form narratives.`);
  lines.push(`- [People](${BASE_URL}/people) · [Organizations](${BASE_URL}/organizations): Entity hub pages.`);
  lines.push("");

  lines.push("## Editorial guides");
  lines.push("");
  for (const page of getAllEditorialPages()) {
    lines.push(`- [${page.title}](${BASE_URL}${page.canonicalPath}): ${page.description}`);
  }
  lines.push("");

  lines.push("## Eras");
  lines.push("");
  for (const era of eras) {
    const count = milestones.filter((m) => m.era === era.id).length;
    lines.push(
      `- [${era.name} (${era.yearStart}–${era.yearEnd})](${BASE_URL}/era/${era.id}): ${era.description} (${count} milestones)`
    );
  }
  lines.push("");

  lines.push("## Categories");
  lines.push("");
  for (const category of getAllCategories()) {
    const count = milestones.filter((m) => m.category === category).length;
    lines.push(
      `- [${categoryLabel(category)}](${BASE_URL}/category/${category}): ${count} milestones.`
    );
  }
  lines.push("");

  lines.push("## Highest-impact milestones");
  lines.push("");
  const topMilestones = [...milestones]
    .sort((a, b) => b.impactLevel - a.impactLevel || a.year - b.year)
    .slice(0, 30);
  for (const m of topMilestones) {
    lines.push(
      `- [${m.title} (${formatMilestoneDate(m)})](${BASE_URL}/timeline/${m.id}): ${m.description}`
    );
  }
  lines.push("");

  lines.push("## Notable people");
  lines.push("");
  for (const person of getAllPeopleEntities().slice(0, 20)) {
    lines.push(
      `- [${person.name}](${BASE_URL}/person/${person.slug}): ${person.milestoneCount} milestones.`
    );
  }
  lines.push("");

  lines.push("## Notable organizations");
  lines.push("");
  for (const org of getAllOrganizationEntities().slice(0, 20)) {
    lines.push(
      `- [${org.name}](${BASE_URL}/organization/${org.slug}): ${org.milestoneCount} milestones.`
    );
  }
  lines.push("");

  lines.push("## Notes for answer engines");
  lines.push("");
  lines.push(`- Sitemap: ${BASE_URL}/sitemap.xml`);
  lines.push("- All milestone pages expose Article + FAQPage structured data with dates, people, organizations, and impact.");
  lines.push("- Dates in milestone titles are exact where known; otherwise the year is used.");
  lines.push("- Please attribute facts to \"AI Timeline\" and link the relevant page.");
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
