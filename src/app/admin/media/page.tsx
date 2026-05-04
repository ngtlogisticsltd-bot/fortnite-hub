"use client";
import { useState, useEffect } from "react";
import { MonitorSmartphone, Play, Image, Music, Film, CheckCircle, AlertTriangle, RefreshCw, Plus, Trash2, ExternalLink, Shield } from "lucide-react";
import AdminHelpWidget from "@/components/admin/AdminHelpWidget";

export default function MediaOpsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = async () => {
    const r = await fetch("/api/reaper/media-ops");
    const json = await r.json();
    setData(json.report);
    setLoading(false);
  };

  const runCycle = async () => {
    setRunning(true);
    const r = await fetch("/api/reaper/media-ops", { method: "POST" });
    const json = await r.json();
    setData(json.report);
    setRunning(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-primary font-black uppercase tracking-widest text-[10px]">Assembling Media Assets...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Media Ops" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <MonitorSmartphone className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">MEDIA <span className="text-primary">OPS</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">All Formats Content Strategy & Planning</p>
          </div>
        </div>
        <button 
           onClick={runCycle}
           disabled={running}
           className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,255,157,0.3)]"
        >
           {running ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
           Run Media Cycle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Feed: Media Ideas */}
        <div className="lg:col-span-2 space-y-8">
           <h3 className="text-white font-black uppercase text-sm tracking-[0.3em] flex items-center gap-3">
              <Plus className="w-5 h-5 text-primary" /> Staged Media Ideas
           </h3>
           <div className="grid grid-cols-1 gap-6">
              {data.mediaIdeas.map((idea: any) => (
                 <div key={idea.id} className="bg-[#12131c] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                       {idea.type === 'thumbnail' ? <Image className="w-24 h-24" /> : idea.type === 'video' ? <Film className="w-24 h-24" /> : <Music className="w-24 h-24" />}
                    </div>
                    
                    <div className="flex items-start justify-between mb-6">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-black/40 rounded-2xl border border-white/5 text-primary">
                             {idea.type === 'thumbnail' ? <Image className="w-5 h-5" /> : idea.type === 'video' ? <Film className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </div>
                          <div>
                             <h4 className="text-sm font-black text-white uppercase tracking-tight">{idea.title}</h4>
                             <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">{idea.type}</span>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-all"><CheckCircle className="w-4 h-4" /></button>
                          <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <p className="text-xs text-white/60 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4">"{idea.description}"</p>
                       <div className="bg-black/40 rounded-2xl p-6 space-y-2">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Execution Plan</p>
                          <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest leading-loose">{idea.plan}</p>
                       </div>
                       {idea.attribution && (
                          <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase">
                             <Shield className="w-3 h-3" /> Attribution: {idea.attribution}
                          </div>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Sidebar: Rights & Status */}
        <div className="space-y-8">
           
           <section className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-red-500 font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <AlertTriangle className="w-5 h-5" /> Media Rights Guard
              </h3>
              <div className="space-y-4">
                 {data.rightsWarnings.map((warn: string, i: number) => (
                    <p key={i} className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-loose flex items-start gap-3">
                       <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 shrink-0" />
                       <span>{warn}</span>
                    </p>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <RefreshCw className="w-5 h-5 text-primary" /> Automation Status
              </h3>
              <div className="space-y-4">
                 {[
                   { label: "Thumbnail Engine", status: "STANDBY" },
                   { label: "Clip Script Generator", status: "STANDBY" },
                   { label: "Rights Validator", status: "READY" },
                   { label: "Embed Planner", status: "ACTIVE" }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{item.label}</span>
                       <span className="text-[8px] font-black text-primary uppercase">{item.status}</span>
                    </div>
                 ))}
              </div>
           </section>

           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Media Protocol</h4>
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                 FortHub uses an embed-first strategy. No third-party creator content is re-uploaded. All generated assets must use royalty-free or owner-licensed assets.
              </p>
           </div>

        </div>

      </div>

    </div>
  );
}
