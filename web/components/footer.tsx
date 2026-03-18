import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.col}>
            <h3>damilares-skills</h3>
            <p>Expert modes for AI coding. 57 skills that give Claude Code (and any AI agent) specific modes of expertise.</p>
          </div>
          <div className={styles.col}>
            <h4>Links</h4>
            <ul>
              <li><a href="https://github.com/damilareoo/damilares-skills" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://github.com/damilareoo" target="_blank" rel="noopener noreferrer">Creator</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Works With</h4>
            <ul>
              <li>Claude Code</li>
              <li>Cursor</li>
              <li>Copilot</li>
              <li>Codex</li>
            </ul>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.bottom}>
          <p>&copy; 2024 damilares. All rights reserved.</p>
          <p>Crafted with precision and expertise.</p>
        </div>
      </div>
    </footer>
  )
}
