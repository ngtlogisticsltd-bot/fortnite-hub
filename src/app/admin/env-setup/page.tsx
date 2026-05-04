"use client";
import { useState } from 'react';
import { Shield, Lock, Copy, Check, AlertTriangle, ExternalLink, Info, Terminal, Layout, Eye, EyeOff } from 'lucide-react';
import AdminHelpWidget from '@/components/admin/AdminHelpWidget';

export default function EnvSetupPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleShow = (id: string) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const envVars = [
    { id: 'ADMIN_USER', label: 'Admin Username', value: 'reaper', sensitive: false, required: true },
    { id: 'ADMIN_PASS', label: 'Admin Password', value: 'CHANGE_THIS_TO_STRONG_PASSWORD', sensitive: true, required: true },
    { id: 'NEXT_PUBLIC_SITE_NAME', label: 'Site Name', value: 'FortHub', sensitive: false, required: true },
    { id: 'NEXT_PUBLIC_SITE_URL', label: 'Site URL', value: 'https://fortnite-hub.xyz', sensitive: false, required: true },
    { id: 'SUPABASE_URL', label: 'Supabase URL', value: '', sensitive: false, required: false },
    { id: 'SUPABASE_ANON_KEY', label: 'Supabase Anon Key', value: '', sensitive: true, required: false },
    { id: 'VERCEL_DEPLOY_HOOK_URL', label: 'Deploy Hook URL', value: '', sensitive: true, required: false }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Environment Setup" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">ENV <span className="text-primary">SETUP</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Vercel Secrets & Production Variables</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Variables List */}
        <div className="lg:col-span-2 space-y-8">
           
           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <h3 className="text-white font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-primary" /> Required Variables
                 </h3>
                 <p className="text-[10px] text-white/30 font-bold uppercase">Add these in Vercel Settings</p>
              </div>

              <div className="space-y-4">
                 {envVars.filter(v => v.required).map(v => (
                    <div key={v.id} className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 group">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest">{v.label}</span>
                          <span className="text-[9px] font-mono text-white/20">{v.id}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="flex-1 bg-black/60 rounded-xl px-4 py-3 text-xs font-mono text-white truncate relative">
                             {v.sensitive && !showValues[v.id] ? '••••••••••••••••' : (v.value || 'NOT SET')}
                          </div>
                          <div className="flex gap-2">
                             {v.sensitive && (
                                <button onClick={() => toggleShow(v.id)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 transition-all">
                                   {showValues[v.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                             )}
                             <button onClick={() => copy(v.value, v.id)} className="p-2 bg-white/5 hover:bg-primary hover:text-black rounded-lg text-white/40 transition-all border border-white/5 hover:border-transparent">
                                {copiedId === v.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl opacity-60">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <h3 className="text-white font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3">
                    <Layout className="w-5 h-5 text-primary" /> Optional Integrations
                 </h3>
                 <p className="text-[10px] text-white/30 font-bold uppercase">Connect Later</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {envVars.filter(v => !v.required).map(v => (
                    <div key={v.id} className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                       <div>
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{v.id}</p>
                          <p className="text-[10px] font-bold text-white/60">{v.label}</p>
                       </div>
                       <span className="text-[8px] px-2 py-0.5 bg-white/5 text-white/40 rounded font-black">OPTIONAL</span>
                    </div>
                 ))}
              </div>
           </section>

        </div>

        {/* Right Column: Warnings & Links */}
        <div className="space-y-8">
           
           <section className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-red-500 font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Shield className="w-5 h-5" /> Security Protocol
              </h3>
              <div className="space-y-4 text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                 <p className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span>Never commit real secrets or production passwords to GitHub. Use Vercel Environment Variables instead.</span>
                 </p>
                 <p className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>After adding variables in Vercel, you must redeploy your project for the changes to take effect.</span>
                 </p>
              </div>
           </section>

           <a 
              href="https://vercel.com/dashboard/project/_/settings/environment-variables" 
              target="_blank"
              className="block w-full bg-primary hover:bg-primary/80 text-black p-8 rounded-3xl text-center shadow-xl transition-all group"
           >
              <div className="flex flex-col items-center gap-4">
                 <ExternalLink className="w-8 h-8 group-hover:scale-110 transition-transform" />
                 <span className="font-black uppercase tracking-widest">Open Vercel Env Settings</span>
              </div>
           </a>

           <div className="bg-[#12131c] border border-white/5 rounded-3xl p-8 text-center space-y-4">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Site Visibility</h4>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                 Once variables are set and the site is redeployed, your admin authentication and API routes will become functional on your custom domain.
              </p>
           </div>

        </div>

      </div>

    </div>
  );
}
