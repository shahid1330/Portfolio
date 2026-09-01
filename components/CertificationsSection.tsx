'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

export default function CertificationsSection() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications"
        subtitle="Professional certifications and verified credentials."
        tone="b"
      />

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert.name}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group"
          >
            <Card interactive className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <IconTile tone="b" className="h-11 w-11">
                  <Award className="h-5 w-5" />
                </IconTile>
                <span className="rounded-full border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-muted">
                  {cert.year}
                </span>
              </div>

              <h3 className="text-base font-semibold leading-snug text-ink">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

              {/* mt-auto aligns this row across cards with different title lengths. */}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-brand">
                View credential
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
