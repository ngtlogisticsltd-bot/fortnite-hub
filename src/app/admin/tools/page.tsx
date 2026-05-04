"use client";
import { useState } from "react";
import { Search, ExternalLink, Shield, Bot, Layout, Zap, Activity, Film, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import AdminHelpWidget from "@/components/admin/AdminHelpWidget";

interface Tool {
  title: string;
  route: string;
  group: 'Launch' | 'Bots' | 'Content' | 'Revenue' | 'System' | 'Help';
  purpose: string;
  status: 'Production' | 'Beta' | 'Internal';
  riskLevel: 'low' | 'medium' | 'high';
}

export default function ToolsDirectoryPage() {
  const [search, setSearch] = useState("");

  const tools: Tool[] = [
    { title: "Control Core", route: "/admin/control-core", group: "Launch", purpose: "Master profile and brand setup", status: "Production", riskLevel: "low" },
    { title: "Domain Setup", route: "/admin/domain-setup", group: "Launch", purpose: "DNS and Vercel domain verification", status: "Production", riskLevel: "medium" },
    { title: "Env Setup", route: "/admin/env-setup", group: "Launch", purpose: "Vercel environment variable management", status: "Production", riskLevel: "high" },
    { title: "Bot Automation", route: "/admin/bot-automation", group: "Bots", purpose: "Unified bot cycle control", status: "Production", riskLevel: "low" },
    { title: "REAPER Fleet", route: "/admin/reaper", group: "Bots", purpose: "Main orchestrator and command log", status: "Production", riskLevel: "low" },
    { title: "Daily Engine", route: "/admin/daily", group: "Bots", purpose: "Daily content rotation cycles", status: "Production", riskLevel: "medium" },
    { title: "Growth Engine", route: "/admin/growth", group: "Bots", purpose: "SEO and creator domination stack", status: "Production", riskLevel: "high" },
    { title: "Media Ops", route: "/admin/media", group: "Content", purpose: "All formats media planning", status: "Production", riskLevel: "low" },
    { title: "Revenue Hub", route: "/admin/revenue", group: "Revenue", purpose: "Monetization and affiliate control", status: "Production", riskLevel: "medium" },
    { title: "IT & Dev", route: "/admin/it-dev", group: "System", purpose: "Technical health and route audit", status: "Production", riskLevel: "low" },
    { title: "Nav Health", route: "/admin/nav-health", group: "System", purpose: "Internal and public route monitoring", status: "Production", riskLevel: "low" },
    { title: "Submissions", route: "/admin/submissions", group: "Content", purpose: "User and AI content moderation", status: "Production", riskLevel: "low" }
  ];

  const filtered = tools.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.group.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Tools Directory" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-12">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter text-white">TOOLS <span className="text-primary">DIRECTORY</span></h1>
           <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Comprehensive Searchable Registry of All Admin Tooling</p>
        </div>
        <div className="relative w-full md:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
           <input 
              type="text" 
              placeholder="SEARCH BY TITLE OR GROUP..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#12131c] border border-white/10 rounded-2xl py-4 pl-12 text-sm font-black text-white placeholder:text-white/10 focus:border-primary transition-all outline-none"
           />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.map((tool, i) => (
            <div key={i} className="bg-[#12131c] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group flex flex-col">
               <div className="flex items-center justify-between mb-6">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                     {tool.group}
                  </span>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded ${
                    tool.riskLevel === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-white/30'
                  }`}>
                    {tool.riskLevel} RISK
                  </span>
               </div>
               
               <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{tool.title}</h3>
                  <p className="text-[11px] text-white/40 font-bold uppercase tracking-wider leading-relaxed">{tool.purpose}</p>
               </div>

               <Link 
                  href={tool.route}
                  className="mt-8 flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group-hover:bg-primary group-hover:text-black transition-all"
               >
                  <span className="text-[9px] font-black uppercase tracking-widest">Open Tool</span>
                  <ExternalLink className="w-4 h-4" />
               </Link>
            </div>
         ))}
      </div>

      {filtered.length === 0 && (
         <div className="p-20 text-center space-y-4">
            <Bot className="w-12 h-12 text-white/10 mx-auto" />
            <p className="text-white/20 font-black uppercase tracking-widest">No matching tools found in the fleet registry.</p>
         </div>
      )}

    </div>
  );
}
