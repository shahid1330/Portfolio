'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Target } from 'lucide-react';
import { achievements } from '@/lib/data';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-secondary-400 to-primary-400 bg-clip-text text-transparent">
            Leadership & Impact
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Leading initiatives and driving community engagement
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-secondary-500/5 to-primary-500/5 border border-secondary-500/20 hover:border-secondary-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-secondary-500/20"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary-500/0 to-primary-500/0 group-hover:from-secondary-500/10 group-hover:to-primary-500/10 transition-all duration-300" />
              
              <div className="relative space-y-6">
                {/* Icon & Period */}
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-2 rounded-lg bg-secondary-500/10 border border-secondary-500/30 text-secondary-300 text-sm font-medium">
                    {achievement.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-secondary-300 transition-colors leading-relaxed">
                  {achievement.title}
                </h3>

                {/* Organization & Role */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary-400 font-semibold text-lg">
                    <Users className="w-5 h-5" />
                    <span>{achievement.organization}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Target className="w-5 h-5 text-accent-400" />
                    <span className="text-base">{achievement.role}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-base">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
