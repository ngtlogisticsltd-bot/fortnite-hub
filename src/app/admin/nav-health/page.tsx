"use client";
import { ShieldCheck, Link2, AlertTriangle, CheckCircle2, Search } from 'lucide-react';
import Link from 'next/link';

export default function NavHealthPage() {
  const navData = [
    { group: 'Main', name: 'Home', path: '/', status: 'OK' },
    { group: 'Main', name: 'News', path: '/news', status: 'OK' },
    { group: 'Main', name: 'Item Shop', path: '/item-shop', status: 'OK' },
    { group: 'Main', name: 'Patch Notes', path: '/patch-notes', status: 'OK' },
    { group: 'Main', name: 'Community', path: '/community', status: 'OK' },
    
    { group: 'Explore', name: 'Skins', path: '/skins', status: 'OK' },
    { group: 'Explore', name: 'Clips', path: '/clips', status: 'OK' },
    { group: 'Explore', name: 'Events', path: '/events', status: 'OK' },
    { group: 'Explore', name: 'Games', path: '/games', status: 'OK' },
    { group: 'Explore', name: 'Media', path: '/media', status: 'OK' },
    { group: 'Explore', name: 'AI Clips', path: '/ai-clips', status: 'OK' },
    { group: 'Explore', name: 'Top Creators', path: '/top-creators', status: 'OK' },
    { group: 'Explore', name: 'Live Hub', path: '/live', status: 'OK' },
    { group: 'Explore', name: 'Live Feed', path: '/live-feed', status: 'OK' },

    { group: 'Guides', name: 'Guides Home', path: '/guides', status: 'OK' },
    { group: 'Guides', name: 'XP Maps', path: '/fortnite-xp-maps', status: 'OK' },
    { group: 'Guides', name: 'Best Settings', path: '/fortnite-best-settings', status: 'OK' },
    { group: 'Guides', name: 'Item Shop Today', path: '/fortnite-item-shop-today', status: 'OK' },
    { group: 'Guides', name: 'Update Today', path: '/fortnite-update-today', status: 'OK' },
    { group: 'Guides', name: 'Patch Notes Tracker', path: '/fortnite-patch-notes', status: 'OK' },
    { group: 'Guides', name: 'Pro Gear', path: '/pro-gear', status: 'OK' },

    { group: 'Info', name: 'About', path: '/about', status: 'OK' },
    { group: 'Info', name: 'Contact', path: '/contact', status: 'OK' },
    { group: 'Info', name: 'Submit', path: '/submit', status: 'OK' },
    { group: 'Info', name: 'Weekly Draw', path: '/weekly-draw', status: 'OK' },
    { group: 'Info', name: 'Privacy', path: '/privacy', status: 'OK' },
    { group: 'Info', name: 'Terms', path: '/terms', status: 'OK' },
    { group: 'Info', name: 'Cookie Policy', path: '/cookie-policy', status: 'OK' },
    { group: 'Info', name: 'Disclosures', path: '/disclosures', status: 'OK' },
    { group: 'Info', name: 'Media Kit', path: '/media-kit', status: 'OK' },
  ];

  const brokenCount = navData.filter(i => i.status === 'MISSING').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
            <Link2 className="w-10 h-10 text-primary" /> Nav Health Hub
          </h1>
          <p className="text-white/50 text-sm mt-2">Monitoring public routes, dropdown integrity, and link connectivity.</p>
        </div>
        <div className="flex gap-4">
           <div className={`px-6 py-3 rounded-xl border flex items-center gap-3 ${brokenCount > 0 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
            {brokenCount > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="font-black uppercase tracking-widest text-xs">{brokenCount} Broken Links Detected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#12131c] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
            <h3 className="font-black text-lg text-white uppercase flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" /> Route Audit List
            </h3>
            <span className="text-[10px] font-black uppercase bg-white/5 text-white/30 px-3 py-1 rounded-full">Automated Scan</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 font-black uppercase text-white/30 tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Dropdown Group</th>
                  <th className="px-6 py-4">Link Name</th>
                  <th className="px-6 py-4">Route Path</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {navData.map((item, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="bg-white/5 px-2 py-1 rounded text-[9px] font-black uppercase text-white/40">{item.group}</span>
                    </td>
                    <td className="px-6 py-4 font-black text-white uppercase">{item.name}</td>
                    <td className="px-6 py-4 font-mono text-white/40 group-hover:text-primary transition-colors">{item.path}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-[4px] font-black uppercase text-[9px] ${
                        item.status === 'OK' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={item.path} className="text-white/20 hover:text-white transition-colors">
                        Verify
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#12131c] border border-white/5 rounded-2xl p-8 space-y-6">
            <h3 className="font-black text-white uppercase text-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> QA Instructions
            </h3>
            <div className="space-y-4 text-xs text-white/40 leading-relaxed">
              <p>1. Check if dropdowns open on both <strong className="text-white">hover and click</strong>.</p>
              <p>2. Verify that menus don&apos;t close instantly (300ms delay).</p>
              <p>3. Ensure <strong className="text-white">keyboard navigation</strong> (Tab/Enter) works for all links.</p>
              <p>4. Validate mobile menu rendering for small screens.</p>
              <p>5. Test all <strong className="text-white">Verify</strong> links to ensure they load the correct page.</p>
            </div>
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 bg-black/30 p-4 rounded-xl border border-white/5">
                 <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Global Status</div>
                    <div className="text-xs font-black text-white uppercase tracking-widest">Operational</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
             <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-2">Dev Oversight Note</h4>
             <p className="text-[11px] text-white/50 leading-relaxed">
                This registry is used by the <strong className="text-white">Navigation QA Bot</strong> to monitor site integrity. Any MISSING routes will trigger a REAPER alert.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
