'use client';

import { motion } from 'framer-motion';
import { achievements } from '@/lib/data';

export default function AchievementsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-noir-950" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Leadership & <span className="neon-text">Impact</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Driving innovation and excellence in AI/ML engineering
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass-card glass-hover group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl flex-shrink-0"
                  >
                    ✨
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-primary-400 font-semibold mb-1">{achievement.organization}</p>
                    <p className="text-sm text-gray-400 mb-3">{achievement.role} • {achievement.period}</p>
                    <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
