import { ReaperCommand, CommandRisk } from './commandTypes';

export function routeCommand(input: string): ReaperCommand {
  const normalized = input.toLowerCase();
  const id = Math.random().toString(36).substring(2, 11);
  const timestamp = new Date().toISOString();

  let intent = "unknown";
  let targetTeam = "REAPER Orchestrator";
  let riskLevel: CommandRisk = "low";
  let actions: string[] = [];
  let approvalRequired = false;

  // Simple keyword-based routing logic
  if (normalized.includes("run daily") || normalized.includes("daily cycle")) {
    intent = "run_daily_cycle";
    targetTeam = "Daily Engine";
    actions = ["trigger_daily_api", "refresh_staged_content"];
  } else if (normalized.includes("safe cycle")) {
    intent = "run_safe_cycle";
    targetTeam = "REAPER Orchestrator";
    actions = ["run_system_heartbeat", "check_bot_integrity"];
  } else if (normalized.includes("check site") || normalized.includes("it health") || normalized.includes("dev health")) {
    intent = "check_it_dev";
    targetTeam = "IT & Development Oversight";
    actions = ["scan_api_endpoints", "check_build_status"];
  } else if (normalized.includes("check nav") || normalized.includes("fix menu") || normalized.includes("broken links")) {
    intent = "check_nav";
    targetTeam = "Navigation QA";
    actions = ["scan_route_registry", "validate_dropdown_logic"];
  } else if (normalized.includes("check api")) {
    intent = "check_api";
    targetTeam = "IT & Development Oversight";
    actions = ["heartbeat_api_health", "verify_data_dispatcher"];
  } else if (normalized.includes("check revenue") || normalized.includes("money") || normalized.includes("ads status")) {
    intent = "check_revenue";
    targetTeam = "Revenue Ops";
    actions = ["check_adsense_status", "verify_affiliate_links"];
  } else if (normalized.includes("check accounts") || normalized.includes("supabase status") || normalized.includes("vercel status")) {
    intent = "check_accounts";
    targetTeam = "Account Setup";
    actions = ["check_control_core_keys", "verify_external_connections"];
  } else if (normalized.includes("deploy") || normalized.includes("push to production")) {
    intent = "request_deploy";
    targetTeam = "GitHub/Vercel Launch";
    riskLevel = "high";
    approvalRequired = true;
    actions = ["check_git_status", "trigger_vercel_deployment"];
  } else if (normalized.includes("change password") || normalized.includes("reset admin")) {
    intent = "request_password_change";
    targetTeam = "Admin Security";
    riskLevel = "high";
    approvalRequired = true;
    actions = ["trigger_password_reset_flow"];
  } else if (normalized.includes("make content") || normalized.includes("ideas") || normalized.includes("social post")) {
    intent = "create_content_ideas";
    targetTeam = "Daily Engine";
    actions = ["generate_topic_list", "draft_social_copy"];
  } else if (normalized.includes("clip plan") || normalized.includes("ai clip")) {
    intent = "create_ai_clip_plan";
    targetTeam = "Media Rights & AI Clips";
    actions = ["analyze_trending_vids", "create_original_storyboard"];
  } else if (normalized.includes("status") || normalized.includes("how are we doing")) {
    intent = "status";
    targetTeam = "REAPER Orchestrator";
    actions = ["aggregate_team_status"];
  } else if (normalized.includes("help")) {
    intent = "help";
    targetTeam = "REAPER Assistant";
  } else if (normalized.includes("missing") || normalized.includes("what next") || normalized.includes("what needs doing")) {
    intent = "list_missing_setup";
    targetTeam = "Setup Execution";
    actions = ["scan_control_core_missing", "check_domain_dns"];
  } else if (normalized.includes("health check") || normalized.includes("is site ok")) {
    intent = "health_check";
    targetTeam = "Error & Maintenance";
    actions = ["run_maintenance_cycle", "get_maintenance_report"];
  } else if (normalized.includes("fix error") || normalized.includes("repair site")) {
    intent = "fix_errors";
    targetTeam = "Error & Maintenance";
    actions = ["run_maintenance_cycle", "auto_resolve_low_risk"];
  } else if (normalized.includes("check logs") || normalized.includes("error logs")) {
    intent = "check_logs";
    targetTeam = "Error & Maintenance";
    actions = ["get_maintenance_report"];
  } else if (normalized.includes("maintenance") || normalized.includes("repair")) {
    intent = "maintenance";
    targetTeam = "Error & Maintenance";
    actions = ["run_maintenance_cycle", "get_maintenance_report"];
  } else if (normalized.includes("media") || normalized.includes("clip") || normalized.includes("thumbnail")) {
    intent = "media_ops";
    targetTeam = "Media Rights & AI Clips";
    actions = ["run_media_planning_cycle"];
  } else if (normalized.includes("automation") || normalized.includes("start bots")) {
    intent = "bot_automation";
    targetTeam = "REAPER Orchestrator";
    actions = ["run_full_automation_cycle", "check_cron_readiness"];
  } else if (normalized.includes("live bot") || normalized.includes("scheduled ops") || normalized.includes("cron")) {
    intent = "live_ops";
    targetTeam = "REAPER Orchestrator";
    actions = ["check_scheduled_operations", "check_cron_readiness"];
  } else if (normalized.includes("run growth") || normalized.includes("growth plan")) {
    intent = "run_growth_cycle";
    targetTeam = "Growth Engine";
    actions = ["run_domination_stack", "generate_seo_ideas"];
  } else if (normalized.includes("seo pages") || normalized.includes("keywords")) {
    intent = "create_seo_pages";
    targetTeam = "Growth Engine";
    actions = ["generate_seo_page_ideas", "list_priority_keywords"];
  } else if (normalized.includes("creator plan") || normalized.includes("embed plan")) {
    intent = "creator_plan";
    targetTeam = "Growth Engine";
    actions = ["get_creator_targets", "plan_creator_embeds"];
  } else if (normalized.includes("revenue plan") || normalized.includes("make money")) {
    intent = "revenue_plan";
    targetTeam = "Growth Engine";
    actions = ["check_revenue_readiness", "list_affiliate_actions"];
  } else if (normalized.includes("fix site") || normalized.includes("autopilot")) {
    intent = "run_autopilot";
    targetTeam = "REAPER Autopilot";
    actions = ["run_autopilot_cycle", "fix_low_risk_issues"];
  } else if (normalized.includes("check everything") || normalized.includes("full scan")) {
    intent = "full_system_scan";
    targetTeam = "REAPER Orchestrator";
    actions = ["run_autopilot_cycle", "scan_all_teams", "check_it_dev"];
  } else if (normalized.includes("run operations")) {
    intent = "run_full_operations";
    targetTeam = "REAPER Orchestrator";
    actions = ["run_autopilot_cycle", "run_daily_cycle", "run_safe_cycle"];
  }

  return {
    id,
    input,
    intent,
    targetTeam,
    riskLevel,
    status: "received",
    createdAt: timestamp,
    updatedAt: timestamp,
    approvalRequired,
    source: "assistant",
    actions,
    resultMessage: "",
    warnings: []
  };
}
