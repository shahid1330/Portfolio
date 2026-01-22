# 🌟 Cinematic AI/ML Engineer Portfolio

A premium, fully animated personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber. Designed with Aurora Cyber Noir aesthetics for maximum visual impact.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 Design
- **Aurora Cyber Noir** color system with neon gradients
- Glassmorphism UI panels with soft glow effects
- Fully dark theme - no white backgrounds
- Responsive and mobile-first design
- Custom scrollbar and smooth scrolling with Lenis

### 🎬 Animations
- Cinematic page transitions with Framer Motion
- Scroll-based storytelling with GSAP
- 3D interactive elements with React Three Fiber
- Magnetic hover effects on buttons
- Animated skill constellations
- Typewriter effects and particle animations

### 🚀 Functionality
- **Dynamic GitHub Integration**: Projects auto-sync with GitHub API
- **Resume Download**: One-click PDF download
- **Contact Form**: Elegant form with animated feedback
- **Supabase Ready**: Pre-configured for certifications database
- **SEO Optimized**: Meta tags, structured data, sitemap ready
- **Performance**: Optimized for Lighthouse score >90

## 📂 Project Structure

```
portfolio-website/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts          # GitHub API integration
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main page composition
│   └── globals.css               # Global styles & utilities
├── components/
│   ├── HeroSection.tsx           # Cinematic intro with Three.js
│   ├── AboutSection.tsx          # Story & research papers
│   ├── SkillsSection.tsx         # Interactive skill visualization
│   ├── ExperienceSection.tsx     # Timeline with impact metrics
│   ├── ProjectsSection.tsx       # GitHub-synced projects
│   ├── CertificationsSection.tsx # Premium badge cards
│   ├── AchievementsSection.tsx   # Leadership highlights
│   ├── ContactSection.tsx        # Contact form
│   ├── Footer.tsx                # Minimal footer
│   └── SmoothScroll.tsx          # Lenis smooth scroll
├── lib/
│   ├── data.ts                   # Portfolio content & data
│   ├── github.ts                 # GitHub API utilities
│   └── supabase.ts               # Supabase client config
├── public/
│   ├── Mohammad_Shahid_Raza_resume.pdf
│   ├── Shahid Linkedin.jpeg
│   └── *.pdf                     # Research papers
├── tailwind.config.ts            # Custom design system
├── .env.local                    # Environment variables
└── package.json
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion, GSAP |
| **3D Graphics** | React Three Fiber, Three.js, Drei |
| **Database** | Supabase (PostgreSQL) |
| **API Integration** | GitHub REST API |
| **Smooth Scroll** | Lenis |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- GitHub account (for projects sync)
- Supabase account (optional, for certifications)

### Installation

1. **Navigate to the project directory**
```bash
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# GitHub API (Required for Projects section)
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_GITHUB_TOKEN=your-github-personal-access-token

# Supabase (Optional - for certifications database)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Personal Info
NEXT_PUBLIC_EMAIL=your-email@example.com
NEXT_PUBLIC_LINKEDIN=https://www.linkedin.com/in/your-profile
NEXT_PUBLIC_GITHUB=https://github.com/your-username
NEXT_PUBLIC_TWITTER=https://twitter.com/your-handle
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Personal Information
Edit `lib/data.ts` to update your personal details:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your Tagline",
  bio: "Your bio...",
  // ... other fields
};
```

### 2. Skills
Update your skills in `lib/data.ts`:

```typescript
export const skills = {
  "AI / Machine Learning": ["TensorFlow", "PyTorch", ...],
  "Data Engineering": ["Spark", "Airflow", ...],
  // ... other categories
};
```

### 3. Experience
Add your work experience in `lib/data.ts`:

```typescript
export const experience = [
  {
    role: "Your Role",
    company: "Company Name",
    period: "2024 - Present",
    description: "...",
    achievements: ["Achievement 1", "Achievement 2"],
    impact: "+X%",
  },
  // ... more experiences
];
```

### 4. Certifications
Update certifications in `lib/data.ts`:

```typescript
export const certifications = [
  {
    name: "Certification Name",
    issuer: "Issuer",
    year: 2025,
  },
  // ... more certifications
];
```

### 5. Research Papers
Add your papers to the `public/` folder and update `lib/data.ts`:

```typescript
researchPapers: [
  {
    title: "Paper Title",
    file: "/your-paper.pdf",
    year: 2024,
  },
],
```

### 6. Profile Image & Resume
Replace these files in the `public/` folder:
- `Shahid Linkedin.jpeg` → Your profile image
- `Mohammad_Shahid_Raza_resume.pdf` → Your resume

Update the references in `lib/data.ts`:
```typescript
profileImage: "/your-image.jpg",
resume: "/your-resume.pdf",
```

### 7. GitHub Integration
Projects automatically sync from your GitHub account. Ensure you've set:
- `NEXT_PUBLIC_GITHUB_USERNAME` in `.env.local`
- `NEXT_PUBLIC_GITHUB_TOKEN` (optional, but recommended for higher rate limits)

To get a GitHub token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select `public_repo` scope
4. Copy and paste into `.env.local`

### 8. Color Scheme
Customize colors in `tailwind.config.ts`:

```typescript
colors: {
  aurora: {
    pink: '#ff006e',    // Change these
    purple: '#8338ec',
    blue: '#3a86ff',
    cyan: '#06ffa5',
    // ...
  },
}
```

## 🎨 Design System

### Aurora Cyber Noir Colors
```
Primary:   #8338ec (Purple)
Secondary: #3a86ff (Blue)
Accent:    #06ffa5 (Cyan)
Highlight: #ff006e (Pink)
```

### Utility Classes
- `.glass` - Glassmorphism effect
- `.glass-card` - Glass panel with padding
- `.neon-text` - Gradient text effect
- `.magnetic-button` - Interactive hover effect
- `.glow-effect` - Glowing border on hover

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 🔧 Optional: Supabase Setup (for Certifications)

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Create a `certifications` table:
```sql
create table certifications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  issuer text not null,
  year integer not null,
  credential_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

3. Add your Supabase credentials to `.env.local`

4. The app will automatically fetch certifications from Supabase

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance Optimization

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- API route caching (1 hour for GitHub data)
- Lazy loading for off-screen components
- Optimized animations with `will-change`

## 🐛 Troubleshooting

### Projects not loading
- Verify `NEXT_PUBLIC_GITHUB_USERNAME` is correct
- Check GitHub token has proper permissions
- Ensure you have public repositories

### Smooth scroll not working
- Lenis requires client-side rendering
- Check browser compatibility

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📧 Support

For issues or questions about customization, please open an issue on GitHub.

---

**Built with ❤️ and AI** by Mohammad Shahid Raza

**Tech Stack**: Next.js 14 • TypeScript • Tailwind CSS • Framer Motion • Three.js • Supabase • Vercel

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
