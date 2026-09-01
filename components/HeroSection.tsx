'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Award, Download, FileText, FolderGit2, MapPin } from 'lucide-react';
import { experience, personalInfo } from '@/lib/data';
import { Container } from './ui/Section';
import { asset } from '@/lib/asset';

const stats = [
  { icon: FileText, value: '5', label: 'Research papers', tone: 'text-brand' },
  { icon: Award, value: '4', label: 'Certifications', tone: 'text-violet' },
  { icon: FolderGit2, value: '3', label: 'Major projects', tone: 'text-support' },
];

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Every transition happens inside a timer callback rather than in the effect
  // body, so no state is set synchronously during render.
  useEffect(() => {
    const word = words[index];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 200);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? 45 : 90
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

export default function HeroSection() {
  const role = useTypewriter(personalInfo.roles);
  // experience is ordered most-recent-first; a period ending in "Present" is live.
  const currentRole = experience.find((job) => job.period.endsWith('Present'));

  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28">
      {/* Soft brand wash behind the fold. Pointer-events off so it never traps clicks. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
          {/* Text column — first in the DOM so it reads first on mobile too. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-support opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-support" />
              </span>
              {currentRole ? `Currently ${currentRole.role}` : 'Open to opportunities'}
            </div>

            <h1 className="text-gradient text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>

            {/* Fixed height stops the layout jumping as characters type in. */}
            <div className="mt-4 flex h-8 items-center sm:h-9">
              <p className="text-lg font-medium text-brand sm:text-xl">
                {role}
                <span className="ml-0.5 inline-block w-px animate-pulse bg-brand align-middle text-transparent">
                  |
                </span>
              </p>
            </div>

            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {personalInfo.bio}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0 text-support" />
              <span>{personalInfo.location}</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={asset(personalInfo.resume)}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-ink shadow-card transition-colors hover:bg-brand-hover"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-line-strong"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Stats sit below the CTAs on their own row so nothing overlaps. */}
            <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-8 sm:gap-6">
              {stats.map(({ icon: Icon, value, label, tone }) => (
                <div key={label}>
                  <Icon className={`mb-2 h-4 w-4 ${tone}`} />
                  <dt className="text-2xl font-bold text-ink sm:text-3xl">{value}</dt>
                  <dd className="mt-0.5 text-xs leading-snug text-muted sm:text-sm">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Portrait — fixed aspect ratio, capped width, centred on mobile. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 mx-auto w-full max-w-xs lg:order-2 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift">
              <Image
                // unoptimized images bypass Next's basePath handling, so
                // the prefix has to be applied here or this 404s on Pages.
                src={asset(personalInfo.image)}
                alt={personalInfo.name}
                fill
                sizes="(max-width: 1024px) 20rem, 22rem"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
