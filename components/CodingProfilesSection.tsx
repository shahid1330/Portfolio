'use client';

import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

export default function CodingProfilesSection() {
  return (
    <Section id="coding-profiles">
      <SectionHeading
        eyebrow="Practice"
        title="Coding profiles"
        subtitle="Where I sharpen data structures and algorithms."
        tone="a"
      />

      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {personalInfo.codingProfiles.map((profile, i) => (
          <motion.a
            key={profile.platform}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group"
          >
            <Card interactive className="flex h-full items-center gap-4 p-6">
              <IconTile tone="a" className="h-12 w-12">
                <Code2 className="h-5 w-5" />
              </IconTile>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-ink">
                  {profile.platform}
                </h3>
                <p className="mt-0.5 text-sm text-muted">Profile and solutions</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
            </Card>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
