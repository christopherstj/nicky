# Architecture Notes

This document tracks the structure and functional decisions for the Gothic Narrative Portfolio (Nicholas Popkey).

## Stack
- Next.js App Router (TypeScript, static-friendly pages)
- Tailwind CSS v4 for layout, with custom gothic theme (charcoal, blood red, slate)
- **shadcn/ui** for component primitives (Button, Card, Accordion, Collapsible, Badge), styled to match the gothic theme.
- Framer Motion for reveals and micro-interactions
- next/font for typography (Cinzel for headings, Crimson Text for body)

## Content Management

Content is managed through editable files in the `content/` directory:

```
content/
├── portfolio.json          # Project metadata, image mappings, skills
├── dialogue/
│   ├── silver-coin.csv     # Dialogue sequences (one per scene)
│   └── tavern-brawl.csv
└── excerpts/
    ├── ss-overview.md      # Sovereign Syndicate overview
    └── sd-overview.md      # Studio Delirium overview
```

### File Formats

**portfolio.json** - Central configuration for projects and skills:
- Project metadata (id, title, role, studio, year, summary)
- Hero images and gallery images per project
- Links to dialogue scenes and excerpt files
- Skills list with descriptions

**dialogue/*.csv** - Branching dialogue scenes:
- Columns: scene_id, scene_name, chapter, location, context, option_label, option_text, option_result
- Each row represents one dialogue option
- First row contains scene context

**excerpts/*.md** - Markdown documentation with frontmatter:
```yaml
---
title: "Document Title"
type: overview | character | quest | world | research
project: project-id
---
Markdown content...
```

## Content Loading

`src/lib/portfolio.ts` provides typed loaders:
- `loadPortfolioData()` - Load portfolio.json
- `loadDialogueScene(sceneId)` - Parse a dialogue CSV
- `loadExcerpt(excerptId)` - Parse a markdown excerpt
- `loadAllProjectsWithContent()` - Load all projects with their content

## Layout & Components

- `src/app/layout.tsx`: global fonts, metadata, theme classes.
- `src/app/page.tsx`: single-page experience with sections (Hero, About, Case Studies, Skills, Contact).

### Components

**Page-level:**
- `components/Hero`: top hero with CTA buttons
- `components/SectionHeading`: shared section header
- `components/NoiseOverlay`: grain overlay for gothic mood

**Case Study System:**
- `components/CaseStudy`: expandable project card with collapsible deep-dive
- `components/BranchingDialogue`: interactive dialogue player showing choices and consequences
- `components/AnnotatedImage`: image viewer with lightbox and descriptions
- `components/DocExcerpt`: collapsible documentation excerpt with markdown rendering

**UI Primitives (shadcn/ui):**
- `components/ui/button`
- `components/ui/card`
- `components/ui/accordion`
- `components/ui/collapsible`
- `components/ui/badge`
- `components/ui/separator`

## Adding Content

### Add a new project:
1. Add entry to `content/portfolio.json` under `projects`
2. Add hero image and gallery images to `public/`
3. Create overview excerpt in `content/excerpts/`
4. (Optional) Add dialogue CSVs to `content/dialogue/`

### Add a new dialogue scene:
1. Create `content/dialogue/[scene-id].csv`
2. Add scene-id to project's `dialogueScenes` array in portfolio.json

### Add a new documentation excerpt:
1. Create `content/excerpts/[excerpt-id].md` with frontmatter
2. Add excerpt-id to project's `excerpts` array in portfolio.json

## Notes
- Keep pages static where possible; all content is loaded at build time.
- When adding new functionality, update this file.
- Images in `public/` are organized by project (SovereignSyndicate/, StudioDelirium/)
