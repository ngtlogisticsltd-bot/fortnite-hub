"use client";

import { useEffect, useState } from "react";

export default function LiveFeedPage() {
  const [logs, setLogs] = useState<any[]>([]);

  async function loadLogs() {
    const res = await fetch("/api/reaper/logs?ts=" + Date.now(), {
      cache: "no-store",
    });
    const data = await res.json();
    setLogs(Array.isArray(data.logs) ? data.logs : []);
  }

  async function runCycle() {
    await fetch("/api/reaper/run", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode: "daily-cycle" }),
      cache: "no-store",
    });
    await loadLogs();
  }

  useEffect(() => {
    loadLogs();
    const timer = setInterval(loadLogs, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#07080d] px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          REAPER LIVE
        </p>

        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase">FortHub Live Feed</h1>
            <p className="mt-2 text-white/60">
              Showing {logs.length} backend events from REAPER.
            </p>
          </div>

          <button
            onClick={runCycle}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black"
          >
            Run Live Cycle
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {logs.length === 0 ? (
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-5">
              No events returned from /api/reaper/logs.
            </div>
          ) : (
            logs.map((log, index) => (
              <article
                key={`${log.id}-${index}`}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-cyan-400/20 px-2 py-1 text-xs font-bold text-cyan-300">
                    {log.teamId || log.type || "BOT"}
                  </span>
                  {log.status && (
                    <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/60">
                      {log.status}
                    </span>
                  )}
                  {log.source && (
                    <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/40">
                      {log.source}
                    </span>
                  )}
                </div>

                <p className="mt-3">{log.message}</p>
                <p className="mt-1 text-xs text-white/40">
                  {log.time || log.timestamp}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
