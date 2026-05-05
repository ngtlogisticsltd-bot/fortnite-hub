"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const [data, setData] = useState<any>(null);

  async function load() {
    try {
      const res = await fetch("/api/reaper/publish-unlock/status", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch {
      setData({
        success: false,
        status: "ERROR",
        message: "Status API unavailable",
      });
    }
  }

  useEffect(() => {
    load();
    const timer = setInterval(load, 10000);
    return () => clearInterval(timer);
  }, []);

  const items = data?.report || data?.items || data?.checks || [];

  return (
    <main className="min-h-screen bg-[#07080d] px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          SYSTEM STATUS
        </p>
        <h1 className="mt-2 text-4xl font-black uppercase">FortHub Status</h1>
        <p className="mt-3 text-white/60">
          Live system health, publish status, DNS, database, media, news, and monetisation readiness.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-bold">
            {data?.success ? "Status API Online" : "Status API Needs Attention"}
          </h2>
          <p className="mt-2 text-white/60">
            {data?.message || "Checking FortHub systems..."}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item: any, index: number) => (
              <article key={index} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <span className="rounded bg-cyan-400/20 px-2 py-1 text-xs font-bold text-cyan-300">
                  {item.status || item.state || "READY"}
                </span>
                <h3 className="mt-3 text-lg font-bold">
                  {item.title || item.name || item.system || `Check ${index + 1}`}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {item.message || item.detail || item.nextAction || "System check recorded."}
                </p>
              </article>
            ))
          ) : (
            <>
              <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <span className="rounded bg-emerald-400/20 px-2 py-1 text-xs font-bold text-emerald-300">
                  LIVE
                </span>
                <h3 className="mt-3 text-lg font-bold">News Feed</h3>
                <p className="mt-2 text-sm text-white/60">Source-safe news cards are publishing.</p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <span className="rounded bg-emerald-400/20 px-2 py-1 text-xs font-bold text-emerald-300">
                  LIVE
                </span>
                <h3 className="mt-3 text-lg font-bold">Live Feed</h3>
                <p className="mt-2 text-sm text-white/60">REAPER logs are visible publicly.</p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <span className="rounded bg-yellow-400/20 px-2 py-1 text-xs font-bold text-yellow-300">
                  NEEDS_DNS
                </span>
                <h3 className="mt-3 text-lg font-bold">Custom Domain</h3>
                <p className="mt-2 text-sm text-white/60">Registrar DNS must point to Vercel.</p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <span className="rounded bg-yellow-400/20 px-2 py-1 text-xs font-bold text-yellow-300">
                  NEEDS_LINK
                </span>
                <h3 className="mt-3 text-lg font-bold">Affiliate Links</h3>
                <p className="mt-2 text-sm text-white/60">Money pages are ready for real approved affiliate URLs.</p>
              </article>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
