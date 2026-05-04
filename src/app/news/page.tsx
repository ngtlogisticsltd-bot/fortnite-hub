"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  status: string;
  createdAt: string;
};

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);

  async function load() {
    const res = await fetch("/api/reaper/launch-fix", { cache: "no-store" });
    const data = await res.json();
    setItems(data.news || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-primary">Source-Safe</p>
        <h1 className="mt-2 text-4xl font-black uppercase">Fortnite News</h1>
        <p className="mt-3 max-w-3xl text-white/60">
          FortHub links to official and trusted sources, summarises in its own words, and gives attribution.
        </p>

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary">
                {item.status}
              </span>
              <h2 className="mt-3 text-2xl font-bold">{item.title}</h2>
              <p className="mt-2 text-white/60">{item.summary}</p>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Source: {item.sourceName}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
