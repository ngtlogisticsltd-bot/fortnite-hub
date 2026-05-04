"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight } from 'lucide-react';

export default function AssistantWidget() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/reaper/assistant')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="bg-[#12131c] border border-primary/20 rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" /> REAPER Assistant Online
        </h3>
        <span className="flex h-2 w-2 relative mt-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </div>

      <div className="mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Co-Pilot Recommendation</p>
        <p className="text-sm font-bold text-white">{data.nextBestAction}</p>
      </div>

      <Link 
        href="/admin/assistant"
        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
      >
        Ask Assistant <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
