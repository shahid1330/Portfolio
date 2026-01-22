'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
            Coding Profiles
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Practice platforms and competitive programming profiles
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {personalInfo.codingProfiles.map((profile, index) => (
            <motion.a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-accent-500/5 to-primary-500/5 border border-accent-500/20 hover:border-accent-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-accent-500/30 cursor-pointer"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/0 to-primary-500/0 group-hover:from-accent-500/10 group-hover:to-primary-500/10 transition-all duration-300" />
              
              <div className="relative flex items-center gap-6">
                {/* Icon */}
                <div className="w-18 h-18 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-lg shadow-accent-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
                  <Code2 className="w-9 h-9 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-accent-300 transition-colors mb-2">
                    {profile.platform}
                  </h3>
                  <p className="text-gray-400 text-base">View my profile and solutions</p>
                </div>

                {/* External link icon */}
                <ExternalLink className="w-5 h-5 text-accent-400 group-hover:text-accent-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
