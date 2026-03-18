"use client";

import styles from "./skill-card.module.css";

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <a
      href={`https://github.com/damilareoo/damilares-skills/tree/main/plugins/v-skills/skills/${skill.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.header}>
        <div className={styles.category}>{skill.category}</div>
        <div className={styles.arrow}>→</div>
      </div>

      <h3 className={styles.title}>{skill.name}</h3>
      <p className={styles.description}>{skill.description}</p>

      <div className={styles.tags}>
        {skill.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
