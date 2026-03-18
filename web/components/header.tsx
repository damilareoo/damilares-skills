"use client";

import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot}>●</span>
          <span>damilares-skills</span>
        </Link>
        <nav className={styles.nav}>
          <a
            href="https://github.com/damilareoo/damilares-skills"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            GitHub
          </a>
          <a href="#skills" className={styles.navLink}>
            Skills
          </a>
          <a
            href="https://github.com/damilareoo/damilares-skills#install"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Install
          </a>
        </nav>
      </div>
    </header>
  );
}
