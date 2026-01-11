"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles, Menu, X, ChevronDown, ArrowRight, ChevronRight } from "lucide-react";
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
import { servicesData } from "@/lib/service-data";
import { useContactModal } from "@/contexts/ContactModalContext";
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
} from "lucide-react";

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

// Icon mapping for services
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

// Mobile Menu Component with Expandable Services
interface MobileMenuProps {
    pathname: string;
    navItems: NavItem[];
}

function MobileMenu({ pathname, navItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [servicesExpanded, setServicesExpanded] = React.useState(false);
    const { openModal } = useContactModal();

    const handleGetStartedClick = () => {
        setIsOpen(false);
        openModal();
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full h-full border-none bg-white dark:bg-black overflow-hidden p-0">
                <div className="flex flex-col h-full">
                    <SheetHeader className="px-6 py-6 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
                        <SheetTitle className="flex items-center gap-3">
                            <motion.div
                                initial={{ rotate: 0, scale: 0 }}
                                animate={{ rotate: 360, scale: 1 }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
                            >
                                <Sparkles className="w-5 h-5" />
                            </motion.div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Shriram<span className="font-light">Tech</span>
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 px-6 py-8 overflow-y-auto">
                        <div className="flex flex-col gap-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        // Special handling for Services item
                        if (item.name === "Services") {
                            return (
                                <div key={item.href} className="flex flex-col gap-2">
                                    {/* Services Header - Clickable to expand/collapse */}
                                    <motion.button
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        onClick={() => setServicesExpanded(!servicesExpanded)}
                                        className={cn(
                                            "group flex items-center justify-between p-5 rounded-2xl transition-all w-full text-left shadow-md",
                                            servicesExpanded
                                                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800"
                                                : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-white/5 dark:hover:to-white/10 border-2 border-transparent"
                                        )}
                                    >
                                        <div>
                                            <div className={cn(
                                                "font-semibold text-base",
                                                servicesExpanded ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"
                                            )}>
                                                {item.name}
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ 
                                                rotate: servicesExpanded ? 90 : 0,
                                                scale: servicesExpanded ? 1.2 : 1
                                            }}
                                            transition={{ duration: 0.3, type: "spring" }}
                                        >
                                            <ChevronRight className={cn(
                                                "w-6 h-6",
                                                servicesExpanded ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
                                            )} />
                                        </motion.div>
                                    </motion.button>

                                    {/* Expandable Services List */}
                                    <AnimatePresence>
                                        {servicesExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, scale: 0.95 }}
                                                animate={{ height: "auto", opacity: 1, scale: 1 }}
                                                exit={{ height: 0, opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="ml-2 pl-6 border-l-4 border-gradient-to-b from-blue-400 via-purple-400 to-pink-400 flex flex-col gap-1 py-3">
                                                    {servicesData.map((service, index) => {
                                                        const Icon = iconMap[service.iconName] || Bot;
                                                        return (
                                                            <motion.div
                                                                key={service.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -20 }}
                                                                transition={{ 
                                                                    delay: index * 0.05,
                                                                    duration: 0.3,
                                                                    ease: "easeOut"
                                                                }}
                                                            >
                                                                <Link
                                                                    href={`/services/${service.id}`}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 hover:shadow-md hover:scale-105"
                                                                >
                                                                    <motion.div
                                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                                        transition={{ type: "spring", stiffness: 400 }}
                                                                        className={cn(
                                                                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br text-white shadow-lg",
                                                                            service.gradient
                                                                        )}
                                                                    >
                                                                        <Icon className="w-5 h-5" />
                                                                    </motion.div>
                                                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                        {service.title}
                                                                    </h4>
                                                                </Link>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        // Regular navigation items
                        return (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "group flex items-center justify-between p-5 rounded-2xl transition-all shadow-md",
                                        isActive
                                            ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800"
                                            : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-white/5 dark:hover:to-white/10 border-2 border-transparent"
                                    )}
                                >
                                    <div>
                                        <div className={cn(
                                            "font-semibold text-base",
                                            isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"
                                        )}>
                                            {item.name}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}

                        </div>
                    </div>

                    {/* Get Started Button */}
                    <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 dark:border-white/10">
                        <HoverBorderGradient
                            containerClassName="w-full rounded-full"
                            as="button"
                            onClick={handleGetStartedClick}
                            className="w-full h-14 text-lg font-bold flex items-center justify-center gap-2"
                        >
                            Get Started Now
                            <ArrowRight className="w-5 h-5" />
                        </HoverBorderGradient>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export function AnimatedNavbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);
    const [isServicesOpen, setIsServicesOpen] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const { openModal } = useContactModal();

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
                        onClick={openModal}
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center gap-2 px-8 py-4 text-lg font-semibold hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                    >
                        Get Started
                        <ArrowRight className="h-5 w-5" />
                    </HoverBorderGradient>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu */}
                <div className="flex items-center gap-2 md:hidden">
                    <MobileMenu pathname={pathname} navItems={navItems} />
                </div>
            </div>
        </motion.header>
    );
}
