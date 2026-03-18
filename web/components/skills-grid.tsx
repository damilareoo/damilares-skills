'use client'

import { useState, useMemo } from 'react'
import styles from './skills-grid.module.css'
import SkillCard from './skill-card'

const SKILLS_DATA = [
  // Design
  { id: 1, name: 'frontend-design', category: 'Design', description: 'Production-grade UI with strong aesthetic direction' },
  { id: 2, name: 'ui-ux-pro-max', category: 'Design', description: 'Deep UI/UX design intelligence' },
  { id: 3, name: 'interface-design', category: 'Design', description: 'Interface composition and layout systems' },
  { id: 4, name: 'interaction-design', category: 'Design', description: 'Micro-interactions and motion design' },
  { id: 5, name: 'design-system-enforcer', category: 'Design', description: 'Enforces visual consistency at scale' },
  { id: 6, name: 'refero-design', category: 'Design', description: 'Research-first design methodology' },
  
  // Vue
  { id: 7, name: 'vue', category: 'Vue', description: 'Vue 3 Composition API patterns' },
  { id: 8, name: 'nuxt', category: 'Vue', description: 'Nuxt full-stack application patterns' },
  { id: 9, name: 'pinia', category: 'Vue', description: 'Pinia state management' },
  { id: 10, name: 'vueuse-functions', category: 'Vue', description: 'VueUse composables and utilities' },
  
  // Animation
  { id: 11, name: '12-principles-of-animation', category: 'Animation', description: "Disney's 12 principles applied to UI" },
  { id: 12, name: 'fixing-motion-performance', category: 'Animation', description: 'Diagnose and fix janky animations' },
  
  // Engineering
  { id: 13, name: 'review', category: 'Engineering', description: 'Pre-landing PR review' },
  { id: 14, name: 'ship', category: 'Engineering', description: 'Structured ship workflow' },
  { id: 15, name: 'qa', category: 'Engineering', description: 'QA testing methodology' },
  
  // Accessibility
  { id: 16, name: 'fixing-accessibility', category: 'Accessibility', description: 'WCAG violation diagnosis and fixes' },
  { id: 17, name: 'wcag-audit-patterns', category: 'Accessibility', description: 'WCAG 2.2 comprehensive audit' },
]

export default function SkillsGrid() {
  const [filter, setFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const categories = useMemo(() => {
    return Array.from(new Set(SKILLS_DATA.map(s => s.category)))
  }, [])

  const filtered = useMemo(() => {
    return SKILLS_DATA.filter(skill => {
      const matchesCategory = !filter || skill.category === filter
      const matchesSearch = !searchTerm || 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [filter, searchTerm])

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>57 Expert Modes</h2>
          <p>Each skill encodes a specific way of thinking. Stack them for compounding expertise.</p>
        </div>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${!filter ? styles.active : ''}`}
              onClick={() => setFilter('')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            No skills match your search
          </div>
        )}
      </div>
    </section>
  )
}
