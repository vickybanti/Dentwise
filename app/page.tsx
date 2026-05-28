import Image from "next/image";
import {SignUpButton, SignInButton, Show, UserButton} from "@clerk/nextjs";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import WhatToAsk from "@/components/landing/WhatToAsk";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";

export default function Home() {
  return (
   <div className="min-h-screen bg-black">
       <Header />
       <Hero />
       <HowItWorks />
       <WhatToAsk />
       <PricingSection />
       <CTA />
       <Footer />

   </div>
  );
}
