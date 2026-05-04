"use client";
import { DollarSign, BarChart3, ShieldAlert } from 'lucide-react';
import { adConfig } from '@/lib/monetization/adConfig';
import { affiliateConfig } from '@/lib/monetization/affiliateConfig';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function RevenueDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-500" /> Revenue Hub
          </h2>
          <p className="text-white/50 text-sm mt-1">Manage ad networks, affiliates, and direct sponsorships.</p>
        </div>
      </div>

      <AutoFillPanel context="revenue" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mock Estimator */}
        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-2 text-white uppercase flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Daily Estimate</h3>
          <p className="text-3xl font-black text-green-400 mb-2">$0.00</p>
          <p className="text-xs text-white/40 uppercase tracking-wider">Awaiting real analytics & network integrations.</p>
        </div>

        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6 md:col-span-2">
          <h3 className="font-bold text-lg mb-4 text-white uppercase border-b border-white/5 pb-2">Ad Slots</h3>
          <div className="space-y-3">
            {adConfig.slots.map(slot => (
              <div key={slot.id} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                <span className="font-mono text-white/70">{slot.id}</span>
                <span className="text-xs font-bold uppercase bg-gray-500/20 text-gray-400 px-2 py-1 rounded">{slot.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-white uppercase border-b border-white/5 pb-2">Affiliate Merchants</h3>
          <p className="text-xs text-white/40 mb-4">{affiliateConfig.disclaimer}</p>
          <div className="space-y-3">
            {affiliateConfig.merchants.map(merchant => (
              <div key={merchant.id} className="flex justify-between items-center text-sm p-3 bg-white/5 rounded">
                <span className="font-bold text-white/80">{merchant.name}</span>
                <span className="text-xs font-bold uppercase bg-gray-500/20 text-gray-400 px-2 py-1 rounded">{merchant.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#12131c] border border-yellow-500/30 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-yellow-500 uppercase border-b border-yellow-500/10 pb-2 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Setup Checklist</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>1. Approve Epic Games Fan Site Policy terms.</li>
            <li>2. Acquire Google AdSense Publisher ID.</li>
            <li>3. Reach 1,000 social followers for Creator Code.</li>
            <li>4. Update .env file with real IDs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
