'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Database,
  Code,
  Braces,
  Cloud,
  GitBranch,
  BarChart3,
  Workflow
} from 'lucide-react';
import { skills } from '@/lib/data';

const iconMap: Record<string, any> = {
  'Machine Learning': Brain,
  'Deep Learning': Brain,
  'Programming Languages': Code,
  'Data Science & Analytics': BarChart3,
  'Databases': Database,
  'Frameworks & Libraries': Braces,
  'Cloud & DevOps': Cloud,
  'Tools & Platforms': Workflow,
  'Version Control': GitBranch,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Technologies and tools I work with
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {Object.entries(skills).map(([category, items], index) => {
            const Icon = iconMap[category] || Code;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary-500/20"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300" />
                
                <div className="relative space-y-4">
                  {/* Icon & Category */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                      {category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm rounded-lg bg-primary-500/10 border border-primary-500/20 text-gray-300 hover:bg-primary-500/20 hover:text-white transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
