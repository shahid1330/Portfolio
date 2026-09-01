'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Bot, ChevronDown, Send, Sparkles, X } from 'lucide-react';
import { greeting, respond, SUGGESTED_QUESTIONS, type Answer } from '@/lib/chatbot';
import { personalInfo } from '@/lib/data';

type Message = {
  id: number;
  from: 'bot' | 'user';
  text: string;
  section?: string;
  followUps?: string[];
};

const TEASER_DELAY_MS = 1200;
const OPEN_DELAY_MS = 4500;
const SESSION_KEY = 'chat-auto-opened';

let nextId = 0;
function toMessage(answer: Answer): Message {
  return { id: nextId++, from: 'bot', ...answer };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [toMessage(greeting())]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const [teaser, setTeaser] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const firstName = personalInfo.name.split(' ')[0];

  /**
   * Records that the visitor has already met the assistant, so it does not
   * announce itself again on the next page load in this session. Called on
   * any engagement — auto-open, a manual open, or dismissing the teaser —
   * not just the timer, or manual users would keep being nagged.
   */
  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* storage blocked — the teaser simply shows again next load */
    }
  }, []);

  // Opens itself once per session so returning visitors are not nagged.
  useEffect(() => {
    // The teaser is a label, not an interruption — it identifies the icon and
    // is shown on every page load. Only the panel auto-opening is rationed.
    const nudge = setTimeout(() => {
      setTeaser(true);
      setUnread(true);
    }, TEASER_DELAY_MS);

    let alreadyGreeted = true;
    try {
      alreadyGreeted = Boolean(sessionStorage.getItem(SESSION_KEY));
    } catch {
      alreadyGreeted = true; // storage blocked — never force the panel open
    }

    // Expanding the whole panel is intrusive, so at most once per session.
    if (!alreadyGreeted) {
      autoOpenTimer.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    }

    return () => {
      clearTimeout(nudge);
      if (autoOpenTimer.current) clearTimeout(autoOpenTimer.current);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTeaser(false);
      markSeen();
      inputRef.current?.focus();
    }
  }, [open, markSeen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = useCallback((question: string) => {
    const text = question.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: nextId++, from: 'user', text }]);
    setDraft('');
    setTyping(true);

    // A brief pause reads as considered rather than canned.
    const delay = 320 + Math.min(text.length * 8, 400);
    setTimeout(() => {
      setMessages((prev) => [...prev, toMessage(respond(text))]);
      setTyping(false);
    }, delay);
  }, []);

  const jumpTo = (section: string) => {
    const el = document.getElementById(section);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    setOpen(false);
  };

  const last = messages[messages.length - 1];
  const chips =
    !typing && last?.from === 'bot'
      ? last.followUps ?? SUGGESTED_QUESTIONS.slice(0, 3)
      : null;

  return (
    <>
      {/* ------------------------------------------------------------ Teaser
          Explains what the icon is before anything expands. Sits above the
          launcher on every screen size so it can never overflow sideways. */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-[5.5rem] right-5 z-50 w-[min(17rem,calc(100vw-2.5rem))] sm:bottom-24 sm:right-6"
          >
            <div className="relative rounded-2xl border border-line bg-surface p-3.5 pr-8 shadow-lift">
              <button
                type="button"
                onClick={() => {
                  // Dismissing is an explicit "not now" — cancel the pending
                  // auto-open rather than reopening two seconds later.
                  if (autoOpenTimer.current) clearTimeout(autoOpenTimer.current);
                  setTeaser(false);
                  setUnread(false);
                  markSeen();
                }}
                aria-label="Dismiss"
                className="absolute right-2 top-2 rounded-md p-1 text-muted transition-colors hover:bg-elevated hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-full items-start gap-2.5 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-violet text-white">
                  <Bot className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-ink">
                      AI Chat Assistant
                    </span>
                    <span className="rounded-full bg-support-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-support">
                      Online
                    </span>
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-muted">
                    Hi there! Ask me anything about {firstName}&apos;s work,
                    projects or skills.
                  </span>
                </span>
              </button>
            </div>

            {/* Tail pointing down at the launcher. */}
            <span
              aria-hidden
              className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-line bg-surface"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------------- Launcher
          Closed, it is a labelled pill so the icon is never unexplained.
          Open, it collapses to a square minimise control. */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Minimise assistant' : `Open the AI chat assistant`}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 320, damping: 22 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className={`group fixed bottom-5 right-5 z-50 flex h-14 items-center justify-center gap-2.5 bg-gradient-to-br from-brand to-violet text-white shadow-lg shadow-brand/30 ring-1 ring-white/10 transition-[width,border-radius,box-shadow] duration-300 hover:shadow-xl hover:shadow-brand/40 sm:bottom-6 sm:right-6 ${
          open ? 'w-14 rounded-2xl' : 'w-auto rounded-full pl-4 pr-5'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, y: 8, rotate: -20 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -8, rotate: 20 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {open ? (
              <ChevronDown className="h-6 w-6" />
            ) : (
              <Bot className="h-[26px] w-[26px]" />
            )}
          </motion.span>
        </AnimatePresence>

        {!open && (
          <span className="whitespace-nowrap text-sm font-semibold">Ask AI</span>
        )}

        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-support opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-support ring-2 ring-canvas" />
          </span>
        )}
      </motion.button>

      {/* ------------------------------------------------------------ Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`Assistant for ${personalInfo.name}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-[23rem] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift sm:right-6"
          >
            {/* Header */}
            <header className="relative shrink-0 overflow-hidden border-b border-line bg-gradient-to-br from-brand to-violet px-4 py-3.5 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 h-24 w-24 rounded-full bg-white/10 blur-2xl"
              />
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-support ring-2 ring-brand" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {firstName}&apos;s Assistant
                  </p>
                  <p className="truncate text-xs text-white/75">
                    Answers from this portfolio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="-mr-1 rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Transcript
                data-lenis-prevent is required: Lenis captures wheel events
                globally, so without it the page scrolls and this panel does not.
                min-h-0 lets the flex child shrink so overflow-y actually applies. */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain bg-canvas px-4 py-4"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex gap-2 ${
                    m.from === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.from === 'bot' && (
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-violet text-white">
                      <Bot className="h-3.5 w-3.5" />
                    </span>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-brand text-brand-ink'
                        : 'rounded-bl-md border border-line bg-surface text-ink'
                    }`}
                  >
                    {/* Plain text with newlines — never HTML. */}
                    <p className="whitespace-pre-wrap">{m.text}</p>

                    {m.section && (
                      <button
                        type="button"
                        onClick={() => jumpTo(m.section!)}
                        className="group/jump mt-2.5 inline-flex items-center gap-1 rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] font-medium text-brand transition-colors hover:border-brand/40"
                      >
                        View section
                        <ArrowRight className="h-3 w-3 transition-transform group-hover/jump:translate-x-0.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-violet text-white">
                    <Bot className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions */}
            <AnimatePresence initial={false}>
              {chips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 overflow-hidden border-t border-line bg-canvas"
                >
                  <div className="flex flex-wrap gap-1.5 px-4 py-3">
                    {chips.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
                      >
                        <Sparkles className="h-3 w-3 text-brand" />
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
              className="shrink-0 border-t border-line bg-surface p-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-1.5 py-1.5 transition-colors focus-within:border-brand">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Ask about ${firstName}…`}
                  aria-label="Ask a question about this portfolio"
                  maxLength={200}
                  className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] text-ink outline-none placeholder:text-muted/70"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label="Send message"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-ink transition-all hover:bg-brand-hover disabled:opacity-35"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
