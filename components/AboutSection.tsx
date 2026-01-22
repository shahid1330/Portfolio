'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/lib/data';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-noir-800 to-noir-900" />
      
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-aurora-purple/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-aurora-blue/20 rounded-full blur-3xl" />

      <motion.div
        style={{ opacity, y }}
        className="relative container mx-auto px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              The <span className="neon-text">Story</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-aurora-purple to-aurora-cyan mx-auto rounded-full" />
          </motion.div>

          {/* Story Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-aurora-purple to-aurora-cyan rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative glass-panel overflow-hidden">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </motion.div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-panel">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-aurora-cyan to-aurora-blue bg-clip-text text-transparent">
                  Transforming Data Into Intelligence
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {personalInfo.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StoryCard
                  number="5+"
                  label="Research Papers"
                  color="purple"
                />
                <StoryCard
                  number="10M+"
                  label="Daily Predictions"
                  color="cyan"
                />
                <StoryCard
                  number="94%"
                  label="Model Accuracy"
                  color="blue"
                />
                <StoryCard
                  number="3+"
                  label="Years Experience"
                  color="pink"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card border-aurora-cyan/30 p-6"
              >
                <p className="text-gray-400 italic">
                  "I believe in the power of AI to solve humanity's most pressing challenges. 
                  Every model I build, every pipeline I architect, is a step toward that vision."
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Research Papers Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              Published <span className="neon-text">Research</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalInfo.researchPapers.map((paper, index) => (
                <motion.a
                  key={index}
                  href={paper.webLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card glass-hover group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📄</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-2 group-hover:text-aurora-cyan transition-colors line-clamp-2">
                        {paper.title}
                      </h4>
                      <p className="text-xs text-gray-500">{paper.year}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function StoryCard({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: 'purple' | 'cyan' | 'blue' | 'pink';
}) {
  const colorMap = {
    purple: 'from-aurora-purple to-aurora-blue',
    cyan: 'from-aurora-cyan to-aurora-green',
    blue: 'from-aurora-blue to-aurora-purple',
    pink: 'from-aurora-pink to-aurora-purple',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass-card text-center group cursor-default"
    >
      <div className={`text-3xl font-bold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent mb-2`}>
        {number}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}
