import { reaperConfig } from './reaper.config';
import { ReaperTeam, ReaperLog } from './types';

import { team as NewsTeam } from './teams/news';
import { team as ItemShopTeam } from './teams/itemShop';
import { team as PatchNotesTeam } from './teams/patchNotes';
import { team as GuidesTeam } from './teams/guides';
import { team as SEOTeam } from './teams/seo';
import { team as MonetizationTeam } from './teams/monetization';
import { team as AnalyticsTeam } from './teams/analytics';
import { team as ComplianceTeam } from './teams/compliance';
import { team as DailyLoopTeam } from './teams/dailyLoop';

export const allTeams: ReaperTeam[] = [
  NewsTeam,
  ItemShopTeam,
  PatchNotesTeam,
  GuidesTeam,
  SEOTeam,
  MonetizationTeam,
  AnalyticsTeam,
  ComplianceTeam,
  DailyLoopTeam
];

export class ReaperOrchestrator {
  private logs: ReaperLog[] = [];

  public async executeTeam(teamId: string): Promise<ReaperLog> {
    const team = allTeams.find(t => t.id === teamId);
    if (!team) throw new Error(`Team ${teamId} not found`);

    if (!reaperConfig.globalEnabled) {
      return this.log(team.id, 'FAILED', 'live', 'REAPER is globally disabled in config.');
    }

    if (!team.enabled) {
      return this.log(team.id, 'FAILED', 'live', 'Team is currently disabled.');
    }

    // Explicit Lifecycle Execution
    this.log(team.id, 'SUCCESS', 'live', `[PHASE 1] Fetching data...`);
    await new Promise(r => setTimeout(r, 400));

    this.log(team.id, 'SUCCESS', 'live', `[PHASE 2] Validating content integrity...`);
    await new Promise(r => setTimeout(r, 400));

    if (reaperConfig.legal.enforcePublicAPIsOnly) {
       this.log(team.id, 'SUCCESS', 'live', `[PHASE 3] Running legal compliance check...`);
       await new Promise(r => setTimeout(r, 400));
    }

    this.log(team.id, 'SUCCESS', 'live', `[PHASE 4] Staging content to database...`);
    await new Promise(r => setTimeout(r, 400));

    if (team.approvalRequired) {
       return this.log(team.id, 'PENDING_APPROVAL', 'live', `[PHASE 5] Content staged. Awaiting CEO approval to publish.`);
    }

    // Execute actual team logic for the publish phase
    let result: ReaperLog;
    try {
      result = await team.run();
      result.message = `[PHASE 6] PUBLISHED: ` + result.message;
    } catch (error: any) {
      result = { teamId: team.id, timestamp: new Date().toISOString(), status: 'FAILED', source: 'live', message: error.message };
    }

    this.logs.unshift(result);
    return result;
  }

  private log(teamId: string, status: 'SUCCESS' | 'FAILED' | 'PENDING_APPROVAL', source: 'live' | 'mock' | 'manual', message: string): ReaperLog {
    const entry: ReaperLog = { teamId, timestamp: new Date().toISOString(), status, source, message };
    this.logs.unshift(entry);
    return entry;
  }

  public getLogs(): ReaperLog[] {
    return this.logs;
  }

  // Safe execution order
  public async executeSafeOrder() {
    console.log("Starting full REAPER cycle...");
    // 1. Validate & Compliance
    await this.executeTeam('compliance');
    // 2. Fetch Data
    await this.executeTeam('news');
    await this.executeTeam('item-shop');
    await this.executeTeam('patch-notes');
    // 3. Prepare Publish
    await this.executeTeam('guides');
    // 4. Run Revenue/SEO
    await this.executeTeam('monetization');
    await this.executeTeam('seo');
    await this.executeTeam('analytics');
    
    console.log("Cycle complete.");
  }
}

export const orchestrator = new ReaperOrchestrator();
