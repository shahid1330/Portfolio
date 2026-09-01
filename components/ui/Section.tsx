import { ReactNode } from 'react';

/**
 * Every section on the page routes its layout through these three
 * primitives, so horizontal rhythm is identical from top to bottom.
 */

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Three ramps, rotated across sections so the page is not one repeated hue. */
export type Tone = 'a' | 'b' | 'c';

const headingTone: Record<Tone, string> = {
  a: 'text-gradient',
  b: 'text-gradient text-gradient-b',
  c: 'text-gradient text-gradient-c',
};

const eyebrowTone: Record<Tone, string> = {
  a: 'text-brand',
  b: 'text-violet',
  c: 'text-support',
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'a',
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: Tone;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowTone[tone]}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`${headingTone[tone]} text-balance text-3xl font-bold tracking-tight sm:text-4xl`}
      >
        {title}
      </h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
        {subtitle}
      </p>
    </div>
  );
}

/** Neutral surface card. Hover lifts with shadow — never scale, which overflows. */
export function Card({
  children,
  className = '',
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 ${
        interactive
          ? 'hover:-translate-y-1 hover:border-line-strong hover:shadow-lift'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

const tileTone: Record<Tone, string> = {
  a: 'from-brand to-violet shadow-brand/25',
  b: 'from-violet to-support shadow-violet/25',
  c: 'from-support to-brand shadow-support/25',
};

/** Gradient tile that holds a lucide icon. Carries most of the page's colour. */
export function IconTile({
  children,
  className = '',
  tone = 'a',
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${tileTone[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
