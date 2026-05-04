"use client";
import { useState, useEffect } from 'react';
import { Globe2, Link2, ShieldAlert, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

export default function AdminLinkedSitesDashboard() {
  const [sites, setSites] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/reaper/linked-sites')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSites(data.sites);
        }
      })
      .catch(console.error);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'NEEDS_DOMAIN': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'MOCK': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'OPTIONAL_LATER': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  if (sites.length === 0) return <div className="p-8 text-white/50">Loading linked sites...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-blue-500" /> Linked Sites Matrix
          </h2>
          <p className="text-white/50 text-sm mt-1">Manage the architecture of the FortHub media empire (internal routes, external hubs, and future expansions).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sites.map((site: any) => (
          <div key={site.id} className="bg-[#12131c] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
            
            <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-bold text-white text-xl flex items-center gap-2">
                  {site.name}
                  {site.riskLevel === 'High' && <span title="High Risk Property"><Lock className="w-4 h-4 text-red-400" /></span>}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">{site.type}</span>
                  <span className="text-xs text-white/40">{site.url}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(site.currentStatus)}`}>
                {site.currentStatus.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Purpose</h4>
                <p className="text-sm text-white/70">{site.purpose}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Required Action</h4>
                <p className="text-sm text-yellow-400 bg-yellow-400/10 p-2 rounded inline-block">
                  {site.ownerActionRequired}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-white/40 leading-snug">
                  <span className={`${site.riskLevel === 'High' ? 'text-red-400' : 'text-blue-400'} font-bold uppercase tracking-wider`}>Note:</span> {site.notes}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
