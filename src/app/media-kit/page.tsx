import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Media Kit & Sponsorships - FortHub",
  description: "Advertise with FortHub. Reach dedicated Fortnite players through our automated guides, trackers, and news feeds.",
};

export default function MediaKitPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6">Partner with <span className="text-white">FortHub</span></h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Reach thousands of active, dedicated Fortnite players daily. We are building the ultimate autonomous media hub for the community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 text-center">
            <h3 className="text-4xl font-black text-white mb-2">10k+</h3>
            <p className="text-sm font-bold uppercase tracking-wider text-white/50">Est. Daily Users</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 text-center">
            <h3 className="text-4xl font-black text-white mb-2">45%</h3>
            <p className="text-sm font-bold uppercase tracking-wider text-white/50">Return Rate</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 text-center">
            <h3 className="text-4xl font-black text-primary mb-2">#1</h3>
            <p className="text-sm font-bold uppercase tracking-wider text-white/50">In Player Loyalty</p>
          </div>
        </div>
        <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-16">* Note: Metrics are placeholder estimates pending live analytics integration.</p>

        <div className="bg-gradient-to-br from-[#1a1c29] to-[#0d0e15] border border-primary/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-heading font-black uppercase text-white mb-8">Sponsorship Options</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-white mb-2">Homepage Takeover</h3>
              <p className="text-white/70 text-sm">Your brand front and center above the fold on the Daily Item Shop and News Feeds.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-bold text-white mb-2">In-Guide Placements</h3>
              <p className="text-white/70 text-sm">Targeted context ads within our high-ranking XP Maps and Best Settings guides.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="/contact" className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-10 py-4 rounded transition-colors inline-block text-lg shadow-[0_0_30px_rgba(0,255,157,0.2)]">
              Contact Us for Pricing
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
