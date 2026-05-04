"use client";
import { Rocket, Bot, Film, TrendingUp, Activity, HelpCircle, Shield, Globe, Lock, GitBranch, Terminal, Zap, MonitorSmartphone, Share2, Users, MessageSquare, Cpu, Search, Layout, Settings } from "lucide-react";
import Link from "next/link";
import AdminQuickActions from "@/components/admin/AdminQuickActions";
import AdminHelpWidget from "@/components/admin/AdminHelpWidget";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Launch Setup",
      desc: "Connect your core infrastructure and prepare for production launch.",
      icon: <Rocket className="w-8 h-8 text-blue-400" />,
      primary: { label: "Control Core", href: "/admin/control-core" },
      status: "NEEDS_SETUP",
      links: [
        { label: "Domain Setup", href: "/admin/domain-setup" },
        { label: "Env Setup", href: "/admin/env-setup" },
        { label: "GitHub Launch", href: "/admin/github-launch" },
        { label: "Deployment", href: "/api/deploy" }
      ]
    },
    {
      title: "Bot Operations",
      desc: "Control the REAPER fleet and manage automated site maintenance.",
      icon: <Bot className="w-8 h-8 text-primary" />,
      primary: { label: "Bot Automation", href: "/admin/bot-automation" },
      status: "ACTIVE",
      links: [
        { label: "REAPER Fleet", href: "/admin/reaper" },
        { label: "Daily Engine", href: "/admin/daily" },
        { label: "Growth Engine", href: "/admin/growth" },
        { label: "Maintenance", href: "/admin/maintenance" },
        { label: "Issues & Fixes", href: "/admin/nav-health" }
      ]
    },
    {
      title: "Content & Media",
      desc: "Review automated submissions, media assets, and social planning.",
      icon: <Film className="w-8 h-8 text-yellow-400" />,
      primary: { label: "Media Ops", href: "/admin/media" },
      status: "SYNCED",
      links: [
        { label: "Data Dispatcher", href: "/admin/data-dispatcher" },
        { label: "Submissions", href: "/admin/submissions" },
        { label: "Weekly Draw", href: "/admin/weekly-draw" },
        { label: "Community Chat", href: "/admin/community/chat" }
      ]
    },
    {
      title: "Money & Growth",
      desc: "Monitor revenue streams, ad performance, and creator partnerships.",
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      primary: { label: "Revenue Hub", href: "/admin/revenue" },
      status: "READY",
      links: [
        { label: "Ads Manager", href: "/admin/ads" },
        { label: "Traffic Stats", href: "/admin/traffic" },
        { label: "Analytics", href: "/admin/analytics" },
        { label: "Creator Tracker", href: "/admin/creator-tracker" }
      ]
    },
    {
      title: "System Health",
      desc: "Technical health monitoring, uptime status, and development tools.",
      icon: <Activity className="w-8 h-8 text-red-400" />,
      primary: { label: "IT & Dev", href: "/admin/it-dev" },
      status: "OK",
      links: [
        { label: "Nav Health", href: "/admin/nav-health" },
        { label: "Setup Checklist", href: "/admin/setup" },
        { label: "Execution Logs", href: "/admin/reaper" },
        { label: "Site Status", href: "/api/health" }
      ]
    },
    {
      title: "Help & Setup",
      desc: "Quick links to setup guides, integrations, and automation helpers.",
      icon: <HelpCircle className="w-8 h-8 text-purple-400" />,
      primary: { label: "Help Bot", href: "/admin/help" },
      status: "READY",
      links: [
        { label: "Setup Links", href: "/admin/setup-links" },
        { label: "Accounts", href: "/admin/accounts" },
        { label: "Integrations", href: "/admin/integrations" },
        { label: "Auto-Fill Teams", href: "/admin/control-core" }
      ]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Dashboard" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-12">
        <div className="space-y-2">
           <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary/20 text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">Admin Master</span>
              <span className="bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">Env: Development</span>
           </div>
           <h1 className="text-5xl font-black uppercase tracking-tighter text-white">COMMAND <span className="text-primary">CENTER</span></h1>
           <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em]">Autonomous Fleet Management & Media Control</p>
        </div>
        <div className="bg-[#12131c] p-6 rounded-3xl border border-white/5 space-y-4">
           <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Quick Operational Actions</p>
           <AdminQuickActions />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-[#12131c] border border-white/5 rounded-[2.5rem] p-10 hover:border-white/10 transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-8">
               <div className="p-5 bg-black/40 rounded-3xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
               </div>
               <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                 card.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                 card.status === 'NEEDS_SETUP' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                 'bg-white/5 text-white/40 border-white/10'
               }`}>
                 {card.status}
               </span>
            </div>
            
            <div className="space-y-4 flex-1">
               <h2 className="text-2xl font-black uppercase text-white tracking-tight">{card.title}</h2>
               <p className="text-sm text-white/40 font-medium leading-relaxed">{card.desc}</p>
               
               <div className="pt-6 grid grid-cols-2 gap-y-3 gap-x-4 border-t border-white/5">
                 {card.links.map((link, j) => (
                   <Link key={j} href={link.href} className="text-[10px] font-black text-white/30 hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-2">
                     <div className="w-1 h-1 bg-white/20 rounded-full" /> {link.label}
                   </Link>
                 ))}
               </div>
            </div>

            <Link 
              href={card.primary.href}
              className="mt-10 w-full bg-white/5 hover:bg-primary hover:text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest text-white transition-all text-center flex items-center justify-center gap-3 border border-white/10 hover:border-primary shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_10px_30px_rgba(0,255,157,0.1)]"
            >
              {card.primary.label} <Zap className="w-4 h-4 fill-current" />
            </Link>
          </div>
        ))}
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-center gap-8 pt-12 border-t border-white/5">
         <Link href="/admin/tools" className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-white transition-all">
            <Search className="w-4 h-4" /> Full Tools Directory
         </Link>
         <Link href="/admin/reaper" className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-white transition-all">
            <Layout className="w-4 h-4" /> Fleet Orchestrator
         </Link>
         <Link href="/" className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:text-white transition-all">
            <Settings className="w-4 h-4" /> Back to Public Site
         </Link>
      </div>

    </div>
  );
}
