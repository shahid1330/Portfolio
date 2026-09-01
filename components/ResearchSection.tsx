'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { Card, IconTile, Section, SectionHeading } from './ui/Section';
import { asset } from '@/lib/asset';

export default function ResearchSection() {
  return (
    <Section id="research" className="bg-elevated/40">
      <SectionHeading
        eyebrow="Publications"
        title="Research"
        subtitle="Peer-reviewed work in machine learning, computer vision and IoT."
        tone="c"
      />

      <div className="mx-auto max-w-3xl space-y-4">
        {personalInfo.researchPapers.map((paper, i) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Card interactive className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <IconTile tone="c" className="h-11 w-11">
                  <FileText className="h-5 w-5" />
                </IconTile>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-medium text-muted">{paper.year}</p>
                  <h3 className="text-pretty text-sm font-semibold leading-snug text-ink sm:text-base">
                    {paper.title}
                  </h3>
                </div>

                {/* Wraps under the title on narrow screens instead of overflowing. */}
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={paper.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-elevated px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </a>
                  <a
                    href={asset(paper.pdfLink)}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-elevated px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-line-strong"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
