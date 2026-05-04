"use client";

import { useEffect, useState } from "react";

type FeedItem = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  type: string;
  status: string;
  createdAt: string;
};

export default function LiveFeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  async function load() {
    const feedRes = await fetch("/api/reaper/feed-ops", { cache: "no-store" });
    const feedData = await feedRes.json();
    setItems(feedData.items || []);

    const logRes = await fetch("/api/reaper/logs", { cache: "no-store" });
    const logData = await logRes.json();
    setLogs(logData.logs || []);
  }

  async function runHive() {
    await fetch("/api/reaper/hive", { method: "GET" });
    await load();
  }

  useEffect(() => {
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">REAPER HIVE</p>
            <h1 className="text-4xl font-black uppercase">Live Feed</h1>
            <p className="mt-2 max-w-2xl text-white/60">
              Source-safe Fortnite updates, official links, review queues, and bot activity.
            </p>
          </div>

          <button
            onClick={runHive}
            className="rounded-xl bg-primary px-5 py-3 font-bold text-black"
          >
            Run Hive Cycle
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="mb-4 text-xl font-bold uppercase">Approved Source Feed</h2>

            {items.length === 0 ? (
              <p className="text-white/50">No feed items yet. Run the hive cycle.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <article key={item.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="mb-2 flex flex-wrap gap-2 text-xs uppercase">
                      <span className="rounded bg-primary/20 px-2 py-1 text-primary">{item.status}</span>
                      <span className="rounded bg-white/10 px-2 py-1 text-white/60">{item.type}</span>
                    </div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{item.summary}</p>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-primary hover:underline"
                    >
                      Source: {item.sourceName}
                    </a>
                    <p className="mt-2 text-xs text-white/30">{item.createdAt}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="mb-4 text-xl font-bold uppercase">Bot Activity</h2>

            {logs.length === 0 ? (
              <p className="text-white/50">No bot logs yet.</p>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id || `${log.type}-${log.time}`} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="font-bold">{log.type || log.teamId || "BOT"}</p>
                    <p className="text-sm text-white/60">{log.message}</p>
                    <p className="mt-1 text-xs text-white/30">{log.time || log.timestamp}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
