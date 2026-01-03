'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, animate, useMotionTemplate } from 'framer-motion';

const COLORS_TOP = ['#4338ca', '#7c3aed', '#c026d3', '#db2777'];

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

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0f0a1e 50%, ${color})`;

    return (
        <motion.div
            style={{ backgroundImage }}
            className="absolute inset-0 -z-10"
        />
    );
};

export default AuroraBackground;
