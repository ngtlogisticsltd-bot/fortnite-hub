export default function ItemShopPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-primary">Daily Rotation</p>
        <h1 className="mt-2 text-4xl font-black uppercase">Daily Item Shop</h1>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-2xl font-bold">Live item shop sync needs a safe API/source.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/60">
            Until the live data connection is approved and verified, please use the official Fortnite ecosystem 
            and trusted tracker links provided below.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.fortnite.com/item-shop"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-primary px-5 py-3 font-bold text-black"
            >
              Official Item Shop
            </a>
            <a
              href="https://fortnite.gg/shop"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 px-5 py-3 font-bold text-white"
            >
              Fortnite.gg Shop Tracker
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
          <h3 className="font-bold text-yellow-300">Status: NEEDS DATA API</h3>
          <p className="mt-2 text-sm text-white/60">
            This page is intentionally in safe fallback mode. It is not broken.
          </p>
        </div>
      </section>
    </main>
  );
}
