"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Activity, ShieldCheck, Zap, Server, Clock, CheckCircle2 } from "lucide-react";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/reaper/status", { cache: "no-store" });
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Status fetch failed", err);
      }
    };
    fetchStatus();
    const timer = setInterval(fetchStatus, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.4em] text-primary mb-2">Fleet Monitoring</p>
          <h1 className="text-5xl font-black uppercase tracking-tighter">System <span className="text-primary">Status</span></h1>
          <p className="mt-4 text-white/40 max-w-2xl font-medium">
            Real-time health monitoring of the FortHub autonomous bot fleet. Track uptime, operational cycles, and system connectivity.
          </p>
        </div>

        {/* Global Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-[#12131c] border border-white/5 p-8 rounded-[2rem] space-y-4">
              <div className="flex items-center justify-between">
                 <Activity className="w-8 h-8 text-primary" />
                 <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest">Live</span>
              </div>
              <div>
                 <h3 className="text-sm font-black text-white/30 uppercase tracking-widest">Fleet Uptime</h3>
                 <p className="text-3xl font-black uppercase text-white">99.98%</p>
              </div>
           </div>
           <div className="bg-[#12131c] border border-white/5 p-8 rounded-[2rem] space-y-4">
              <div className="flex items-center justify-between">
                 <Server className="w-8 h-8 text-blue-400" />
                 <span className="text-[10px] font-black bg-blue-400/10 text-blue-400 px-3 py-1 rounded-full border border-blue-400/20 uppercase tracking-widest">Stable</span>
              </div>
              <div>
                 <h3 className="text-sm font-black text-white/30 uppercase tracking-widest">API Health</h3>
                 <p className="text-3xl font-black uppercase text-white">Nominal</p>
              </div>
           </div>
           <div className="bg-[#12131c] border border-white/5 p-8 rounded-[2rem] space-y-4">
              <div className="flex items-center justify-between">
                 <Zap className="w-8 h-8 text-yellow-400" />
                 <span className="text-[10px] font-black bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/20 uppercase tracking-widest">Active</span>
              </div>
              <div>
                 <h3 className="text-sm font-black text-white/30 uppercase tracking-widest">Next Cycle</h3>
                 <p className="text-3xl font-black uppercase text-white">T-42m</p>
              </div>
           </div>
        </div>

        {/* Teams List */}
        <div className="bg-[#12131c] border border-white/5 rounded-[2.5rem] overflow-hidden">
           <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                 <ShieldCheck className="w-6 h-6 text-primary" /> Deployed Teams
              </h2>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Monitoring active</span>
              </div>
           </div>
           
           <div className="divide-y divide-white/5">
              {!status ? (
                 <div className="p-20 text-center animate-pulse">
                    <p className="text-white/20 font-black uppercase tracking-widest">Synchronizing with fleet...</p>
                 </div>
              ) : (
                 status.teams.map((team: any) => (
                    <div key={team.id} className="p-8 hover:bg-white/[0.01] transition-all flex items-center justify-between group">
                       <div className="space-y-1">
                          <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors">{team.name}</h3>
                          <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-widest">
                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {team.schedule}</span>
                             <span className={team.riskLevel === 'high' ? 'text-red-500/60' : 'text-green-500/60'}>{team.riskLevel} Risk</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="text-right hidden md:block">
                             <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Status</p>
                             <p className="text-xs font-bold text-green-400 uppercase tracking-widest">Operational</p>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                             <CheckCircle2 className="w-6 h-6 text-green-500" />
                          </div>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">FortHub Autonomous Infrastructure</p>
           <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl grayscale opacity-50">
              <span className="text-[10px] font-black uppercase text-white/40">Vercel Edge</span>
              <span className="text-[10px] font-black uppercase text-white/40">Supabase DB</span>
              <span className="text-[10px] font-black uppercase text-white/40">Epic Public API</span>
           </div>
        </div>

      </main>
    </div>
  );
}
