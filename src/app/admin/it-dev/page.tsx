"use client";
import { useState, useEffect } from 'react';
import { Cpu, ShieldAlert, Activity, Layout, Terminal, Globe, Lock, BarChart, FileSearch, Rocket, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import ReaperCommandWidget from '@/components/admin/ReaperCommandWidget';

export default function ITDevAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/it-dev/status')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-primary font-black uppercase tracking-widest">Loading IT Ops...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'LIVE': return 'text-primary bg-primary/10 border-primary/20';
      case 'WARNING': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'ERROR': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'NEEDS_ACTION': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-red-500';
      case 'High': return 'text-orange-500';
      case 'Medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
              <Cpu className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">IT & DEV <span className="text-primary">OVERSIGHT</span></h1>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Operational Integrity & Deployment Readiness</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#12131c] border border-white/10 p-4 rounded-2xl text-center min-w-[120px]">
              <div className="text-[10px] font-black text-white/30 uppercase mb-1">System Uptime</div>
              <div className="text-lg font-black text-primary">{data.systemUptime}</div>
           </div>
           <div className="bg-[#12131c] border border-white/10 p-4 rounded-2xl text-center min-w-[120px]">
              <div className="text-[10px] font-black text-white/30 uppercase mb-1">Build Status</div>
              <div className="text-lg font-black text-green-500">{data.lastBuildStatus}</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bot Grid */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.bots.map((bot: any) => (
                <div key={bot.id} className="bg-[#12131c] border border-white/5 p-6 rounded-2xl space-y-4 hover:border-primary/20 transition-all group">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-black text-white uppercase text-sm group-hover:text-primary transition-colors">{bot.name}</h3>
                        <p className="text-[10px] text-white/40 leading-relaxed max-w-[200px]">{bot.purpose}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-[8px] font-black border ${getStatusColor(bot.status)}`}>
                        {bot.status}
                      </span>
                   </div>
                   
                   <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span className="text-white/20">Risk Level</span>
                        <span className={getRiskColor(bot.riskLevel)}>{bot.riskLevel}</span>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Active Checks</div>
                         {bot.checks.slice(0, 2).map((check: string, idx: number) => (
                           <div key={idx} className="flex items-center gap-2 text-[9px] text-white/60">
                             <CheckCircle2 className="w-3 h-3 text-white/20" /> {check}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Sidebar Alerts */}
        <div className="space-y-6">
           
           <ReaperCommandWidget />

           {/* Security Warnings */}
           <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-red-500 font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <ShieldAlert className="w-5 h-5" /> Security Alerts
              </h3>
              {data.securityWarnings.length > 0 ? (
                <div className="space-y-4">
                  {data.securityWarnings.map((w: string, i: number) => (
                    <div key={i} className="flex gap-3 text-[11px] text-white/60 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                      {w}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-white/30 italic">No critical security vulnerabilities detected.</p>
              )}
           </div>

           {/* Next Actions */}
           <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Terminal className="w-5 h-5" /> Recommended Actions
              </h3>
              <div className="space-y-4">
                {data.nextBestActions.map((action: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] text-white/70 font-bold group">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      {i + 1}
                    </div>
                    {action}
                  </div>
                ))}
              </div>
           </div>

           {/* Quick Tools */}
           <div className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-4">
              <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-4">Diagnostic Tools</h3>
              <Link href="/admin/nav-health" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group">
                <span className="text-[10px] font-black uppercase text-white/60 group-hover:text-white transition-colors">Nav Health Audit</span>
                <Layout className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
              </Link>
              <Link href="/admin/reaper" className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all group">
                <span className="text-[10px] font-black uppercase text-white/60 group-hover:text-white transition-colors">Orchestrator Logs</span>
                <Activity className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
              </Link>
              <button onClick={() => window.location.reload()} className="w-full flex items-center justify-center gap-2 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all text-[10px] font-black uppercase text-white/40">
                 Run Full System Scan
              </button>
           </div>

        </div>

      </div>

    </div>
  );
}
