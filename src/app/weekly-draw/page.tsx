"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, ShieldCheck, Info, CheckCircle2, Zap, Trophy, Users, Star, ArrowRight } from 'lucide-react';

export default function WeeklyDrawPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname) return;

    await fetch('/api/weekly-draw', {
      method: 'POST',
      body: JSON.stringify({ nickname, email, agreedRules: true })
    });

    setSubmitted(true);
  };

  return (
    <main className="bg-[#0a0b14] min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-block bg-primary/20 text-primary border border-primary/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Coming Soon
            </div>
            <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]">
              FORTNITE FAN <br/>
              <span className="text-primary">GIVEAWAY</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
              We&apos;re building something big for the FortHub community. A free, high-tier rewards system for our most active supporters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Waitlist Form */}
            <div className="space-y-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="bg-[#12131c] border border-white/10 rounded-3xl p-8 lg:p-12 space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Gift className="w-40 h-40 text-white" />
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-3xl font-black uppercase text-white mb-2">Join the Waitlist</h3>
                    <p className="text-white/50 text-sm">Be the first to know when we launch and get an exclusive &quot;Early Adopter&quot; badge.</p>
                  </div>
                  
                  <div className="space-y-4 relative">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Fan Nickname *</label>
                      <input 
                        required
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="e.g. LootLlamaHunter"
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Email (Optional - for early access notification)</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={!nickname}
                    className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-black py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_10px_40px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Join Early Access <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-12 text-center space-y-6">
                  <div className="bg-green-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black uppercase text-white tracking-tight">You&apos;re on the list!</h3>
                    <p className="text-white/50 text-lg">We&apos;ll notify you at {email || 'your nickname'} as soon as the first draw goes live.</p>
                  </div>
                </div>
              )}
            </div>

            {/* What's Coming */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Trophy className="w-6 h-6" />, title: 'Random Rewards', desc: 'Skins, emotes, and digital fan packs for active community members.' },
                { icon: <Star className="w-6 h-6" />, title: 'Fan Shoutouts', desc: 'Featured placement on our homepage and social feeds.' },
                { icon: <Zap className="w-6 h-6" />, title: 'Creator Collabs', desc: 'Special draws hosted by top Fortnite creators.' },
                { icon: <Users className="w-6 h-6" />, title: 'Community Goals', desc: 'Unlock bigger rewards as the FortHub community grows.' }
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-black uppercase text-white mb-2">{feature.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status / Milestone */}
          <div className="bg-[#12131c] border border-white/10 rounded-[2rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
            <div className="space-y-6 relative">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Launch Milestone</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-2 max-w-md mx-auto text-[10px] font-black uppercase tracking-widest">
                  <span className="text-white">0 Members Joined</span>
                  <span className="text-white/30">Goal: 1000</span>
                </div>
                <div className="w-full h-3 bg-black rounded-full max-w-md mx-auto overflow-hidden p-1 border border-white/5">
                  <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,1)]" style={{ width: '5%' }} />
                </div>
                <p className="text-xs text-white/40 mt-6 italic">Launching when community hits first milestone.</p>
              </div>
            </div>
          </div>

          {/* Transparency & Legal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">No active draw</h5>
              <p className="text-[10px] text-white/30 leading-relaxed">No giveaway is currently active. Join the waitlist to be notified of the first official launch.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">No purchase required</h5>
              <p className="text-[10px] text-white/30 leading-relaxed">All future FortHub draws will be 100% free to enter for our fans. No hidden fees or paid entry.</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Unofficial Source</h5>
              <p className="text-[10px] text-white/30 leading-relaxed">FortHub is not affiliated with Epic Games. All draws are managed independently by fans.</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
