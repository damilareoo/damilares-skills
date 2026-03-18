'use client'

import styles from './hero.module.css'

export default function Hero() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.subtitle}>Expert Modes</h2>
          <h1 className={styles.title}>
            Turn Your AI<br />Into a Specialist
          </h1>
          <p className={styles.description}>
            57 opinionated skills that give Claude Code (or any AI agent) specific modes of expertise. Design systems, Vue, animation, accessibility, engineering workflows — each skill encodes a way of thinking.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}>57</span>
              <span className={styles.label}>Skills</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>∞</span>
              <span className={styles.label}>Possibilities</span>
            </div>
          </div>
          <div className={styles.ctas}>
            <button 
              className={styles.primaryBtn}
              onClick={() => handleCopy('Install damilares-skills: run `git clone --depth 1 https://github.com/damilareoo/damilares-skills.git /tmp/damilares-skills-install && rsync -a --exclude=\'.git\' /tmp/damilares-skills-install/plugins/v-skills/skills/ ~/.claude/skills/ && rm -rf /tmp/damilares-skills-install` then confirm the skills were installed by listing `~/.claude/skills/`.')}
            >
              Copy Install Command
            </button>
            <a href="https://github.com/damilareoo/damilares-skills" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
      <div className={styles.gridBg}></div>
    </section>
  )
}
