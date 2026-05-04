export type LaunchStatus = 'NOT_STARTED' | 'NEEDS_OWNER_ACTION' | 'CONNECTED' | 'ERROR' | 'OPTIONAL_LATER';

export interface LaunchItem {
  id: string;
  title: string;
  status: LaunchStatus;
  ownerActionRequired: string;
  command?: string;
  notes: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface LaunchSection {
  id: string;
  title: string;
  items: LaunchItem[];
}

export const githubLaunchChecklist: LaunchSection[] = [
  {
    id: 'github-account',
    title: '1. GitHub Account & Repo',
    items: [
      {
        id: 'create-account',
        title: 'Create/Login to GitHub',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Log in to GitHub and create an empty repository.',
        notes: 'Do not initialize with README or license. Keep it completely empty.',
        riskLevel: 'Low'
      },
      {
        id: 'repo-url',
        title: 'Configure GITHUB_REPO_URL',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Add GITHUB_REPO_URL to environment variables.',
        command: 'GITHUB_REPO_URL=https://github.com/yourusername/fortnite-hub.git',
        notes: 'This links the command center to your remote origin.',
        riskLevel: 'Medium'
      }
    ]
  },
  {
    id: 'repo-setup',
    title: '2. Repository Setup & Push',
    items: [
      {
        id: 'git-init',
        title: 'Initialize Git & Add Files',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Run initialization commands locally.',
        command: 'git init && git add .',
        notes: 'Ensure node_modules and .env are in .gitignore.',
        riskLevel: 'Low'
      },
      {
        id: 'git-push',
        title: 'Commit and Push to Main',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Commit files and push to remote origin.',
        command: 'git commit -m "Initial FortHub launch build" && git branch -M main && git push -u origin main',
        notes: 'Replaces branch name to main and pushes code.',
        riskLevel: 'High'
      }
    ]
  },
  {
    id: 'vercel-connection',
    title: '3. Vercel Connection',
    items: [
      {
        id: 'vercel-import',
        title: 'Import GitHub Repo to Vercel',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Log in to Vercel, click "Add New Project", and select your GitHub repo.',
        notes: 'Vercel will automatically detect the Next.js framework.',
        riskLevel: 'Medium'
      },
      {
        id: 'vercel-build',
        title: 'Verify Build Command',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Ensure build command is "npm run build".',
        notes: 'If deploying fails, check Vercel build logs.',
        riskLevel: 'High'
      }
    ]
  },
  {
    id: 'domain-setup',
    title: '4. Domain Setup',
    items: [
      {
        id: 'purchase-domain',
        title: 'Purchase Custom Domain',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Buy domain (e.g., forthub.com) from a registrar.',
        notes: 'Avoid using Epic Games IP in the domain name.',
        riskLevel: 'Low'
      },
      {
        id: 'dns-ssl',
        title: 'Connect DNS to Vercel & Issue SSL',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Add Vercel nameservers to your domain registrar.',
        notes: 'Vercel will automatically generate the SSL certificate.',
        riskLevel: 'Medium'
      }
    ]
  },
  {
    id: 'production-env',
    title: '5. Production Environment Variables',
    items: [
      {
        id: 'core-env',
        title: 'Add Core Vercel Env Vars',
        status: 'NEEDS_OWNER_ACTION',
        ownerActionRequired: 'Copy all .env keys into the Vercel project settings.',
        notes: 'Required: ADMIN_USER, ADMIN_PASS, NEXT_PUBLIC_SITE_URL, DATABASE_URL, etc.',
        riskLevel: 'High'
      }
    ]
  },
  {
    id: 'launch-readiness',
    title: '6. Launch Readiness',
    items: [
      {
        id: 'build-passing',
        title: 'Zero Build Errors',
        status: 'CONNECTED', // Assumed connected locally if they can view this page, but API will check
        ownerActionRequired: 'Fix any TypeScript or Next.js build errors.',
        command: 'npm run build',
        notes: 'The build must pass 100% cleanly before Vercel will deploy.',
        riskLevel: 'High'
      },
      {
        id: 'security-seo',
        title: 'Security & SEO Verified',
        status: 'CONNECTED',
        ownerActionRequired: 'Ensure robots.txt blocks /admin and disclaimers are live.',
        notes: 'Legal compliance is strictly required.',
        riskLevel: 'High'
      }
    ]
  }
];
