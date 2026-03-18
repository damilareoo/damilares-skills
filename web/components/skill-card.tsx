import styles from './skill-card.module.css'

interface Skill {
  id: number
  name: string
  category: string
  description: string
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <a 
      href={`https://github.com/damilareoo/damilares-skills/tree/main/plugins/v-skills/skills/${skill.name}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>/{skill.name}</h3>
        <span className={styles.badge}>{skill.category}</span>
      </div>
      <p className={styles.description}>{skill.description}</p>
      <div className={styles.footer}>
        <span className={styles.link}>View on GitHub →</span>
      </div>
    </a>
  )
}
