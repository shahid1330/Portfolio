'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { certifications } from '@/lib/data';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Certifications
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Professional certifications and credentials
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary-500/20 cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300" />
              
              <div className="relative space-y-4">
                {/* Icon & Year */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/30">
                    <Calendar className="w-4 h-4 text-primary-400" />
                    <span className="text-sm font-medium text-primary-300">{cert.year}</span>
                  </div>
                </div>

                {/* Certificate Name */}
                <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <p className="text-lg text-primary-400 font-semibold">
                  {cert.issuer}
                </p>

                {/* View Credential Link */}
                <div className="pt-4 flex items-center gap-2 text-accent-400 group-hover:text-accent-300 transition-colors">
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-sm font-medium">View Credential</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
