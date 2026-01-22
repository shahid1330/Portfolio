'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-noir-800 to-noir-950" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aurora-cyan/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Let's Build <span className="neon-text">Something Intelligent</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Open to opportunities in AI/ML Engineering, Data Science, and innovative tech projects
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-aurora-cyan focus:outline-none focus:ring-2 focus:ring-aurora-cyan/50 transition-all text-white"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-aurora-cyan focus:outline-none focus:ring-2 focus:ring-aurora-cyan/50 transition-all text-white"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-aurora-cyan focus:outline-none focus:ring-2 focus:ring-aurora-cyan/50 transition-all text-white resize-none"
                  placeholder="I'd love to connect regarding opportunities in AI, Machine Learning, or Data Engineering."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 rounded-full font-bold text-lg
                  bg-gradient-to-r from-aurora-purple to-aurora-cyan
                  text-white shadow-neon
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300
                  flex items-center justify-center gap-3
                `}
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <span>✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Start the Conversation
                    <span>→</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-aurora-cyan font-medium"
                >
                  Thank you! I'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-aurora-pink font-medium"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </form>

            {/* Alternative Contact Methods */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-center text-gray-400 mb-6">
                Or reach out directly
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:your-email@example.com"
                  className="glass-card glass-hover px-6 py-3 rounded-full border-aurora-purple/40 hover:border-aurora-purple transition-all flex items-center gap-2"
                >
                  <span>📧</span>
                  <span>Email</span>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_LINKEDIN || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-hover px-6 py-3 rounded-full border-aurora-blue/40 hover:border-aurora-blue transition-all flex items-center gap-2"
                >
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_GITHUB || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-hover px-6 py-3 rounded-full border-aurora-cyan/40 hover:border-aurora-cyan transition-all flex items-center gap-2"
                >
                  <span>💻</span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
