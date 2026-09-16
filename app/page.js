import Navbar from "@/components/landing/Navbar";

import Hero from "@/components/landing/Hero";

import Features from "@/components/landing/Features";

import BusinessTypes from "@/components/landing/BusinessTypes";

import WhySAI from "@/components/landing/WhySAI";

import PricingPreview from "@/components/landing/PricingPreview";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <BusinessTypes />

      <WhySAI />

      <PricingPreview />
    </>
  );
}
