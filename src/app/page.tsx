import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import Toolkit from "@/components/Toolkit";
import FeaturedWork from "@/components/FeaturedWork";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-yaksen-black text-white selection:bg-yaksen-red selection:text-white overflow-x-hidden">


      <Navbar />
      <Hero />
      <Framework />
      <Services />
      <Toolkit />
      <FeaturedWork />
      <FAQ />
      <Contact />
      <Team />
      <Footer />
    </main>
  );
}
