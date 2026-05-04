import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { Film, Shield, Users, Send } from 'lucide-react';
import { mediaItems } from '@/lib/media/mediaRegistry';

export const metadata = {
  title: 'Media Hub | FortHub - Creator Embeds & AI Clips',
  description: 'Watch featured Fortnite creator clips, read FortHub commentary, and explore AI-original video plans. All content properly attributed.',
};

export default function MediaPage() {
  const embeds = mediaItems.filter(m => m.sourceType === 'embed');
  const aiOriginals = mediaItems.filter(m => m.sourceType === 'ai_original');

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">
        
        <div>
          <h1 className="text-4xl font-heading font-black uppercase mb-4 flex items-center gap-3">
            <Film className="w-10 h-10 text-primary" /> Media Hub
          </h1>
          <p className="text-white/60 max-w-2xl">
            Featured creator embeds with original FortHub commentary, AI-original clip plans, and community media. All embedded content remains property of the original creators.
          </p>
        </div>

        {/* Legal Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-400 mb-1">Media Rights Policy</h3>
              <p className="text-sm text-yellow-400/80">All embedded videos are displayed using official platform embed tools. FortHub does not download, re-upload, or claim ownership of any creator content. Original creators are credited and linked.</p>
            </div>
          </div>
        </div>

        {/* Featured Creator Embeds */}
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">
            <Users className="inline w-6 h-6 text-blue-400 mr-2" />Featured Creator Embeds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {embeds.map(item => (
              <div key={item.id} className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center border-b border-white/5">
                  <p className="text-white/30 text-sm font-mono">Embed Placeholder — Replace with real embed URL</p>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded inline-block">{item.attributionText}</p>
                  <p className="text-sm text-white/70">{item.fortHubCommentary}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-green-500/20 text-green-400 px-2 py-0.5 rounded">EMBED</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-green-500/20 text-green-400 px-2 py-0.5 rounded">{item.legalStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Original Clip Plans */}
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">
            <Film className="inline w-6 h-6 text-purple-400 mr-2" />AI Original Clip Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiOriginals.map(item => (
              <div key={item.id} className="bg-[#12131c] border border-purple-500/20 rounded-xl p-6 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">AI ORIGINAL</span>
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="text-sm text-white/70">{item.fortHubCommentary}</p>
                <p className="text-xs text-white/50 italic">{item.notes}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/ai-clips" className="inline-block bg-primary hover:bg-primary/80 text-black font-black uppercase px-8 py-3 rounded-lg transition-colors">
              View All AI Clip Plans &rarr;
            </Link>
          </div>
        </section>

        {/* Submit CTA */}
        <section className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
          <Send className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Submit a Creator or Clip</h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">Know a great Fortnite creator or clip? Submit it for review and we&apos;ll feature it with full credit.</p>
          <Link href="/submit" className="inline-block bg-primary hover:bg-primary/80 text-black font-black uppercase px-8 py-3 rounded-lg transition-colors">
            Submit a Link
          </Link>
        </section>

      </div>
    </>
  );
}
