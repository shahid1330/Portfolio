import {
  achievements,
  certifications,
  education,
  experience,
  personalInfo,
  projects,
  skills,
} from './data';
import { asset } from './asset';

/**
 * Intent matcher for the portfolio assistant.
 *
 * Deliberately not an LLM. The requirement is that it answers questions about
 * this portfolio and nothing else — a scripted matcher has no general
 * knowledge to leak, whereas a general model has to be *persuaded* not to
 * answer. Every reply is generated from lib/data.ts, so updating a role or a
 * project updates the assistant with it.
 */

export type Answer = {
  text: string;
  /** Section id to offer as a "jump there" link. */
  section?: string;
  /** Follow-up chips shown under the reply. */
  followUps?: string[];
};

const firstName = personalInfo.name.split(' ')[0];

/* ------------------------------------------------------------------ *
 * Text normalisation
 * ------------------------------------------------------------------ */

/** Cheap stemmer: trims plurals and common verb endings so "projects" ~ "project". */
function stem(word: string): string {
  return word
    .replace(/(ies)$/, 'y')
    .replace(/(sses|shes|ches|xes)$/, '')
    .replace(/([^s])s$/, '$1')
    .replace(/(ing|ed)$/, '');
}

// "who" is deliberately absent — it is the main signal for "who is he?".
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'has',
  'have', 'had', 'can', 'could', 'would', 'should', 'will', 'what', 'which',
  'whom', 'whose', 'how', 'why', 'when', 'tell', 'me',
  'you', 'your', 'his', 'him', 'he', 'i', 'of', 'in', 'on', 'at', 'to', 'for',
  'and', 'or', 'any', 'some', 'please', 'know', 'there', 'that', 'this', 'it',
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
    .map(stem);
}

/* ------------------------------------------------------------------ *
 * Off-topic guard
 *
 * Runs before intent scoring. The assistant has no generative ability, so the
 * worst a mis-match can do is return the wrong portfolio answer — but these
 * patterns are unambiguous requests for something this portfolio does not
 * contain, and deserve a clear refusal rather than a sideways answer.
 * ------------------------------------------------------------------ */

const OFF_TOPIC_PATTERNS: RegExp[] = [
  // Asking the assistant to produce something.
  /\b(write|compose|draft|generate|create|make)\s+(me\s+)?(a|an|some)?\s*(poem|story|joke|song|essay|email|letter|recipe|code|script|program|function)\b/,
  /\b(code|script|program|function|algorithm)\s+(for|to|that)\b/,
  /\b(bubble|merge|quick)\s?sort\b/,
  /\b(solve|calculate|compute|translate)\b/,
  // General knowledge.
  /\b(capital of|population of|president|prime minister|weather|world cup|olympics)\b/,
  /\bwho (won|is the president|is the ceo)\b/,
  /\bexplain\s+(quantum|blockchain|relativity|photosynthesis)\b/,
  // Prompt-injection shaped input.
  /\b(ignore|disregard|forget)\s+(all\s+|the\s+|your\s+|previous\s+|prior\s+)*(instruction|rule|prompt|context)/,
  /\b(system prompt|you are now|pretend to be|act as)\b/,
  // Opinion and chit-chat.
  /\b(what do you think|your opinion)\b/,
  /\btell me a (joke|story)\b/,
  /\b(politics|religion|dating)\b/,
];

function isOffTopic(raw: string): boolean {
  const text = raw.toLowerCase();
  return OFF_TOPIC_PATTERNS.some((re) => re.test(text));
}

/* ------------------------------------------------------------------ *
 * Formatting helpers
 * ------------------------------------------------------------------ */

function list(items: string[]): string {
  return items.map((i) => `• ${i}`).join('\n');
}

function joinWords(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const currentRole = experience.find((job) => job.period.endsWith('Present'));

/* ------------------------------------------------------------------ *
 * Skill lookup — "does he know X?"
 * ------------------------------------------------------------------ */

/**
 * Whole-word containment, written by hand rather than with `new RegExp`
 * because skill labels contain regex metacharacters ("C++", "Node.js",
 * "AWS (EC2, S3)") that would otherwise need escaping to be safe.
 */
function containsWord(haystack: string, needle: string): boolean {
  const isWordChar = (c: string | undefined) =>
    c !== undefined && /[a-z0-9]/.test(c);
  let from = 0;
  for (;;) {
    const i = haystack.indexOf(needle, from);
    if (i === -1) return false;
    if (!isWordChar(haystack[i - 1]) && !isWordChar(haystack[i + needle.length])) {
      return true;
    }
    from = i + 1;
  }
}

/**
 * Every way a visitor might name a skill: the label itself, the label without
 * a parenthetical qualifier, and without a ".js" suffix — so "does he know
 * react" matches the "React.js" entry.
 */
function aliasesFor(label: string): string[] {
  const base = label.toLowerCase().replace(/\s*\(.*\)$/, '').trim();
  const aliases = new Set<string>([base]);
  if (base.endsWith('.js')) aliases.add(base.slice(0, -3));
  const acronym = label.match(/\(([A-Za-z]{2,})\)/)?.[1]?.toLowerCase();
  if (acronym) aliases.add(acronym);
  return [...aliases].filter((a) => a.length > 2);
}

const skillIndex: { aliases: string[]; category: string; label: string }[] =
  Object.entries(skills).flatMap(([category, items]) =>
    items.map((label) => ({ aliases: aliasesFor(label), category, label }))
  );

function longestAlias(entry: { aliases: string[] }): number {
  return Math.max(...entry.aliases.map((a) => a.length));
}

function matchSkill(raw: string): { answer: Answer; specific: boolean } | null {
  const text = raw.toLowerCase();

  // Longest alias first so "machine learning" beats a bare "learning".
  const hit = [...skillIndex]
    .sort((a, b) => longestAlias(b) - longestAlias(a))
    .find(({ aliases }) => aliases.some((alias) => containsWord(text, alias)));

  if (!hit) return null;

  // A multi-word technology name is an unambiguous ask for that one thing,
  // so it should win even against a confident generic "skills" match.
  const specific = hit.aliases.some(
    (alias) => containsWord(text, alias) && alias.includes(' ')
  );

  const siblings = skills[hit.category as keyof typeof skills].filter(
    (s) => s !== hit.label
  );

  return {
    specific,
    answer: {
      text: `Yes — ${hit.label} is listed under ${hit.category}.${
        siblings.length ? `\n\nAlongside it: ${siblings.join(', ')}.` : ''
      }`,
      section: 'skills',
    },
  };
}

/* ------------------------------------------------------------------ *
 * Intents
 * ------------------------------------------------------------------ */

type Intent = {
  id: string;
  /** Vocabulary. Multi-word entries are matched as phrases and score higher. */
  keywords: string[];
  answer: () => Answer;
};

const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening'],
    answer: () => ({
      text: `Hi! I can tell you about ${firstName}'s work, projects, skills and background. What would you like to know?`,
      followUps: ['What does he do now?', 'Show me his projects', 'What are his skills?'],
    }),
  },
  {
    id: 'current-role',
    // "where" is deliberately absent — it is equally likely to mean
    // "where did he study" or "where is he based".
    keywords: [
      'current', 'now', 'currently', 'today', 'work', 'working', 'job', 'role',
      'employed', 'company', 'position', 'doing',
    ],
    answer: () => {
      if (!currentRole) {
        return {
          text: `${firstName} is not in a role at the moment and is open to opportunities.`,
          section: 'contact',
        };
      }
      return {
        text: `${firstName} is a ${currentRole.role} at ${currentRole.company} (${currentRole.period}), based in ${currentRole.location}.\n\nThere he:\n${list(
          currentRole.achievements.map((a) => a.replace(/\.$/, ''))
        )}`,
        section: 'experience',
        followUps: ['What tech does he use there?', 'What did he do before?'],
      };
    },
  },
  {
    id: 'internship',
    keywords: ['internship', 'intern', 'jharkhand', 'space', 'crop', 'satellite'],
    answer: () => {
      const internship = experience.find((job) => /intern/i.test(job.role));
      if (!internship) {
        return { text: `I do not have internship details listed.`, section: 'experience' };
      }
      return {
        text: `${internship.role} at ${internship.company} (${internship.period}), ${internship.location}.\n\n${list(
          internship.achievements.map((a) => a.replace(/\.$/, ''))
        )}`,
        section: 'experience',
      };
    },
  },
  {
    id: 'experience',
    keywords: [
      'experience', 'career', 'history', 'background', 'previous', 'past',
      'before', 'worked', 'employment',
    ],
    answer: () => ({
      text: `${firstName} has ${experience.length} roles on his portfolio:\n\n${experience
        .map((job) => `• ${job.role} — ${job.company} (${job.period})`)
        .join('\n')}\n\nAsk about either one for the detail.`,
      section: 'experience',
      followUps: ['What does he do now?', 'Tell me about the internship'],
    }),
  },
  {
    id: 'projects',
    keywords: ['project', 'built', 'build', 'made', 'github', 'repo', 'app', 'careerpilot'],
    answer: () => ({
      text: `${firstName} has ${projects.length} featured projects:\n\n${projects
        .map((p) => `• ${p.name} — ${p.description}`)
        .join('\n')}\n\nEach one links to its GitHub repository on the site.`,
      section: 'projects',
      followUps: ['What are his skills?', 'Tell me about his research'],
    }),
  },
  {
    // Must precede the generic `skills` intent: a question scoped to a role
    // ("what does he use there") wants that role's stack, not the whole
    // toolkit. Every keyword here is a phrase, so it outscores a bare "tech".
    id: 'role-tech',
    keywords: [
      'use there', 'used there', 'uses there', 'using there', 'tech there',
      'stack there', 'work with there', 'at simplify3x', 'with simplify3x',
      'in his current role', 'at his current', 'in that role', 'in this role',
      'at his job', 'at work', 'on the job', 'day to day', 'simplify3x',
    ],
    answer: () => {
      if (!currentRole) {
        return {
          text: `${firstName} is not in a role at the moment.`,
          section: 'experience',
        };
      }
      if (currentRole.tech.length === 0) {
        return {
          text: `The stack for ${currentRole.company} is not listed separately — his contributions there are on the site.`,
          section: 'experience',
        };
      }
      return {
        text: `At ${currentRole.company} he works with:\n\n${list(currentRole.tech)}\n\nThat is the stack for this role — his full toolkit across the portfolio is broader.`,
        section: 'experience',
        followUps: ['What are all his skills?', 'What did he do before?'],
      };
    },
  },
  {
    id: 'skills',
    keywords: [
      'skill', 'tech', 'stack', 'technology', 'tool', 'language', 'framework',
      'library', 'expertise', 'proficient', 'good at', 'strength',
    ],
    answer: () => ({
      text: `Across the whole portfolio, ${firstName} lists ${Object.keys(skills).length} areas:\n\n${Object.entries(
        skills
      )
        .map(([category, items]) => `• ${category}: ${items.join(', ')}`)
        .join('\n')}\n\nAsk about a specific role to see the stack he uses there.`,
      section: 'skills',
      followUps: ['Does he know React?', 'What does he use at work?'],
    }),
  },
  {
    id: 'education',
    keywords: [
      'education', 'degree', 'study', 'studied', 'college', 'university',
      'school', 'mca', 'bca', 'graduate', 'academic', 'qualification',
    ],
    answer: () => ({
      text: `${firstName}'s education:\n\n${education
        .map((e) => `• ${e.degree} — ${e.institution}, ${e.location} (${e.period})`)
        .join('\n')}`,
      section: 'education',
    }),
  },
  {
    id: 'certifications',
    keywords: ['certification', 'certificate', 'certified', 'credential', 'course', 'training'],
    answer: () => ({
      text: `${firstName} holds ${certifications.length} certifications:\n\n${certifications
        .map((c) => `• ${c.name} — ${c.issuer}, ${c.year}`)
        .join('\n')}\n\nEach links to its credential on the site.`,
      section: 'certifications',
    }),
  },
  {
    id: 'research',
    keywords: [
      'research', 'paper', 'publication', 'published', 'ieee', 'springer',
      'journal', 'author',
    ],
    answer: () => ({
      text: `${firstName} has published ${personalInfo.researchPapers.length} research papers:\n\n${personalInfo.researchPapers
        .map((p) => `• ${p.title} (${p.year})`)
        .join('\n')}\n\nThe site links each one online and as a PDF.`,
      section: 'research',
    }),
  },
  {
    id: 'leadership',
    keywords: [
      'leadership', 'community', 'ambassador', 'volunteer', 'council',
      'mentor', 'award', 'achievement', 'initiative',
    ],
    answer: () => ({
      text: `${firstName}'s leadership work:\n\n${achievements
        .map((a) => `• ${a.title} — ${a.role} at ${a.organization} (${a.period})`)
        .join('\n')}`,
      section: 'leadership',
    }),
  },
  {
    id: 'coding-profiles',
    keywords: ['leetcode', 'hackerrank', 'dsa', 'competitive', 'practice'],
    answer: () => ({
      text: `${firstName} practises data structures and algorithms on ${joinWords(
        personalInfo.codingProfiles.map((p) => p.platform)
      )}. Both profiles are linked on the site.`,
      section: 'coding-profiles',
    }),
  },
  {
    id: 'contact',
    keywords: [
      'contact', 'email', 'reach', 'hire', 'hiring', 'recruit', 'available',
      'availability', 'opportunity', 'connect', 'linkedin', 'get in touch',
      'interview',
    ],
    answer: () => {
      const channels = [
        personalInfo.email && `Email: ${personalInfo.email}`,
        personalInfo.social.linkedin && 'LinkedIn (linked on the site)',
        personalInfo.social.github && 'GitHub (linked on the site)',
      ].filter(Boolean) as string[];
      return {
        text: `${firstName} is open to roles and collaborations.\n\n${list(
          channels
        )}\n\nThere is also a contact form at the bottom of the page.`,
        section: 'contact',
      };
    },
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download'],
    answer: () => ({
      text: `You can download ${firstName}'s CV from the button at the top of the page, or straight from here: ${asset(personalInfo.resume)}`,
      section: 'about',
    }),
  },
  {
    id: 'location',
    keywords: [
      'location', 'based', 'live', 'city', 'country', 'relocate', 'remote',
      'bengaluru', 'bangalore', 'india',
    ],
    answer: () => ({
      text: `${firstName} is based in ${personalInfo.location}${
        currentRole ? `, currently working in ${currentRole.location}` : ''
      }.`,
      section: 'about',
    }),
  },
  {
    id: 'about',
    keywords: ['who', 'about', 'introduce', 'yourself', 'summary', 'bio', 'overview', 'himself'],
    answer: () => ({
      text: personalInfo.bio,
      section: 'about',
      followUps: ['What does he do now?', 'Show me his projects'],
    }),
  },
];

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

export const SUGGESTED_QUESTIONS = [
  'What does he do now?',
  'Show me his projects',
  'What are his skills?',
  'Tell me about his research',
  'How can I contact him?',
];

export function greeting(): Answer {
  return {
    text: `Hi, I'm ${firstName}'s assistant. Ask me anything about his experience, projects, skills or research — I only cover what's on this portfolio.`,
    followUps: SUGGESTED_QUESTIONS.slice(0, 3),
  };
}

/** Anything the matcher cannot place. Never guesses. */
export function fallback(): Answer {
  return {
    text: `I can only answer questions about ${firstName}'s portfolio — his experience, projects, skills, education, certifications, research, leadership or contact details.\n\nTry one of the suggestions below, or email him directly${
      personalInfo.email ? ` at ${personalInfo.email}` : ''
    }.`,
    followUps: SUGGESTED_QUESTIONS.slice(0, 3),
  };
}

export function respond(input: string): Answer {
  const raw = input.trim();
  if (!raw) return fallback();
  if (isOffTopic(raw)) return fallback();

  const tokens = tokenize(raw);
  if (tokens.length === 0) return fallback();

  const lower = raw.toLowerCase();
  const skillHit = matchSkill(raw);

  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (keyword.includes(' ')) {
        // Phrases are a stronger signal than any single word.
        if (lower.includes(keyword)) score += 3;
        continue;
      }
      if (tokens.includes(stem(keyword))) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  // A specifically named technology always wins; a single-word one beats only
  // a weak generic match.
  if (skillHit && (skillHit.specific || !best || best.score < 2)) {
    return skillHit.answer;
  }

  // One incidental keyword inside a long question is usually a miss.
  if (!best || (best.score === 1 && tokens.length > 5)) return fallback();

  return best.intent.answer();
}
