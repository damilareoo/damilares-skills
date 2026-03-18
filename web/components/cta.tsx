'use client'

import styles from './cta.module.css'

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Ready to Specialize Your AI?</h2>
        <p>Add damilares-skills to Claude Code in 30 seconds. Works with Cursor, Copilot, and Codex too.</p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.num}>1</span>
            <p>Open Claude Code</p>
          </div>
          <div className={styles.step}>
            <span className={styles.num}>2</span>
            <p>Paste the install command</p>
          </div>
          <div className={styles.step}>
            <span className={styles.num}>3</span>
            <p>Start using skills immediately</p>
          </div>
        </div>
        <button 
          className={styles.button}
          onClick={() => {
            navigator.clipboard.writeText('Install damilares-skills: run `git clone --depth 1 https://github.com/damilareoo/damilares-skills.git /tmp/damilares-skills-install && rsync -a --exclude=\'.git\' /tmp/damilares-skills-install/plugins/v-skills/skills/ ~/.claude/skills/ && rm -rf /tmp/damilares-skills-install` then confirm the skills were installed by listing `~/.claude/skills/`.')
            alert('Install command copied!')
          }}
        >
          Copy Install Command
        </button>
      </div>
    </section>
  )
}
