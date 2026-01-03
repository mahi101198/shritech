"use client";

import React from "react";
import { motion } from "framer-motion";
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
    LucideIcon
} from "lucide-react";

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

interface ServiceHeroVisualProps {
    iconName: string;
    gradient: string;
}

export function ServiceHeroVisual({ iconName, gradient }: ServiceHeroVisualProps) {
    const Icon = iconMap[iconName] || Bot;

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000">
            {/* Background Glow */}
            <motion.div
                className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${gradient} opacity-20 blur-[80px]`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Rotating Rings */}
            <motion.div
                className="absolute w-80 h-80 rounded-full border border-white/10"
                style={{ rotateX: "60deg" }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-60 h-60 rounded-full border border-white/10"
                style={{ rotateX: "60deg", rotateY: "30deg" }}
                animate={{ rotateZ: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Floating Element */}
            <motion.div
                className="relative z-10 w-40 h-40 rounded-3xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center shadow-2xl"
                animate={{
                    y: [-10, 10, -10],
                    rotateY: [0, 10, 0, -10, 0],
                    rotateX: [0, 10, 0, -10, 0]
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                {/* Inner Icon Container */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} p-4 flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-10 h-10" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-lg bg-white/5 border border-white/20 backdrop-blur-md animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-80" />

            </motion.div>
        </div>
    );
}
