'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/lib/data';

export default function CertificationsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-noir-800 to-noir-900" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora-green/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aurora-purple/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Professional <span className="neon-text">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Continuous learning and industry-recognized expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationCard({
  cert,
  index,
}: {
  cert: typeof certifications[0];
  index: number;
}) {
  const colors = [
    'from-aurora-purple to-aurora-blue',
    'from-aurora-cyan to-aurora-green',
    'from-aurora-blue to-aurora-purple',
    'from-aurora-pink to-aurora-purple',
  ];

  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="relative group perspective-1000"
    >
      <div className="glass-panel h-full relative overflow-hidden p-8">
        {/* Badge Icon */}
        <div className="mb-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-4xl shadow-lg`}>
            🏆
          </div>
        </div>

        {/* Certificate Name */}
        <h3 className="text-xl font-bold mb-4 group-hover:text-aurora-cyan transition-colors leading-relaxed">
          {cert.name}
        </h3>

        {/* Issuer & Year */}
        <div className="space-y-3 text-base">
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-aurora-purple text-xl">📜</span>
            <span>{cert.issuer}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-aurora-cyan text-xl">📅</span>
            <span>{cert.year}</span>
          </div>
        </div>

        {/* Decorative Corner */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color} opacity-10 rounded-bl-full`} />
      </div>

      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity -z-10`} />
    </motion.div>
  );
}
