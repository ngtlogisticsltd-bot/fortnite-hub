"use client";
import { useState, useEffect } from 'react';
import { GitBranch, Globe, CheckCircle2, AlertTriangle, ShieldAlert, Terminal, Zap } from 'lucide-react';

import AssistantWidget from '@/components/admin/AssistantWidget';
import AutoFillPanel from '@/components/admin/AutoFillPanel';
import AdminHelpWidget from '@/components/admin/AdminHelpWidget';

export default function AdminGithubDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/reaper/github-launch')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONNECTED': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'NEEDS_OWNER_ACTION': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'NOT_STARTED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'ERROR': return 'bg-red-600/20 text-red-500 border-red-600/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  if (!data) return <div className="p-8 text-white/50">Loading launch protocols...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <AdminHelpWidget context="GitHub Launch" />
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <GitBranch className="w-8 h-8 text-primary" /> GitHub & Domain Launch
          </h2>
          <p className="text-white/50 text-sm mt-1">Version control, Vercel deployment, and domain connection steps.</p>
        </div>
      </div>

      <AssistantWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <AutoFillPanel context="github" />
        </div>
        
        {/* Left Column: Commands & Critical Warnings */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-lg text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
              <Terminal className="w-5 h-5 text-purple-400" /> Push Commands
            </h3>
            <p className="text-xs text-white/50 mb-4">Run these commands sequentially in your local terminal to push FortHub to your remote repository.</p>
            
            <div className="bg-black border border-white/10 p-4 rounded-lg font-mono text-xs space-y-2 text-white/80 overflow-x-auto">
              <p className="text-blue-400"># 1. Initialize and stage files</p>
              <p>{data.safeCommands.init}</p>
              
              <p className="text-blue-400 mt-4"># 2. Commit files</p>
              <p>{data.safeCommands.commit}</p>
              
              <p className="text-blue-400 mt-4"># 3. Set branch to main</p>
              <p>{data.safeCommands.branch}</p>
              
              <p className="text-blue-400 mt-4"># 4. Connect remote origin</p>
              <p>{data.safeCommands.remote}</p>
              
              <p className="text-blue-400 mt-4"># 5. Push to GitHub</p>
              <p>{data.safeCommands.push}</p>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
              <strong>Warning:</strong> Make sure to replace <span className="font-mono">YOUR_GITHUB_REPO_URL</span> with your actual remote URL before running the remote origin command.
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <h3 className="font-bold text-lg text-red-400 flex items-center gap-2 mb-2">
              <ShieldAlert className="w-5 h-5" /> Missing Keys
            </h3>
            <ul className="text-sm text-red-400/80 space-y-1 list-disc list-inside">
              {data.missingEnvVars.length === 0 ? (
                <li className="text-green-400">All primary keys present.</li>
              ) : (
                data.missingEnvVars.map((v: string) => <li key={v}>{v}</li>)
              )}
            </ul>
          </div>

        </div>

        {/* Right Column: Checklists */}
        <div className="lg:col-span-2 space-y-6">
          {data.checklist.map((section: any) => (
            <div key={section.id} className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-white/5">
                <h3 className="font-bold text-lg text-white">{section.title}</h3>
              </div>
              <div className="divide-y divide-white/5">
                {section.items.map((item: any) => (
                  <div key={item.id} className="p-6 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-white text-md flex items-center gap-2">
                        {item.title}
                      </h4>
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-yellow-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {item.ownerActionRequired}
                    </p>

                    {item.command && (
                      <div className="mb-3">
                        <code className="text-xs font-mono bg-black border border-white/10 px-3 py-1.5 rounded block text-green-400 overflow-x-auto">
                          {item.command}
                        </code>
                      </div>
                    )}

                    <p className="text-[11px] text-white/40">
                      <span className={`${item.riskLevel === 'High' ? 'text-red-400' : 'text-white/60'} font-bold uppercase tracking-wider`}>Note:</span> {item.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
