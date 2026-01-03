'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ArrowRight, CheckCircle2, Zap, Brain, FileText } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const COLORS_TOP = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const AuroraBackground: React.FC = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.div
      style={{ backgroundImage }}
      className="absolute inset-0 -z-10"
    />
  );
};

const FloatingOrb: React.FC<{ delay: number; duration: number; x: string; y: string }> = ({ delay, duration, x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        x: [0, 20, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute rounded-full blur-3xl"
      style={{
        left: x,
        top: y,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
      }}
    />
  );
};

const AIStartupHero: React.FC = () => {
  const services = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI Chatbots',
      description: 'Intelligent conversational agents that understand context and deliver personalized responses.',
      delay: 0.2,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Workflow Automation',
      description: 'Streamline your operations with custom AI-powered automation solutions.',
      delay: 0.3,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'OCR & Document Extraction',
      description: 'Extract and process data from documents with advanced AI recognition.',
      delay: 0.4,
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Custom AI Agents',
      description: 'Tailored AI solutions designed specifically for your business needs.',
      delay: 0.5,
    },
  ];

  const words = ["AI Agent", "Chatbot", "Workflow", "Website"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3D falling animation for AI Agents text
  const aiAgentsVariants = {
    hidden: {
      opacity: 0,
      y: -200,
      rotateX: 90,
      rotateZ: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateZ: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-950">
      <AuroraBackground />

      <FloatingOrb delay={0} duration={8} x="10%" y="20%" />
      <FloatingOrb delay={2} duration={10} x="80%" y="60%" />
      <FloatingOrb delay={4} duration={9} x="50%" y="80%" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-950 to-gray-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">


        <div className="flex min-h-screen flex-col items-center justify-center text-center pt-32">


          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ perspective: 1000 }}
          >
            Build Custom{' '}
            <span className="inline-flex w-[320px] justify-center relative h-[1.2em] align-top overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[currentWord]}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg leading-tight pb-2"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.6)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))',
                  }}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            <br className="sm:hidden" />
            for Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl"
          >
            Transform your workflow with intelligent chatbots, automated processes, OCR document extraction, and custom AI solutions tailored to your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-8 py-4 text-lg font-semibold"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </HoverBorderGradient>

            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-8 py-4 text-lg font-semibold"
            >
              View Case Studies
            </HoverBorderGradient>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default function AIStartupHeroDemo() {
  return <AIStartupHero />;
}

