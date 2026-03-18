'use client'

import Header from '@/components/header'
import Hero from '@/components/hero'
import SkillsGrid from '@/components/skills-grid'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SkillsGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
