'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GitHubRepo } from '@/lib/github';

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    async function loadRepos() {
      try {
        const response = await fetch('/api/github');
        const data = await response.json();
        setRepos(data.repos || []);
      } catch (error) {
        console.error('Error loading repos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-noir-950" />

      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dynamically synced from GitHub - Building the future, one commit at a time
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="glass-card px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-aurora-cyan border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-400">Loading projects from GitHub...</span>
              </div>
            </div>
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass-card inline-block px-8 py-4">
              <p className="text-gray-400">No projects found. Configure your GitHub credentials in .env.local</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {repos.map((repo, index) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={index}
                onClick={() => setSelectedProject(repo)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({
  repo,
  index,
  onClick,
}: {
  repo: GitHubRepo;
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-panel h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-aurora-cyan transition-colors line-clamp-1">
              {repo.name}
            </h3>
            {repo.language && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-aurora-purple/20 text-aurora-purple border border-aurora-purple/30">
                {repo.language}
              </span>
            )}
          </div>
          <motion.div
            animate={isHovered ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl"
          >
            ↗
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
          {repo.description || 'No description available'}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 rounded-md text-xs bg-white/5 text-gray-400 border border-white/10"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-white/10">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔄</span>
            <span>{repo.forks_count}</span>
          </div>
          <div className="flex-1 text-right text-xs">
            Updated {new Date(repo.updated_at).toLocaleDateString()}
          </div>
        </div>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-aurora-purple to-aurora-cyan rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10" />
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: GitHubRepo;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          ✕
        </button>

        {/* Content */}
        <div className="pr-12">
          <h2 className="text-3xl font-bold mb-4 neon-text">
            {project.name}
          </h2>

          {project.description && (
            <p className="text-gray-300 text-lg mb-6">
              {project.description}
            </p>
          )}

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-aurora-cyan mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1.5 rounded-full text-sm bg-aurora-purple/20 text-aurora-purple border border-aurora-purple/30"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-card text-center p-4">
              <div className="text-2xl font-bold text-aurora-cyan mb-1">
                {project.stargazers_count}
              </div>
              <div className="text-sm text-gray-400">Stars</div>
            </div>
            <div className="glass-card text-center p-4">
              <div className="text-2xl font-bold text-aurora-purple mb-1">
                {project.forks_count}
              </div>
              <div className="text-sm text-gray-400">Forks</div>
            </div>
            <div className="glass-card text-center p-4">
              <div className="text-2xl font-bold text-aurora-blue mb-1">
                {project.language || 'N/A'}
              </div>
              <div className="text-sm text-gray-400">Language</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button glass-card border-aurora-cyan/50 px-6 py-3 rounded-full font-semibold hover:bg-aurora-cyan/10 transition-all"
            >
              View on GitHub →
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button glass-card border-aurora-purple/50 px-6 py-3 rounded-full font-semibold hover:bg-aurora-purple/10 transition-all"
              >
                Live Demo →
              </a>
            )}
          </div>

          {/* Timestamps */}
          <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-500 space-y-2">
            <div>Created: {new Date(project.created_at).toLocaleDateString()}</div>
            <div>Last Updated: {new Date(project.updated_at).toLocaleDateString()}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
