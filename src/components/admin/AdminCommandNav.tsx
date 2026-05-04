"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Terminal, Cpu, Activity, Zap, TrendingUp, 
  Shield, Link2, Share2, CheckSquare, Rocket, GitBranch,
  DollarSign, MonitorSmartphone, Server, 
  Users, MessageSquare, Gift, GitPullRequest, Globe2,
  ChevronDown, Search, Heart, ShieldAlert, HelpCircle, Globe, Lock
} from 'lucide-react';

export default function AdminCommandNav({ health }: { health: any }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'COMMAND': true,
    'OPERATIONS': true,
    'BUSINESS': false,
    'COMMUNITY': false,
    'SYSTEM': false
  });
  const [search, setSearch] = useState('');

  const groups = [
    {
      name: 'COMMAND',
      icon: <Terminal className="w-4 h-4" />,
      links: [
        { href: "/admin/command-center", label: "Command Center", icon: <Terminal className="w-4 h-4" /> },
        { href: "/admin/assistant", label: "Assistant", icon: <Cpu className="w-4 h-4" /> },
        { href: "/admin/help", label: "Help Bot", icon: <HelpCircle className="w-4 h-4 text-primary" /> },
        { href: "/admin/setup-links", label: "Setup Links", icon: <Globe className="w-4 h-4" /> },
        { href: "/admin/reaper", label: "Orchestrator", icon: <Activity className="w-4 h-4" /> },
        { href: "/admin/daily", label: "Daily Engine", icon: <Zap className="w-4 h-4" /> },
        { href: "/admin/growth", label: "Growth Engine", icon: <TrendingUp className="w-4 h-4" /> },
      ]
    },
    {
      name: 'OPERATIONS',
      icon: <Activity className="w-4 h-4" />,
      links: [
        { href: "/admin/maintenance", label: "Maintenance", icon: <ShieldAlert className="w-4 h-4 text-primary" /> },
        { href: "/admin/bot-automation", label: "Bot Automation", icon: <Zap className="w-4 h-4" /> },
        { href: "/admin/domain-setup", label: "Domain Setup", icon: <Globe className="w-4 h-4" /> },
        { href: "/admin/env-setup", label: "Env Setup", icon: <Lock className="w-4 h-4" /> },
        { href: "/admin/it-dev", label: "IT & Dev", icon: <Cpu className="w-4 h-4" /> },
        { href: "/admin/nav-health", label: "Nav Health", icon: <Link2 className="w-4 h-4" /> },
        { href: "/admin/data-dispatcher", label: "Data Dispatcher", icon: <Share2 className="w-4 h-4" /> },
        { href: "/admin/setup", label: "Setup Checklist", icon: <CheckSquare className="w-4 h-4" /> },
        { href: "/admin/deploy", label: "Deployment", icon: <Rocket className="w-4 h-4" /> },
        { href: "/admin/github", label: "GitHub Launch", icon: <GitBranch className="w-4 h-4" /> },
      ]
    },
    {
      name: 'BUSINESS',
      icon: <DollarSign className="w-4 h-4" />,
      links: [
        { href: "/admin/control-core", label: "Control Core", icon: <Shield className="w-4 h-4" /> },
        { href: "/admin/revenue", label: "Revenue Hub", icon: <DollarSign className="w-4 h-4" /> },
        { href: "/admin/ads", label: "Ads", icon: <MonitorSmartphone className="w-4 h-4" /> },
        { href: "/admin/accounts", label: "Accounts", icon: <Server className="w-4 h-4" /> },
        { href: "/admin/autofill", label: "Auto-Fill", icon: <Zap className="w-4 h-4" /> },
        { href: "/admin/integrations", label: "Integrations", icon: <Link2 className="w-4 h-4" /> },
      ]
    },
    {
      name: 'COMMUNITY',
      icon: <Users className="w-4 h-4" />,
      links: [
        { href: "/admin/submissions", label: "Submissions", icon: <GitPullRequest className="w-4 h-4" /> },
        { href: "/admin/community", label: "Community Ops", icon: <Users className="w-4 h-4" /> },
        { href: "/admin/community-chat", label: "Community Chat", icon: <MessageSquare className="w-4 h-4" /> },
        { href: "/admin/weekly-draw", label: "Weekly Draw", icon: <Gift className="w-4 h-4" /> },
        { href: "/admin/media", label: "Media Ops", icon: <MonitorSmartphone className="w-4 h-4" /> },
        { href: "/admin/linked-sites", label: "Linked Sites", icon: <Globe2 className="w-4 h-4" /> },
      ]
    },
    {
      name: 'SYSTEM',
      icon: <Zap className="w-4 h-4" />,
      links: [
        { href: "/admin/bots", label: "Bot Registry", icon: <Cpu className="w-4 h-4" /> },
        { href: "/admin/app", label: "PWA App", icon: <MonitorSmartphone className="w-4 h-4" /> },
      ]
    }
  ];

  const toggleGroup = (name: string) => {
    setOpenGroups(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredGroups = groups.map(group => ({
    ...group,
    links: group.links.filter(link => 
      link.label.toLowerCase().includes(search.toLowerCase()) || 
      group.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.links.length > 0);

  return (
    <div className="flex flex-col h-full bg-[#0a0b10] border-r border-white/5 w-64 shrink-0 transition-all duration-300">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#0a0b10] p-6 border-b border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black rotate-3">F</div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white">FortHub Control</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Admin V2.1</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-white/20 group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Admin..."
            className="w-full bg-black/50 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-[10px] text-white font-bold uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {filteredGroups.map(group => (
          <div key={group.name} className="space-y-1">
            <button 
              onClick={() => toggleGroup(group.name)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors group"
            >
              <div className="flex items-center gap-2">
                {group.icon} {group.name}
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openGroups[group.name] ? 'rotate-180' : ''}`} />
            </button>
            
            {openGroups[group.name] && (
              <div className="space-y-1 animate-in fade-in slide-in-from-left-2 duration-200">
                {group.links.map(link => {
                  const active = pathname === link.href;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        active 
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,157,0.1)]' 
                          : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {link.icon} <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Health */}
      <div className="p-6 border-t border-white/5 bg-black/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${health?.status === 'ok' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 animate-pulse'}`} />
             <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">API Status</span>
          </div>
          <span className="text-[10px] font-mono text-white/20 uppercase">v1.2.4</span>
        </div>
        <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-all">
          <Heart className="w-3 h-3" /> Exit Control Hub
        </Link>
      </div>

    </div>
  );
}
