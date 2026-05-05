"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Activity, ShieldCheck, Zap, Server, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function fetchStatus() {
    try {
      setLoading(true);
      const res = await fetch("/api/reaper/next-crew/status", { cache: "no-store" });
      const data = await res.json();
      setStatus(data.report);
    } catch (err) {
      console.error("Status fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  async function runNextCrew() {
    try {
      setLoading(true);
      await fetch("/api/reaper/next-crew", { method: "POST", cache: "no-store" });
      await fetchStatus();
    } catch (err) {
      console.error("Next crew run failed", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  const getStatusColor = (s: string) => {
    if (s === "LIVE" || s === "READY" || s === "OK") return "text-green-500 bg-green-500/10 border-green-500/20";
    if (s === "PENDING_VERIFICATION" || s === "NEEDS_APPROVAL") return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary mb-2">Platform Readiness</p>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Next <span className="text-primary">Crew</span></h1>
            <p className="mt-4 text-white/40 max-w-2xl font-medium">
              Autonomous sync engine reporting on Domain, DB, Revenue, Media, News, and Shop readiness.
            </p>
          </div>
          <button 
            onClick={runNextCrew}
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-3 font-black text-black uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Syncing..." : "Run Platform Sync"}
          </button>
        </div>

        {!status ? (
          <div className="p-20 text-center animate-pulse border border-white/5 bg-white/[0.02] rounded-[2rem]">
            <p className="text-white/20 font-black uppercase tracking-widest">Synchronizing with Next Crew...</p>
          </div>
        ) : (
          <>
            <div className={`mb-12 border p-8 rounded-[2rem] flex items-center justify-between ${status.overallStatus === 'LIVE' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
              <div>
                <h2 className="text-xl font-black uppercase tracking-widest text-white/60">System Status</h2>
                <p className={`text-4xl font-black uppercase mt-2 ${status.overallStatus === 'LIVE' ? 'text-green-400' : 'text-red-400'}`}>{status.overallStatus}</p>
              </div>
              <div className="text-right max-w-xs">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Next Required Action</p>
                <p className="text-sm font-bold text-white">{status.nextRequiredAction}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Domain Status", status: status.dns?.status || "PENDING", desc: status.dns?.action || "Check DNS records" },
                { title: "Supabase Status", status: status.supabase?.status || "NEEDS_ENV", desc: "Persistence DB Connection" },
                { title: "Revenue Readiness", status: status.revenue?.status || "NEEDS_LINK", desc: "Affiliate Gear Links" },
                { title: "Media Status", status: status.clips?.status || "NEEDS_APPROVAL", desc: "Approved YouTube Clips" },
                { title: "News Status", status: status.news?.status || "LIVE", desc: "Safe Source Sync" },
                { title: "Item Shop Status", status: status.itemShop?.status || "NEEDS_API", desc: "Fallback Shop Ready" },
                { title: "Formatting Status", status: status.formatting?.status || "READY", desc: "Public Page UI Audit" },
                { title: "Program Teams Status", status: status.programTeams?.status || "READY", desc: "Internal Readiness Check" },
                { title: "Publish Unlock Status", status: status.unlock?.status || "SUCCESS", desc: "Safe Content Visibility" },
                { title: "Sitemap Status", status: status.sitemap?.status || "SUCCESS", desc: "Public/sitemap.xml Generation" },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#12131c] border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black uppercase tracking-widest">{item.title}</h3>
                    <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
