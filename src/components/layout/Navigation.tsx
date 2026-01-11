'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/common/ThemeToggle';
import Logo from '@/components/common/Logo';
import ContactModal from '@/components/ui/contact-modal';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/#services' },
    { name: 'Solutions', href: '/#case-studies' },
    { name: 'About', href: '/#about' }
  ];

  const isNavLinkActive = (href: string) => {
    if (typeof window === 'undefined') return false;
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    if (href.startsWith('#')) return currentHash === href || (href === '/#home' && !currentHash);
    return currentPath === href;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-[100] transition-all duration-300 ${scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent border-transparent'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <a
                href="/"
                title="Home - Shriram Tech Solutions"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
              >
                <Logo size="md" showText={true} />
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = isNavLinkActive(item.href);
                return (
                  <motion.a
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    key={item.name}
                    href={item.href}
                    title={`${item.name} - Shriram Tech Solutions`}
                    className={`
                    px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full
                    ${isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                  `}
                  >
                    {item.name}
                  </motion.a>
                );
              })}

              <div className="flex items-center space-x-4 ml-4">
                <ThemeToggle />
                <motion.button
                  onClick={() => setContactModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 rounded-full overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-[1px] rounded-full bg-white dark:bg-gray-950 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                    Get Started
                  </span>

                  {/* Glowing effects adapted for the button */}
                  <span className="absolute inset-0 rounded-full border border-indigo-500/30 group-hover:border-purple-500/50 transition-colors duration-500 opacity-0 group-hover:opacity-100" />
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-b-2xl shadow-xl overflow-hidden"
            >
              <div className="flex flex-col space-y-2 p-4">
                {navItems.map((item) => {
                  const isActive = isNavLinkActive(item.href);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      title={`${item.name} - Shriram Tech Solutions`}
                      className={`
                      block py-3 px-4 rounded-lg font-medium transition-colors duration-200
                      ${isActive
                          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                    `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setContactModalOpen(true);
                    }}
                    className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg shadow-purple-500/20"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}