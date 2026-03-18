"use client";

import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>damilares-skills</h4>
            <p>57 specialized AI skills for Claude Code and other agents.</p>
          </div>

          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul className={styles.links}>
              <li>
                <a
                  href="https://github.com/damilareoo/damilares-skills"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/damilareoo/damilares-skills#install"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/damilareoo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Created by Damilare
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Made with</h4>
            <ul className={styles.links}>
              <li>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Claude
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} damilares-skills. All skills are open source and
            available on GitHub.
          </p>
          <p className={styles.tagline}>
            Transform generalist AI into teams of specialists.
          </p>
        </div>
      </div>
    </footer>
  );
}
