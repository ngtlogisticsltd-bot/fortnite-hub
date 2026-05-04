import { ShieldCheck, Info } from 'lucide-react';

export default function UpdateHero() {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-[#0a0b14]/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full max-w-4xl">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-primary text-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">LIVE TRACKER</span>
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-green-400" /> UNOFFICIAL FAN SOURCE
          </span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
          LATEST UPDATE <span className="text-primary">HUB</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl font-medium leading-relaxed">
          Real-time patch notes, gameplay previews, and technical analysis of the latest Fortnite updates.
        </p>
      </div>

      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold text-white/50 uppercase tracking-widest">
        <Info className="w-3 h-3" /> Updated: May 2026
      </div>
    </div>
  );
}
