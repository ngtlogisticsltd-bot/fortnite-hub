"use client";
import { useState, useEffect } from 'react';
import { Server, CheckCircle2, AlertTriangle, ShieldAlert, Key, Zap } from 'lucide-react';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function AdminAccountsDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/reaper/accounts')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONNECTED': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'NEEDS_ACCOUNT': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'NEEDS_OWNER_ACTION': return 'bg-red-600/20 text-red-500 border-red-600/30';
      case 'OPTIONAL_LATER': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  if (!data) return <div className="p-8 text-white/50">Loading accounts...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Server className="w-8 h-8 text-blue-400" /> Account Setup Hub
          </h2>
          <p className="text-white/50 text-sm mt-1">Manage all required external platforms and environment variables.</p>
        </div>
        <div className="bg-[#12131c] border border-primary/20 px-4 py-2 rounded-lg flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <div>
            <p className="text-[10px] font-black uppercase text-white/50 tracking-widest">Next Best Action</p>
            <p className="text-sm font-bold text-white">{data.nextBestAction}</p>
          </div>
        </div>
      </div>

      <AutoFillPanel context="accounts" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.teams.map((team: any) => (
          <div key={team.id} className={`bg-[#12131c] border rounded-xl p-6 ${team.currentStatus === 'NEEDS_ACCOUNT' ? 'border-red-500/30' : 'border-white/5'}`}>
            <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-bold text-white text-xl">{team.name}</h3>
                <p className="text-sm text-white/50 mt-1">{team.purpose}</p>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-black uppercase tracking-wider border ${getStatusColor(team.currentStatus)}`}>
                {team.currentStatus.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Owner Action Required</h4>
                <p className="text-sm text-yellow-400 bg-yellow-400/10 p-2 rounded flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> {team.ownerActionRequired}
                </p>
              </div>

              {team.requiredEnvVars.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Environment Variables</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.requiredEnvVars.map((v: string) => (
                      <span key={v} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${data.connectedEnvVars.includes(v) ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        <Key className="w-3 h-3" /> {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Setup Checklist</h4>
                <ul className="space-y-1">
                  {team.setupSteps.map((step: string, i: number) => (
                    <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span> {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-white/50"><strong className="text-white">Unlocks:</strong> {team.whatThisUnlocks}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
