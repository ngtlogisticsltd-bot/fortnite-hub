"use client";
import { useState } from 'react';
import { Settings, Plus, Image as ImageIcon, Link as LinkIcon, Calendar, CheckCircle } from 'lucide-react';

export default function AdsDashboard() {
  const [ads, setAds] = useState([
    { id: 1, slot: 'homepage-banner', title: 'FNCS Sponsorship', url: 'https://competitive.fortnite.com', active: true, startDate: '2024-05-01', endDate: '2024-06-01' },
    { id: 2, slot: 'sidebar-square', title: 'SteelSeries Headset', url: 'https://steelseries.com', active: false, startDate: '2024-06-01', endDate: '2024-07-01' }
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white">Ads Manager</h2>
          <p className="text-white/50 text-sm">Direct Sponsorships & Placements</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-6 py-3 rounded transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Campaign
        </button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
        <div className="text-blue-400 font-bold mt-0.5">ℹ️ Notice</div>
        <p className="text-white/70 text-sm">
          Ad campaign configurations are currently saved to local mock state. Any edits made here will reset on page reload until a persistent database (e.g., Supabase or PostgreSQL) is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ads.map(ad => (
          <div key={ad.id} className="bg-[#12131c] border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-xl text-white">{ad.title}</h3>
              <span className={`px-2 py-1 text-xs font-bold rounded ${ad.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {ad.active ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/60 bg-black/30 p-2 rounded">
                <Settings className="w-4 h-4 text-primary" /> 
                <span className="font-mono">Slot: {ad.slot}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 bg-black/30 p-2 rounded">
                <LinkIcon className="w-4 h-4 text-blue-400" /> 
                <span className="truncate">{ad.url}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 bg-black/30 p-2 rounded">
                <Calendar className="w-4 h-4 text-yellow-400" /> 
                <span>{ad.startDate} to {ad.endDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded transition-colors text-sm">
                Edit JSON
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white p-2 rounded transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
