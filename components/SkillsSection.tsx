'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import { useState } from 'react';

export default function SkillsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-noir-950" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Technical <span className="neon-text">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expertise across the entire AI/ML and data engineering ecosystem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skillList}
              index={categoryIndex}
            />
          ))}
        </div>

        {/* Interactive Constellation Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20"
        >
          <SkillConstellation />
        </motion.div>
      </div>
    </section>
  );
}

function SkillCategory({
  category,
  skills,
  index,
}: {
  category: string;
  skills: string[];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    { from: 'aurora-purple', to: 'aurora-blue' },
    { from: 'aurora-cyan', to: 'aurora-green' },
    { from: 'aurora-blue', to: 'aurora-purple' },
    { from: 'aurora-pink', to: 'aurora-purple' },
  ];

  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        className="glass-panel h-full p-8"
      >
        {/* Category Header */}
        <div className="mb-8">
          <div className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r from-${color.from} to-${color.to} bg-opacity-10 border border-${color.from}/30 mb-4`}>
            <h3 className="text-base font-semibold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-aurora-blue">
              {category}
            </h3>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 group/skill cursor-default"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r from-${color.from} to-${color.to} group-hover/skill:animate-pulse`} />
              <span className="text-gray-300 group-hover/skill:text-white transition-colors text-base">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-${color.from} to-${color.to} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10`} />
    </motion.div>
  );
}

function SkillConstellation() {
  const allSkills = Object.values(skills).flat();
  const selectedSkills = allSkills.slice(0, 12); // Show top 12 skills

  return (
    <div className="relative h-96 glass-panel flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full opacity-20">
          {selectedSkills.map((_, index) => {
            const nextIndex = (index + 1) % selectedSkills.length;
            const angle1 = (index / selectedSkills.length) * Math.PI * 2;
            const angle2 = (nextIndex / selectedSkills.length) * Math.PI * 2;
            const radius = 150;
            const centerX = 50;
            const centerY = 50;

            const x1 = centerX + Math.cos(angle1) * radius / 4;
            const y1 = centerY + Math.sin(angle1) * radius / 4;
            const x2 = centerX + Math.cos(angle2) * radius / 4;
            const y2 = centerY + Math.sin(angle2) * radius / 4;

            return (
              <motion.line
                key={index}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#constellation-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: index * 0.1 }}
              />
            );
          })}
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8338ec" />
              <stop offset="50%" stopColor="#3a86ff" />
              <stop offset="100%" stopColor="#06ffa5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {selectedSkills.map((skill, index) => {
        const angle = (index / selectedSkills.length) * Math.PI * 2;
        const radius = 38; // Percentage
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;

        return (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="glass-card px-4 py-2 border-aurora-cyan/40 hover:border-aurora-cyan hover:shadow-neon-cyan transition-all cursor-default whitespace-nowrap">
              <span className="text-xs font-medium">{skill}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-aurora-purple/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}
