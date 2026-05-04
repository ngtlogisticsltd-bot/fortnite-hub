import { NextResponse } from 'next/server';
import { githubLaunchChecklist } from '@/lib/reaper/githubLaunchTeam';

export async function GET() {
  const envVars = process.env;

  const processedSections = githubLaunchChecklist.map(section => {
    return {
      ...section,
      items: section.items.map(item => {
        let currentStatus = item.status;

        // Dynamic checks
        if (item.id === 'repo-url' && envVars.GITHUB_REPO_URL) currentStatus = 'CONNECTED';
        if (item.id === 'core-env' && envVars.NEXT_PUBLIC_SITE_URL && envVars.DATABASE_URL) currentStatus = 'CONNECTED';
        if (item.id === 'purchase-domain' && envVars.NEXT_PUBLIC_SITE_URL) currentStatus = 'CONNECTED';
        if (item.id === 'dns-ssl' && envVars.NEXT_PUBLIC_SITE_URL && !envVars.NEXT_PUBLIC_SITE_URL.includes('localhost')) currentStatus = 'CONNECTED';
        
        return {
          ...item,
          status: currentStatus
        };
      })
    };
  });

  const missingEnvVars = [];
  if (!envVars.GITHUB_REPO_URL) missingEnvVars.push('GITHUB_REPO_URL');
  if (!envVars.NEXT_PUBLIC_SITE_URL) missingEnvVars.push('NEXT_PUBLIC_SITE_URL');
  if (!envVars.DATABASE_URL) missingEnvVars.push('DATABASE_URL');

  let nextBestAction = 'Create GitHub Repository';
  if (envVars.GITHUB_REPO_URL && !envVars.NEXT_PUBLIC_SITE_URL) nextBestAction = 'Deploy to Vercel';
  if (envVars.NEXT_PUBLIC_SITE_URL && !envVars.DATABASE_URL) nextBestAction = 'Connect Supabase';

  return NextResponse.json({
    success: true,
    checklist: processedSections,
    missingEnvVars,
    nextBestAction,
    safeCommands: {
      init: 'git init && git add .',
      commit: 'git commit -m "Initial FortHub launch build"',
      branch: 'git branch -M main',
      remote: `git remote add origin ${envVars.GITHUB_REPO_URL || 'YOUR_GITHUB_REPO_URL'}`,
      push: 'git push -u origin main'
    }
  });
}
