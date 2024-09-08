import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialSection from '../components/home/TestimonialSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import ChatBot from '../components/home/ChatBot.jsx';

function Home() {
  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default Home;