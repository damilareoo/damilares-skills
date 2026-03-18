"use client";

import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import SkillGrid from "@/components/skill-grid";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <SkillGrid />
      <CTA />
      <Footer />
    </main>
  );
}
