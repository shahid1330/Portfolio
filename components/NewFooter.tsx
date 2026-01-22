'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-primary-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950" />

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500/10 border border-primary-500/20 text-gray-300 hover:text-white hover:bg-primary-500/20 hover:border-primary-500/40 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary-500/10 border border-secondary-500/20 text-gray-300 hover:text-white hover:bg-secondary-500/20 hover:border-secondary-500/40 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/20 text-gray-300 hover:text-white hover:bg-accent-500/20 hover:border-accent-500/40 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="text-center space-y-1">
              <p className="text-gray-400 text-sm">
                <a href={`mailto:${personalInfo.email}`} className="text-primary-400 hover:text-primary-300 transition-colors">{personalInfo.email}</a>
              </p>
              <p className="text-gray-400 text-sm">{personalInfo.phone}</p>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
