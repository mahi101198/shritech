'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, ArrowRight, CheckCircle2, Zap, Brain, FileText } from 'lucide-react';

import ServiceCard from '@/components/ui/service-card';
import AuroraBackground from '@/components/ui/aurora-background';
import FloatingOrb from '@/components/ui/floating-orb';

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
        {
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
            title: 'Web Development',
            description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
            delay: 0.6,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-slate-950 to-black"
            style={{ perspective: 2000, transformStyle: "preserve-3d" }}
        >
            <AuroraBackground />

            <FloatingOrb delay={0} duration={8} x="10%" y="20%" />
            <FloatingOrb delay={2} duration={10} x="80%" y="60%" />
            <FloatingOrb delay={4} duration={9} x="50%" y="80%" />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/50 via-purple-950/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-950/40 via-transparent to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8, rotateX: -30 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.5 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-4 py-2"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                        </motion.div>
                        <span className="text-sm text-white/90">Trusted by 500+ businesses worldwide</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 45 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                        className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        Build Custom{' '}
                        <motion.span
                            initial={{ opacity: 0, y: -200, rotateX: -90, z: -300, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0, z: 0, scale: 1 }}
                            transition={{
                                duration: 1.4,
                                delay: 0.5,
                                type: "spring",
                                stiffness: 60,
                                damping: 12,
                                bounce: 0.6
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotateY: 10,
                                textShadow: "0 0 30px rgba(168, 85, 247, 0.8)",
                                transition: { duration: 0.3 }
                            }}
                            className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            style={{
                                transformStyle: "preserve-3d",
                                backgroundSize: '200% 200%'
                            }}
                        >
                            <motion.span
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                                className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text"
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                AI Agents
                            </motion.span>
                        </motion.span>{' '}
                        for Your Business
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30, z: -50 }}
                        animate={{ opacity: 1, y: 0, z: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                        className="mb-10 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        Transform your workflow with intelligent chatbots, automated processes, OCR document extraction, and custom AI solutions tailored to your needs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                                rotateX: 10,
                                boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.5)"
                            }}
                            whileTap={{ scale: 0.95, rotateX: -10 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="group relative flex items-center gap-2 rounded-full overflow-hidden px-8 py-4 text-lg font-semibold text-white transition-all"
                        >
                            <motion.span
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{
                                    x: ['-200%', '200%'],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    repeatDelay: 0.5
                                }}
                            />
                            <span className="absolute inset-0 rounded-full border-2 border-indigo-400/40 group-hover:border-purple-400/60 transition-colors duration-500" />
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-[gradient_3s_ease_infinite] bg-[length:200%_200%]" />
                            <span className="absolute inset-[2px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-300" />
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                            <motion.span
                                className="relative z-10"
                                initial={{ x: 0 }}
                                whileHover={{ x: -5 }}
                            >
                                Start Your Project
                            </motion.span>
                            <motion.div
                                className="relative z-10"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="h-5 w-5" />
                            </motion.div>
                        </motion.button>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                rotateY: 10,
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="group relative rounded-full overflow-hidden px-8 py-4 text-lg font-semibold text-white transition-all"
                        >
                            <motion.span
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                    x: ['-200%', '200%'],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    repeatDelay: 0.8
                                }}
                            />
                            <motion.span
                                className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                                style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '2px' }}
                            />
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="absolute inset-[2px] rounded-full bg-white/5 backdrop-blur-xl" />
                            <span className="relative z-10">View Case Studies</span>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-7xl pb-12"
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: 1000
                        }}
                    >
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                    <div className="h-[700px] w-[700px] rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 blur-3xl" />
                </div>
                <div className="absolute right-0 bottom-0">
                    <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-l from-violet-700/25 to-fuchsia-700/25 blur-3xl" />
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-700/20 to-indigo-700/20 blur-3xl" />
                </div>
            </div>
        </motion.div>
    );
};

export default AIStartupHero;
