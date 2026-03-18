"use client";

import { useState, useMemo } from "react";
import SkillCard from "./skill-card";
import styles from "./skill-grid.module.css";

const SKILLS = [
  {
    id: "frontend-design",
    name: "Frontend Design",
    category: "Design",
    description:
      "Visual director mode. Refuses generic patterns. Commits to a bold aesthetic.",
    tags: ["Design", "Visual", "Direction"],
  },
  {
    id: "design-system-enforcer",
    name: "Design System Enforcer",
    category: "Design",
    description:
      "Systems don't drift when actively enforced. Catches spacing, color, component inconsistencies.",
    tags: ["Design", "Systems", "Consistency"],
  },
  {
    id: "12-principles-of-animation",
    name: "12 Principles of Animation",
    category: "Animation",
    description:
      "Disney's principles applied to UI. Every animation has intent. No transition: all 0.3s.",
    tags: ["Animation", "Motion", "Disney"],
  },
  {
    id: "vue",
    name: "Vue 3 Composition API",
    category: "Vue",
    description:
      "Vue expert mode. Composition API only. <script setup>, defineProps, proper reactivity.",
    tags: ["Vue", "Framework", "JavaScript"],
  },
  {
    id: "nuxt",
    name: "Nuxt",
    category: "Vue",
    description:
      "Full-stack Vue patterns. File-based routing, server routes, proper SSR semantics.",
    tags: ["Vue", "Framework", "Full-Stack"],
  },
  {
    id: "vueuse-functions",
    name: "VueUse Functions",
    category: "Vue",
    description:
      "Knows the VueUse catalog. Stops reinventing composables that already exist.",
    tags: ["Vue", "Composables", "Utilities"],
  },
  {
    id: "review",
    name: "Paranoid Staff Engineer",
    category: "Engineering",
    description:
      "Finds bugs that pass CI. Race conditions, N+1 queries, missing edge cases.",
    tags: ["Engineering", "Code Review", "Quality"],
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    category: "Engineering",
    description:
      "Build new skills. If Claude doesn't have expertise in a tool, use this to create it.",
    tags: ["Engineering", "Meta", "Tools"],
  },
  {
    id: "wcag-audit-patterns",
    name: "WCAG Audit Patterns",
    category: "Accessibility",
    description:
      "WCAG 2.2 level AA/AAA. Keyboard nav, ARIA, contrast ratios, focus management.",
    tags: ["Accessibility", "WCAG", "Standards"],
  },
  {
    id: "refero-design",
    name: "Refero Design",
    category: "Design",
    description:
      "Design from production. Before creating anything, research what real products actually do.",
    tags: ["Design", "Research", "Reference"],
  },
  {
    id: "interaction-design",
    name: "Interaction Design",
    category: "Design",
    description:
      "Micro-interactions with intent. Motion as part of the design, not decoration.",
    tags: ["Design", "Interaction", "UX"],
  },
  {
    id: "mcp-builder",
    name: "MCP Builder",
    category: "Engineering",
    description:
      "Scaffolds MCP servers correctly. Schema validation, tool design, error handling.",
    tags: ["Engineering", "MCP", "Protocols"],
  },
  {
    id: "copywriting-skill",
    name: "Copywriting",
    category: "Content",
    description:
      "Marketing and product copywriting. Clear, compelling, converts.",
    tags: ["Content", "Writing", "Marketing"],
  },
  {
    id: "fixing-accessibility",
    name: "Fixing Accessibility",
    category: "Accessibility",
    description:
      "Diagnoses and fixes WCAG violations. Not a checklist, a real audit.",
    tags: ["Accessibility", "Fixes", "Standards"],
  },
  {
    id: "pdf",
    name: "PDF Processing",
    category: "Content",
    description:
      "PDF document processing and generation. Fillable forms, extraction, validation.",
    tags: ["Content", "PDF", "Documents"],
  },
  {
    id: "vite",
    name: "Vite",
    category: "Tooling",
    description: "Vite build configuration. Fast, modern, properly optimized.",
    tags: ["Tooling", "Build", "Performance"],
  },
  {
    id: "turborepo",
    name: "Turborepo",
    category: "Tooling",
    description:
      "Monorepo orchestration and caching. Speeds up builds and CI significantly.",
    tags: ["Tooling", "Monorepo", "Performance"],
  },
  {
    id: "pnpm",
    name: "pnpm",
    category: "Tooling",
    description:
      "Package manager workflows. Faster, more efficient than npm or yarn.",
    tags: ["Tooling", "Package Manager", "Performance"],
  },
];

const CATEGORIES = ["All", "Design", "Animation", "Vue", "Engineering", "Accessibility", "Content", "Tooling"];

export default function SkillGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Specialized Expertise</h2>
          <p>
            Each skill is a distinct mode of intelligence. Stack them for real
            expertise.
          </p>
        </div>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.active : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className={styles.empty}>
            <p>No skills found. Try a different search or filter.</p>
          </div>
        )}

        <div className={styles.footer}>
          <p>Only showing 18 of 57 skills. Install to access the full collection.</p>
        </div>
      </div>
    </section>
  );
}
