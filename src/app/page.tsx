'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import AIStartupHero from '../components/hero/ai-services-hero'; // Changed import path and component name
import { ServicesScrollShowcase } from '@/components/services/ServicesScrollShowcase';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { DemoModal, ChatbotDemo, DocumentDemo, PredictionDemo, VisionDemo } from '@/components/demos';


export default function HomePage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // New functions and state from the provided "Code Edit" context for AIStartupHero props
  const [isDemoOpen, setIsDemoOpen] = useState(false); // This state is not used in the current file's DemoModal logic, but added as per instruction's context
  const handleStartProject = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDemo = (demoType: string) => {
    setActiveDemo(demoType); // Reusing existing setActiveDemo
    setIsDemoOpen(true); // Setting isDemoOpen as per instruction's context
  };

  return (
    <Layout>
      <AIStartupHero // Replaced Hero with AIStartupHero
        onCtaClick={handleStartProject}
        onSecondaryCtaClick={() => handleOpenDemo('agent')}
      />
      <ServicesScrollShowcase />
      <TestimonialsSection />



      <DemoModal demo={activeDemo} onClose={() => setActiveDemo(null)}>
        {activeDemo === 'chatbot' && <ChatbotDemo />}
        {activeDemo === 'document' && <DocumentDemo />}
        {activeDemo === 'prediction' && <PredictionDemo />}
        {activeDemo === 'vision' && <VisionDemo />}
      </DemoModal>
    </Layout>
  );
}
