import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import UpdateHero from "@/components/updates/UpdateHero";
import UpdateGallery from "@/components/updates/UpdateGallery";
import UpdateTimeline from "@/components/updates/UpdateTimeline";
import GameplayEmbed from "@/components/updates/GameplayEmbed";
import { updateEmbeds } from "@/lib/media/updateEmbeds";
import Link from "next/link";
import { Film, ArrowRight, Shield, Zap } from "lucide-react";

export default function PatchNotesPage() {
  return (
    <main className="bg-[#0a0b14] min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <UpdateHero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" /> Latest Updates
                </h2>
                <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block" />
              </div>
              <UpdateGallery />
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                  <Film className="w-6 h-6 text-red-500" /> Gameplay Previews
                </h2>
                <div className="h-px flex-1 bg-white/10 mx-6 hidden md:block" />
              </div>
              <div className="space-y-12">
                {updateEmbeds.map(embed => (
                  <GameplayEmbed 
                    key={embed.id}
                    title={embed.title}
                    creatorName={embed.creatorName}
                    platform={embed.platform}
                    embedUrl={embed.embedUrl}
                    originalUrl={embed.originalUrl}
                  />
                ))}
              </div>
              <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40 flex items-start gap-3">
                <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                <p>FortHub embeds public videos and adds original commentary/analysis. We do not re-upload creator content. Support original creators by visiting their channels.</p>
              </div>
            </section>

            <AdSlot type="in-article" />

            <section className="bg-primary/10 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase text-primary">Create AI Update Clip Plan</h3>
                <p className="text-white/70 text-sm max-w-md">Generate original FortHub scripts and storyboards based on latest update topics without using copyrighted footage.</p>
              </div>
              <Link href="/ai-clips" className="bg-primary hover:bg-primary/80 text-black px-8 py-4 rounded-lg font-black uppercase tracking-widest flex items-center gap-2 transition-all shrink-0">
                Generate Clip Plan <ArrowRight className="w-5 h-5" />
              </Link>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <UpdateTimeline />

            <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-6 border-b border-white/5 pb-4">Quick Links</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { href: '/news', label: 'Latest News' },
                  { href: '/item-shop', label: 'Item Shop Today' },
                  { href: '/skins', label: 'Cosmetic Database' },
                  { href: '/fortnite-update-today', label: 'Today\'s Changes' }
                ].map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 group transition-all"
                  >
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4">FortHub Commentary</h3>
              <p className="text-sm text-white/60 leading-relaxed italic">
                "We analyze every patch to find the hidden meta changes that official notes often miss. From sniper headshot multipliers to car handling tweaks, we've got you covered."
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
