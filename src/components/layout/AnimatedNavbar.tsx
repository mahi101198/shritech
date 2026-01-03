"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/common/ThemeToggle";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

interface NavItem {
    name: string;
    href: string;
    description?: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    { name: "Home", href: "/", description: "Return to homepage" },
    { name: "Services", href: "/#services", description: "Our AI capabilities" },
    { name: "Solutions", href: "/#solutions", description: "Case studies & impact" },
    { name: "About", href: "/about", description: "Our story & mission" },
];

export function AnimatedNavbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);
    const [isServicesOpen, setIsServicesOpen] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const handleServicesEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsServicesOpen(true);
        setHoveredPath("/#services");
    };

    const handleServicesLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsServicesOpen(false);
            setHoveredPath(null);
        }, 150);
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm"
                    : "bg-white/0 dark:bg-black/0 backdrop-blur-none border-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2 z-50">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
                    >
                        <Sparkles className="w-5 h-5 fill-white/20" />
                    </motion.div>
                    <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Shriram<span className="font-light">Tech</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-white/5 rounded-full px-2 py-1.5 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-sm relative group/nav">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        if (item.name === "Services") {
                            return (
                                <div
                                    key={item.href}
                                    onMouseEnter={handleServicesEnter}
                                    onMouseLeave={handleServicesLeave}
                                    className="relative"
                                >
                                    <Link
                                        href={item.href}
                                        className="relative px-4 py-2 text-sm font-medium transition-colors block"
                                    >
                                        <span className={cn(
                                            "relative z-10 transition-colors duration-200",
                                            isActive || isServicesOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        )}>
                                            {item.name}
                                        </span>
                                        {hoveredPath === item.href && (
                                            <motion.div
                                                layoutId="nav-hover"
                                                className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full -z-0"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute inset-0 rounded-full border-2 border-transparent -z-0"
                                                style={{
                                                    mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                                                    WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                                                    maskComposite: "exclude",
                                                    WebkitMaskComposite: "xor",
                                                }}
                                            >
                                                <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[spin_3s_linear_infinite]" />
                                            </motion.div>
                                        )}
                                    </Link>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium transition-colors"
                                onMouseEnter={() => setHoveredPath(item.href)}
                                onMouseLeave={() => setHoveredPath(null)}
                            >
                                <span className={cn(
                                    "relative z-10 transition-colors duration-200",
                                    isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                )}>
                                    {item.name}
                                </span>
                                {hoveredPath === item.href && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full -z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 rounded-full border-2 border-transparent -z-0"
                                        style={{
                                            mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                                            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                                            maskComposite: "exclude",
                                            WebkitMaskComposite: "xor",
                                        }}
                                    >
                                        <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[spin_3s_linear_infinite]" />
                                    </motion.div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <ServicesMegaMenu
                    isOpen={isServicesOpen}
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                />

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-8 py-4 text-lg font-semibold hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                    >
                        Get Started
                        <ArrowRight className="h-5 w-5" />
                    </HoverBorderGradient>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[540px] border-l-gray-200/50 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold">Menu</span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center justify-between p-4 rounded-xl transition-all",
                                            pathname === item.href
                                                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50"
                                                : "hover:bg-gray-50 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <div>
                                            <div className={cn(
                                                "font-medium mb-1",
                                                pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"
                                            )}>
                                                {item.name}
                                            </div>
                                            {item.description && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.description}
                                                </div>
                                            )}
                                        </div>
                                        {pathname === item.href && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                        )}
                                    </Link>
                                ))}
                                <div className="mt-8">
                                    <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 h-12 text-lg">
                                        Get Started Now
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}
