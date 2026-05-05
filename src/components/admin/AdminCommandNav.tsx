"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Terminal, Bot, Rocket, Film, TrendingUp, Users, Activity, HelpCircle, 
  ChevronDown, ChevronRight, Search, Star, Clock, ArrowLeft, ShieldCheck, Cpu, Database,
  Lock, Zap
} from "lucide-react";

interface NavGroup {
  id: string;
  label: string;
  icon: any;
  links: { href: string; label: string; icon: any }[];
}

export default function AdminCommandNav({ health }: { health?: any }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isOnline = health?.status === 'ok' || health?.status === 'online';

  const groups: NavGroup[] = [
    {
      id: "launch",
      label: "Launch",
      icon: <Rocket className="w-4 h-4" />,
      links: [
        { href: "/admin/control-core", label: "Control Core", icon: <Database className="w-4 h-4" /> },
        { href: "/admin/domain-setup", label: "Domain Setup", icon: <ShieldCheck className="w-4 h-4" /> },
        { href: "/admin/env-setup", label: "Env Setup", icon: <Lock className="w-4 h-4" /> },
        { href: "/admin/github-launch", label: "GitHub Launch", icon: <Rocket className="w-4 h-4" /> }
      ]
    },
    {
      id: "bots",
      label: "Bots",
      icon: <Bot className="w-4 h-4" />,
      links: [
        { href: "/admin/bot-automation", label: "Automation", icon: <Activity className="w-4 h-4" /> },
        { href: "/admin/reaper", label: "REAPER Fleet", icon: <Terminal className="w-4 h-4" /> },
        { href: "/admin/daily", label: "Daily Engine", icon: <Zap className="w-4 h-4" /> },
        { href: "/admin/growth", label: "Growth Engine", icon: <TrendingUp className="w-4 h-4" /> },
        { href: "/admin/maintenance", label: "Maintenance", icon: <Activity className="w-4 h-4" /> }
      ]
    },
    {
      id: "content",
      label: "Content",
      icon: <Film className="w-4 h-4" />,
      links: [
        { href: "/admin/media", label: "Media Ops", icon: <Film className="w-4 h-4" /> },
        { href: "/admin/data-dispatcher", label: "Dispatcher", icon: <Database className="w-4 h-4" /> },
        { href: "/admin/submissions", label: "Submissions", icon: <Users className="w-4 h-4" /> },
        { href: "/admin/weekly-draw", label: "Weekly Draw", icon: <Star className="w-4 h-4" /> }
      ]
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: <TrendingUp className="w-4 h-4" />,
      links: [
        { href: "/admin/revenue", label: "Revenue Hub", icon: <TrendingUp className="w-4 h-4" /> },
        { href: "/admin/ads", label: "Ads Manager", icon: <Activity className="w-4 h-4" /> },
        { href: "/admin/traffic", label: "Traffic Stats", icon: <Activity className="w-4 h-4" /> }
      ]
    },
    {
      id: "system",
      label: "System",
      icon: <Activity className="w-4 h-4" />,
      links: [
        { href: "/admin/it-dev", label: "IT & Dev", icon: <Cpu className="w-4 h-4" /> },
        { href: "/admin/nav-health", label: "Nav Health", icon: <Activity className="w-4 h-4" /> },
        { href: "/admin/setup", label: "Checklist", icon: <ShieldCheck className="w-4 h-4" /> }
      ]
    },
    {
      id: "help",
      label: "Help",
      icon: <HelpCircle className="w-4 h-4" />,
      links: [
        { href: "/admin/help", label: "Help Bot", icon: <HelpCircle className="w-4 h-4" /> },
        { href: "/admin/tools", label: "All Tools", icon: <Search className="w-4 h-4" /> }
      ]
    }
  ];

  useEffect(() => {
    // Auto-expand current group
    const currentGroup = groups.find(g => g.links.some(l => pathname === l.href));
    if (currentGroup) setExpanded(currentGroup.id);
  }, [pathname]);

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-[#0a0b10] border-r border-white/5 transition-all duration-300 z-50 flex flex-col ${isHovered ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
         <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-black">H</div>
            {isHovered && <span className="font-black uppercase tracking-widest text-white text-xs">Admin Hub</span>}
         </Link>
      </div>

      {/* Primary Links */}
      <div className="p-4 space-y-1">
         <Link 
            href="/admin/setup" 
            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${pathname === '/admin/setup' ? 'bg-primary text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
         >
            <ShieldCheck className="w-5 h-5 shrink-0" />
            {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">Launch Setup</span>}
         </Link>
         <Link 
            href="/admin" 
            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${pathname === '/admin' ? 'bg-primary text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
         >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">Dashboard</span>}
         </Link>
         <Link 
            href="/admin/reaper" 
            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${pathname === '/admin/reaper' ? 'bg-primary text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
         >
            <Terminal className="w-5 h-5 shrink-0" />
            {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">Command</span>}
         </Link>
         <Link 
            href="/live-feed" 
            target="_blank"
            className={`flex items-center gap-4 p-3 rounded-xl transition-all text-white/40 hover:text-white hover:bg-white/5`}
         >
            <Activity className="w-5 h-5 shrink-0" />
            {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">Live Feed</span>}
         </Link>
         <Link 
            href="/status" 
            target="_blank"
            className={`flex items-center gap-4 p-3 rounded-xl transition-all text-white/40 hover:text-white hover:bg-white/5`}
         >
            <Activity className="w-5 h-5 shrink-0" />
            {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">Status</span>}
         </Link>
      </div>

      {/* Search (Only visible on hover) */}
      {isHovered && (
         <div className="px-4 py-2">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
               <input 
                  type="text" 
                  placeholder="SEARCH TOOLS..." 
                  className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-9 text-[9px] font-black text-white placeholder:text-white/10 focus:border-primary/50 outline-none transition-all"
               />
            </div>
         </div>
      )}

      {/* Collapsible Groups */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
         {groups.map(group => (
            <div key={group.id} className="space-y-1">
               <button 
                  onClick={() => setExpanded(expanded === group.id ? null : group.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${expanded === group.id ? 'bg-white/5 text-white' : 'text-white/20 hover:text-white/40'}`}
               >
                  <div className="flex items-center gap-4">
                     <div className="shrink-0">{group.icon}</div>
                     {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">{group.label}</span>}
                  </div>
                  {isHovered && (expanded === group.id ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />)}
               </button>
               
               {expanded === group.id && isHovered && (
                  <div className="ml-4 pl-4 border-l border-white/5 space-y-1 py-1">
                     {group.links.map(link => (
                        <Link 
                           key={link.href} 
                           href={link.href}
                           className={`block p-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${pathname === link.href ? 'text-primary' : 'text-white/30 hover:text-white/60'}`}
                        >
                           {link.label}
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
         <div className="flex items-center gap-3 px-3 py-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            {isHovered && <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">API: {isOnline ? 'ONLINE' : 'OFFLINE'}</span>}
         </div>
         <Link 
            href="/" 
            className="flex items-center gap-4 p-3 rounded-xl text-white/40 hover:text-primary transition-all"
         >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            {isHovered && <span className="text-[11px] font-black uppercase tracking-widest">EXIT ADMIN</span>}
         </Link>
      </div>
    </aside>
  );
}
