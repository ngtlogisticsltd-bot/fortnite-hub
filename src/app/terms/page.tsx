import Navbar from "@/components/Navbar";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8 border-b border-white/10 pb-4">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>By accessing and using FortHub, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <h2 className="text-2xl font-bold text-white">2. Unofficial Status</h2>
          <p>FortHub is an unofficial fan site. We are not affiliated with, endorsed, sponsored, or specifically approved by Epic Games, Inc. You acknowledge that we do not own the copyrights or trademarks for the game Fortnite.</p>
          <h2 className="text-2xl font-bold text-white">3. User Conduct</h2>
          <p>You agree to use our site for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else&apos;s use and enjoyment of the website.</p>
          <h2 className="text-2xl font-bold text-white">4. Embedded Media & Third-Party Content</h2>
          <p>FortHub may embed third-party content (videos, clips, streams) using official platform embed tools provided by YouTube, Twitch, TikTok, X (Twitter), and Instagram. Embedded content remains the intellectual property of the original creators and/or platforms. FortHub does not download, re-upload, mirror, or claim ownership of any embedded media.</p>
          <h2 className="text-2xl font-bold text-white">5. Original Commentary & Analysis</h2>
          <p>FortHub adds original commentary, analysis, rankings, summaries, and editorial tools alongside embedded media. This original content is created by the FortHub team and does not represent the views of the original content creators.</p>
          <h2 className="text-2xl font-bold text-white">6. AI-Generated Content</h2>
          <p>FortHub may produce AI-generated media plans, scripts, and visual concepts. These are original drafts that must not incorporate copyrighted gameplay footage, creator footage, or official trailer footage without explicit permission or proper embedding from official sources.</p>
          <h2 className="text-2xl font-bold text-white">7. User Submissions</h2>
          <h2 className="text-2xl font-bold text-white">8. Community Chat & Moderation</h2>
          <p>Community chat messages are subject to manual moderation. We reserve the right to remove any content that violates our community standards, including but not limited to profanity, harassment, or impersonation of official entities. Messages go through a pending queue and may not appear immediately.</p>
          <h2 className="text-2xl font-bold text-white">9. Weekly Fan Draws & Giveaways</h2>
          <p>Weekly fan draws are free to enter. No purchase is necessary to participate or win. Draws are purely for fan appreciation and community engagement. FortHub is not responsible for prize fulfillment by third parties, and all winners are subject to manual confirmation by our legal compliance team. Draws are not affiliated with Epic Games.</p>
        </div>
      </div>
    </>
  );
}
