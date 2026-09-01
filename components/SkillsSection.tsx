'use client';

import { motion } from 'framer-motion';
import {
  BarChart3,
  Brain,
  Cloud,
  Code2,
  Database,
  Globe,
  Library,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { skills } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

const iconMap: Record<string, LucideIcon> = {
  'Programming Languages': Code2,
  'Data Science & Machine Learning': Brain,
  'Libraries & Frameworks': Library,
  'Web & Backend Development': Globe,
  'Data Engineering & MLOps': BarChart3,
  'AI & LLMs': Sparkles,
  'DevOps & Cloud': Cloud,
  'Tools & Platforms': Wrench,
  'Databases & Core Concepts': Database,
};

export default function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Toolkit"
        title="Technical skills"
        subtitle="The languages, libraries and platforms I reach for day to day."
        tone="c"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], i) => {
          const Icon = iconMap[category] ?? Code2;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card interactive className="h-full p-6">
                <div className="mb-4 flex items-center gap-3">
                  <IconTile tone="c" className="h-10 w-10">
                    <Icon className="h-[18px] w-[18px]" />
                  </IconTile>
                  <h3 className="text-sm font-semibold leading-snug text-ink">
                    {category}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs font-medium text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
