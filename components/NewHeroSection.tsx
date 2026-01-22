'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FileText, Award, Code2, Download } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentRole.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-60 pb-20">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Profile Image - Full Height */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start order-2 lg:order-1 h-full"
          >
            <div className="relative group w-full h-full min-h-[500px] lg:min-h-[600px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden ring-4 ring-primary-500/20">
                <Image
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Name, Roles, Bio, Quote */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12 text-center lg:text-left order-1 lg:order-2 px-6 lg:px-0"
          >
            {/* Name */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </motion.h1>
              
              {/* Typewriter Roles */}
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                  {text}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed text-justify"
              style={{ textAlignLast: 'left' }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Quote - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="py-8"
            >
              <div className="p-8 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/30 backdrop-blur-sm">
                <p className="text-lg md:text-xl text-gray-200 italic leading-relaxed">
                  "{personalInfo.quote}"
                </p>
              </div>
            </motion.div>

            {/* Quick Stats - With Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/5 border border-primary-500/20 hover:border-primary-500/40 transition-all hover:scale-105">
                <Code2 className="w-12 h-12 mx-auto mb-4 text-primary-400" />
                <div className="text-4xl font-bold text-white mb-2">5</div>
                <div className="text-base text-gray-300">Research Papers</div>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-secondary-500/10 to-secondary-500/5 border border-secondary-500/20 hover:border-secondary-500/40 transition-all hover:scale-105">
                <Award className="w-12 h-12 mx-auto mb-4 text-secondary-400" />
                <div className="text-4xl font-bold text-white mb-2">4</div>
                <div className="text-base text-gray-300">Certifications</div>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-accent-500/10 to-accent-500/5 border border-accent-500/20 hover:border-accent-500/40 transition-all hover:scale-105">
                <Code2 className="w-12 h-12 mx-auto mb-4 text-accent-400" />
                <div className="text-4xl font-bold text-white mb-2">3</div>
                <div className="text-base text-gray-300">Major Projects</div>
              </div>
            </motion.div>

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center lg:justify-start pt-10"
            >
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30 text-white font-semibold text-lg"
              >
                <Download className="w-6 h-6" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
