# Portfolio — Mohammad Shahid Raza

Personal portfolio site. Next.js App Router, TypeScript, Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment

Copy `.env.example` to `.env.local` and fill in what you need. Anything left
blank is hidden by the UI rather than rendered as an empty link.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Fetches live stars/forks for the project cards |
| `NEXT_PUBLIC_GITHUB_TOKEN` | Optional — only needed if you hit GitHub's 60 req/hour anonymous limit |
| `NEXT_PUBLIC_EMAIL` | Contact address shown on the page |
| `NEXT_PUBLIC_PHONE` | Shown in the footer |
| `NEXT_PUBLIC_LINKEDIN` / `NEXT_PUBLIC_GITHUB` | Social links |
| `WEB3FORMS_ACCESS_KEY` | Delivers contact-form submissions. Server-side only — no `NEXT_PUBLIC_` prefix |

Get a Web3Forms key at https://web3forms.com — it emails you one, no account needed.

**When deploying, set these in your host's environment settings.** `.env.local`
is gitignored, so it does not travel with the repo.

## Structure

```
app/
  api/contact/    Validates a submission and forwards it to Web3Forms
  api/github/     Returns one repo's live stats
  layout.tsx      Fonts, metadata, no-flash theme script
  page.tsx        Section order
components/
  ui/Section.tsx  Container, Section, SectionHeading, Card, IconTile
  *Section.tsx    One file per page section
lib/
  data.ts         All content — edit here, not in the components
  github.ts       GitHub API client
```

## Editing content

Everything on the page comes from `lib/data.ts`: experience, projects, skills,
education, certifications, publications and leadership. The components render
whatever is in there, so adding a role or a project means editing that one file.

## Theming

Colour is defined once as CSS custom properties in `app/globals.css` and exposed
to Tailwind through `@theme inline`. Light values live on `:root`, dark values on
`.dark`. A blocking script in `app/layout.tsx` applies the saved theme before
first paint so there is no flash.
