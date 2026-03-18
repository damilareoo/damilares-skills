"use client";

import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tag}>
            <span className={styles.tagDot}>▸</span>
            Claude Code Specialist Skills
          </div>

          <h1 className={styles.title}>
            Transform Claude from a <span className={styles.gradient}>generalist</span>{" "}
            into a <span className={styles.gradient}>team of experts</span>
          </h1>

          <p className={styles.description}>
            57 opinionated skills for real domain expertise. Design systems,
            Vue, animation, accessibility, engineering workflows, and content
            — each skill gives your AI agent a specific mode of intelligence
            instead of generic output.
          </p>

          <div className={styles.actions}>
            <a
              href="https://github.com/damilareoo/damilares-skills#install"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              <span>Install Now</span>
              <span className={styles.arrow}>→</span>
            </a>
            <a
              href="https://github.com/damilareoo/damilares-skills"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              View on GitHub
            </a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>57</div>
              <div className={styles.statLabel}>Skills</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>∞</div>
              <div className={styles.statLabel}>Combinations</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>⚡</div>
              <div className={styles.statLabel}>Real Expertise</div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot}></span>
              <span className={styles.codeDot}></span>
              <span className={styles.codeDot}></span>
            </div>
            <pre>
              <code>{`You: I need a data table.

/frontend-design
→ Editorial precision aesthetic

/vue
→ Composition API patterns

/12-principles-of-animation
→ Choreographed transitions

/review
→ Production-ready code`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
