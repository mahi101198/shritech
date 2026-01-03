"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    Bot,
    MessageSquare,
    BrainCircuit,
    ScanLine,
    Layout,
    Smartphone,
    Cpu,
    GraduationCap,
    Terminal,
    Workflow,
    ArrowRight,
    Circle,
    CheckCircle,
    LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { servicesData, ServiceData } from "@/lib/service-data"
import { FloatingOrb } from "@/components/ui/floating-orb"

const iconMap: Record<string, LucideIcon> = {
    Bot,
    MessageSquare,
    BrainCircuit,
    ScanLine,
    Layout,
    Smartphone,
    Cpu,
    GraduationCap,
    Terminal,
    Workflow
};

function ServiceHero({ service }: { service: ServiceData }) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

    const Icon = iconMap[service.iconName] || Bot;

    return (
        <motion.section
            ref={sectionRef}
            style={{ opacity }}
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 px-4 scroll-snap-align-start"
        >
            <div className={`absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20`} />

            {/* Background Orb - Unified Color */}
            <FloatingOrb
                className={cn("top-1/4 right-0 opacity-20")}
                color="linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
            />

            <motion.div
                className={cn("absolute inset-0 opacity-5 bg-gradient-to-br from-blue-500 to-violet-600")}
                style={{ scale }}
            />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div style={{ y }} className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                        >
                            <Circle className="h-2 w-2 fill-primary text-primary" />
                            <span className="text-sm font-medium text-primary">{service.subtitle}</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
                        >
                            {service.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-muted-foreground leading-relaxed"
                        >
                            {service.fullDescription}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link href={`/services/${service.id}`}>
                                <Button size="lg" className="rounded-full group bg-primary text-primary-foreground hover:bg-primary/90">
                                    Learn More
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-3 gap-6 pt-8"
                        >
                            {service.stats.map((stat, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="text-2xl font-bold text-primary">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Visual Card */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                        className="relative"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-10 bg-gradient-to-br from-blue-500 to-violet-600" />
                            <div className="relative bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-violet-600">
                                    <Icon className="text-white w-10 h-10" />
                                </div>

                                <div className="space-y-4">
                                    {service.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="flex items-start gap-3 group"
                                        >
                                            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                            <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export function ServicesScrollShowcase() {
    const [activeService, setActiveService] = useState(0)

    // Optional: If we want the progress bar, we need to track scroll more globally, 
    // but sticking to the vertical layout is sufficient for now.

    return (
        <div className="relative bg-background">
            {/* Gradient Progress Line (Simplified) */}
            <div className="sticky top-0 left-0 w-full h-1 z-50 bg-border/20">
                <motion.div
                    className="h-full bg-primary"
                    style={{ scaleX: useScroll().scrollYProgress }}
                />
            </div>

            {servicesData.map((service, index) => (
                <ServiceHero key={service.id} service={service} />
            ))}
        </div>
    )
}
