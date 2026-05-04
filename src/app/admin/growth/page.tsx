"use client";
import { useState, useEffect } from 'react';
import { TrendingUp, Search, FileText, Users, DollarSign, Zap, AlertTriangle, CheckCircle, ArrowRight, Activity, Rocket, Globe } from 'lucide-react';
import { GrowthReport } from '@/lib/growth/types';

export default function AdminGrowthPage() {
  const [report, setReport] = useState<GrowthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const fetchReport = async () => {
    const res = await fetch('/api/reaper/growth');
    const data = await res.json();
    if (data.success) setReport(data.report);
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const runGrowthCycle = async () => {
    setRunning(true);
    const res = await fetch('/api/reaper/growth', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      setReport(data.report);
    }
    setRunning(false);
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-primary font-black uppercase tracking-widest">Scanning Growth Matrix...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">GROWTH <span className="text-primary">ENGINE</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">FortHub Domination Stack v1.0</p>
          </div>
        </div>
        <button 
          onClick={runGrowthCycle}
          disabled={running}
          className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,255,157,0.3)]"
        >
          {running ? <Activity className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
          Run Growth Cycle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Traffic & SEO */}
        <div className="lg:col-span-2 space-y-8">
           
           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                 <Search className="w-5 h-5 text-primary" /> Traffic SEO Engine
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {report?.keywords.map((kw, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center group hover:border-primary/30 transition-all">
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-tighter">{kw.keyword}</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase">Volume: {kw.volume}</p>
                       </div>
                       <span className={`text-[8px] px-2 py-1 rounded font-black uppercase ${
                          kw.difficulty === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                       }`}>Diff: {kw.difficulty}</span>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center">
                 <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Staged Content Queue
                 </h3>
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{report?.stagedPages.length} Pages Staged</span>
              </div>
              <div className="space-y-3">
                 {report?.stagedPages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${page.priority === 'high' ? 'bg-red-500' : 'bg-primary'}`} />
                          <div>
                             <p className="text-xs font-black text-white uppercase tracking-widest">{page.title}</p>
                             <p className="text-[9px] text-white/30 font-mono">/{page.slug}</p>
                          </div>
                       </div>
                       <button className="bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase px-3 py-1.5 rounded transition-all text-white/50 hover:text-white">
                          Review
                       </button>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                 <Users className="w-5 h-5 text-primary" /> Creator Tracker
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {report?.creatorTargets.map((creator, i) => (
                    <div key={i} className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-4">
                       <div className="flex justify-between items-start">
                          <div>
                             <p className="text-sm font-black text-white uppercase">{creator.name}</p>
                             <p className="text-[10px] text-primary font-bold uppercase">{creator.platform}</p>
                          </div>
                          <span className="text-[8px] bg-white/5 text-white/30 px-2 py-1 rounded font-black uppercase">{creator.status}</span>
                       </div>
                       <p className="text-[10px] text-white/50 leading-relaxed italic">&quot;{creator.commentaryAngle}&quot;</p>
                       <div className="flex gap-2">
                          <button className="flex-1 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase py-2 rounded transition-all">View Profile</button>
                          <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary text-[9px] font-black uppercase py-2 rounded transition-all border border-primary/20">Plan Embed</button>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

        </div>

        {/* Right Column: Revenue & Actions */}
        <div className="space-y-8">
           
           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                 <DollarSign className="w-5 h-5 text-primary" /> Revenue Plan
              </h3>
              <div className="space-y-4">
                 {report?.revenueActions.map((action, i) => (
                    <div key={i} className="p-5 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest">{action.type}</span>
                          <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase ${
                             action.readiness === 'NEEDS_ACCOUNT' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                          }`}>{action.readiness}</span>
                       </div>
                       <p className="text-xs font-bold text-white uppercase tracking-tight">{action.description}</p>
                       <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-widest flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-primary" /> {action.action}
                       </p>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                 <Zap className="w-5 h-5 text-primary" /> Next Best Actions
              </h3>
              <div className="space-y-4">
                 {report?.nextBestActions.map((action, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-black transition-all">
                          {i + 1}
                       </div>
                       <p className="text-xs font-black text-white/70 uppercase tracking-widest group-hover:text-white transition-colors">{action}</p>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                 <AlertTriangle className="w-5 h-5" />
                 <h4 className="text-xs font-black uppercase tracking-widest">Growth Warnings</h4>
              </div>
              <ul className="space-y-2">
                 {report?.warnings.map((warn, i) => (
                    <li key={i} className="text-[10px] text-white/50 font-bold uppercase tracking-widest flex items-start gap-2">
                       <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 shrink-0" />
                       {warn}
                    </li>
                 ))}
              </ul>
           </section>

        </div>

      </div>

    </div>
  );
}
