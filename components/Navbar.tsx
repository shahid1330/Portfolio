'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Research', href: '#research' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-dark-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-primary-500/20' 
            : 'bg-dark-900/60 backdrop-blur-md'
        }`}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-400/60 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
              onClick={() => scrollToSection('#about')}
            >
              <h1 className="font-bold text-xl bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 bg-clip-text text-transparent tracking-tight">
                Mohammad Shahid Raza
              </h1>
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mt-1"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ y: -2 }}
                  className="relative group py-2"
                >
                  <span className={`text-base font-medium transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary-300'
                      : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Underline effect */}
                  {activeSection === link.href.substring(1) ? (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary-300" />
              ) : (
                <Menu className="w-6 h-6 text-primary-300" />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Bottom glow effect */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/30 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-80 bg-gradient-to-b from-dark-900/98 to-dark-800/98 backdrop-blur-2xl border-l border-primary-500/30 lg:hidden shadow-2xl shadow-primary-500/20"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col h-full pt-24 px-6">
              <div className="mb-8">
                <h3 className="text-lg font-bold bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text text-transparent mb-2">
                  Navigation
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
              </div>
              
              <div className="space-y-2 overflow-y-auto flex-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`w-full text-left py-4 px-5 rounded-xl transition-all duration-300 group ${
                      activeSection === link.href.substring(1)
                        ? 'bg-gradient-to-r from-primary-500/30 to-secondary-500/30 text-white border border-primary-500/50 shadow-lg shadow-primary-500/20'
                        : 'text-gray-300 hover:bg-primary-500/10 hover:text-white border border-transparent hover:border-primary-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base">{link.name}</span>
                      <motion.div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          activeSection === link.href.substring(1)
                            ? 'bg-primary-400'
                            : 'bg-gray-600 group-hover:bg-primary-400'
                        }`}
                        animate={activeSection === link.href.substring(1) ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Decorative footer */}
              <div className="mt-6 pt-6 border-t border-primary-500/20">
                <p className="text-xs text-gray-500 text-center">Tap any section to navigate</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
