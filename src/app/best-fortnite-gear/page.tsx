"use client";

const gear = [
  {
    id: "controller",
    title: "Best Budget Fortnite Controller",
    summary: "Good for casual players, Zero Build, and couch gaming. Add your affiliate link when approved.",
    url: "#",
    status: "NEEDS_AFFILIATE",
  },
  {
    id: "mouse",
    title: "Best Gaming Mouse for Fortnite",
    summary: "Built for aim tracking, edits, and competitive play.",
    url: "#",
    status: "NEEDS_AFFILIATE",
  },
  {
    id: "headset",
    title: "Best Headset for Footsteps",
    summary: "Focus on clear footsteps, comfort, and mic quality.",
    url: "#",
    status: "NEEDS_AFFILIATE",
  },
];

async function trackClick(itemId: string, url: string) {
  await fetch("/api/tracking/click", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ itemId, url }),
  });

  if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");
}

export default function BestFortniteGearPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-primary">Money Page</p>
        <h1 className="mt-2 text-4xl font-black uppercase">Best Fortnite Gear</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Honest gear recommendations. Affiliate links are tracked and should only be added after approval.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {gear.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary">
                {item.status}
              </span>
              <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-white/60">{item.summary}</p>
              <button
                onClick={() => trackClick(item.id, item.url)}
                className="mt-5 rounded-xl bg-primary px-4 py-2 font-bold text-black"
              >
                View Gear
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
