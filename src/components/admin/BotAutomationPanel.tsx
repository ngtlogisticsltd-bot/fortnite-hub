"use client";
import { useState, useEffect } from 'react';
import { Play, Activity, Zap, Shield, MonitorSmartphone, RefreshCw, CheckCircle, AlertTriangle, ExternalLink, Terminal, Clock, Lock, Globe } from 'lucide-react';
import Link from 'next/link';

export default function BotAutomationPanel() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const fetchStatus = async () => {
    const r = await fetch('/api/reaper/bot-automation');
    const data = await r.json();
    setStatus(data);
  };

  useEffect(() => { fetchStatus(); }, []);

  const actions = [
    { id: 'safe-cycle', label: 'Run Safe Cycle', icon: <Shield className="w-4 h-4" />, color: 'bg-primary' },
    { id: 'daily', label: 'Run Daily Engine', icon: <Zap className="w-4 h-4" />, color: 'bg-yellow-400' },
    { id: 'growth', label: 'Run Growth Engine', icon: <Activity className="w-4 h-4" />, color: 'bg-purple-500' },
    { id: 'maintenance', label: 'Run Maintenance', icon: <Shield className="w-4 h-4 text-primary" />, color: 'bg-[#12131c]' },
    { id: 'media', label: 'Run Media Cycle', icon: <MonitorSmartphone className="w-4 h-4" />, color: 'bg-[#12131c]' },
    { id: 'health', label: 'Check Live API', icon: <Activity className="w-4 h-4" />, color: 'bg-[#12131c]' },
    { id: 'check-domain-setup', label: 'Check Domain Setup', icon: <Globe className="w-4 h-4" />, color: 'bg-[#12131c]' },
    { id: 'sync-control-core', label: 'Sync Control Core', icon: <RefreshCw className="w-4 h-4" />, color: 'bg-[#12131c]' },
    { id: 'view-logs', label: 'View Logs', icon: <Terminal className="w-4 h-4" />, color: 'bg-[#12131c]', href: '/admin/reaper' }
  ];

  const runAction = async (id: string, href?: string) => {
    if (href) {
      window.location.href = href;
      return;
    }
    setLoading(id);
    setResult(null);
    try {
      const r = await fetch('/api/reaper/bot-automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: id })
      });
      const data = await r.json();
      setResult(data);
      fetchStatus();
    } catch (err) {
      setResult({ success: false, error: "Failed to connect to automation API" });
    }
    setLoading(null);
  };

  if (!status) return <div className="p-12 animate-pulse text-primary font-black uppercase tracking-widest text-center">Inhaling Automation Status...</div>;

  return (
    <div className="space-y-12">
      
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
         {[
           { label: 'Cron Readiness', value: status.cronReadiness, icon: <Clock className="w-5 h-5 text-blue-400" />, sub: 'Vercel JSON' },
           { label: 'API Health', value: status.health, icon: <Activity className="w-5 h-5 text-green-400" />, sub: 'Runtime' },
           { label: 'Domain Status', value: 'PENDING_DNS', icon: <Globe className="w-5 h-5 text-purple-400" />, sub: 'Verification' },
           { label: 'Persistence', value: status.supabaseStatus, icon: <Zap className="w-5 h-5 text-yellow-400" />, sub: 'Database' },
           { label: 'Approvals', value: '0 PENDING', icon: <Shield className="w-5 h-5 text-red-400" />, sub: 'Queue' },
           { label: 'Bot Status', value: status.botStatus, icon: <Shield className="w-5 h-5 text-primary" />, sub: 'Readiness' }
         ].map((stat, i) => (
            <div key={i} className="bg-[#12131c] border border-white/5 p-6 rounded-3xl space-y-2">
               <div className="flex items-center gap-3">
                  {stat.icon}
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{stat.label}</span>
               </div>
               <div className="text-xl font-black text-white uppercase tracking-tighter">{stat.value}</div>
               <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">{stat.sub}</div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* Left: Quick Actions */}
         <div className="lg:col-span-2 space-y-8">
            <h3 className="text-white font-black uppercase text-sm tracking-[0.3em] flex items-center gap-3">
               <Terminal className="w-5 h-5 text-primary" /> Automation Console
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {actions.map(action => (
                  <button 
                     key={action.id}
                     onClick={() => runAction(action.id, action.href)}
                     disabled={loading !== null}
                     className={`p-6 rounded-3xl border border-white/10 flex items-center justify-between group transition-all ${
                        action.color.includes('bg-primary') ? 'hover:bg-primary hover:text-black' : 
                        action.color.includes('bg-yellow') ? 'hover:bg-yellow-400 hover:text-black' : 
                        'hover:bg-white/5 text-white'
                     } disabled:opacity-50`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-black/20 ${action.color.includes('bg-primary') || action.color.includes('bg-yellow') ? 'group-hover:bg-black/10' : ''}`}>
                           {action.icon}
                        </div>
                        <span className="font-black uppercase text-[11px] tracking-widest">{action.label}</span>
                     </div>
                     {loading === action.id ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />}
                  </button>
               ))}
            </div>

            {/* Results Panel */}
            {result && (
               <div className={`p-8 rounded-3xl border animate-in slide-in-from-top-4 duration-300 ${
                  result.success ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
               }`}>
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="font-black uppercase text-xs tracking-widest flex items-center gap-2">
                        {result.success ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                        {result.success ? 'Action Completed' : 'Action Failed'}
                     </h4>
                     <button onClick={() => setResult(null)} className="text-[10px] font-black text-white/30 uppercase hover:text-white">Clear</button>
                  </div>
                  <p className="text-sm font-bold text-white mb-4 uppercase tracking-widest">{result.message || result.error}</p>
                  {result.logs && result.logs.length > 0 && (
                     <div className="bg-black/60 rounded-2xl p-6 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {result.logs.map((log: any, i: number) => (
                           <div key={i} className="text-[9px] font-mono text-white/40 border-b border-white/5 pb-1">
                              [{new Date(log.timestamp).toLocaleTimeString()}] {log.teamId}: {log.message}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}
         </div>

         {/* Right: Cron & Links */}
         <div className="space-y-8">
            
            <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
               <h3 className="text-white font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                  <Clock className="w-5 h-5 text-blue-400" /> Scheduled Crons
               </h3>
               <div className="space-y-4">
                  {status.cronRoutes.map((cron: any, i: number) => (
                     <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-1">
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] font-black text-primary uppercase tracking-widest">{cron.path}</span>
                           <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded font-black text-white/40">{cron.status}</span>
                        </div>
                        <p className="text-[10px] font-bold text-white/60">{cron.schedule}</p>
                     </div>
                  ))}
               </div>
               <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest border border-white/10 transition-all">
                  Check Cron Readiness
               </button>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-4">
               <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                  <ExternalLink className="w-5 h-5" /> Live Ops Sync
               </h3>
               <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Domain Setup', href: '/admin/domain-setup', icon: <Globe className="w-3 h-3" /> },
                    { label: 'Env Setup', href: '/admin/env-setup', icon: <Lock className="w-3 h-3" /> },
                    { label: 'Control Core', href: '/admin/control-core', icon: <Shield className="w-3 h-3" /> },
                    { label: 'Media Ops', href: '/admin/media', icon: <MonitorSmartphone className="w-3 h-3" /> },
                    { label: 'Daily Engine', href: '/admin/daily', icon: <Zap className="w-3 h-3" /> },
                    { label: 'Growth Engine', href: '/admin/growth', icon: <Activity className="w-3 h-3" /> }
                  ].map((link, i) => (
                     <Link 
                        key={i} 
                        href={link.href}
                        className="bg-black/40 hover:bg-black/60 border border-white/5 p-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white flex items-center justify-between transition-all"
                     >
                        <span className="flex items-center gap-2">{link.icon} {link.label}</span>
                        <ExternalLink className="w-3 h-3 opacity-20" />
                     </Link>
                  ))}
               </div>
            </section>

         </div>

      </div>

    </div>
  );
}
