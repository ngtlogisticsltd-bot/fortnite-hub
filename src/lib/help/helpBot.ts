import { getIntakeData } from '../controlCore/masterIntake';
import { calculateIntakeCompletion } from '../controlCore/intakeTeams';

export type HelpBotMode = 'admin' | 'public';

export interface HelpBotResponse {
  title: string;
  answer: string;
  nextActions: string[];
  links: { label: string; url: string }[];
  warnings: string[];
  source: 'ADMIN_HELP' | 'SITE_HELP';
}

export function getHelpBotResponse(mode: HelpBotMode, message: string): HelpBotResponse {
  const normalized = message.toLowerCase().trim();
  const intake = getIntakeData();
  const completion = calculateIntakeCompletion();

  if (mode === 'admin') {
    return getAdminResponse(normalized, intake, completion);
  } else {
    return getPublicResponse(normalized);
  }
}

function getAdminResponse(query: string, intake: any, completion: any): HelpBotResponse {
  if (query.includes("what do i do next") || query.includes("missing") || query.includes("blocking")) {
    const missing = completion.missingFields;
    return {
      title: "Launch Checklist Status",
      answer: missing.length > 0 
        ? `You have ${missing.length} missing fields blocking launch. Most critical: ${missing[0]}.`
        : "Setup is 100% complete! You are ready to deploy and scale traffic.",
      nextActions: missing.slice(0, 3).map((f: string) => `Fill ${f}`),
      links: [{ label: "Control Core", url: "/admin/control-core" }, { label: "Setup Links", url: "/admin/setup-links" }],
      warnings: ["Do not deploy until all brand and legal checkboxes are confirmed."],
      source: "ADMIN_HELP"
    };
  }

  if (query.includes("github") || query.includes("repo")) {
    return {
      title: "GitHub Setup Guide",
      answer: "You need to connect a GitHub repository to Vercel for automated deployments.",
      nextActions: ["Create a new repo", "Push your code", "Add GITHUB_TOKEN to vault"],
      links: [
        { label: "New GitHub Repo", url: "https://github.com/new" },
        { label: "GitHub Token Settings", url: "https://github.com/settings/tokens" }
      ],
      warnings: ["Never commit your .env.local file to GitHub."],
      source: "ADMIN_HELP"
    };
  }

  if (query.includes("vercel") || query.includes("deploy")) {
    return {
      title: "Vercel Deployment Guide",
      answer: "Vercel hosts the FortHub frontend. You must import your GitHub repo and add environment variables.",
      nextActions: ["Import project to Vercel", "Add Deploy Hook to Control Core"],
      links: [
        { label: "Vercel Dashboard", url: "https://vercel.com/dashboard" },
        { label: "Deploy Hook Docs", url: "https://vercel.com/docs/deployments/deploy-hooks" }
      ],
      warnings: ["Build will fail if Supabase keys are not set in Vercel environment variables."],
      source: "ADMIN_HELP"
    };
  }

  if (query.includes("supabase") || query.includes("database")) {
    return {
      title: "Supabase Setup Guide",
      answer: "Supabase provides your database and authentication. You need a project URL and service role key.",
      nextActions: ["Create Supabase Project", "Run schema.sql in SQL Editor"],
      links: [
        { label: "Supabase Projects", url: "https://supabase.com/dashboard/projects" },
        { label: "SQL Editor", url: "https://supabase.com/dashboard/project/_/sql" }
      ],
      warnings: ["Never share the Service Role Key publicly."],
      source: "ADMIN_HELP"
    };
  }

  // Fallback for admin
  return {
    title: "Admin Assistant",
    answer: "I can help you with setup, deployment, and integration. Try asking 'What is missing?' or 'How do I connect GitHub?'.",
    nextActions: ["View Checklist", "Open Setup Links"],
    links: [{ label: "Help Center", url: "/admin/help" }],
    warnings: [],
    source: "ADMIN_HELP"
  };
}

function getPublicResponse(query: string): HelpBotResponse {
  if (query.includes("what is forthub")) {
    return {
      title: "About FortHub",
      answer: "FortHub is the ultimate unofficial community destination for Fortnite news, item shop updates, and creator guides.",
      nextActions: ["View Item Shop", "Browse Guides"],
      links: [{ label: "Home", url: "/" }],
      warnings: ["FortHub is not affiliated with Epic Games."],
      source: "SITE_HELP"
    };
  }

  if (query.includes("official")) {
    return {
      title: "Official Status",
      answer: "No, FortHub is a 100% unofficial fan site. We use public APIs and creator embeds to serve the community.",
      nextActions: ["Legal Disclosure"],
      links: [{ label: "Privacy & Terms", url: "/privacy" }],
      warnings: [],
      source: "SITE_HELP"
    };
  }

  if (query.includes("item shop")) {
    return {
      title: "Fortnite Item Shop",
      answer: "Check the latest cosmetics and emotes in our real-time item shop tracker.",
      nextActions: ["View Item Shop"],
      links: [{ label: "Today's Shop", url: "/item-shop" }],
      warnings: [],
      source: "SITE_HELP"
    };
  }

  // Fallback for public
  return {
    title: "FortHub Support Bot",
    answer: "How can I help you navigate the hub today? I can answer questions about the item shop, updates, and our community.",
    nextActions: ["View News", "Join Discord"],
    links: [{ label: "Help Page", url: "/help" }],
    warnings: [],
    source: "SITE_HELP"
  };
}
