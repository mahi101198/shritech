"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/lib/service-data";
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
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
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

interface ServicesMegaMenuProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function ServicesMegaMenu({ isOpen, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 shadow-2xl z-40 overflow-hidden"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="container mx-auto py-8 px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                Our Intelligent Services
                            </h3>
                            <Link
                                href="/#services"
                                className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                View all services <ArrowRight className="ml-1 w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {servicesData.map((service) => {
                                const Icon = iconMap[service.iconName] || Bot;

                                return (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.id}`}
                                        className="group flex flex-col p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-gray-100 dark:hover:border-white/5"
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br text-white shadow-sm transition-transform group-hover:scale-110 duration-300",
                                            service.gradient
                                        )}>
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {service.title}
                                        </h4>

                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {service.shortDescription}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom highlight bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
