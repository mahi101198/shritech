'use client';

import React, { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, notFound } from 'next/navigation';
import { servicesData } from '@/lib/service-data';
import { ThreeBrain } from '@/components/services/ThreeBrain';
import { ThreeDAIAgent } from '@/components/services/ThreeDAIAgent';
import {
    Brain, Zap, Target, Workflow, MessageSquare, Database, TrendingUp, Shield, ArrowRight,
    ScanLine, Layout as LayoutIcon, Smartphone, Cpu, GraduationCap, Terminal, LucideIcon
} from 'lucide-react';
import Link from 'next/link';

// Icon mapping for dynamic retrieval
const iconMap: Record<string, LucideIcon> = {
    Brain, Zap, Target, Workflow, MessageSquare, Database, TrendingUp, Shield,
    ScanLine, Layout: LayoutIcon, Smartphone, Cpu, GraduationCap, Terminal,
    Bot: Brain // Fallback/alias
};

export default function ServicePage() {
    const params = useParams();
    const service = servicesData.find((s) => s.id === params.slug);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeFeature, setActiveFeature] = useState(0);

    if (!service) {
        notFound();
    }

    // Background particles canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: any[] = [];
        const particleCount = 50;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity * 0.3})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

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
            <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
                <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

                {/* Animated gradient orbs */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute w-96 h-96 ${isEmerald ? 'bg-emerald-200' : 'bg-purple-200'} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`} style={{ top: '20%', left: '10%' }} />
                    <div className={`absolute w-96 h-96 ${isEmerald ? 'bg-cyan-200' : 'bg-pink-200'} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`} style={{ top: '60%', right: '10%', animationDelay: '2s' }} />
                    <div className={`absolute w-96 h-96 ${isEmerald ? 'bg-blue-200' : 'bg-blue-200'} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`} style={{ bottom: '20%', left: '30%', animationDelay: '4s' }} />
                </div>

                <div className="relative z-10">
                    {/* Hero Section with 3D Brain */}
                    <div className="container mx-auto px-6 pt-20 pb-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="inline-block">
                                    <span className={`px-4 py-2 rounded-full border text-sm font-semibold ${theme.badge}`}>
                                        🚀 Next-Gen {service.title} Technology
                                    </span>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r animate-gradient ${theme.h1Gradient}`}>
                                        {service.subtitle}
                                    </span>
                                    <br />
                                    <span className="text-gray-900">for Your Business</span>
                                </h1>

                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {service.fullDescription}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    {service.capabilities.map((cap, i) => {
                                        const Icon = iconMap[cap.icon] || Zap;
                                        return (
                                            <div key={i} className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:shadow-md transition-all duration-300 ${theme.capabilityHoverBorder}`}>
                                                <Icon className={`w-4 h-4 ${theme.capabilityIcon}`} />
                                                <span className="text-sm text-gray-700">{cap.text}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex gap-4">
                                    <Link href="/#contact">
                                        <button className={`group relative px-8 py-4 bg-gradient-to-r rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${theme.buttonGradient}`}>
                                            <span className="relative z-10 flex items-center gap-2">
                                                Get Started
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </button>
                                    </Link>

                                    <button className={`px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 ${theme.buttonBorder}`}>
                                        View Demo
                                    </button>
                                </div>

                                <div className="flex gap-8 pt-4">
                                    {service.stats.map((stat, i) => (
                                        <div key={i}>
                                            <div className={`text-3xl font-bold ${i === 1 ? theme.statColor2 : theme.statColor}`}>
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right - 3D Brain */}
                            <div className="relative h-[500px] lg:h-[600px]">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl blur-2xl opacity-50" />
                                <div
                                    className="relative w-full h-full rounded-3xl border border-gray-200 bg-white/50 backdrop-blur-sm overflow-hidden shadow-2xl"
                                    style={{
                                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.9) 70%)'
                                    }}
                                >
                                    {service.id === 'ai-agents' ? <ThreeDAIAgent /> : <ThreeBrain />}
                                </div>
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4">
                                    <p className="text-sm text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm inline-block">
                                        ✨ Interactive 3D Experience - Move your mouse to interact
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="container mx-auto px-6 py-20">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                                Powerful Capabilities
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Enterprise-grade {service.title} with advanced features built for scale
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
                                        className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-500 cursor-pointer"
                                        onMouseEnter={() => setActiveFeature(i)}
                                        style={{
                                            transform: activeFeature === i ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                                            boxShadow: activeFeature === i ? '0 20px 60px rgba(139, 92, 246, 0.2)' : 'none'
                                        }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />

                                        <div className="relative">
                                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>

                                            <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="container mx-auto px-6 py-20">
                        <div className="relative max-w-4xl mx-auto p-12 rounded-3xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 border border-gray-200 shadow-xl">

                            <div className="relative text-center">
                                <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Build Your {service.title}?</h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    Transform your business with intelligent automation today
                                </p>

                                <Link href="/#contact">
                                    <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
                                        <span className="flex items-center gap-3">
                                            Start Your Journey
                                            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        </span>
                                    </button>
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
