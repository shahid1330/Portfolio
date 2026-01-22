'use client';

import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function ResearchSection() {
  return (
    <section id="research" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
            Research Publications
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Published research works in AI, ML, and Computer Vision
        </p>

        <div className="space-y-6 max-w-5xl mx-auto">
          {personalInfo.researchPapers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-secondary-500/5 to-accent-500/5 border border-secondary-500/20 hover:border-secondary-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-secondary-500/20"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary-500/0 to-accent-500/0 group-hover:from-secondary-500/10 group-hover:to-accent-500/10 transition-all duration-300" />
              
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon & Year */}
                <div className="flex items-center gap-4 md:flex-col md:items-center md:w-28 flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xl font-bold text-secondary-400">{paper.year}</span>
                </div>

                {/* Paper Title */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-secondary-300 transition-colors leading-relaxed">
                    {paper.title}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-shrink-0">
                  <a
                    href={paper.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-500 hover:to-secondary-600 transition-all shadow-lg shadow-secondary-500/30 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View Online</span>
                  </a>
                  
                  <a
                    href={paper.pdfLink}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 transition-all shadow-lg shadow-accent-500/30 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
