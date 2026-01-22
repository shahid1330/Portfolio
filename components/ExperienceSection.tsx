'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '@/lib/data';

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-noir-800 to-noir-900" />
      
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-aurora-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-aurora-blue/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Professional <span className="neon-text">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building impactful AI solutions across leading organizations
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-aurora-purple via-aurora-blue to-aurora-cyan hidden md:block" />

            {/* Experience Cards */}
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience: exp,
  index,
}: {
  experience: typeof experience[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative md:pl-20"
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
        className="absolute left-8 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-aurora-cyan shadow-neon-cyan z-10 hidden md:block"
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-panel group cursor-default p-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 group-hover:text-aurora-cyan transition-colors leading-relaxed">
              {exp.role}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-gray-400 text-base">
              <span className="font-semibold text-aurora-purple">{exp.company}</span>
              <span>•</span>
              <span>{exp.location}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="glass-card px-4 py-2 border-aurora-purple/40">
              <span className="text-sm font-medium text-gray-300">{exp.period}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 mb-8 text-base leading-relaxed">{exp.description}</p>

        {/* Achievements */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold uppercase tracking-wider text-aurora-cyan">
            Key Achievements
          </h4>
          {exp.achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
              className="flex items-start gap-3 group/achievement"
            >
              <div className="mt-2 w-2 h-2 rounded-full bg-aurora-cyan group-hover/achievement:animate-pulse flex-shrink-0" />
              <p className="text-gray-300 group-hover/achievement:text-white transition-colors text-base leading-relaxed">
                {achievement}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-aurora-purple/20 to-aurora-cyan/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
    </motion.div>
  );
}
