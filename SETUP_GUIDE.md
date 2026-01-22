# 🚀 Setup & Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Customizing Content](#customizing-content)
3. [GitHub Integration](#github-integration)
4. [Deployment to Vercel](#deployment-to-vercel)
5. [Optional Supabase Setup](#optional-supabase-setup)

---

## Local Development Setup

### Step 1: Install Dependencies
```bash
cd portfolio-website
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your information:

**Minimum Required:**
```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
```

**Recommended (Full Setup):**
```env
# GitHub API
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_GITHUB_TOKEN=ghp_yourPersonalAccessToken

# Personal Info
NEXT_PUBLIC_EMAIL=your.email@example.com
NEXT_PUBLIC_LINKEDIN=https://www.linkedin.com/in/yourprofile
NEXT_PUBLIC_GITHUB=https://github.com/yourusername

# Optional - Supabase (for certifications database)
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customizing Content

### 1. Personal Information
Edit `lib/data.ts`:

```typescript
export const personalInfo = {
  name: "Mohammad Shahid Raza",        // ← Change this
  title: "AI/ML Engineer | ...",       // ← Change this
  tagline: "Building Intelligent...",  // ← Change this
  bio: `Your bio here...`,             // ← Change this
  location: "India",                   // ← Change this
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  resume: "/Mohammad_Shahid_Raza_resume.pdf",  // ← Update filename
  profileImage: "/Shahid Linkedin.jpeg",        // ← Update filename
  
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER || "",
  },
  
  researchPapers: [
    {
      title: "Your Paper Title",
      file: "/your-paper.pdf",    // ← Must match file in public/
      year: 2024,
    },
    // Add more papers...
  ],
};
```

### 2. Skills
Edit the skills object in `lib/data.ts`:

```typescript
export const skills = {
  "AI / Machine Learning": [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    // Add your skills...
  ],
  "Data Engineering": [
    "Apache Spark",
    "Airflow",
    // Add your skills...
  ],
  // Add more categories...
};
```

### 3. Work Experience
Update the experience array in `lib/data.ts`:

```typescript
export const experience = [
  {
    role: "AI/ML Engineer",
    company: "Tech Innovation Lab",
    period: "2024 - Present",
    location: "Remote",
    description: "Brief description of role",
    achievements: [
      "Achievement 1 with metrics",
      "Achievement 2 with impact",
      "Achievement 3 with numbers",
    ],
    impact: "+23%",  // Displayed as badge
  },
  // Add more experiences...
];
```

### 4. Certifications
Edit certifications in `lib/data.ts`:

```typescript
export const certifications = [
  {
    name: "AWS Cloud Foundations",
    issuer: "AWS",
    year: 2025,
  },
  // Add more certifications...
];
```

### 5. Achievements
Update achievements array in `lib/data.ts`:

```typescript
export const achievements = [
  "Published 5 research papers in ML, IoT, and Computer Vision",
  "Led cross-functional team of 5 engineers",
  // Add your achievements...
];
```

### 6. Replace Assets

**Profile Image:**
1. Add your image to `public/` folder (e.g., `public/your-photo.jpg`)
2. Update in `lib/data.ts`:
   ```typescript
   profileImage: "/your-photo.jpg",
   ```

**Resume:**
1. Add your resume PDF to `public/` folder
2. Update in `lib/data.ts`:
   ```typescript
   resume: "/Your_Name_Resume.pdf",
   ```

**Research Papers:**
1. Add PDF files to `public/` folder
2. Update in `lib/data.ts` researchPapers array

---

## GitHub Integration

### Why GitHub Integration?
Your projects section automatically syncs with your GitHub repositories, showing:
- Repository descriptions
- Tech stack (languages/topics)
- Stars and forks
- Last update date

### Setup Steps

#### 1. Set Your GitHub Username
In `.env.local`:
```env
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
```

#### 2. Create a Personal Access Token (Recommended)

**Why?** Higher API rate limits (5000 requests/hour vs 60)

**Steps:**
1. Go to GitHub → Settings → Developer settings
2. Click "Personal access tokens" → "Tokens (classic)"
3. Click "Generate new token (classic)"
4. Give it a name (e.g., "Portfolio Website")
5. Select scopes:
   - ✅ `public_repo` (access public repositories)
6. Click "Generate token"
7. Copy the token (starts with `ghp_`)

**Add to `.env.local`:**
```env
NEXT_PUBLIC_GITHUB_TOKEN=ghp_yourTokenHere
```

⚠️ **IMPORTANT:** Never commit `.env.local` to Git!

#### 3. Verify It Works
1. Start dev server: `npm run dev`
2. Navigate to Projects section
3. You should see your public repos

### Pinning Specific Projects
The portfolio shows your top 6 most starred/recently updated repos. To feature specific projects:

**Option 1:** Add topics/tags to your repos on GitHub
**Option 2:** Manually filter in `lib/github.ts`:

```typescript
export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  const allRepos = await fetchGitHubRepos();
  
  // Option 1: Filter by name
  const featured = ['repo-name-1', 'repo-name-2', 'repo-name-3'];
  return allRepos.filter(repo => featured.includes(repo.name));
  
  // Option 2: Use default (top 6)
  return allRepos.slice(0, 6);
}
```

---

## Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works great)

### Method 1: Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Add Environment Variables**
   In Vercel project settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_GITHUB_USERNAME=yourusername
   NEXT_PUBLIC_GITHUB_TOKEN=your-token
   NEXT_PUBLIC_EMAIL=your-email
   NEXT_PUBLIC_LINKEDIN=your-linkedin-url
   NEXT_PUBLIC_GITHUB=your-github-url
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then add env vars in dashboard
```

### Custom Domain (Optional)

1. In Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

---

## Optional: Supabase Setup

If you want to store certifications in a database instead of hardcoding them:

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create account (free tier)
3. Create new project
4. Wait for setup (~2 minutes)

### 2. Create Database Table

In Supabase SQL Editor, run:

```sql
-- Create certifications table
create table certifications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  issuer text not null,
  year integer not null,
  credential_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table certifications enable row level security;

-- Allow public read access
create policy "Certifications are publicly readable"
  on certifications for select
  using (true);

-- Insert sample data
insert into certifications (name, issuer, year) values
  ('AWS Cloud Foundations', 'AWS', 2025),
  ('ETL in Python and SQL', 'LinkedIn', 2026),
  ('Complete Guide to Generative AI', 'LinkedIn', 2025);
```

### 3. Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL (looks like `https://abc123.supabase.co`)
   - `anon` `public` key

### 4. Add to Environment Variables

In `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Update Component (Optional)

The app currently reads from `lib/data.ts`. To use Supabase:

Edit `components/CertificationsSection.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase, Certification } from '@/lib/supabase';

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertifications() {
      if (!supabase) {
        // Fallback to static data
        setCertifications(staticCerts);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('year', { ascending: false });

      if (error) {
        console.error('Error loading certifications:', error);
        setCertifications(staticCerts);
      } else {
        setCertifications(data || []);
      }
      setLoading(false);
    }

    loadCertifications();
  }, []);

  // Rest of component...
}
```

---

## Testing Before Deployment

### 1. Build Test
```bash
npm run build
```

This checks for:
- TypeScript errors
- Build-time errors
- Missing dependencies

### 2. Production Preview
```bash
npm run build
npm start
```

Test on [http://localhost:3000](http://localhost:3000)

### 3. Lighthouse Audit
1. Open site in Chrome
2. Right-click → Inspect → Lighthouse tab
3. Run audit
4. Target: Performance >90, SEO >95

---

## Common Issues & Solutions

### Issue: Projects not loading
**Solution:**
- Check `NEXT_PUBLIC_GITHUB_USERNAME` is correct
- Verify you have public repositories
- Check browser console for API errors
- GitHub token might be invalid/expired

### Issue: Images not loading
**Solution:**
- Ensure images are in `public/` folder
- Check file names match exactly (case-sensitive)
- Verify file extensions (.jpg, .jpeg, .png)

### Issue: Build fails
**Solution:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Issue: Smooth scroll not working
**Solution:**
- Lenis requires client-side rendering
- Check browser supports `requestAnimationFrame`
- Try disabling browser extensions

### Issue: Three.js scene not rendering
**Solution:**
- Check WebGL support in browser
- Update graphics drivers
- Try different browser

---

## Performance Checklist

- [ ] Optimized images (use WebP when possible)
- [ ] Set proper GitHub token for API rate limits
- [ ] Enable caching in Vercel
- [ ] Minimize custom fonts
- [ ] Lazy load off-screen components
- [ ] Test on mobile devices

---

## Security Checklist

- [ ] Never commit `.env.local` to Git
- [ ] Add `.env.local` to `.gitignore`
- [ ] Use environment variables in Vercel
- [ ] Limit GitHub token scope to `public_repo` only
- [ ] Enable Supabase Row Level Security
- [ ] Use HTTPS (automatic on Vercel)

---

## Need Help?

1. Check the main README.md
2. Review component files for inline comments
3. Test with minimal setup first
4. Check browser console for errors
5. Verify environment variables are set

---

**Good luck with your portfolio! 🚀**
