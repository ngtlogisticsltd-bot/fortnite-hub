import Navbar from "@/components/Navbar";

export const metadata = { title: 'Live Hub | FortHub', description: 'Live Fortnite streams and tournament coverage.' };

export default function LiveHubPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8">Live Hub</h1>
        <p className="text-white/60 mb-8">Watch live Fortnite streams embedded from Twitch and YouTube. All streams are displayed using official platform embed tools.</p>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 text-center">
          <p className="text-white/40 text-sm">Live stream embeds coming soon. We will only use official Twitch and YouTube embed codes.</p>
        </div>
      </div>
    </>
  );
}
