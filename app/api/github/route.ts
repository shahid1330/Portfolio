import { NextResponse } from 'next/server';
import { fetchPinnedRepos } from '@/lib/github';

export async function GET() {
  try {
    const repos = await fetchPinnedRepos();
    return NextResponse.json({ repos });
  } catch (error) {
    console.error('Error in GitHub API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories', repos: [] },
      { status: 500 }
    );
  }
}
