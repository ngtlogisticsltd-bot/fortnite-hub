"use client";
import { useEffect, useState } from "react";
import { Shield, Server, Globe, Rocket, CheckCircle, AlertTriangle, ArrowRight, Save, Activity, Eye, EyeOff, Layout, GitBranch, Database, Search, Mail, TrendingUp, Users, Share2, FileCheck, RefreshCw } from "lucide-react";
import { INTAKE_FIELDS } from "@/lib/controlCore/fieldMap";
import AdminHelpWidget from "@/components/admin/AdminHelpWidget";

export default function ControlCorePage() {
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);

  const load = async () => {
    const r = await fetch("/api/control-core/intake");
    const json = await r.json();
    setData(json);
    setForm((prev: any) => ({ ...prev, ...json.intake }));
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    const r = await fetch("/api/control-core/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await r.json();
    setData(json);
    setSaving(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-primary font-black uppercase tracking-widest">Inhaling System Configuration...</div>;

  const sections = Array.from(new Set(INTAKE_FIELDS.map(f => f.section)));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Control Core" />
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">CONTROL <span className="text-primary">CORE</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Master Owner Intake & Team Synchronization</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#12131c] border border-white/10 p-4 rounded-2xl text-center min-w-[140px]">
              <div className="text-[10px] font-black text-white/30 uppercase mb-1">Completion</div>
              <div className="text-2xl font-black text-primary">{data.completion.percentage}%</div>
           </div>
           <button 
              onClick={save}
              disabled={saving}
              className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,255,157,0.3)]"
           >
              {saving ? <Activity className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save All Data
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-12">
           
           {sections.map(section => (
              <section key={section} className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    {getSectionIcon(section)}
                 </div>
                 <h3 className="text-white font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3 border-b border-white/5 pb-4">
                    {getSectionIcon(section)} {section}
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {INTAKE_FIELDS.filter(f => f.section === section).map(field => (
                       <div key={field.id} className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1 flex justify-between">
                             {field.label}
                             {field.sensitive && <span className="text-primary/50 text-[8px]">SENSITIVE</span>}
                          </label>
                          {field.type === 'checkbox' ? (
                             <label className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 cursor-pointer group hover:border-primary/30 transition-all">
                                <input 
                                   type="checkbox" 
                                   checked={form[field.id] || false}
                                   onChange={e => setForm({ ...form, [field.id]: e.target.checked })}
                                   className="w-4 h-4 rounded border-white/20 bg-black text-primary focus:ring-primary" 
                                />
                                <span className="text-xs font-bold text-white/70 group-hover:text-white uppercase tracking-widest">Confirmed / Enabled</span>
                             </label>
                          ) : (
                             <div className="relative group">
                                <input 
                                   type={field.sensitive && !showSensitive ? 'password' : 'text'}
                                   value={form[field.id] || ""}
                                   onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                                   className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-primary outline-none transition-all placeholder:text-white/10"
                                   placeholder={`Enter ${field.label}...`}
                                />
                                {field.sensitive && (
                                   <button 
                                      onClick={() => setShowSensitive(!showSensitive)}
                                      className="absolute right-3 top-3 text-white/20 hover:text-white transition-colors"
                                   >
                                      {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                   </button>
                                )}
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </section>
           ))}

        </div>

        {/* Right Column: Status & Sync */}
        <div className="space-y-8">
           
           <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Activity className="w-5 h-5" /> REAPER Sync Status
              </h3>
              <div className="space-y-4">
                 {data.teams.map((team: any) => (
                    <div key={team.teamName} className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-white/60 uppercase">{team.teamName}</span>
                          <span className={`text-[8px] px-2 py-0.5 rounded font-black border ${
                             team.status === 'READY' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>{team.status}</span>
                       </div>
                       {team.waitingOn.length > 0 && (
                          <div className="text-[9px] text-white/30 uppercase font-bold italic">
                             Waiting on: {team.waitingOn.join(", ")}
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Rocket className="w-5 h-5" /> Live Site Quick-Fill
              </h3>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                 Sync recommended production values to your profile for faster setup.
              </p>
              <div className="space-y-3">
                 <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-1">
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Recommended URL</p>
                    <p className="text-[10px] font-bold text-white truncate">https://fortnite-hub.xyz</p>
                 </div>
                 <button 
                    onClick={() => {
                       setForm({
                          ...form,
                          publicSiteUrl: "https://fortnite-hub.xyz",
                          githubRepoUrl: "https://github.com/ngtlogisticsltd-bot/fortnite-hub.git"
                       });
                    }}
                    className="w-full bg-primary text-black py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary/80 transition-all flex items-center justify-center gap-2"
                 >
                    <RefreshCw className="w-3.5 h-3.5" /> Use Recommended Values
                 </button>
              </div>
           </section>

           <section className="bg-orange-500/5 border border-orange-500/20 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3 text-orange-500">
                 <AlertTriangle className="w-5 h-5" />
                 <h4 className="text-xs font-black uppercase tracking-widest">Next Best Action</h4>
              </div>
              <p className="text-xs font-black text-white uppercase tracking-widest leading-relaxed">
                 {data.next}
              </p>
           </section>

           <button className="w-full bg-[#12131c] hover:bg-[#1a1b25] text-white border border-white/10 p-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all">
              <Share2 className="w-5 h-5 text-primary" /> Sync to REAPER Matrix
           </button>

           <div className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest">System Protocol</h4>
              <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-widest">
                 Intake data is stored locally in the REAPER dev store. Sensitive values are masked in the UI but accessible to bot teams for authorized API calls.
              </p>
           </div>

        </div>

      </div>

    </div>
  );
}

function getSectionIcon(section: string) {
   switch (section) {
      case 'Brand': return <Layout className="w-5 h-5" />;
      case 'GitHub': return <GitBranch className="w-5 h-5" />;
      case 'Supabase': return <Database className="w-5 h-5" />;
      case 'Ads': return <TrendingUp className="w-5 h-5" />;
      case 'Social APIs': return <Share2 className="w-5 h-5" />;
      case 'Creator/Media': return <Users className="w-5 h-5" />;
      default: return <FileCheck className="w-5 h-5" />;
   }
}
