'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { projects } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Work"
        title="Featured projects"
        subtitle="AI/ML projects built end to end, from data pipeline through model to interface."
        tone="b"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {/* h-full + flex column keeps every card the same height in a row. */}
            <Card interactive className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <IconTile tone="b" className="h-11 w-11">
                  <Github className="h-5 w-5" />
                </IconTile>
              </div>

              <h3 className="text-base font-semibold text-ink">{project.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.description}
              </p>


              <div className="mt-auto flex gap-2 pt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-elevated px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-line-strong"
                >
                  <Github className="h-4 w-4" />
                  View code
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
