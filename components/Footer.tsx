'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { Container } from './ui/Section';

export default function Footer() {
  const year = new Date().getFullYear();

  // Skip anything not configured rather than linking to nowhere.
  const socials = [
    { href: personalInfo.social.github, label: 'GitHub', Icon: Github },
    { href: personalInfo.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
    {
      href: personalInfo.email ? `mailto:${personalInfo.email}` : '',
      label: 'Email',
      Icon: Mail,
    },
  ].filter((social) => social.href);

  return (
    <footer className="border-t border-line bg-elevated/40 py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-ink">{personalInfo.name}</p>
            <p className="mt-1 text-sm text-muted">
              {[personalInfo.title, personalInfo.phone].filter(Boolean).join(' · ')}
            </p>
          </div>

          <div className="flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-center text-xs text-muted">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
