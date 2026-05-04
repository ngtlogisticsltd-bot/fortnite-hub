import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveFeed from "@/components/live/LiveFeed";
import { Activity, Shield, Info } from 'lucide-react';

export default function LiveFeedPage() {
  return (
    <main className="bg-[#0a0b14] min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white">
              LIVE <span className="text-primary">FEED</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
              Real-time data dispatch from the Fortnite Island. Shop updates, patch alerts, and community milestones as they happen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <LiveFeed />
            </div>

            <div className="space-y-8">
              <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Dispatch Protocol
                </h3>
                <p className="text-sm text-white/60 leading-relaxed italic mb-4">
                  "Data is pulled from public APIs and official sources. Every item is verified by our Data Dispatcher before routing to the public feed."
                </p>
                <div className="space-y-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Source: Official APIs</span>
                    <span className="text-green-400">Verified</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Latency: &lt; 30s</span>
                    <span className="text-green-400">Optimal</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2 uppercase text-xs">
                  <Info className="w-4 h-4 text-primary" /> Unofficial Status
                </h4>
                <p className="text-xs text-white/40">
                  FortHub is a community resource. This feed aggregates public data for fan use and is not an official Epic Games service.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
