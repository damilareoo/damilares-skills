'use client'

import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>damilares-skills</h1>
        </div>
        <nav className={styles.nav}>
          <a href="#skills">57 Skills</a>
          <a href="https://github.com/damilareoo/damilares-skills" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  )
}
