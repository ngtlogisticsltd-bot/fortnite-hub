"use client";

import { useEffect, useState } from "react";

type LogItem = {
  id?: string | number;
  time?: string;
  timestamp?: string;
  type?: string;
  teamId?: string;
  status?: string;
  message?: string;
};

export default function LiveFeedPage() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadLogs() {
    const res = await fetch("/api/reaper/logs", { cache: "no-store" });
    const data = await res.json();
    setLogs(data.logs || []);
  }

  async function runLiveCycle() {
    setLoading(true);
    await fetch("/api/reaper/seed-live", { cache: "no-store" });
    await fetch("/api/reaper/run", { cache: "no-store" });
    await loadLogs();
    setLoading(false);
  }

  useEffect(() => {
    loadLogs();
    const timer = setInterval(loadLogs, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">REAPER LIVE</p>
            <h1 className="mt-2 text-4xl font-black uppercase">FortHub Live Feed</h1>
            <p className="mt-3 max-w-2xl text-white/60">
              Real backend activity from REAPER, media, news, tracking, and system checks.
            </p>
          </div>

          <button
            onClick={runLiveCycle}
            disabled={loading}
            className="rounded-xl bg-primary px-5 py-3 font-bold text-black disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Live Cycle"}
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          {logs.length === 0 ? (
            <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-5">
              <h2 className="font-bold text-yellow-300">No live events yet</h2>
              <p className="mt-2 text-sm text-white/60">
                Click “Run Live Cycle” to seed and run the backend.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <article
                  key={log.id || `${log.type}-${index}`}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary">
                      {log.type || log.teamId || "BOT"}
                    </span>
                    {log.status && (
                      <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/60">
                        {log.status}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 font-medium">{log.message || "Bot activity recorded."}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {log.time || log.timestamp || "Live"}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
