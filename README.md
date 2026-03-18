# damilares-skills

**Website: [damilares-skills.vercel.app](https://damilares-skills.vercel.app)**

---

**damilares-skills turns Claude Code from a generic code-completer into a team of specialists who actually know their domains.**

57 opinionated skills for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — and for any AI coding agent that accepts context. Design systems, Vue, animation, accessibility, engineering workflows, and content — each skill gives the agent a specific mode of intelligence instead of the usual mushy all-purpose response.

---

## Install

### Claude Code

Open Claude Code and paste this. Claude will do the rest.

> Install damilares-skills: run `git clone --depth 1 https://github.com/damilareoo/damilares-skills.git /tmp/damilares-skills-install && rsync -a --exclude='.git' /tmp/damilares-skills-install/plugins/v-skills/skills/ ~/.claude/skills/ && rm -rf /tmp/damilares-skills-install` then confirm the skills were installed by listing `~/.claude/skills/`.

That's it. All 57 skills are available immediately — no restart needed.

### Updating

To pull the latest skills, paste this into Claude Code:

> Update damilares-skills: run `git clone --depth 1 https://github.com/damilareoo/damilares-skills.git /tmp/damilares-skills-update && rsync -a --delete --exclude='.git' /tmp/damilares-skills-update/plugins/v-skills/skills/ ~/.claude/skills/ && rm -rf /tmp/damilares-skills-update` then confirm the update is complete.

### Other agents (Codex, Cursor, Copilot, Windsurf)

Browse the raw `SKILL.md` files at [damilares-skills.vercel.app](https://damilares-skills.vercel.app). Click any skill to open it on GitHub, then copy the file contents directly into your agent's system prompt or context window. Each `SKILL.md` is self-contained and works anywhere the model can read it.

---

### Without v-skills

- Ask Claude to build a UI and get a purple gradient, Inter font, and the same card layout it always produces
- Ask it to write Vue 3 code and get Options API syntax copied from an outdated blog post
- Ask it to review your PR and get five shallow style comments instead of the race condition that will blow up in production
- Ask it to animate something and get a `transition: all 0.3s ease` applied to everything
- Ask it to audit your accessibility and get a quick scan for alt tags instead of a real WCAG 2.2 review

### With v-skills

| Skill | Mode | What it does |
|---|---|---|
| `/frontend-design` | Visual director | Refuses to produce generic AI aesthetics. Commits to a bold visual direction, chooses distinctive typography, and builds something actually memorable. |
| `/ui-ux-pro-max` | Senior product designer | Deep UX reasoning — flows, hierarchy, interaction model, not just colors and fonts. |
| `/interaction-design` | Motion designer | Micro-interactions with intent. Uses Disney's principles, choreographs state transitions, animates with purpose. |
| `/design-system-enforcer` | Design systems lead | Catches inconsistency. Enforces token usage, spacing rhythm, component patterns. Stops drift before it compounds. |
| `/vue` | Vue core team energy | Composition API only. Proper `<script setup>`, `defineProps`, `defineEmits`. Never reaches for Options API. |
| `/review` | Paranoid staff engineer | Finds the bugs that pass CI. Race conditions, N+1s, trust boundary problems, missing edge cases. |
| `/ship` | Release engineer | Sync main, run tests, push, open PR. One command, done. |
| `/frontend-design` + `/vue` | Full-stack interface | Opinionated design applied through idiomatic Vue. The combination that actually ships excellent interfaces. |
| `/12-principles-of-animation` | Disney animator | Every animation evaluated against squash and stretch, anticipation, follow-through, timing. Real principles, not vibes. |
| `/wcag-audit-patterns` | Accessibility specialist | WCAG 2.2 level AA/AAA. Keyboard navigation, ARIA, contrast ratios, focus management. A real audit, not a checklist skim. |
| `/mcp-builder` | MCP developer | Scaffolds MCP servers properly. Schema validation, tool design, error handling. Saves you from reinventing the spec. |
| `/refero-design` | Research-first designer | Goes to Refero for real-world design reference before producing anything. Grounds output in patterns that actually exist in production. |
| `/skill-creator` | Meta-skill | Builds new skills. If you work with a tool not in this list, use this to create a skill for it. |
| `/qa` | QA lead | Systematic testing methodology. Identifies what to test from your diff, runs it against the browser. |

## Demo: one feature, three modes

The most powerful thing about v-skills is stacking modes. Here is what shipping a real UI feature looks like with the full workflow:

```
You:   I need a data table component for a Vue app. Financial data —
       balances, transactions, percentage changes.

You:   /frontend-design

Claude: This is financial data. It needs to communicate authority and
        precision — not look like another SaaS dashboard.

        Direction: editorial precision. IBM Plex Mono for numbers (they
        align optically, feel precise). Tight row height. Semantic red/green
        for deltas but muted — not traffic lights. A subtle freeze-pane
        effect on the header that feels engineered, not bolted on.

        I'm not going to use shadcn defaults here. I'm going to build
        the table from scratch so the typographic rhythm is intentional
        throughout.

        [produces full working component with custom CSS, genuine visual direction]

You:   /vue

Claude: Reviewing the component against Vue 3 patterns...

        Three issues:
        1. props defined with `defineProps({})` but not using the reactive
           destructure — `const { data } = defineProps()` loses reactivity
           in 3.4+. Use `const props = defineProps()` or `toRefs`.
        2. The sort state is in a `data()` return — this is Options API.
           Migrate to `const sortState = ref({ column: null, dir: 'asc' })`.
        3. The watcher uses the old `watch: {}` syntax. Convert to
           `watch(source, handler, { immediate: true })`.

        [applies all fixes, component is now idiomatic Vue 3.4]

You:   /12-principles-of-animation

Claude: Evaluating the sort interaction against animation principles...

        The column sort fires instantly — no anticipation. The user can't
        tell if it's sorting by name or by click position. Add a 40ms
        squash on the sort icon before the rows reorder — that's
        anticipation. The row reorder itself should use FLIP — calculate
        start/end positions, translate from start to end, then animate
        to natural. That's follow-through.

        The percentage delta color change (red → green) has no easing.
        It reads as a glitch. Use a 180ms ease-out on the color transition
        with a brief scale-up on the number to draw attention. That's
        staging — direct the eye to the change.

        [implements all three animation fixes with CSS and Vue transitions]

You:   /review

Claude: Three things before this ships:

        1. The FLIP animation reads `element.getBoundingClientRect()` inside
           a v-for loop. That's a layout thrash — forced synchronous layout
           for every row on every sort. Batch the reads before any writes.

        2. The muted red/green delta colors pass WCAG AA at large text sizes
           but fail at the small label size (12px). You need either a darker
           red or a shape affordance — color alone is insufficient.

        3. The `watch(props.data, ...)` is watching a prop directly. When
           the parent re-renders, this creates a memory leak — the old
           watcher never tears down. Watch `() => props.data` instead.

        [fixes all three issues]
```

That is four specialists in sequence — visual director, Vue expert, motion designer, staff engineer. Each one found things the others wouldn't have. That is the combination that produces interfaces that are excellent all the way down.

---

## Who this is for

You are a frontend or full-stack developer who already uses Claude Code heavily. You want to stop getting generic output and start getting output that reflects actual domain knowledge.

You are probably frustrated by at least one of these:

- The AI produces technically correct Vue code that a Vue expert would never write
- UI output looks like it came from a free Figma template
- Animation is either absent or `transition: all 0.3s` everywhere
- PR review tells you to add JSDoc instead of catching the logic error
- Accessibility audit finds the `<img>` without alt text and calls it done

v-skills exists to fix all of that. Not by adding more prompts to a config file — by giving the model a specific mode of expertise it can commit to for the duration of the task.

---

## How skills work

Each skill is a `SKILL.md` file — a structured prompt that loads into Claude Code's context and changes how the model approaches the task. When you invoke a skill, the model stops being a generalist and starts operating as a specialist.

The best skills are not just instructions. They encode a way of thinking. `/frontend-design` does not say "make pretty UIs." It says: choose a conceptual direction, commit to it, refuse generic patterns, make unexpected typography choices, treat motion as part of the design. That is a different cognitive mode.

Skills work across agents that accept raw context. For Claude Code, they load natively through the plugin system. For other agents, the `SKILL.md` files are plain Markdown you can drop into your system prompt.

---

## Design skills

### `/frontend-design`

This is my **visual director mode**.

The single most common failure mode of AI-generated UI is convergence. Every AI is trained on the same design patterns, so it produces the same patterns — purple gradients, Inter, the same card layout, the same button radius, the same hover state.

`/frontend-design` exists to break that pattern.

Before writing a single line of code, it forces a decision: what is the aesthetic direction, and how do I commit to it? Brutally minimal or maximalist? Geometric or organic? Editorial or utilitarian? Warm or cold? Once the direction is chosen, every decision — fonts, spacing, color, motion — serves it.

This is not decorative. Aesthetic coherence is a form of engineering. An inconsistent interface creates cognitive load. A strong visual direction gives users a mental model. It makes the interface feel like it was made by someone with taste, not assembled from parts.

The skill explicitly prohibits the defaults: no Inter, no purple gradients, no predictable component patterns. Make unexpected choices that feel genuinely designed for the context.

### `/design-system-enforcer`

Systems drift. A design system that is not actively enforced is a collection of suggestions.

This skill audits live code against a design system and finds the places it's breaking down: spacing values that don't map to tokens, colors hardcoded outside the palette, components that share a name but not a structure, margins that are almost-but-not-quite the standard value.

It does not just list violations. It explains why each one matters — whether it's a spacing drift that creates visual inconsistency, a color that fails contrast at some breakpoint, or a component variant that should be extracted before it forks three more times.

### `/refero-design`

Design from the internet is reference. Design from Refero is reference from production products.

Before this skill produces anything, it goes to Refero to look at how real products handle the pattern. Not Dribbble shots. Not concept pieces. Actual screens from apps that ship and get used.

The output is grounded in what works at scale — interaction patterns users already understand, information density that doesn't overwhelm, layouts that survive real content. `/refero-design` bridges reference research and implementation.

### `/figma-to-code-skill`

Figma is a source of truth for visual design. It is not a source of truth for interaction, component structure, or accessibility.

This skill translates a Figma design into production code by making the decisions Figma doesn't make for you: what the component API should be, how state maps to visual states, how the layout responds to real content instead of static comps, where accessibility needs to be added that wasn't in the design.

It doesn't just copy the visual output. It builds the thing that the design intended.

---

## Vue skills

### `/vue`

This is my **Vue expert mode**.

Vue 3 and Vue 2 are different languages. The internet is full of Vue 2 content. Without guidance, an AI trained on that content will reach for Options API, `this.$emit`, `Vue.set`, and `vue-cli` scaffolding.

`/vue` enforces Composition API throughout. `<script setup>` only. `defineProps`, `defineEmits`, `defineExpose` — the modern API. `ref` and `reactive` used correctly (not interchangeably). Composables extracted to `use*` functions, not mixed into components.

It also knows the Vue 3.4+ improvements: `defineModel` for two-way binding, reactive destructuring of props, the `v-bind` shorthand. It writes code that a Vue core team member would actually approve.

### `/vueuse-functions`

VueUse is one of the best composable libraries in the frontend ecosystem. It is also frequently underused — developers reinvent composables that VueUse already provides, correctly and with edge cases handled.

This skill knows the VueUse catalog. Before reaching for a custom implementation, it checks whether VueUse already solves the problem. It knows when to use `useEventListener` instead of `addEventListener`, `useDebounceFn` instead of lodash, `useLocalStorage` instead of rolling state persistence, `useIntersectionObserver` for scroll effects.

---

## Engineering skills

### `/review`

This is my **paranoid staff engineer mode**.

Passing tests do not mean the code is safe.

The bugs that hurt the most in production are the ones that survive CI: race conditions, N+1 queries, bad trust boundaries, missing edge cases, timing-dependent state. A style checker catches formatting. A real review catches the invariant that breaks under concurrency.

This skill does not look for nitpicks. It looks for production incidents that haven't happened yet.

### `/skill-creator`

The best skill you can add to your toolkit is one that doesn't exist yet.

`/skill-creator` builds new skills using the same structured format as v-skills. You describe the tool, framework, or workflow you want a skill for — it produces a `SKILL.md` that encodes the right mental model, not just a list of instructions.

Use this when you work with a stack that isn't covered here. The resulting skill works immediately in Claude Code and is easy to contribute back.

---

## Install

See the install section at the top — paste the one-liner into Claude Code and it handles everything.

---

## All 57 skills

### Design

| Skill | Description |
|---|---|
| `frontend-design` | Production-grade UI with strong aesthetic direction |
| `ui-ux-pro-max` | Deep UI/UX design intelligence |
| `interface-design` | Interface composition and layout systems |
| `interaction-design` | Micro-interactions and motion design |
| `design-lab` | Design interviews and creative exploration |
| `design-system-enforcer` | Enforces visual consistency at scale |
| `refero-design` | Research-first design methodology |
| `canvas-design` | Visual artwork and poster generation |
| `algorithmic-art` | Generative and algorithmic art creation |
| `theme-factory` | Design token and theme system generation |
| `branding-system-skill` | Brand identity systems and visual language |
| `brand-guidelines` | Brand guideline documentation |
| `figma-to-code-skill` | Figma design to production-ready code |
| `baseline-ui` | Opinionated UI baseline and defaults |

### Animation

| Skill | Description |
|---|---|
| `12-principles-of-animation` | Disney's 12 principles applied to UI |
| `fixing-motion-performance` | Diagnose and fix janky animations |

### Vue

| Skill | Description |
|---|---|
| `vue` | Vue 3 Composition API patterns |
| `nuxt` | Nuxt full-stack application patterns |
| `pinia` | Pinia state management |
| `vue-best-practices` | Vue code quality and conventions |
| `vue-router-best-practices` | Vue Router navigation patterns |
| `vue-testing-best-practices` | Vue component and unit testing |
| `vueuse-functions` | VueUse composables and utilities |

### Tooling

| Skill | Description |
|---|---|
| `vite` | Vite build tool configuration |
| `vitepress` | VitePress documentation sites |
| `vitest` | Vitest unit testing framework |
| `unocss` | UnoCSS atomic CSS engine |
| `tsdown` | TypeScript library bundling |
| `turborepo` | Monorepo orchestration and caching |
| `slidev` | Code-driven presentation slides |
| `pnpm` | pnpm package manager workflows |
| `antfu` | Anthony Fu's opinionated toolchain |

### Engineering

| Skill | Description |
|---|---|
| `plan-ceo-review` | CEO/founder lens on product plans |
| `plan-eng-review` | Engineering manager plan review |
| `review` | Pre-landing PR review |
| `ship` | Structured ship workflow |
| `retro` | Engineering retrospective facilitation |
| `qa` | QA testing methodology |
| `skill-creator` | Create and modify agent skills |
| `mcp-builder` | MCP server development |
| `schedule` | Task and work scheduling |
| `doc-coauthoring` | Collaborative documentation |
| `setup-browser-cookies` | Browser cookie import and setup |
| `interface-craft` | Interface crafting toolkit |

### Accessibility

| Skill | Description |
|---|---|
| `fixing-accessibility` | WCAG violation diagnosis and fixes |
| `wcag-audit-patterns` | WCAG 2.2 comprehensive audit |
| `web-design-guidelines` | Web interaction and design standards |

### iOS

| Skill | Description |
|---|---|
| `swiftui-ui-patterns` | SwiftUI best practices and patterns |

### Content

| Skill | Description |
|---|---|
| `copywriting-skill` | Marketing and product copywriting |
| `internal-comms` | Internal communication writing |
| `fixing-metadata` | SEO and metadata optimization |
| `pdf` | PDF document processing and generation |
| `docx` | Word document handling |
| `pptx` | PowerPoint presentation handling |
| `xlsx` | Excel spreadsheet processing |
| `slack-gif-creator` | Slack GIF and reaction creation |
| `web-artifacts-builder` | Web content artifact generation |

---

## Adding skills

Drop a `skills/<skill-name>/SKILL.md` into `plugins/v-skills/skills/` and push. Anyone with the plugin installed gets it on their next update.

Skills installed via the Claude Code desktop app or `~/.claude/skills` are auto-synced to this repository via a launchd watcher.

---

## Why I built this

Created by [Damilare Osofisan](https://github.com/damilareoo).

I got tired of telling AI to be better at design. "Make it more premium" is not a prompt. "Choose a typographic direction, commit to it, and refuse the defaults" is a prompt. The difference is a skill.

Every skill in this collection came from a real failure — a Vue component that used the wrong API, an animation that violated follow-through, a UI that converged on the same aesthetic as every other AI-generated interface. I built the skill, internalized the pattern, and now the agent gets it right the first time.

These are not prompts for beginners who want help with basics. They are modes of expertise for developers who already use AI heavily and want the output to reflect actual domain knowledge.

The website: [damilares-skills.vercel.app](https://damilares-skills.vercel.app)
