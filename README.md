# v-skills

A curated collection of AI coding skills by [@damilareoo](https://github.com/damilareoo).

57 skills across design, Vue ecosystem, animation, engineering, accessibility, and more —
built to make intelligent agents actually excellent.

---

## Install

**Claude Code**

```
/plugin marketplace add github:damilareoo/damilares-skills
/plugin install v-skills@damilareoo/damilares-skills
```

**Other agents** (Codex, Cursor, Copilot, etc.)

Browse raw `SKILL.md` files at [github.com/damilareoo/damilares-skills](https://github.com/damilareoo/damilares-skills) and reference them directly in your agent's context.

---

## Skills

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

Drop a `skills/<skill-name>/SKILL.md` into `plugins/v-skills/skills/` and push.
Anyone who has installed the plugin gets it on their next update.

Skills installed via Claude Code desktop app or `~/.claude/skills` are auto-synced
to this repository via a launchd watcher.
