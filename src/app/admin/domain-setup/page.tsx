import { RefreshCw } from "lucide-react";
"use client";
import { useState, useEffect } from 'react';
import { Globe, Shield, ExternalLink, Copy, Check, Info, AlertTriangle, RefreshCw, Terminal, CheckCircle } from 'lucide-react';
import AdminHelpWidget from '@/components/admin/AdminHelpWidget';

export default function DomainSetupPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Domain Setup" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">DOMAIN <span className="text-primary">SETUP</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Production Launch & DNS Configuration</p>
          </div>
        </div>
        <div className="flex gap-4">
           <span className="text-[8px] px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-black uppercase tracking-widest">Needs Owner Action</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: DNS Records */}
        <div className="lg:col-span-2 space-y-8">
           
           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <h3 className="text-white font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-primary" /> Required DNS Records
                 </h3>
                 <span className="text-[10px] text-white/30 font-bold uppercase">External Registrar Required</span>
              </div>
              
              <div className="space-y-6">
                 <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Record 1 (Apex)</span>
                       <div className="flex gap-2">
                          <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded font-black">Type A</span>
                          <span className="text-[8px] bg-white/5 text-white/60 px-2 py-0.5 rounded font-black">Host @</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <code className="text-lg font-black text-white tracking-widest">216.198.79.1</code>
                       <button onClick={() => copy('216.198.79.1')} className="text-primary hover:text-white transition-colors">
                          {copiedText === '216.198.79.1' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                       </button>
                    </div>
                 </div>

                 <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Record 2 (WWW)</span>
                       <div className="flex gap-2">
                          <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded font-black">Type CNAME</span>
                          <span className="text-[8px] bg-white/5 text-white/60 px-2 py-0.5 rounded font-black">Host www</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <code className="text-sm font-black text-white tracking-widest">cname.vercel-dns.com</code>
                       <button onClick={() => copy('cname.vercel-dns.com')} className="text-primary hover:text-white transition-colors">
                          {copiedText === 'cname.vercel-dns.com' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                       </button>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-start gap-4">
                 <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                 <div className="space-y-1">
                    <h4 className="text-xs font-black text-yellow-500 uppercase tracking-widest">Important: DNS Propagation</h4>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                       Changes can take up to 48 hours to propagate globally. Vercel will automatically provision an SSL certificate once the records are validated.
                    </p>
                 </div>
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-8 shadow-xl">
              <h3 className="text-white font-black uppercase text-sm tracking-[0.2em] flex items-center gap-3 border-b border-white/5 pb-4">
                 <CheckCircle className="w-5 h-5 text-primary" /> Setup Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { label: "Vercel Project Exists", status: "CONNECTED" },
                   { label: "Custom Domain Attached", status: "NEEDS_OWNER_ACTION" },
                   { label: "DNS Records Validated", status: "PENDING_DNS" },
                   { label: "SSL Certificate Issued", status: "PENDING_DNS" },
                   { label: "Primary Domain Selected", status: "NEEDS_OWNER_ACTION" }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{item.label}</span>
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                         item.status === 'CONNECTED' ? 'bg-green-500/10 text-green-500' : 
                         item.status === 'PENDING_DNS' ? 'bg-blue-500/10 text-blue-500' :
                         'bg-yellow-500/10 text-yellow-500'
                       }`}>{item.status.replace(/_/g, ' ')}</span>
                    </div>
                 ))}
              </div>
           </section>

        </div>

        {/* Right Column: Links & Cron */}
        <div className="space-y-8">
           
           <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <ExternalLink className="w-5 h-5" /> Vercel Controls
              </h3>
              <div className="space-y-3">
                 {[
                   { label: "Project Dashboard", url: "https://vercel.com/dashboard" },
                   { label: "Domain Settings", url: "https://vercel.com/dashboard/project/_/settings/domains" },
                   { label: "Environment Variables", url: "https://vercel.com/dashboard/project/_/settings/environment-variables" },
                   { label: "Recent Deployments", url: "https://vercel.com/dashboard/project/_/deployments" }
                 ].map((link, i) => (
                    <a 
                       key={i} 
                       href={link.url} 
                       target="_blank"
                       className="w-full bg-[#12131c] hover:bg-primary hover:text-black border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all group"
                    >
                       {link.label}
                       <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                 ))}
              </div>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                 <RefreshCw className="w-5 h-5 text-primary" />
                 <h3 className="text-white font-black uppercase text-xs tracking-widest">Bot Cron Readiness</h3>
              </div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                 Once your domain is stable, add these cron jobs to your <span className="text-white font-mono">vercel.json</span> to enable 24/7 automation.
              </p>
              <div className="bg-black/60 rounded-xl p-4 overflow-hidden">
                 <pre className="text-[9px] text-primary/80 font-mono leading-relaxed">
{`{
  "crons": [
    {
      "path": "/api/reaper/run",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/reaper/daily",
      "schedule": "0 9 * * *"
    }
  ]
}`}
                 </pre>
              </div>
           </section>

           <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 text-center space-y-4">
              <Shield className="w-10 h-10 text-primary mx-auto" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Next Strategy</h4>
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                 Configure your environment variables next to ensure the site can communicate with Supabase and other APIs.
              </p>
              <a href="/admin/env-setup" className="block w-full bg-primary text-black py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary/80 transition-all">
                 Configure Env Vars &rarr;
              </a>
           </div>

        </div>

      </div>

    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>;
}
