'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import AIStartupHero from '../components/hero/ai-services-hero';
import { ServicesScrollShowcase } from '@/components/services/ServicesScrollShowcase';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import { useContactModal } from '@/contexts/ContactModalContext';
import { DemoModal, ChatbotDemo, DocumentDemo, PredictionDemo, VisionDemo } from '@/components/demos';


export default function HomePage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const { openModal } = useContactModal();

  const handleStartProject = () => {
    openModal();
  };

  const handleOpenDemo = (demoType: string) => {
    setActiveDemo(demoType);
  };

  return (
    <Layout>
      <AIStartupHero
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
