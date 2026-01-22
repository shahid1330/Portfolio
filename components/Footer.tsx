'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-noir-950" />

      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-3 neon-text">
                Mohammad Shahid Raza
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI/ML Engineer crafting intelligent solutions that transform data into actionable insights.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-aurora-cyan mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-aurora-cyan transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-aurora-cyan mb-4">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {personalInfo.social.github && (
                  <SocialLink
                    href={personalInfo.social.github}
                    label="GitHub"
                    icon="💻"
                  />
                )}
                {personalInfo.social.linkedin && (
                  <SocialLink
                    href={personalInfo.social.linkedin}
                    label="LinkedIn"
                    icon="💼"
                  />
                )}
                {personalInfo.social.twitter && (
                  <SocialLink
                    href={personalInfo.social.twitter}
                    label="Twitter"
                    icon="🐦"
                  />
                )}
                {personalInfo.email && (
                  <SocialLink
                    href={`mailto:${personalInfo.email}`}
                    label="Email"
                    icon="📧"
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-500 text-sm">
              © {currentYear} Mohammad Shahid Raza. Built with Next.js, TypeScript & Three.js
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-aurora-pink"
              >
                ❤️
              </motion.span>
              <span>and</span>
              <span className="text-aurora-cyan">AI</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Exit Animation Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aurora-cyan to-transparent opacity-50" />
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      className="glass-card px-4 py-2 rounded-full border-white/10 hover:border-aurora-cyan/50 transition-all flex items-center gap-2 text-sm"
    >
      <span>{icon}</span>
      <span className="text-gray-400 hover:text-white transition-colors">
        {label}
      </span>
    </motion.a>
  );
}
