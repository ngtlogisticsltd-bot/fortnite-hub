"use client";
import { DollarSign, ShieldCheck } from 'lucide-react';
import AdSlot from './AdSlot';

export default function SponsorAdsBot() {
  return (
    <div className="bg-card border border-white/10 rounded-xl p-6 shadow-xl shadow-black/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/20 p-3 rounded-lg border border-accent/30">
          <DollarSign className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-black text-2xl uppercase leading-none text-accent">Sponsor <span className="text-white">Bot</span></h3>
          <p className="text-white/50 text-sm font-medium">In-House Campaign Manager</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-background border border-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm uppercase">Active Campaign</h4>
            <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-bold">
              <ShieldCheck className="w-3 h-3" /> Running
            </span>
          </div>
          
          <div className="pointer-events-none scale-90 origin-top-left w-[111%] -mb-4">
            <AdSlot 
              type="banner" 
              inHouse={true} 
              imageUrl="https://cdn2.unrealengine.com/fortnite-competitive-1920x1080-602931211.jpg"
              linkUrl="https://competitive.fortnite.com"
              sponsorName="FNCS"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
