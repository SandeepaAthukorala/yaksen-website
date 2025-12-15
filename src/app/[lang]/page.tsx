"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

// Lazy load below-the-fold components with loading states
const Framework = dynamic(() => import("@/components/Framework"), {
  loading: () => <div className="h-screen" />,
  ssr: true
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-screen" />,
  ssr: true
});

// Temporarily using static import to debug rendering
// const Toolkit = dynamic(() => import("@/components/Toolkit"), {
//   loading: () => <div className="h-96" />,
//   ssr: true
// });

const FeaturedWork = dynamic(() => import("@/components/FeaturedWork"), {
  loading: () => <div className="h-screen" />,
  ssr: true
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96" />,
  ssr: true
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="h-screen" />,
  ssr: true
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-screen" />,
  ssr: true
});

const Team = dynamic(() => import("@/components/Team"), {
  loading: () => <div className="h-96" />,
  ssr: true
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-64" />,
  ssr: true
});

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  loading: () => null,
  ssr: false
});

const Cursor = dynamic(() => import("@/components/Cursor"), {
  loading: () => null,
  ssr: false
});

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
      <ChatWidget />
      <Cursor />
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
