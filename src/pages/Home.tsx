import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CTASection from '../components/home/CTASection';
import ChatBot from '../components/home/ChatBot.jsx';

function Home() {
  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
      <ChatBot />
    </div>
  );
}

export default Home;