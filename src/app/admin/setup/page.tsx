"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Activity, ShieldCheck, Database, DollarSign, Globe, CheckCircle2, ChevronRight, Play, Link as LinkIcon, Lock } from "lucide-react";
import Link from "next/link";

export default function AdminSetupPage() {
  const [setupData, setSetupData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function fetchStatus() {
    try {
      const res = await fetch("/api/admin/setup-guide", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setSetupData(data.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  const markStep = async (step: string, value: any) => {
    await fetch("/api/admin/setup-guide?action=mark-step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step, value })
    });
    fetchStatus();
  };

  const getStatusBadge = (status: string) => {
    if (status.includes("LIVE") || status.includes("READY") || status.includes("VERIFIED") || status.includes("CONNECTED")) {
      return <span className="bg-green-500/10 border border-green-500/20 text-green-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{status}</span>;
    }
    if (status.includes("OPTIONAL")) {
      return <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{status}</span>;
    }
    return <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{status}</span>;
  };

  const runNextCrew = async () => {
    setLoading(true);
    await fetch("/api/reaper/next-crew", { method: "POST" });
    setLoading(false);
    alert("Next Crew sync started. Check Live Feed for logs.");
  };

  const seedLiveFeed = async () => {
    setLoading(true);
    await fetch("/api/reaper/seed-live");
    setLoading(false);
    alert("Live feed seeded.");
  };

  if (!setupData) {
    return (
      <div className="min-h-screen bg-[#05050a] text-white flex items-center justify-center">
        <p className="animate-pulse font-black uppercase tracking-widest text-primary">Loading Guided Setup...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary mb-2">REAPER Control</p>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Guided <span className="text-white">Setup</span></h1>
            <p className="mt-4 text-white/40 max-w-2xl font-medium">
              Step-by-step tasks the system cannot legally or technically do alone. Complete these to launch safely.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button onClick={runNextCrew} disabled={loading} className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-black text-primary uppercase tracking-widest hover:bg-primary/20 transition">
              Run Next Crew
            </button>
            <button onClick={seedLiveFeed} disabled={loading} className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-black text-white uppercase tracking-widest hover:bg-white/10 transition">
              Seed Live Feed
            </button>
            <Link href="/live-feed" className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-black text-white uppercase tracking-widest hover:bg-white/10 transition">
              Live Feed
            </Link>
            <Link href="/status" className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-black text-white uppercase tracking-widest hover:bg-white/10 transition">
              Status
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Stage 1: Site Health */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4 flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" /> Stage 1: Site Health
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#12131c] border border-white/5 p-6 rounded-2xl relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">Registrar DNS Setup</h3>
                  {getStatusBadge(setupData.dns.status)}
                </div>
                <p className="text-sm text-white/50 mb-4">You must manually point your domain at the registrar.</p>
                <div className="bg-black/30 p-3 rounded font-mono text-xs text-white/70 mb-4">
                  A @ -{'>'} 216.198.79.1<br/>
                  CNAME www -{'>'} cname.vercel-dns.com
                </div>
                {setupData.dns.status !== "VERIFIED" && (
                  <button onClick={() => markStep('dns', true)} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded uppercase font-bold tracking-widest">Mark Verified</button>
                )}
              </div>

              <div className="bg-[#12131c] border border-white/5 p-6 rounded-2xl relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">Supabase Setup</h3>
                  {getStatusBadge(setupData.supabase.status)}
                </div>
                <p className="text-sm text-white/50 mb-4">Provide persistence by adding Supabase ENV keys to Vercel and running schema.sql.</p>
                <div className="text-xs text-white/40 space-y-1 mb-4">
                  <p>1. Create Project</p>
                  <p>2. Run schema.sql</p>
                  <p>3. Add Vercel ENV vars</p>
                </div>
                {setupData.supabase.status !== "VERIFIED" && (
                  <button onClick={() => markStep('supabase', true)} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded uppercase font-bold tracking-widest">Mark Verified</button>
                )}
              </div>
            </div>
          </section>

          {/* Stage 2: Live Data */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" /> Stage 2: Live Data
            </h2>
            <div className="bg-[#12131c] border border-white/5 p-6 rounded-2xl">
               <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">Protected API Setup</h3>
                  {getStatusBadge(setupData.apiKeys.status)}
                </div>
                <p className="text-sm text-white/50 mb-4">Some live data requires keys. Fortnite APIs and YouTube Data APIs unlock automatic syncing.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-black/50 px-2 py-1 rounded border border-white/10 text-white/40"><Lock className="inline w-3 h-3 mr-1"/> Fortnite Shop API (Missing)</span>
                  <span className="text-xs bg-black/50 px-2 py-1 rounded border border-white/10 text-white/40"><Lock className="inline w-3 h-3 mr-1"/> YouTube API (Optional)</span>
                </div>
            </div>
          </section>

          {/* Stage 3: Content */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary" /> Stage 3: Content
            </h2>
            <div className="bg-[#12131c] border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">Creator Video Approval</h3>
                  {getStatusBadge(setupData.creator.status)}
                </div>
                <p className="text-sm text-white/50 mb-4">Due to strict Fan Site Policies, you must manually approve and embed YouTube links. Never upload raw MP4s.</p>
                
                {setupData.creator.links.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 text-white/40">Approved Links:</p>
                    <ul className="text-sm space-y-1">
                      {setupData.creator.links.map((link: any, i: number) => (
                        <li key={i} className="text-white/70 flex items-center gap-2"><LinkIcon className="w-3 h-3"/> {link.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </section>

          {/* Stage 4: Money */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4 flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-primary" /> Stage 4: Money
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#12131c] border border-white/5 p-6 rounded-2xl">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">Affiliate Accounts</h3>
                    {getStatusBadge(setupData.affiliate.status)}
                  </div>
                  <p className="text-sm text-white/50 mb-4">You must personally register for Amazon Associates, eBay Partner Network, etc. The bot cannot sign contracts.</p>
                  <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded uppercase font-bold tracking-widest">Add Program</button>
              </div>

              <div className="bg-[#12131c] border border-white/5 p-6 rounded-2xl">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">Sponsor Pre-Check</h3>
                    {getStatusBadge(setupData.sponsor.status)}
                  </div>
                  <p className="text-sm text-white/50 mb-4">Before reaching out to sponsors, verify these are ready:</p>
                  <ul className="space-y-2 mb-4">
                    {Object.entries(setupData.sponsor.checks).map(([key, val]) => (
                       <li key={key} className="flex items-center gap-2 text-sm text-white/70">
                         <input type="checkbox" checked={val as boolean} onChange={(e) => markStep(`sponsor_${key}`, e.target.checked)} className="rounded border-white/20 bg-black/50 accent-primary" />
                         <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                       </li>
                    ))}
                  </ul>
              </div>
            </div>
          </section>

          {/* Stage 5: Launch */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4 flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" /> Stage 5: Launch
            </h2>
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
               <h3 className="font-bold text-lg text-primary mb-4">Final Launch Checklist</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {setupData.launchChecklist.map((item: any, i: number) => (
                   <div key={i} className="flex items-center gap-3">
                     {item.done ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <div className="w-5 h-5 rounded-full border-2 border-white/20" />}
                     <span className={item.done ? "text-white" : "text-white/40"}>{item.name}</span>
                   </div>
                 ))}
               </div>
            </div>
          </section>

          <div className="pt-8 text-center">
            <Link href="/admin/reaper" className="text-xs text-white/30 uppercase tracking-[0.3em] hover:text-white transition">
              Go to Advanced REAPER Tools
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
