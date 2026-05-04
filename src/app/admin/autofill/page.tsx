"use client";
import { useState } from 'react';
import { Zap, Shield, AlertTriangle, CheckCircle2, ChevronRight, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const contexts = [
  'github', 'domain', 'vercel', 'supabase', 'analytics', 'newsletter', 
  'ads', 'affiliate', 'social', 'revenue', 'integrations', 'deploy', 'setup'
];

export default function AutoFillAdmin() {
  const [activeContext, setActiveContext] = useState('setup');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async (ctx: string) => {
    setActiveContext(ctx);
    setLoading(true);
    try {
      const res = await fetch(`/api/control-core/autofill?context=${ctx}`);
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
          <Zap className="w-10 h-10 text-primary" /> Auto-Fill Core
        </h1>
        <p className="text-white/50 text-sm mt-2 max-w-2xl">
          Auto-Fill Teams read saved data from Control Core to pre-populate admin forms and setup workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Context Selector */}
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 h-fit">
          <h3 className="text-xs font-black uppercase text-white/30 tracking-widest mb-4 px-2">Select Context</h3>
          <div className="flex flex-col gap-1">
            {contexts.map(ctx => (
              <button
                key={ctx}
                onClick={() => handleTest(ctx)}
                className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                  activeContext === ctx 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {ctx}
                {activeContext === ctx && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Test Result */}
        <div className="lg:col-span-3 space-y-8">
          {result ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#12131c] border border-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-white/30 mb-1">Available Fields</p>
                  <p className="text-2xl font-black text-white">{Object.keys(result.result.availableFields).length}</p>
                </div>
                <div className="bg-[#12131c] border border-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-white/30 mb-1">Missing Fields</p>
                  <p className="text-2xl font-black text-red-400">{result.result.missingFields.length}</p>
                </div>
                <div className="bg-[#12131c] border border-white/5 p-4 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-white/30 mb-1">Masked Secrets</p>
                  <p className="text-2xl font-black text-primary">{result.result.maskedFields.length}</p>
                </div>
              </div>

              {/* Warnings & Actions */}
              {(result.result.warnings.length > 0 || result.result.nextActions.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.result.warnings.length > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                      <h4 className="text-xs font-black uppercase text-yellow-500 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> System Warnings
                      </h4>
                      <ul className="space-y-1">
                        {result.result.warnings.map((w: string, i: number) => (
                          <li key={i} className="text-xs text-yellow-500/80">• {w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.result.nextActions.length > 0 && (
                    <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                      <h4 className="text-xs font-black uppercase text-primary mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Next Actions
                      </h4>
                      <ul className="space-y-1">
                        {result.result.nextActions.map((a: string, i: number) => (
                          <li key={i} className="text-xs text-primary/80">• {a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Field Data Table */}
              <div className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-white/5">
                  <h3 className="text-xs font-black uppercase text-white tracking-widest">Saved Context Data: {result.context}</h3>
                </div>
                <div className="p-0">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black uppercase text-white/30">
                        <th className="px-6 py-3">Field</th>
                        <th className="px-6 py-3">Saved Value</th>
                        <th className="px-6 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.result.availableFields).map(([key, val]: [string, any]) => (
                        <tr key={key} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-white/50">{key}</td>
                          <td className="px-6 py-4 font-medium text-white">{val}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-1 rounded font-black uppercase">SAVED</span>
                          </td>
                        </tr>
                      ))}
                      {result.result.missingFields.map((field: string) => (
                        <tr key={field} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-white/50">{field}</td>
                          <td className="px-6 py-4 text-white/20 italic">No data saved</td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-1 rounded font-black uppercase">MISSING</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Responsible Teams */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase text-white/30 tracking-widest">Active Auto-Fill Teams</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.teams.map((team: any) => (
                    <div key={team.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">{team.name}</h4>
                        <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-black">LIVE</span>
                      </div>
                      <p className="text-xs text-white/50 mb-3">{team.purpose}</p>
                      <div className="flex flex-wrap gap-2">
                        {team.fieldsUsed.map((f: string) => (
                          <span key={f} className="text-[9px] bg-black border border-white/5 px-1.5 py-0.5 rounded font-mono text-white/30">{f}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Link 
                  href="/admin/control-core" 
                  className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-black px-6 py-3 rounded-lg font-black uppercase tracking-widest transition-all"
                >
                  <Shield className="w-5 h-5" /> Edit Control Core <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[#12131c] border border-white/5 rounded-xl p-20 text-center space-y-4">
              <Search className="w-12 h-12 text-white/10 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Context Debugger</h3>
                <p className="text-white/40 text-sm max-w-md mx-auto">Select a context from the left to test the Auto-Fill logic and see what data will be pre-filled across the dashboard.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
