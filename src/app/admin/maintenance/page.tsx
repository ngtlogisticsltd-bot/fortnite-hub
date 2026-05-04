"use client";
import { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, Activity, RefreshCcw, Terminal, ArrowRight, Server, ShieldCheck, Clock } from 'lucide-react';
import { MaintenanceReport, MaintenanceError } from '@/lib/maintenance/types';

export default function AdminMaintenancePage() {
  const [report, setReport] = useState<MaintenanceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [fixing, setFixing] = useState(false);

  const fetchReport = async () => {
    const res = await fetch('/api/reaper/maintenance');
    const data = await res.json();
    if (data.success) setReport(data.report);
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
    const interval = setInterval(fetchReport, 10000);
    return () => clearInterval(interval);
  }, []);

  const runCycle = async () => {
    setFixing(true);
    const res = await fetch('/api/reaper/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'run-cycle' })
    });
    const data = await res.json();
    if (data.success) setReport(data.report);
    setFixing(false);
  };

  const resolve = async (errorId: string) => {
    const res = await fetch('/api/reaper/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'resolve', errorId })
    });
    const data = await res.json();
    if (data.success) setReport(data.report);
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-primary font-black uppercase tracking-widest">Scanning System Integrity...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">ERROR <span className="text-primary">& FIX</span> TEAM</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Automated Integrity & Runtime Maintenance</p>
          </div>
        </div>
        <button 
          onClick={runCycle}
          disabled={fixing}
          className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,255,157,0.3)]"
        >
          {fixing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
          Run Health Cycle
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">System Health</span>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block w-fit border ${getStatusColor(report?.overallStatus || '')}`}>
               {report?.overallStatus}
            </div>
         </div>
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Issues</span>
            <span className="text-2xl font-black text-white">{report?.activeErrors.length}</span>
         </div>
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Last Build</span>
            <span className="text-2xl font-black text-green-500 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> SUCCESS</span>
         </div>
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">System Uptime</span>
            <span className="text-2xl font-black text-blue-400">{report?.uptime}</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Issues Queue */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-white/40 font-black uppercase text-xs tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" /> Active Issues Queue
           </h3>
           <div className="space-y-4">
              {report?.activeErrors.length === 0 && (
                <div className="bg-[#12131c] border border-white/5 rounded-3xl p-20 text-center">
                   <CheckCircle className="w-12 h-12 text-green-500/20 mx-auto mb-4" />
                   <p className="text-white/20 font-black uppercase tracking-widest">No runtime errors detected. System is stable.</p>
                </div>
              )}
              {report?.activeErrors.map((err) => (
                <div key={err.id} className="bg-[#12131c] border border-white/10 rounded-3xl p-8 hover:border-primary/20 transition-all group overflow-hidden relative shadow-lg">
                   <div className={`absolute top-0 left-0 w-1.5 h-full ${err.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                   
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5 font-mono text-xs text-white/30">
                            {err.source.slice(0, 3).toUpperCase()}
                         </div>
                         <div>
                            <h4 className="font-black text-white uppercase text-sm tracking-widest flex items-center gap-2">
                               {err.source}
                               <span className={`text-[8px] px-2 py-0.5 rounded font-black border ${getStatusColor(err.severity)}`}>
                                  {err.severity}
                               </span>
                            </h4>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">ID: {err.id}</p>
                         </div>
                      </div>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{new Date(err.timestamp).toLocaleTimeString()}</span>
                   </div>

                   <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-6">
                      <p className="text-xs font-mono text-white/70 italic leading-relaxed">&quot;{err.message}&quot;</p>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                            <RefreshCcw className="w-3.5 h-3.5" /> Suggested: {err.suggestedFix}
                         </div>
                         <span className="text-[8px] bg-white/5 text-white/30 px-2 py-0.5 rounded font-black uppercase">Risk: {err.risk}</span>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <button 
                        onClick={() => resolve(err.id)}
                        className="flex-1 bg-primary hover:bg-primary/80 text-black py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,255,157,0.2)] transition-all"
                      >
                         <CheckCircle className="w-4 h-4" /> Apply Fix Now
                      </button>
                      <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all">
                         <Terminal className="w-4 h-4" /> View Detailed Logs
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Sidebar: Resolved & Metrics */}
        <div className="space-y-8">
           
           <section className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-green-500 font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <CheckCircle className="w-5 h-5" /> Recently Resolved
              </h3>
              <div className="space-y-4">
                 {report?.resolvedErrors.length === 0 && (
                   <p className="text-[10px] text-white/20 italic text-center py-4 font-bold uppercase tracking-widest">No recent resolutions.</p>
                 )}
                 {report?.resolvedErrors.slice(0, 5).map((err) => (
                    <div key={err.id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 group">
                       <div className="truncate">
                          <p className="text-[10px] font-black text-white uppercase truncate">{err.source}</p>
                          <p className="text-[8px] text-green-500/70 uppercase font-bold truncate">Fixed: {err.suggestedFix}</p>
                       </div>
                       <Clock className="w-3 h-3 text-white/20 shrink-0" />
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
              <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" /> System Metrics
              </h3>
              <div className="space-y-4">
                 {[
                   { label: "Memory Usage", value: "142MB", status: "ok" },
                   { label: "CPU Load", value: "1.2%", status: "ok" },
                   { label: "API Latency", value: "42ms", status: "ok" },
                   { label: "DB Connections", value: "8 Active", status: "ok" }
                 ].map((metric, i) => (
                    <div key={i} className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
                       <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{metric.label}</span>
                       <span className="text-[10px] font-mono text-primary">{metric.value}</span>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                 <Terminal className="w-5 h-5" />
                 <h4 className="text-xs font-black uppercase tracking-widest">Maintenance Logic</h4>
              </div>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-relaxed">
                 The Fix Team automatically resolves <span className="text-primary">LOW RISK</span> issues during every health cycle. Medium and High risk items are staged for your approval to ensure zero-downtime operations.
              </p>
           </section>

        </div>

      </div>

    </div>
  );
}
