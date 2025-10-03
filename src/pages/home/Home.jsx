import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import HowItWorks from "@/components/home/HowItWorks";
import SuccessStories from "@/components/home/SuccessStories";
import Navbar from "@/components/layout/Header/Navbar";
import React from "react";
import Footer from "@/components/layout/Footer/Footer";

const Home = () => {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <Features />
      <Highlights />
      <HowItWorks />
      <SuccessStories />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
