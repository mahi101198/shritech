'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -150, rotateY: -90, rotateX: 45, z: -200, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, rotateX: 0, z: 0, scale: 1 }}
            transition={{
                duration: 1.2,
                delay,
                type: "spring",
                stiffness: 80,
                damping: 15
            }}
            whileHover={{
                scale: 1.08,
                rotateY: 8,
                rotateX: -5,
                z: 80,
                boxShadow: "0 30px 60px -15px rgba(124, 58, 237, 0.5)",
                transition: { duration: 0.4, type: "spring", stiffness: 300 }
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1500
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
            <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
            <motion.div
                className="relative z-10"
                style={{ transformStyle: "preserve-3d" }}
            >
                <motion.div
                    whileHover={{
                        rotateZ: 360,
                        scale: 1.15,
                        rotateY: 180
                    }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <motion.div
                        animate={{ rotateY: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        {icon}
                    </motion.div>
                </motion.div>
                <motion.h3
                    className="text-xl font-semibold text-white mb-2"
                    whileHover={{ x: 5, color: "#a78bfa" }}
                    transition={{ duration: 0.2 }}
                >
                    {title}
                </motion.h3>
                <motion.p
                    className="text-white/60 text-sm leading-relaxed"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    {description}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default ServiceCard;
