"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
    Bot,
    Sparkles,
    MessageSquare,
    FileText,
    Workflow,
    ScanLine,
    ArrowRight,
    Zap,
    Globe,
    Smartphone,
    Database,
    BrainCircuit,
    Terminal,
    Cpu,
    GraduationCap,
    Layout
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Link from "next/link"

interface Service {
    id: string
    icon: React.ReactNode
    title: string
    description: string
    color: string
}


interface AIStartupHeroProps {
    companyName?: string
    tagline?: string
    description?: string
    ctaText?: string
    secondaryCtaText?: string
    onCtaClick?: () => void
    onSecondaryCtaClick?: () => void
}

const services: Service[] = [
    {
        id: "ai-agents",
        icon: <Bot className="w-8 h-8" />,
        title: "AI Agents",
        description: "Autonomous reasoning agents that plan, execute, and adapt to complex tasks without human intervention.",
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: "chatbots",
        icon: <MessageSquare className="w-8 h-8" />,
        title: "Chatbots",
        description: "Intelligent conversational interfaces providing 24/7 support with human-like understanding.",
        color: "from-green-500 to-emerald-600"
    },
    {
        id: "nlp-rag",
        icon: <BrainCircuit className="w-8 h-8" />,
        title: "NLP & RAG",
        description: "Advanced natural language processing with Retrieval-Augmented Generation for context-aware answers.",
        color: "from-purple-500 to-pink-600"
    },
    {
        id: "ocr-extraction",
        icon: <ScanLine className="w-8 h-8" />,
        title: "OCR Doc Extraction",
        description: "High-accuracy data extraction from PDFs, invoices, and forms using computer vision.",
        color: "from-orange-500 to-red-600"
    },
    {
        id: "website-dev",
        icon: <Layout className="w-8 h-8" />,
        title: "Website Dev",
        description: "Modern, responsive, and high-performance web applications built with Next.js and React.",
        color: "from-cyan-500 to-blue-600"
    },
    {
        id: "mobile-apps",
        icon: <Smartphone className="w-8 h-8" />,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile solutions for iOS and Android.",
        color: "from-rose-500 to-pink-600"
    },
    {
        id: "machine-learning",
        icon: <Cpu className="w-8 h-8" />,
        title: "Machine Learning",
        description: "Predictive analytics, classification, and regression models tailored to your data.",
        color: "from-amber-500 to-yellow-600"
    },
    {
        id: "model-training",
        icon: <GraduationCap className="w-8 h-8" />,
        title: "Model Training",
        description: "Fine-tuning Large Language Models (LLMs) on your enterprise domain data.",
        color: "from-indigo-500 to-violet-600"
    },
    {
        id: "mcp-servers",
        icon: <Terminal className="w-8 h-8" />,
        title: "MCP Servers",
        description: "Connect your AI assistants to internal databases, APIs, and tools securely.",
        color: "from-gray-500 to-slate-600"
    },
    {
        id: "workflow-automation",
        icon: <Workflow className="w-8 h-8" />,
        title: "Workflow Automation",
        description: "End-to-end automation of business processes to save time and reduce errors.",
        color: "from-teal-500 to-green-600"
    }
]


import { FloatingOrb } from "@/components/ui/floating-orb"

interface Service {
    id: string
    icon: React.ReactNode
    title: string
    description: string
    color: string
}

function PremiumServiceCard({ service, index }: { service: Service; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className="relative h-72 w-full perspective-1000 group z-0 hover:z-50"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <Link href={`/services/${service.id}`} className="block w-full h-full cursor-pointer">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="w-full h-full"
                >
                    <motion.div
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.1 : 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative w-full h-full"
                    >
                        {/* FRONT FACE */}
                        <div
                            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-black/40 dark:to-black/20 border border-white/20 dark:border-white/5 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center p-6 text-center backface-hidden"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            {/* Background Gradient Glow (Front) */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 rounded-2xl`} />

                            <div className={`mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-5 text-white shadow-lg`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">
                                {service.title}
                            </h3>
                            <div className="absolute bottom-6 opacity-50 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                                View Details
                            </div>
                        </div>

                        {/* BACK FACE */}
                        <div
                            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/20 to-white/10 dark:from-gray-900 dark:to-black border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-6 text-center"
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                            }}
                        >
                            {/* Background Gradient Glow (Back) */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 rounded-2xl`} />

                            <h3 className="text-lg font-bold text-foreground mb-4">
                                {service.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <Button
                                size="sm"
                                className={`rounded-full bg-gradient-to-r ${service.color} text-white shadow-md hover:shadow-lg transition-all pointer-events-none`}
                            >
                                Learn More <ArrowRight className="ml-2 w-3 h-3" />
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </Link>
        </div>
    )
}

function AIStartupHero({
    companyName = "AI Solutions",
    tagline = "Custom AI Agents & Automation",
    description = "We build intelligent AI agents, chatbots, workflows, OCR, and document extraction services tailored to your business needs. Transform your operations with cutting-edge AI technology.",
    ctaText = "Get Started",
    secondaryCtaText = "View Services",
    onCtaClick,
    onSecondaryCtaClick
}: AIStartupHeroProps) {
    const [mounted, setMounted] = useState(false)
    const words = ["AI Agent", "Chatbot", "Workflow", "Website"];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        setMounted(true)
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 3000); // 3 seconds interval
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-background overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingOrb delay={0} duration={20} />
                <FloatingOrb delay={5} duration={25} />
                <FloatingOrb delay={10} duration={22} />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 lg:py-24">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto text-center"> {/* Centered layout often looks better with many cards, or keep left? User didn't specify, keeping structure but widening container */}

                    <div className="max-w-4xl mx-auto mb-16 text-left"> {/* Keeping left align for text as per original design */}
                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-left mb-6"
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                                Build <span className="text-primary">Custom</span>
                                <span className="inline-block w-[340px] sm:w-[400px] pl-3 text-left">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={words[currentWord]}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg leading-tight pb-2"
                                        >
                                            {words[currentWord]}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                                <br className="hidden sm:block" />
                                for Your Business
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-xl text-muted-foreground text-left max-w-3xl mb-12"
                        >
                            {description}
                        </motion.p>

                        {/* CTA Buttons */}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AIStartupHero
