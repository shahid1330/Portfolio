'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, GitFork, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projects } from '@/lib/data';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Fetch only the 3 specific projects
        const fetchedRepos = await Promise.all(
          projects.map(async (project) => {
            const repoName = project.github.split('/').pop();
            const response = await fetch(`/api/github?repo=${repoName}`);
            if (!response.ok) throw new Error('Failed to fetch');
            return await response.json();
          })
        );
        setRepos(fetchedRepos.filter(Boolean));
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to project names from data.ts
        setRepos(projects.map(p => ({
          name: p.name || 'Project',
          description: '',
          html_url: p.github || '',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          language: 'Python',
          topics: []
        })) as GitHubRepo[]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Prevent hydration issues by ensuring client-side rendering
  if (!mounted) {
    return (
      <section id="projects" className="section">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-accent-400 to-secondary-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          AI/ML projects showcasing practical applications and research implementation
        </p>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-accent-500/5 to-secondary-500/5 border border-accent-500/20 hover:border-accent-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-accent-500/20"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/0 to-secondary-500/0 group-hover:from-accent-500/10 group-hover:to-secondary-500/10 transition-all duration-300" />
                
                <div className="relative space-y-5">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-accent-500/30 group-hover:scale-110 transition-transform">
                      <Github className="w-7 h-7 text-white" />
                    </div>
                    {repo.language && (
                      <span className="px-3 py-1 text-xs rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-300">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold text-white group-hover:text-accent-300 transition-colors leading-relaxed">
                    {repo.name ? repo.name.replace(/-/g, ' ') : 'Project'}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-base line-clamp-3 min-h-[4rem] leading-relaxed">
                    {repo.description || 'AI/ML project demonstrating practical application'}
                  </p>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs rounded bg-accent-500/10 text-gray-400"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-t border-accent-500/20">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4 text-accent-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 transition-all shadow-lg shadow-accent-500/30 hover:scale-105"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary-500/10 border border-secondary-500/30 hover:bg-secondary-500/20 transition-all hover:scale-110"
                      >
                        <ExternalLink className="w-4 h-4 text-secondary-400" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
