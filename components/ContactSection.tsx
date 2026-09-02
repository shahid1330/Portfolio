'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { Card, Section, SectionHeading } from './ui/Section';

const inputClass =
  'w-full rounded-lg border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none disabled:opacity-60';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm = { firstName: '', lastName: '', email: '', message: '', company: '' };

/** Reasons the route can return, mapped to something a visitor can act on. */
const errorCopy: Record<string, string> = {
  not_configured:
    'The form is not connected yet. Please email me directly using the address below.',
  invalid: 'Please check your name, email address and message, then try again.',
  rate_limited: 'That is a lot of messages at once. Please wait a minute and retry.',
  provider_error:
    'The message could not be delivered. Please email me directly using the address below.',
  network:
    'Could not reach the server. Check your connection, or email me directly below.',
};

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // The site is a static export on GitHub Pages, so there is no server to
    // proxy through — the browser posts to Web3Forms directly. Their access
    // keys are designed to be public for exactly this case.
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      setErrorMessage(errorCopy.not_configured);
      return;
    }

    // Bots fill every field they find; a human never sees this one. Report
    // success so the bot does not retry, but send nothing.
    if (form.company.trim()) {
      setStatus('sent');
      setForm(emptyForm);
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const name = `${form.firstName} ${form.lastName}`.trim();

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio enquiry from ${name}`,
          from_name: 'Portfolio contact form',
          // Hitting reply in the inbox goes straight back to the sender.
          replyto: form.email,
          name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('sent');
        setForm(emptyForm);
        return;
      }

      setStatus('error');
      setErrorMessage(errorCopy.provider_error);
    } catch {
      setStatus('error');
      setErrorMessage(errorCopy.network);
    }
  };

  const sending = status === 'sending';

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Open to roles, collaborations and conversations about applied AI."
        tone="c"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl"
      >
        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  disabled={sending}
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  disabled={sending}
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Second name"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={sending}
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                disabled={sending}
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Honeypot: off-screen and hidden from assistive tech, so only bots fill it. */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>

            {/* aria-live so screen readers announce the outcome. */}
            <div aria-live="polite" className="min-h-0">
              {status === 'sent' && (
                <p className="flex items-start gap-2 rounded-lg border border-support/30 bg-support-soft px-3.5 py-3 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-support" />
                  Thanks — your message has been sent. I will reply to the address
                  you gave.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-2 rounded-lg border border-line bg-elevated px-3.5 py-3 text-sm text-ink">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {errorMessage}
                </p>
              )}
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-line pt-6 text-sm">
            {/* Each link renders only when its value is configured. */}
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-brand"
              >
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </a>
            )}
            {personalInfo.social.github && (
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-brand"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {personalInfo.social.linkedin && (
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-brand"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
