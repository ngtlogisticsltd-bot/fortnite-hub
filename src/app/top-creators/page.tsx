import Navbar from "@/components/Navbar";

export const metadata = { title: 'Top Creators | FortHub', description: 'Discover the best Fortnite content creators.' };

export default function TopCreatorsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8">Top Creators</h1>
        <p className="text-white/60 mb-8">A curated directory of the Fortnite creators we follow, embed, and recommend. All creators are credited and linked to their official channels.</p>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 text-center">
          <p className="text-white/40 text-sm">Creator directory coming soon. Submit your favorite creators via the <a href="/submit" className="text-primary hover:underline">Submit page</a>.</p>
        </div>
      </div>
    </>
  );
}
