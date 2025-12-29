# Architecture Notes

This document tracks the structure and functional decisions for the Gothic Narrative Portfolio (Nicholas Popkey).

## Stack
- Next.js App Router (TypeScript, static-friendly pages)
- Tailwind CSS v4 for layout, with custom "Scholar's Desk" gothic theme
- **shadcn/ui** for component primitives (Button, Card, Accordion, Collapsible, Badge), styled to match the gothic theme.
- Framer Motion for reveals and micro-interactions
- next/font for typography (Playfair Display for headings, Crimson Pro for body, Great Vibes for script)

## Theme: Mysterious Scholar's Desk

A dark, candlelit Victorian aesthetic. The portfolio evokes a mysterious scholar's desk in a dimly lit study, with scattered aged documents, blood-red ink annotations, and deep shadows. Moodier and more atmospheric than a typical portfolio.

### Design Philosophy
- **Dark & Mysterious**: Very dark wood surface with candlelight glow
- **Aged & Stained**: Papers are yellowed, stained, and worn
- **Red Ink Accents**: Blood-red ink (`#8b2500`) for ALL emphasis, titles, and interactive elements - no yellow/gold/brass
- **Scattered Papers**: Torn, folded, and creased paper scraps
- **Book Navigation**: Dark leather book spines on a shadowy shelf
- **Consistent Accent Color**: Red is the ONLY accent color throughout the design (buttons, highlights, headers)

### Color Palette
| Role | Hex | Notes |
|------|-----|-------|
| Desk (background) | `#1a1310` | Very dark wood, almost black |
| Desk Mid | `#2a1d14` | Mid-tone wood grain |
| Desk Light | `#3d2b1f` | Lighter wood accents |
| Paper | `#e8dcc8` | Aged cream paper |
| Paper Aged | `#d4c4a8` | More yellowed paper |
| Paper Dark | `#c4b498` | Shadowed/stained paper |
| Ink | `#1a1410` | Deep brown-black text |
| Ink Red | `#8b2500` | Blood red ink for emphasis |
| Ink Faded | `#5a4a3a` | Faded/aged ink |
| Wax | `#6b1a00` | Darker sealing wax |
| Leather | `#2a1d14` | Very dark leather |
| Candle | `#d4a574` | Candlelight glow effect |

### Typography
- **Display**: Playfair Display (dramatic, period-appropriate headings)
- **Body**: Crimson Pro (refined, readable serif)
- **Script**: Great Vibes (handwritten flourishes, signatures)

### CSS Utilities
- `.paper` - Cream paper card with realistic shadow
- `.paper-aged` - Slightly yellowed/aged paper gradient
- `.paper-texture` - Subtle paper grain overlay
- `.cork` - Cork board texture background
- `.leather` - Leather texture for book spines
- `.wax-seal` - Radial gradient wax seal effect
- `.drop-cap` - Large first letter styling

## Layout Structure

### Hero - The Open Journal
- Styled as a two-page book spread lying on the desk
- Left page: Title page with name and flourishes
- Right page: Introduction text with CTAs
- Center spine shadow effect

### Navigation - Book Spines
- Horizontal row of book spines below hero
- Vertical text on each spine (90° rotation)
- Leather texture with gold foil lettering
- Hover: spine "pulls out" animation
- Resume is a red-bound CV volume

### About - Personal Letter
- `LetterCard` component: folded letter with wax seal
- Letterhead decoration
- Script signature
- Slight rotation for organic feel
- Corner flourishes

### Skills - Scattered Paper Scraps
- `IndexCard` component restyled as torn/folded paper scraps
- No cork board - papers scattered directly on desk
- Varied clip-paths for torn/folded edges
- Red ink titles, faded ink descriptions
- Random rotations and age stains

### Case Studies - Document Dossiers
- `CaseStudy` component restyled as manila folders
- Folder tab with year/role
- Paper clip decoration
- Sepia filter on hero images
- Flourish section dividers

### Contact - Envelope
- Styled as addressing an envelope
- Envelope flap clip-path
- Stamp decoration
- Wax seal CTA button

## Content Management

Content is managed through editable files in the `content/` directory:

```
content/
├── portfolio.json          # Project metadata, image mappings, skills
├── dialogue/
│   └── iron-bear-proposal.csv
├── excerpts/
│   ├── ss-overview.md
│   └── sd-overview.md
├── lore/
│   └── *.md               # Lore markdown files
└── period-research/
    └── *.md               # Period research markdown files
```

### File Formats

**portfolio.json** - Central configuration for projects and skills:
- Project metadata (id, title, role, studio, year, summary)
- Hero images and gallery images per project
- Links to dialogue scenes and excerpt files
- Skills list with descriptions

**dialogue/*.csv** - Branching dialogue scenes:
- Columns: scene_id, scene_name, chapter, location, context, option_label, option_text, option_result
- Context can be split into sequential lines using `|||` delimiter
- Each row represents one dialogue option

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
- `loadLoreFile(filename)` - Load lore markdown
- `loadPeriodResearchFile(filename)` - Load research markdown
- `loadAllProjectsWithContent()` - Load all projects with their content

## Components

### Decorative
- `components/WaxSeal`: Animated dark wax seal with initial letter
- `components/Flourish`: SVG decorative elements (dividers, corners, ornaments)

### Layout
- `components/Hero`: Open journal two-page spread
- `components/TopNav`: Book spine navigation
- `components/LetterCard`: Personal letter with seal
- `components/IndexCard`: Ruled index card with push pin

### Content
- `components/CaseStudy`: Expandable project dossier
- `components/BranchingDialogue`: Interactive dialogue on paper
- `components/AnnotatedImage`: Image viewer with lightbox
- `components/DocExcerpt`: Collapsible documentation
- `components/MarkdownLightbox`: Paper-styled markdown viewer
- `components/ResumeLightbox`: PDF viewer

### UI Primitives (shadcn/ui)
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

### Add markdown resources:
1. Add `.md` files to `content/lore/` or `content/period-research/`
2. Load in `page.tsx` using `loadLoreFile()` or `loadPeriodResearchFile()`
3. Pass to CaseStudy via `markdownResources` prop

## Notes
- Keep pages static where possible; all content is loaded at build time.
- When adding new functionality, update this file.
- Images in `public/` are organized by project (SovereignSyndicate/, StudioDelirium/)
- Resume PDF is served from `public/resume.pdf` and displayed via `ResumeLightbox`.
- Typography: avoid forcing all-caps; use weight/spacing for label styling.
- Use slight rotations (±3°) for organic scattered document feel.
