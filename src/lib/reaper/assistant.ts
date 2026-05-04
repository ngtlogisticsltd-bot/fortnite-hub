export interface AssistantResponse {
  role: 'assistant';
  source: 'manual';
  intent: string;
  title: string;
  message: string;
  actions: string[];
  warnings: string[];
}

export function processAssistantCommand(input: string, envVars: any): AssistantResponse {
  const normalized = input.toLowerCase().trim();
  
  // Strict Safety: The assistant should never echo back raw keys or passwords.
  // It only checks for their presence.

  if (normalized === 'help') {
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'help',
      title: 'Command Menu',
      message: 'I am the REAPER Assistant. I operate purely on deterministic local logic to guide your Fan Site deployment. I will not fake actions, and I cannot execute terminal commands on your behalf.',
      actions: [
        'status - Check overall system readiness',
        'next - See your immediate next step',
        'deploy - Vercel deployment guide',
        'domain - Domain setup guide',
        'github - GitHub repo guide',
        'supabase - Database connection guide',
        'ads - Ad network readiness',
        'traffic - Traffic operation rules',
        'daily - Explain the Daily Engine',
        'revenue - Revenue integration status',
        'legal - Legal compliance checklist'
      ],
      warnings: ['I am explicitly forbidden from executing shell commands automatically.']
    };
  }

  if (normalized === 'status') {
    const isDomainLive = !!envVars.NEXT_PUBLIC_SITE_URL;
    const isDbLive = !!envVars.DATABASE_URL;
    const isRepoLive = !!envVars.GITHUB_REPO_URL;
    
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'status',
      title: 'System Status Report',
      message: `Analyzing current environment configuration... \nDomain: ${isDomainLive ? 'CONNECTED' : 'MISSING'}\nDatabase: ${isDbLive ? 'CONNECTED' : 'MISSING'}\nGitHub: ${isRepoLive ? 'CONNECTED' : 'MISSING'}`,
      actions: [
        'Run "next" to see your immediate required action.'
      ],
      warnings: [
        !isDomainLive ? 'Critical: Next.js public URL not configured.' : '',
        !isDbLive ? 'Critical: Supabase connection missing. Submissions fall back to memory.' : ''
      ].filter(Boolean)
    };
  }

  if (normalized === 'next') {
    let nextStep = 'Create a GitHub Repository (Run "github")';
    if (envVars.GITHUB_REPO_URL && !envVars.NEXT_PUBLIC_SITE_URL) nextStep = 'Deploy to Vercel (Run "deploy")';
    if (envVars.NEXT_PUBLIC_SITE_URL && !envVars.DATABASE_URL) nextStep = 'Connect Supabase (Run "supabase")';

    return {
      role: 'assistant',
      source: 'manual',
      intent: 'next',
      title: 'Next Best Action',
      message: `Based on your environment variables, I have calculated your next immediate priority.`,
      actions: [nextStep],
      warnings: []
    };
  }

  if (normalized === 'github') {
    const isSaved = !!envVars.GITHUB_REPO_URL;
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'github',
      title: 'GitHub Setup Protocol',
      message: isSaved 
        ? 'I see your GitHub repository is already saved in the Control Core. You are ready to deploy.'
        : 'FortHub requires version control before Vercel deployment. No repository is currently saved in your configuration.',
      actions: isSaved ? ['Run "deploy" to continue.'] : [
        'Create an empty repo on GitHub.',
        'Run `git init` and `git add .`',
        'Commit your code.',
        'Push to your remote origin.'
      ],
      warnings: ['Never commit your .env file. Ensure .gitignore is active.']
    };
  }

  if (normalized === 'deploy') {
    const isRepoSaved = !!envVars.GITHUB_REPO_URL;
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'deploy',
      title: 'Vercel Deployment Protocol',
      message: isRepoSaved 
        ? 'Your GitHub repository is connected. You can now import this project into Vercel.'
        : 'Vercel is the recommended edge hosting provider for Next.js, but you must connect a GitHub repository first.',
      actions: [
        'Login to Vercel.',
        'Import your GitHub repository.',
        'Ensure the build command is `npm run build`.',
        'Copy ALL keys from your local .env to Vercel Environment Variables.'
      ],
      warnings: ['Build will fail on Vercel if you do not add the Environment Variables first.']
    };
  }

  if (normalized === 'domain') {
    const isDomainSaved = !!envVars.NEXT_PUBLIC_SITE_URL;
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'domain',
      title: 'Domain & DNS Setup',
      message: isDomainSaved
        ? `Your site URL is configured as: ${envVars.NEXT_PUBLIC_SITE_URL}. Ensure your DNS records match Vercel's nameservers.`
        : 'A custom domain establishes authority and SEO ranking.',
      actions: [
        'Purchase a domain (e.g. from Namecheap or Google Domains).',
        'In Vercel, go to Settings > Domains and add it.',
        'Update your domain registrar with Vercel’s Nameservers.',
        'Update NEXT_PUBLIC_SITE_URL in your .env and Vercel.'
      ],
      warnings: ['LEGAL: Do not use Epic Games intellectual property (like "Fortnite") in the domain name. Use generic terms like "Fort", "Drop", "Hub".']
    };
  }

  if (normalized === 'supabase') {
    const isDbSaved = !!envVars.DATABASE_URL;
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'supabase',
      title: 'Database Setup',
      message: isDbSaved
        ? 'Database connection string detected. Your backend storage is active.'
        : 'Supabase provides the PostgreSQL backend for fan submissions and click tracking.',
      actions: [
        'Create a Supabase Project.',
        'Run the `supabase/schema.sql` file in the SQL Editor.',
        'Copy DATABASE_URL and SUPABASE keys into your .env.'
      ],
      warnings: ['Never share the SUPABASE_SERVICE_ROLE_KEY. It bypasses Row Level Security.']
    };
  }

  if (normalized === 'traffic' || normalized === 'ads' || normalized === 'revenue') {
    const isAnalyticsSaved = !!envVars.NEXT_PUBLIC_ANALYTICS_ID;
    const isAdsSaved = !!envVars.NEXT_PUBLIC_ADSENSE_ID;

    return {
      role: 'assistant',
      source: 'manual',
      intent: 'traffic_revenue',
      title: 'Traffic & Revenue Protocol',
      message: `Status: Analytics (${isAnalyticsSaved ? 'CONNECTED' : 'MISSING'}), Ads (${isAdsSaved ? 'CONNECTED' : 'MISSING'}). Before applying for AdSense or Affiliates, you must prove organic value.`,
      actions: [
        'Publish 15 high-quality, original Guides/Articles.',
        'Use the Daily Engine to draft Social Media posts.',
        'Once you hit 100 daily visitors, apply to Google AdSense.'
      ],
      warnings: ['Auto-posting to social media without approved APIs will result in account bans. Post manually via the Daily Engine drafts.']
    };
  }

  if (normalized === 'daily') {
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'daily',
      title: 'The Daily Execution Engine',
      message: 'The Daily Engine (/admin/daily) is your operational loop. It queues tasks that must be done every 24 hours to keep the site alive.',
      actions: [
        'Check Item Shop updates (Automated).',
        'Review fan submissions in the queue.',
        'Generate and publish 1 new Guide.',
        'Post 2 social media updates.'
      ],
      warnings: []
    };
  }

  if (normalized === 'legal') {
    return {
      role: 'assistant',
      source: 'manual',
      intent: 'legal',
      title: 'Legal Compliance Shield',
      message: 'FortHub operates strictly under Epic Games Fan Site Policies.',
      actions: [
        'Ensure the Unofficial Fan Site disclaimer is visible in the global footer.',
        'Never charge money for access to API-derived data.',
        'Review all user submissions before publishing.'
      ],
      warnings: ['Failure to adhere to these rules can result in Epic Games issuing a cease and desist.']
    };
  }

  // Fallback
  return {
    role: 'assistant',
    source: 'manual',
    intent: 'unknown',
    title: 'Command Not Recognized',
    message: `I did not understand "${input}".`,
    actions: ['Type "help" to see available commands.'],
    warnings: []
  };
}
