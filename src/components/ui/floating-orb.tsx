"use client"

import { motion } from "framer-motion"

interface FloatingOrbProps {
    delay?: number;
    duration?: number;
    className?: string;
    color?: string; // Optional custom gradient
    x?: string;
    y?: string;
}

export function FloatingOrb({ delay = 0, duration = 20, className, color, x, y }: FloatingOrbProps) {
    return (
        <motion.div
            className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl ${className ?? ''}`}
            style={{
                left: x,
                top: y,
                background: color || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }}
            animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
        />
    )
}
