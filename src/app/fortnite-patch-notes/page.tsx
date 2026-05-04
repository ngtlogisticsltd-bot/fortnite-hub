import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpdateGallery from "@/components/updates/UpdateGallery";
import { HelpCircle, Shield, Calendar, Globe } from "lucide-react";

export const metadata = {
  title: "Fortnite Patch Notes & Update Tracker - FortHub",
  description: "Stay ahead with the most detailed Fortnite patch notes, weapon balance changes, map updates, and gameplay previews. Unofficial and community-driven.",
};

export default function SEOPatchNotes() {
  const faqs = [
    {
      q: "Where can I find official Fortnite updates?",
      a: "Official updates are posted on the Fortnite Status X account and the official Fortnite blog. FortHub aggregates these and adds community analysis."
    },
    {
      q: "Is FortHub official?",
      a: "No. FortHub is an unofficial fan site. We are not endorsed by or affiliated with Epic Games."
    },
    {
      q: "How often is this updated?",
      a: "Our Update Tracker Bot scans for new version numbers and hotfixes every 30 minutes. Major patch notes are usually updated within 2 hours of a downtime release."
    },
    {
      q: "Where do gameplay clips come from?",
      a: "We use official embeds from the Fortnite YouTube channel and public clips from trusted community creators, always with proper attribution."
    }
  ];

  return (
    <main className="bg-[#0a0b14] min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            FORTNITE <span className="text-primary">PATCH NOTES</span>
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto font-medium">
            Epic Games doesn't always release detailed patch notes. FortHub's analysts break down every hidden buff, nerf, and map change.
          </p>
        </div>

        {/* Media Rich Content */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-white">Recent Update History</h2>
          </div>
          <UpdateGallery />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-black uppercase tracking-widest text-white">FAQ</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#12131c] border border-white/5 rounded-xl p-6">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">{faq.q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal/Disclaimer Side */}
          <div className="space-y-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-8 h-8 text-red-500" />
                <h2 className="text-xl font-black uppercase text-white">Unofficial Status</h2>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                FortHub is not affiliated with Epic Games. All Fortnite related imagery, trademarks, and gameplay content are the property of Epic Games. We operate under the Epic Games Fan Site Policy.
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <Globe className="w-5 h-5 text-white/30" />
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Global Fan Resource • 2026 Edition</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-[#12131c] border border-white/5 rounded-2xl p-12">
          <h2 className="text-3xl font-black uppercase mb-4">Want Daily Updates?</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">Our automated engine produces daily summaries of every hotfix and shop change.</p>
          <a href="/news" className="bg-primary hover:bg-primary/80 text-black px-10 py-4 rounded-lg font-black uppercase tracking-widest transition-all inline-block">
            View Live Feed
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
