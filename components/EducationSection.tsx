'use client';

import { motion } from 'framer-motion';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import { education } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

export default function EducationSection() {
  return (
    <Section id="education" className="bg-elevated/40">
      <SectionHeading
        eyebrow="Academics"
        title="Education"
        subtitle="Academic background and qualifications."
        tone="a"
      />

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card interactive className="flex h-full flex-col p-6">
              <IconTile tone="a" className="mb-4 h-11 w-11">
                <GraduationCap className="h-5 w-5" />
              </IconTile>

              <h3 className="text-base font-semibold leading-snug text-ink">
                {edu.degree}
              </h3>
              <p className="mt-1 font-medium text-brand">{edu.institution}</p>

              <div className="mt-4 space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-support" />
                  {edu.location}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-support" />
                  {edu.period}
                </p>
              </div>

              {edu.grade && (
                <div className="mt-auto pt-5">
                  <span className="inline-block rounded-md border border-line bg-elevated px-3 py-1 text-xs font-medium text-ink-soft">
                    {edu.grade}
                  </span>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
