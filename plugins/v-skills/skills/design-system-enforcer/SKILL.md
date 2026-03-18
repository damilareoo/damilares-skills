---
name: design-system-enforcer
description: |
  Enforces visual system consistency across every section of a landing page or marketing site. Use this skill BEFORE writing any new section component and AFTER completing one — it ensures architectural lines, system shapes, background patterns, and creative product illustrations carry through the entire page, not just the hero. Trigger this skill whenever you're building landing pages, marketing sites, section components, or any front-end layout where a design system or visual language exists. Also use it when the user mentions "visual consistency", "design system", "architectural lines", "system components", or complains that sections look "generic", "plain", or "like every other SaaS site."
---

# Design System Enforcer

## Why this skill exists

The most common failure mode when building landing pages is this: you invest heavily in a hero section with a rich visual system — architectural lines, signature shapes, animated patterns — and then every subsequent section quietly degrades into generic card grids on white backgrounds. By the footer, the visual system is gone. The page looks like two different sites stitched together.

This happens because each section gets built in isolation. Without an active enforcement step, the path of least resistance is always a clean card grid with some text. That's fine for wireframes. It's not fine for shipped product.

This skill is a checkpoint system. Run it before you write a section to plan which system elements belong. Run it after to audit whether you actually used them.

---

## Before Building a Section: The Integration Plan

Before writing any section component, stop and answer these five questions. Write the answers as a comment block at the top of the file, or think through them explicitly.

### 1. Which system elements does this section use?

Pull from the project's visual system vocabulary. Every section needs at least 3 of these categories represented:

| Category | Examples | Minimum per section |
|----------|----------|-------------------|
| **Line language** | Vertical rules, horizontal rails, orthogonal connector paths, node endpoints | At least 1 structural line element |
| **Signature shapes** | Prism/diamond markers, node circles, bracket framing | At least 1 shape as accent or structure |
| **Background patterns** | Dot matrix, connector grid, faint grid lines, radial glow | Consider for any section with a distinct bg |
| **Data visualization** | Score bars, enrichment fills, status indicators, JSON blocks | When showing product/data concepts |
| **Motion signatures** | Blur-focus reveal, path draw, enrichment fill, stagger reveal | At least 1 scroll-triggered entrance |

If you find yourself answering "none" for 3+ categories, redesign the section before writing code.

### 2. Where do the architectural lines go?

Every section should have at least one of:
- **Structural verticals**: faint vertical rules at grid column positions (e.g., 1/3, 2/3 of container)
- **Horizontal rails**: thin lines with node endpoints connecting content areas
- **Connector paths**: orthogonal paths linking related elements within the section
- **Border accents**: subtle line elements integrated into card or content boundaries

Lines are not decoration. Each line should imply a data relationship, a structural boundary, or a visual connection between elements.

### 3. How does this section differentiate from a generic SaaS template?

Ask yourself: "If I removed the logo and brand colors, would someone recognize this as the same product?" If the answer is no — if this section could live on any SaaS landing page — it needs more system DNA.

**Red flags for generic patterns:**
- Plain card grid with rounded corners and subtle shadows (and nothing else)
- Simple two-column text-left / image-right layout
- Icon + title + description repeated 3-4 times
- Accordion or list with no structural embellishment
- Statistics displayed as plain large numbers

**How to fix each one:**
- Card grid → Add vertical connector lines between cards, prism markers at card corners, or a background dot matrix
- Two-column → Weave connector paths between the columns, add node markers along the split
- Icon grid → Replace generic icons with system shapes, connect features with rail lines
- Accordion → Add a vertical timeline rail with node markers, structural brackets
- Stats → Add enrichment-fill bars behind numbers, score visualizations, status indicators

### 4. What's the section's product illustration?

If the section shows a concept visually (not just text), the illustration should feel like a product interface, not a stock graphic. Think:
- Window frames with toolbars (dots, title, status indicators)
- Code/data blocks with syntax highlighting and line numbers
- Flow diagrams with system connector lines and node shapes
- Dashboard mockups with score bars, status badges, and data cards
- Animated data transformations showing before → after

Illustrations should have dimensionality: layered panels, subtle shadows, inner structure. Not flat rectangles with text inside.

### 5. What's the entrance animation?

Every section should use the project's motion signature for scroll-in. Don't just fade in — use the system's specific entrance: blur-focus reveal, stagger timing, enrichment fills for data elements, path draw for connector lines. Motion reinforces the brand metaphor (e.g., "data becoming visible").

---

## After Building a Section: The Audit Checklist

After completing a section component, run through this checklist. If more than 2 items fail, the section needs revision.

### Structural Elements
- [ ] **Line language present**: At least one structural line element (vertical rule, horizontal rail, connector path, or border accent) exists within the section — not just the divider between sections
- [ ] **System shapes used**: At least one signature shape (prism, node circle, bracket) appears as an accent, marker, or structural element
- [ ] **Not a plain card grid**: If using cards, they have system embellishments (connector lines, node markers, prism accents, status indicators) — not just rounded corners and shadows

### Visual Differentiation
- [ ] **Brand-recognizable without logo**: A screenshot of this section alone would be identifiable as belonging to this product's visual language
- [ ] **No stock SaaS patterns**: The layout doesn't match common template patterns (icon + title + desc × 3, plain two-column, gradient stat blocks) without system DNA layered in
- [ ] **Background has texture** (if applicable): Sections with colored/distinct backgrounds use dot matrix, connector grids, or other system patterns — not just flat color

### Illustrations & Data Viz
- [ ] **Product illustrations have dimensionality**: Any visual mockup uses window frames, layered panels, inner structure — not flat boxes
- [ ] **Data visualization uses system language**: Score bars, status indicators, and data blocks use the project's specific visual language (enrichment fills, confidence scores, status badges)
- [ ] **Creative flair over functional minimalism**: Illustrations feel expressive and crafted, not like the minimum viable visualization

### Motion & Interaction
- [ ] **System entrance animation**: The section uses the project's motion signature (blur-focus, stagger, path draw) — not generic fade-in
- [ ] **Interactive elements have system hover states**: Buttons, links, and cards use the project's defined interaction patterns

### Integration
- [ ] **Connected to adjacent sections**: The visual system flows into and out of this section — dividers use system rail elements, not plain horizontal rules
- [ ] **Consistent spacing tokens**: Padding and gaps use the project's spatial system (8px base unit, defined scale)

---

## Common Section Types & System Integration Patterns

### Problem / Pain Point Section
**Generic trap**: Three cards with red X icons and problem descriptions.
**System approach**: Use connector lines showing broken data paths, node endpoints that are hollow/inactive (implying missing connections), faint dot matrix with "dark spots" (gaps in the data substrate). Show actual data examples with `undefined` fields in mono type, status badges showing warning/error states.

### Solution / Product Section
**Generic trap**: Two-column with text left, screenshot right.
**System approach**: Show a product interface in a window frame with toolbar. Include enrichment-fill animations on score bars. Use connector lines linking the "before" state to the "after" state through a prism transformation point. Layer multiple panels with depth. Add status badges, confidence scores, and use-case tags using the system's data visualization language.

### Integration / Platform Section
**Generic trap**: Logo grid on white background.
**System approach**: Flow diagram with orthogonal connector paths, node endpoints at each integration point, the product's signature shape as the central transformation hub. Animate path-draw on scroll. Use system node shapes instead of or alongside logos.

### How It Works / Timeline Section
**Generic trap**: Numbered list with generic step icons.
**System approach**: Vertical connector line with node markers at each step. Step numbers in system-styled containers (not generic circles). Duration/metadata in mono type. First step highlighted with accent border. Lines connect steps to imply sequential data flow.

### CTA / Conversion Section
**Generic trap**: Dark background with centered text and a button.
**System approach**: Dark background with dot matrix pattern at low opacity. A report/dashboard mockup showing actual data (scores, breakdowns, projections) in system data-viz language. Connector lines and prism accents maintaining the visual system even on dark surfaces.

### FAQ / Accordion Section
**Generic trap**: Plain expand/collapse list.
**System approach**: Vertical rail line with node markers alongside questions. Expand indicator uses system shapes (prism rotates on toggle, or uses +/× with system styling). Two-column layout with structural vertical line between header and content area.

---

## The Exhaustion Test

When you're done building all sections, scroll the entire page from top to bottom and apply this final test:

> If I took a screenshot every 800px of scroll, would each screenshot feel like the same product?

The visual system should create a continuous thread — the same line language, the same shapes, the same patterns, the same motion character — from hero to footer. No section should feel like it was built by a different team or dropped in from a template.

If any section breaks the thread, it needs revision. The visual system is only as strong as its weakest section.
