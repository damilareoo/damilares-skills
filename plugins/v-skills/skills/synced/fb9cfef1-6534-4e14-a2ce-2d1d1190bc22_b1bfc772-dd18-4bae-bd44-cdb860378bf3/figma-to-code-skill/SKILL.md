---
name: figma-to-code-skill
description: Use when translating a Figma design, component, frame, or design system into code. Activates when Figma MCP is in use, or when a user shares Figma links, exported assets, design specs, or says "build this from Figma", "match this design", "translate this component", or "implement this". Works alongside Figma MCP — MCP provides the data, this skill provides the judgment.
---


# Figma to Code Skill

## Core Philosophy

Figma MCP gives Claude eyes. This skill gives it judgment.

Reading a Figma file is not the same as understanding it.
A designer's Figma contains decisions — spacing logic, type hierarchy, 
component intent, interaction behavior. Your job is to translate those 
decisions faithfully, not just the pixel values.

Produce code that a senior developer would not need to fix 
and a designer would not need to correct.

---

## Step 0 — Establish Context First

Before reading any Figma data, ask or confirm:

- What is the target stack? (HTML/CSS, React, Vue, Tailwind, vanilla)
- Is there an existing design token system or CSS variable convention?
- Is this a full page, a single component, or a design system element?
- Mobile-first or desktop-first? What breakpoints?
- Are interactions and motion included, or static only?
- Is Figma MCP active? If yes, fetch the file. If no, work from what is shared.

If any are unclear and it would materially affect the output, ask once.

---

## Step 1 — Read the Figma Data with Intent

When Figma MCP is active, extract in this order:

### Design Tokens First
- Color styles → map to CSS custom properties
- Text styles → map to type scale tokens
- Effect styles → shadows, blurs → map to tokens
- Spacing values → identify the base unit, derive the scale
- Do not hardcode values that are clearly tokens — name them

### Component Structure
- Identify the component hierarchy: what is a variant, what is a state, 
  what is a separate component
- Map Figma auto-layout to CSS flexbox or grid — understand the intent
- Identify padding, gap, and alignment — these are design decisions, not 
  arbitrary numbers
- Identify what is fixed and what is fluid — width constraints, min/max rules

### Typography
- Map Figma text styles to the type scale
- Preserve: font-family, font-size, font-weight, line-height, letter-spacing
- Note case treatment — uppercase in Figma is a design decision, reflect it
- Identify responsive behavior — does the type scale shift at breakpoints?

### Color
- Map fills, strokes, and background colors to tokens
- Identify opacity usage — is it a design pattern or an oversight?
- Note dark mode variants if present in the file

### Spacing & Layout
- Identify the base unit from consistent spacing patterns
- Map all padding, margin, and gap values to the token scale
- Note when spacing breaks the scale — is it intentional or inconsistent?
- Translate auto-layout constraints to CSS: 
  fixed → explicit size, fill → flex-grow, hug → fit-content

### Interactions & Motion
- Note any prototype connections or interaction annotations
- If hover states exist as variants, implement them
- If motion specs are annotated, implement them exactly
- If motion is implied but not specified, apply the motion grammar 
  from the branding system if active, or ask

---

## Step 2 — Translation Rules

### Spacing
- Never use arbitrary pixel values if a token scale exists
- Round to the nearest token value only if within 2px — otherwise flag it
- Negative space is a design decision — preserve it

### Typography
- Use rem not px for font sizes
- Preserve line-height as a unitless multiplier where possible
- Do not change font weights — 500 and 600 are different decisions

### Color
- Use OKLCH if the project supports it — convert Figma HEX values
- Maintain opacity as a separate property, not baked into the color value
- Name tokens by role, not value: --color-surface, not --color-gray-900

### Components
- Build to the component's intent, not just its appearance
- A card that contains text, image, and CTA is not three divs — it is a 
  semantic structure with a clear hierarchy
- Use semantic HTML first: article, section, nav, header, button, not div soup
- Accessibility is not optional: labels, roles, focus states, alt text

### Responsive Behavior
- Mobile-first always — build the mobile layout first, layer up
- Do not assume desktop spacing translates to mobile — reconsider every value
- If Figma only shows desktop, derive the mobile layout from the system logic
  and flag that it was derived, not specified

---

## Step 3 — What to Flag

Always surface these to the user rather than silently deciding:

- Spacing values that do not fit the token scale
- Type styles not in the defined type scale
- Colors not in the defined palette
- Inconsistencies between components in the same file
- Missing states (no hover, no focus, no empty state defined)
- Motion that is implied but not specified
- Responsive behavior that is not defined in the file

Format flags clearly at the end of the output:
**Design flags:** [list what was ambiguous or inconsistent]
**Derived decisions:** [list what you decided and why]

---

## Step 4 — Output Format

Deliver in this order:
1. Token definitions (CSS custom properties)
2. Base styles and resets relevant to the component
3. Component code — clean, commented where decisions were made
4. States (hover, focus, active, disabled, empty)
5. Responsive behavior
6. Motion (if applicable)
7. Design flags and derived decisions

Code must be:
- Production-ready, not prototype-quality
- Commented only where a decision needs explanation
- Using the agreed stack — do not introduce dependencies not in the brief
- Accessible by default

---

## Non-Negotiables

- Never hardcode values that should be tokens
- Never ignore a design decision because it is inconvenient to implement
- Never silently approximate — flag it
- Never produce div soup when semantic HTML is available
- Never skip mobile — if it is not in the file, derive it and say so
- Never add features the design did not include