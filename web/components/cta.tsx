"use client";

import styles from "./cta.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Ready to level up your Claude Code?</h2>
          <p>
            57 skills installed once. Available immediately. No restart
            required.
          </p>

          <div className={styles.command}>
            <code className={styles.code}>
              git clone --depth 1 https://github.com/damilareoo/damilares-skills.git
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  "git clone --depth 1 https://github.com/damilareoo/damilares-skills.git /tmp/damilares-skills-install && rsync -a --exclude='.git' /tmp/damilares-skills-install/plugins/v-skills/skills/ ~/.claude/skills/ && rm -rf /tmp/damilares-skills-install"
                );
              }}
              className={styles.copyButton}
            >
              Copy
            </button>
          </div>

          <p className={styles.note}>
            Paste the install command into Claude Code and it handles the rest.
          </p>

          <div className={styles.actions}>
            <a
              href="https://github.com/damilareoo/damilares-skills#install"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              Full Installation Guide
            </a>
            <a
              href="https://github.com/damilareoo/damilares-skills"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
