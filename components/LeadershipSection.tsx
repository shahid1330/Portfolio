'use client';

import { motion } from 'framer-motion';
import { Target, Trophy, Users } from 'lucide-react';
import { achievements } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

export default function LeadershipSection() {
  return (
    <Section id="leadership" className="bg-elevated/40">
      <SectionHeading
        eyebrow="Community"
        title="Leadership & impact"
        subtitle="Programmes I have helped run and communities I have built."
        tone="b"
      />

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card interactive className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <IconTile tone="b" className="h-11 w-11">
                  <Trophy className="h-5 w-5" />
                </IconTile>
                <span className="rounded-full border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-muted">
                  {item.period}
                </span>
              </div>

              <h3 className="text-base font-semibold leading-snug text-ink">
                {item.title}
              </h3>

              <div className="mt-3 space-y-2 text-sm">
                <p className="flex items-center gap-2 font-medium text-brand">
                  <Users className="h-4 w-4 shrink-0" />
                  {item.organization}
                </p>
                <p className="flex items-center gap-2 text-muted">
                  <Target className="h-4 w-4 shrink-0 text-support" />
                  {item.role}
                </p>
              </div>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft">
                {item.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
