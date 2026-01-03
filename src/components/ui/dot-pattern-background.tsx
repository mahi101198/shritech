"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef } from "react";

interface DotPatternBackgroundProps {
    dotSize?: number;
    dotGap?: number;
    dotColor?: string;
    glowColor?: string;
    className?: string;
}

export function DotPatternBackground({
    dotSize = 1.5,
    dotGap = 32,
    className = "",
}: DotPatternBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let dots: { x: number; y: number; opacity: number; pulseSpeed: number }[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDots();
        };

        const initDots = () => {
            dots = [];
            const cols = Math.ceil(canvas.width / dotGap);
            const rows = Math.ceil(canvas.height / dotGap);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * dotGap,
                        y: j * dotGap,
                        opacity: Math.random() * 0.5 + 0.1,
                        pulseSpeed: Math.random() * 0.02 + 0.005,
                    });
                }
            }
        };

        const drawDots = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = theme === 'dark';
            const baseColor = isDark ? "255, 255, 255" : "0, 0, 0";

            dots.forEach((dot) => {
                // Pulse effect
                dot.opacity += dot.pulseSpeed;
                if (dot.opacity > 0.6 || dot.opacity < 0.1) {
                    dot.pulseSpeed = -dot.pulseSpeed;
                }

                // Mouse interaction
                const dx = mouseX - dot.x;
                const dy = mouseY - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                let size = dotSize;
                let opacity = Math.abs(dot.opacity);

                if (distance < maxDistance) {
                    const scale = (maxDistance - distance) / maxDistance;
                    size = dotSize + scale * 1.5; // Grow
                    opacity += scale * 0.5; // Brighten
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(drawDots);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        drawDots();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotGap, dotSize, theme]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 -z-10 h-full w-full pointer-events-none ${className}`}
        />
    );
}
