'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { education } from '@/lib/data';

export default function EducationSection() {
  return (
    <section id="education" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Academic background and qualifications
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-10 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary-500/20"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300" />
              
              <div className="relative space-y-5">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>

                {/* Degree */}
                <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors leading-relaxed">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="text-xl text-primary-400 font-semibold">
                  {edu.institution}
                </p>

                {/* Location & Period */}
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent-400" />
                    <span className="text-base">{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent-400" />
                    <span className="text-base">{edu.period}</span>
                  </div>
                </div>

                {/* Grade/CGPA */}
                {edu.grade && (
                  <div className="pt-5 border-t border-primary-500/20">
                    <div className="inline-block px-5 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                      <span className="text-base font-medium text-primary-300">
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
