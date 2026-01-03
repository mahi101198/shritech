'use client';

import { useEffect } from 'react';
import { AnimatedNavbar } from './AnimatedNavbar';
import { DotPatternBackground } from '@/components/ui/dot-pattern-background';
import Footer from './Footer';
import ErrorBoundary from '../common/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionHeight = section.clientHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id') || '';

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`nav a[href*=${sectionId}]`)?.classList.add('text-primary', 'font-semibold');
        } else {
          document.querySelector(`nav a[href*=${sectionId}]`)?.classList.remove('text-primary', 'font-semibold');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200 relative">
        <DotPatternBackground dotSize={1.5} dotGap={32} className="opacity-10 dark:opacity-20" />
        <AnimatedNavbar />
        <main>{children}</main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}