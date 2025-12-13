"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import Toolkit from "@/components/Toolkit";
import FeaturedWork from "@/components/FeaturedWork";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Team from "@/components/Team";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

function HomeContent() {
  useScrollRestoration();

  return (
    <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Framework />
      <Services />
      <Toolkit />
      <FeaturedWork />
      <Testimonials />
      <FAQ />
      <Contact />
      <Team />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-yaksen-black" />}>
      <HomeContent />
    </Suspense>
  );
}
