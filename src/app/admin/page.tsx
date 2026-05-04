"use client";
import Link from 'next/link';
import { Shield, Activity, Zap, Cpu, Server, Link2, Globe2, GitPullRequest, MonitorSmartphone, DollarSign, BarChart, Rocket, Users, CheckSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

import AssistantWidget from '@/components/admin/AssistantWidget';
import ReaperCommandWidget from '@/components/admin/ReaperCommandWidget';

export default function AdminCommandCenter() {
  const tabs = [
    { href: "/admin/control-core", label: "Control Core", icon: <Shield className="w-5 h-5 text-primary" /> },
    { href: "/admin/reaper", label: "Orchestrator", icon: <Activity className="w-5 h-5 text-white" /> },
    { href: "/admin/daily", label: "Daily Engine", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    { href: "/admin/bots", label: "Bot Registry", icon: <Cpu className="w-5 h-5 text-blue-400" /> },
    { href: "/admin/accounts", label: "Account Setup", icon: <Server className="w-5 h-5 text-purple-400" /> },
    { href: "/admin/integrations", label: "Integrations", icon: <Link2 className="w-5 h-5 text-orange-400" /> },
    { href: "/admin/linked-sites", label: "Linked Sites", icon: <Globe2 className="w-5 h-5 text-blue-500" /> },
    { href: "/admin/submissions", label: "Submissions", icon: <GitPullRequest className="w-5 h-5 text-primary" /> },
    { href: "/admin/ads", label: "Ads", icon: <MonitorSmartphone className="w-5 h-5 text-green-400" /> },
    { href: "/admin/revenue", label: "Revenue Hub", icon: <DollarSign className="w-5 h-5 text-green-500" /> },
    { href: "/admin/traffic", label: "Traffic", icon: <BarChart className="w-5 h-5 text-yellow-500" /> },
    { href: "/admin/github", label: "GitHub Launch", icon: <Cpu className="w-5 h-5 text-white" /> },
    { href: "/admin/deploy", label: "Deployment", icon: <Rocket className="w-5 h-5 text-red-400" /> },
    { href: "/admin/app", label: "PWA App", icon: <MonitorSmartphone className="w-5 h-5 text-white" /> },
    { href: "/admin/community", label: "Community", icon: <Users className="w-5 h-5 text-blue-300" /> },
    { href: "/admin/setup", label: "Setup Checklist", icon: <CheckSquare className="w-5 h-5 text-green-300" /> }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
            <Shield className="w-10 h-10 text-primary" /> Command Center
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-2xl">
            Welcome to the FortHub Master Control. From here, you can orchestrate bots, manage linked satellite sites, review fan PRs, and monitor the Daily Execution Engine.
          </p>
        </div>
      </div>

      <AssistantWidget />
      <ReaperCommandWidget />

      {/* High-Level Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-red-400" />
            <h3 className="font-bold text-white uppercase text-sm">Deployment</h3>
          </div>
          <p className="text-2xl font-black text-red-400 mb-1">NEEDS VERCEL</p>
          <p className="text-xs text-white/50">Production host missing.</p>
        </div>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold text-white uppercase text-sm">Revenue</h3>
          </div>
          <p className="text-2xl font-black text-yellow-400 mb-1">OPTIONAL_LATER</p>
          <p className="text-xs text-white/50">Ad network not connected.</p>
        </div>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe2 className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white uppercase text-sm">Linked Sites</h3>
          </div>
          <p className="text-2xl font-black text-blue-400 mb-1">10 ZONES</p>
          <p className="text-xs text-white/50">4 Live • 6 Needs Domain</p>
        </div>
        <div className="bg-[#12131c] border border-green-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(0,255,157,0.1)]">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-white uppercase text-sm">Bot Registry</h3>
          </div>
          <p className="text-2xl font-black text-primary mb-1">500 BOTS</p>
          <p className="text-xs text-primary/70">Engine operational.</p>
        </div>
      </div>

      {/* Safety Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-400 uppercase tracking-widest text-sm mb-2">Missing Critical Accounts</h3>
            <ul className="text-sm text-red-400/80 space-y-1 list-disc list-inside">
              <li>NEXT_PUBLIC_SITE_URL (Domain)</li>
              <li>DATABASE_URL (Supabase)</li>
              <li>NEXT_PUBLIC_ANALYTICS_ID (Google Analytics)</li>
            </ul>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-green-400 uppercase tracking-widest text-sm mb-2">Live Autonomous Systems</h3>
            <ul className="text-sm text-green-400/80 space-y-1 list-disc list-inside">
              <li>Live Item Shop Rotations</li>
              <li>Live News Integrations</li>
              <li>Shutdown & Legal Protection Systems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Access Matrix */}
      <div className="pt-8 border-t border-white/5">
        <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6">Command Modules</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tabs.map((tab, i) => (
            <Link 
              key={i} 
              href={tab.href}
              className="bg-[#12131c] hover:bg-white/5 border border-white/5 hover:border-primary/50 transition-all rounded-xl p-6 flex flex-col items-center justify-center gap-3 group text-center"
            >
              <div className="group-hover:scale-110 transition-transform">{tab.icon}</div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white">
                {tab.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
