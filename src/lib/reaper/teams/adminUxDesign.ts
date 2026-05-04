export interface UxIssue {
  id: string;
  bot: string;
  issue: string;
  recommendation: string;
  affectedPages: string[];
  priority: 'low' | 'medium' | 'high';
  ownerActionRequired: boolean;
}

export interface AdminUxReport {
  teamName: string;
  status: 'OPTIMIZED' | 'NEEDS_CLEANUP' | 'CLUTTERED';
  issues: UxIssue[];
}

export async function runAdminUxAudit(): Promise<AdminUxReport> {
  const issues: UxIssue[] = [
    {
      id: 'sidebar-clutter',
      bot: 'Sidebar Simplifier',
      issue: 'Sidebar has 20+ direct links making it hard to scan.',
      recommendation: 'Group links into collapsible sections and use a searchable Tools Directory.',
      affectedPages: ['All Admin Pages'],
      priority: 'high',
      ownerActionRequired: false
    },
    {
      id: 'neon-overload',
      bot: 'Visual Hierarchy Bot',
      issue: 'Too many high-contrast neon elements competing for attention.',
      recommendation: 'Reduce neon usage to primary actions only; use subtle borders for layout.',
      affectedPages: ['/admin', '/admin/reaper'],
      priority: 'medium',
      ownerActionRequired: false
    },
    {
      id: 'launch-path',
      bot: 'Information Architect',
      issue: 'Launch setup steps are scattered across different menu groups.',
      recommendation: 'Create a dedicated "Launch Setup" grouping on the main dashboard.',
      affectedPages: ['/admin'],
      priority: 'high',
      ownerActionRequired: true
    }
  ];

  return {
    teamName: 'Admin UX & Design Team',
    status: 'NEEDS_CLEANUP',
    issues
  };
}
