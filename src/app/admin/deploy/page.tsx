"use client";
import { CheckCircle2, AlertTriangle, Play } from 'lucide-react';

import AssistantWidget from '@/components/admin/AssistantWidget';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function DeployPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-widest text-white">Deployment Readiness</h2>
        <p className="text-white/50 text-sm mt-1">Pre-flight checklist for Vercel production deployment.</p>
      </div>

      <AssistantWidget />
      
      <AutoFillPanel context="deploy" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-white uppercase border-b border-white/5 pb-2">Technical Status</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Build Status Passing</li>
            <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sitemap Excludes Admin</li>
            <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Robots.txt Blocks Admin</li>
            <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Admin Routes Protected by Auth</li>
            <li className="flex items-center gap-3 text-white/80"><AlertTriangle className="w-4 h-4 text-yellow-500" /> Domain Not Connected</li>
          </ul>
        </div>

        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-white uppercase border-b border-white/5 pb-2">Business & Legal</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Terms, Privacy & Disclosures Present</li>
            <li className="flex items-center gap-3 text-white/80"><AlertTriangle className="w-4 h-4 text-yellow-500" /> Analytics Missing Tracking ID</li>
            <li className="flex items-center gap-3 text-white/80"><AlertTriangle className="w-4 h-4 text-yellow-500" /> AdSense Missing Publisher ID</li>
          </ul>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
        <h3 className="font-black text-xl text-primary uppercase mb-2">Ready to Deploy</h3>
        <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">Push this code to a GitHub repository, link it to Vercel, and add your specific Environment Variables.</p>
        <button className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-8 py-4 rounded transition-colors inline-flex items-center gap-2">
          <Play className="w-5 h-5 fill-black" /> Begin Live Deployment
        </button>
      </div>
    </div>
  );
}
