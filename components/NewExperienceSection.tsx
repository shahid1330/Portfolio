'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { experience } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="section px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Professional Experience
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-20 text-lg">
          Internships and professional work experience
        </p>

        <div className="space-y-16">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="space-y-10 flex flex-col items-center"
            >
              {/* Header - Centered */}
              <div className="flex flex-col items-center text-center gap-6 w-full">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-2xl text-primary-400 font-semibold">
                    {exp.company}
                  </p>
                  <p className="text-lg text-gray-400 font-medium">
                    {exp.description}
                  </p>
                </div>

                {/* Period & Location */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-base text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

              {/* Achievements */}
              <div className="space-y-8 w-full max-w-4xl">
                <h4 className="text-2xl font-bold text-white text-center mb-10">Key Contributions:</h4>
                <ul className="space-y-6 px-4 md:px-8">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-5">
                      <div className="w-3 h-3 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed text-lg text-justify flex-1" style={{ textAlignLast: 'left' }}>
                        {achievement}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
