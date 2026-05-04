"use client";
import Navbar from "@/components/Navbar";
import { Users, Mail, Video, ShieldCheck } from "lucide-react";

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6">The FortHub <span className="text-white">Community</span></h1>
          <p className="text-xl text-white/70">We are an unofficial, fan-run platform built for dedicated players. Want to get featured or help us build the best Fortnite resource? Join in below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Clip Submission */}
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Video className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-white uppercase">Submit a Clip</h2>
            </div>
            <p className="text-white/60 text-sm mb-6">Hit an insane trickshot or funny glitch? Drop your YouTube/Twitch link below to be featured on our homepage and socials.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name or Epic ID" className="w-full bg-[#05050a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-primary" />
              <input type="url" placeholder="Video URL (YouTube/Twitch/TikTok)" className="w-full bg-[#05050a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-primary" />
              <button type="button" className="w-full bg-primary hover:bg-primary-hover text-black font-black uppercase py-3 rounded transition-colors">Submit Clip</button>
            </form>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4 text-center">* All submissions are manually reviewed by our moderation team before publishing.</p>
          </div>

          {/* Newsletter */}
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Mail className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white uppercase">Daily Drop Newsletter</h2>
            </div>
            <p className="text-white/60 text-sm mb-6">Get the live item shop rotation, breaking patch notes, and best new creative maps sent straight to your inbox every morning.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" className="w-full bg-[#05050a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-blue-400" />
              <button type="button" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black uppercase py-3 rounded transition-colors">Subscribe Now</button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Application */}
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Users className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white uppercase">Apply for the Team</h2>
            </div>
            <p className="text-white/60 text-sm mb-6">Are you a competitive player, lore expert, or map builder? We are always looking for passionate fans to write guides and manage our data feeds.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Speciality (e.g. Map Builder)" className="w-full bg-[#05050a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-green-400" />
              <input type="email" placeholder="Contact Email" className="w-full bg-[#05050a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-green-400" />
              <textarea placeholder="Why do you want to join FortHub?" rows={3} className="w-full bg-[#05050a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-green-400"></textarea>
              <button type="button" className="w-full bg-green-500 hover:bg-green-400 text-black font-black uppercase py-3 rounded transition-colors">Send Application</button>
            </form>
          </div>

          {/* Rules */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary uppercase">Community Guidelines</h2>
            </div>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">1. No Toxicity:</span> We are a positive, inclusive fan site. Leave the trash talk on spawn island.</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">2. No Leaks/Hacks:</span> We respect Epic Games' policies. Do not submit datamined content, cheat tools, or account trading links.</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">3. Unofficial Status:</span> FortHub is an independent fan project. Do not represent yourself as an Epic employee.</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">4. Original Content Only:</span> Only submit clips or guides that you personally created or own the rights to.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
