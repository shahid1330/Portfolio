'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

export default function ExperienceSection() {
  return (
    <Section id="experience" className="bg-elevated/40">
      <SectionHeading
        eyebrow="Career"
        title="Professional experience"
        subtitle="Full-time engineering work, internships and applied machine learning."
        tone="a"
      />

      <div className="mx-auto max-w-3xl space-y-6">
        {experience.map((exp, i) => (
          <motion.div
            key={`${exp.company}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <IconTile tone="a" className="h-12 w-12">
                  <Briefcase className="h-5 w-5" />
                </IconTile>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-lg font-semibold text-ink sm:text-xl">
                      {exp.role}
                    </h3>
                    {/* Derived from the period rather than a separate flag, so
                        the badge can never disagree with the dates. */}
                    {exp.period.endsWith('Present') && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-support/30 bg-support-soft px-2.5 py-1 text-xs font-medium text-support">
                        <span className="h-1.5 w-1.5 rounded-full bg-support" />
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-medium text-brand">{exp.company}</p>
                  <p className="mt-1 text-sm text-muted">{exp.description}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 shrink-0 text-support" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0 text-support" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Key contributions
                </h4>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      />
                      {/* Left-aligned: justified text produced the ragged word gaps. */}
                      <p className="text-pretty text-sm leading-relaxed text-ink-soft">
                        {achievement}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Same pill treatment as the skills grid. */}
                {exp.tech.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {exp.tech.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
