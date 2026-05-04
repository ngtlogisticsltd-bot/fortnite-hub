"use client";
import { Link2, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Activity } from 'lucide-react';
import { operationsTeams, OperationsTeam, TeamStatus } from '@/lib/reaper/operationsTeams';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function IntegrationsDashboard() {
  const getStatusIcon = (status: TeamStatus) => {
    switch(status) {
      case 'LIVE': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'NEEDS_ACCOUNT': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'NEEDS_ACTION': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'MOCK': return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'MANUAL': return <ShieldAlert className="w-5 h-5 text-yellow-400" />;
      case 'NEEDS_APPROVAL': return <ShieldAlert className="w-5 h-5 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: TeamStatus) => {
    switch(status) {
      case 'LIVE': return 'bg-green-500/20 text-green-400';
      case 'NEEDS_ACCOUNT': return 'bg-red-500/20 text-red-400';
      case 'NEEDS_ACTION': return 'bg-red-600/20 text-red-500';
      case 'MOCK': return 'bg-gray-500/20 text-gray-400';
      case 'MANUAL': return 'bg-yellow-500/20 text-yellow-400';
      case 'NEEDS_APPROVAL': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-white/10 text-white';
    }
  };

  const counts = {
    LIVE: operationsTeams.filter(t => t.status === 'LIVE').length,
    NEEDS_ACCOUNT: operationsTeams.filter(t => t.status === 'NEEDS_ACCOUNT').length,
    MANUAL: operationsTeams.filter(t => t.status === 'MANUAL').length,
    NEEDS_APPROVAL: operationsTeams.filter(t => t.status === 'NEEDS_APPROVAL').length,
    NEEDS_ACTION: operationsTeams.filter(t => t.status === 'NEEDS_ACTION').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Link2 className="w-8 h-8 text-purple-400" /> Integrations & Teams
          </h2>
          <p className="text-white/50 text-sm mt-1">Manage all 20 internal operations teams and external API connections.</p>
        </div>
      </div>

      <AutoFillPanel context="integrations" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#12131c] border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-green-400">{counts.LIVE}</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Live</span>
        </div>
        <div className="bg-[#12131c] border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-red-400">{counts.NEEDS_ACCOUNT}</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Needs Account</span>
        </div>
        <div className="bg-[#12131c] border border-yellow-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-yellow-400">{counts.MANUAL}</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Manual</span>
        </div>
        <div className="bg-[#12131c] border border-orange-500/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-orange-400">{counts.NEEDS_APPROVAL}</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Needs Approval</span>
        </div>
        <div className="bg-[#12131c] border border-red-600/30 rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-red-500">{counts.NEEDS_ACTION}</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Needs Action</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationsTeams.map((team: OperationsTeam) => (
          <div key={team.id} className={`bg-[#12131c] border rounded-xl p-6 ${team.status.includes('NEEDS') ? 'border-red-500/30' : 'border-white/5'}`}>
            <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{team.name}</h3>
                <p className="text-xs text-white/40 font-mono mt-1">{team.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(team.status)}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Purpose</h4>
              <ul className="text-sm text-white/60 space-y-1 list-disc list-inside">
                {team.purpose.map((p, idx) => <li key={idx} className="truncate">{p}</li>)}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-white/40 uppercase font-bold tracking-wider">Status</span>
                <span className={`px-2 py-1 rounded font-black uppercase tracking-wider ${getStatusColor(team.status)}`}>
                  {team.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/40 uppercase font-bold tracking-wider">Required Env Vars</span>
                <span className="text-white/70">
                  {team.requiredEnvVars.length > 0 ? team.requiredEnvVars.length : 'None'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/40 uppercase font-bold tracking-wider">Risk Level</span>
                <span className={`${
                  team.riskLevel === 'High' ? 'text-red-400' :
                  team.riskLevel === 'Medium' ? 'text-yellow-400' :
                  'text-green-400'
                } font-bold`}>{team.riskLevel}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[10px] text-white/40 leading-snug"><span className="text-red-400 font-bold">Legal Note:</span> {team.legalNotes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
