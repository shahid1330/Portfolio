export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

const GITHUB_API = 'https://api.github.com';
const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
};

if (token) {
  headers['Authorization'] = `token ${token}`;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  if (!username) {
    console.warn('GitHub username not configured');
    return [];
  }

  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`,
      { 
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and sort by stars/activity
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || 
                      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  const allRepos = await fetchGitHubRepos();
  
  // Return top 6 repos by stars and recent activity
  return allRepos.slice(0, 6);
}
