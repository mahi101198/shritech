'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, notFound } from 'next/navigation';
import { servicesData } from '@/lib/service-data';
import {
    Brain, Zap, Target, Workflow, MessageSquare, Database, TrendingUp, Shield, ArrowRight,
    ScanLine, Layout as LayoutIcon, Smartphone, Cpu, GraduationCap, Terminal, LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

// Icon mapping for dynamic retrieval
const iconMap: Record<string, LucideIcon> = {
    Brain, Zap, Target, Workflow, MessageSquare, Database, TrendingUp, Shield,
    ScanLine, Layout: LayoutIcon, Smartphone, Cpu, GraduationCap, Terminal,
    Bot: Brain // Fallback/alias
};

export default function ServicePage() {
    const params = useParams();
    const service = servicesData.find((s) => s.id === params.slug);
    const [activeFeature, setActiveFeature] = useState(0);

    if (!service) {
        notFound();
    }

    // Theme helper
    const isEmerald = service.id === 'ai-agents';
    const theme = isEmerald ? {
        badge: "bg-emerald-100 border-emerald-300 text-emerald-700",
        h1Gradient: "from-emerald-600 via-cyan-600 to-blue-600",
        capabilityHoverBorder: "hover:border-emerald-400",
        capabilityIcon: "text-emerald-600",
        buttonGradient: "from-emerald-600 to-cyan-600 hover:border-emerald-400",
        buttonBorder: "border-emerald-600 text-emerald-600 hover:bg-emerald-50",
        statColor: "text-emerald-600",
        statColor2: "text-cyan-600",
        featureHoverShadow: "rgba(16, 185, 129, 0.2)",
        featureHoverBorder: "hover:border-emerald-300"
    } : {
        badge: "bg-purple-100 border-purple-300 text-purple-700",
        h1Gradient: "from-purple-600 via-pink-600 to-blue-600",
        capabilityHoverBorder: "hover:border-purple-400",
        capabilityIcon: "text-purple-600",
        buttonGradient: "from-purple-600 to-pink-600 hover:border-purple-400",
        buttonBorder: "border-purple-600 text-purple-600 hover:bg-purple-50",
        statColor: "text-purple-600",
        statColor2: "text-pink-600",
        featureHoverShadow: "rgba(139, 92, 246, 0.2)",
        featureHoverBorder: "hover:border-purple-300"
    };

    return (
        <Layout>
            <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground overflow-hidden">
                {/* Simplified gradient orbs - static, no animation */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
                    <div className={`absolute w-96 h-96 ${isEmerald ? 'bg-emerald-200' : 'bg-purple-200'} rounded-full mix-blend-multiply filter blur-3xl`} style={{ top: '20%', left: '10%' }} />
                    <div className={`absolute w-96 h-96 ${isEmerald ? 'bg-cyan-200' : 'bg-pink-200'} rounded-full mix-blend-multiply filter blur-3xl`} style={{ top: '60%', right: '10%' }} />
                </div>

                <div className="relative z-10">
                    {/* Hero Section */}
                    <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 pt-20 pb-8 sm:pb-10 overflow-x-hidden">
                        <div className="max-w-4xl mx-auto">
                            {/* Content */}
                            <div className="space-y-4 sm:space-y-8">
                                <div className="inline-block">
                                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold ${theme.badge}`}>
                                        🚀 Next-Gen {service.title} Technology
                                    </span>
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight break-words">
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r animate-gradient ${theme.h1Gradient}`}>
                                        {service.subtitle}
                                    </span>
                                    <br />
                                    <span className="text-foreground">for Your Business</span>
                                </h1>

                                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed break-words">
                                    {service.fullDescription}
                                </p>

                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    {service.capabilities.map((cap, i) => {
                                        const Icon = iconMap[cap.icon] || Zap;
                                        return (
                                            <div key={i} className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card rounded-full border border-border hover:shadow-md transition-all duration-300 ${theme.capabilityHoverBorder}`}>
                                                <Icon className={`w-3 sm:w-4 h-3 sm:h-4 ${theme.capabilityIcon}`} />
                                                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{cap.text}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <Link href="/#contact" className="w-full sm:w-auto">
                                        <HoverBorderGradient
                                            containerClassName="w-full rounded-full"
                                            as="button"
                                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold flex items-center justify-center gap-2"
                                        >
                                            Get Started
                                            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                                        </HoverBorderGradient>
                                    </Link>

                                    <HoverBorderGradient
                                        containerClassName="w-full sm:w-auto rounded-full"
                                        as="button"
                                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold"
                                    >
                                        View Demo
                                    </HoverBorderGradient>
                                </div>

                                <div className="flex flex-wrap gap-4 sm:gap-8 pt-2 sm:pt-4">
                                    {service.stats.map((stat, i) => (
                                        <div key={i}>
                                            <div className={`text-2xl sm:text-3xl font-bold ${i === 1 ? theme.statColor2 : theme.statColor}`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 py-12 sm:py-20 overflow-x-hidden">
                        <div className="text-center mb-8 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 break-words">
                                Powerful Capabilities
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto break-words px-4">
                                Enterprise-grade {service.title} with advanced features built for scale
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
                            {service.detailedFeatures.map((feature, i) => {
                                const Icon = iconMap[feature.icon] || Brain;
                                // Generate a consistent color based on index or hardcode one
                                const colors = [
                                    "from-purple-500 to-pink-500",
                                    "from-blue-500 to-cyan-500",
                                    "from-green-500 to-emerald-500",
                                    "from-orange-500 to-red-500"
                                ];
                                const color = colors[i % colors.length];

                                return (
                                    <div
                                        key={i}
                                        className="group relative p-4 sm:p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xl transition-all duration-500 cursor-pointer"
                                        onMouseEnter={() => setActiveFeature(i)}
                                        style={{
                                            transform: activeFeature === i ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                                            boxShadow: activeFeature === i ? '0 20px 60px rgba(139, 92, 246, 0.2)' : 'none'
                                        }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />

                                        <div className="relative">
                                            <div className={`inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-br ${color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                                <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                            </div>

                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-foreground break-words">{feature.title}</h3>
                                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{feature.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 py-12 sm:py-20 overflow-x-hidden">
                        <div className="relative max-w-4xl mx-auto p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-purple-50 dark:from-purple-900/20 to-pink-50 dark:to-pink-900/20 border border-border shadow-xl">

                            <div className="relative text-center">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground break-words">Ready to Build Your {service.title}?</h2>
                                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 break-words px-2">
                                    Transform your business with intelligent automation today
                                </p>

                                <Link href="/#contact" className="w-full sm:w-auto">
                                    <HoverBorderGradient
                                        containerClassName="w-full rounded-full"
                                        as="button"
                                        className="w-full px-8 sm:px-10 py-4 sm:py-5 font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                                    >
                                        Start Your Journey
                                        <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
                                    </HoverBorderGradient>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes gradient {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    
                    @keyframes blob {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                    }
                    
                    .animate-gradient {
                        background-size: 200% 200%;
                        animation: gradient 4s ease infinite;
                    }
                    
                    .animate-blob {
                        animation: blob 8s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </Layout>
    );
}
