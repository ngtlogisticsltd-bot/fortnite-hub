"use client";
import { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, CheckCircle, XCircle, Clock, Zap, Activity, Info, AlertTriangle, ShieldCheck, ChevronRight, Layout, Globe, Server, BarChart, Rocket } from 'lucide-react';

export default function ReaperCommandCenter() {
  const [commands, setCommands] = useState<any[]>([]);
  const [autopilot, setAutopilot] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/reaper/command');
      const data = await res.json();
      if (data.success) {
        setCommands(data.commands);
        setAutopilot(data.autopilot);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch commands');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDecision = async (commandId: string, decision: 'approve' | 'reject') => {
    try {
      await fetch('/api/reaper/command/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commandId, decision })
      });
      fetchData();
    } catch (err) {
      console.error('Decision failed');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'needs_approval': return <ShieldAlert className="w-4 h-4 text-orange-500" />;
      case 'blocked': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-white/30" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  };

  const activeTasks = commands.filter(c => c.status !== 'completed' && c.status !== 'blocked');
  const completedTasks = commands.filter(c => c.status === 'completed');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Terminal className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">REAPER <span className="text-primary">COMMAND</span> CENTER</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Autonomous Loop & Oversight Management</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#12131c] border border-white/10 p-4 rounded-2xl text-center min-w-[140px]">
              <div className="text-[10px] font-black text-white/30 uppercase mb-1">Active Tasks</div>
              <div className="text-2xl font-black text-white">{activeTasks.length}</div>
           </div>
           <div className="bg-[#12131c] border border-white/10 p-4 rounded-2xl text-center min-w-[140px]">
              <div className="text-[10px] font-black text-white/30 uppercase mb-1">System Health</div>
              <div className="text-2xl font-black text-green-500 uppercase">OK</div>
           </div>
        </div>
      </div>

      {/* System Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/40 uppercase font-black text-[10px] tracking-widest">
               <Server className="w-4 h-4 text-primary" /> API Health
            </div>
            <div className="flex items-center justify-between">
               <span className="text-lg font-black text-white uppercase tracking-widest">Online</span>
               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
            </div>
         </div>
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/40 uppercase font-black text-[10px] tracking-widest">
               <Globe className="w-4 h-4 text-blue-400" /> Nav Health
            </div>
            <div className="flex items-center justify-between">
               <span className="text-lg font-black text-white uppercase tracking-widest">100% OK</span>
               <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
         </div>
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/40 uppercase font-black text-[10px] tracking-widest">
               <BarChart className="w-4 h-4 text-yellow-400" /> Revenue Hub
            </div>
            <div className="flex items-center justify-between">
               <span className="text-lg font-black text-yellow-500 uppercase tracking-widest">Pre-Live</span>
               <AlertTriangle className="w-4 h-4 text-yellow-500" />
            </div>
         </div>
         <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/40 uppercase font-black text-[10px] tracking-widest">
               <Rocket className="w-4 h-4 text-red-400" /> Deploy
            </div>
            <div className="flex items-center justify-between">
               <span className="text-lg font-black text-red-500 uppercase tracking-widest">Ready</span>
               <ShieldAlert className="w-4 h-4 text-red-500" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Command Queue & Active Tasks */}
        <div className="lg:col-span-2 space-y-12">
           
           <section className="space-y-6">
              <h3 className="text-white/40 font-black uppercase text-xs tracking-widest flex items-center gap-2">
                 <Zap className="w-4 h-4 text-primary" /> Active Tasks Queue
              </h3>
              <div className="space-y-4">
                 {activeTasks.length === 0 && (
                   <div className="bg-[#12131c] border border-white/5 rounded-2xl p-20 text-center text-white/10 italic">
                      No active tasks. Autopilot is managing safe operations.
                   </div>
                 )}
                 {activeTasks.map((cmd) => (
                   <div key={cmd.id} className="bg-[#12131c] border border-white/10 rounded-2xl p-6 hover:border-primary/20 transition-all group overflow-hidden relative shadow-lg">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                      
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 font-mono text-[10px] text-white/30">
                               {cmd.id.toUpperCase().slice(0, 4)}
                            </div>
                            <div>
                               <h4 className="font-black text-white uppercase text-sm tracking-widest flex items-center gap-2">
                                  {cmd.intent}
                                  <span className={`text-[8px] px-2 py-0.5 rounded font-black ${cmd.source === 'system' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-400'}`}>
                                     {cmd.source}
                                  </span>
                               </h4>
                               <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Target: {cmd.targetTeam}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${getRiskColor(cmd.riskLevel)}`}>Risk: {cmd.riskLevel}</span>
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase border bg-white/5 text-white/50 border-white/10 flex items-center gap-1">
                               {getStatusIcon(cmd.status)} {cmd.status}
                            </span>
                         </div>
                      </div>

                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-4">
                         <p className="text-xs font-mono text-white/70 italic">&quot;{cmd.description || cmd.input}&quot;</p>
                         {cmd.requiredAction && (
                            <p className="text-[10px] text-primary mt-2 font-black uppercase tracking-widest flex items-center gap-2">
                               <ArrowRight className="w-3 h-3" /> Fix Action: {cmd.requiredAction}
                            </p>
                         )}
                      </div>

                      {cmd.status === 'needs_approval' && (
                         <div className="flex gap-3 pt-4 border-t border-white/5">
                            <button 
                               onClick={() => handleDecision(cmd.id, 'approve')}
                               className="bg-primary hover:bg-primary/80 text-black px-4 py-1.5 rounded-lg font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                            >
                               <CheckCircle className="w-4 h-4" /> Approve Action
                            </button>
                            <button 
                               onClick={() => handleDecision(cmd.id, 'reject')}
                               className="bg-white/5 hover:bg-white/10 text-white px-4 py-1.5 rounded-lg font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                            >
                               <XCircle className="w-4 h-4" /> Reject
                            </button>
                         </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 text-[9px] font-black uppercase tracking-widest text-white/20">
                         <span>Issued: {new Date(cmd.createdAt).toLocaleTimeString()}</span>
                         <div className="flex gap-3">
                            {cmd.actions.map((act: string, idx: number) => (
                              <span key={idx} className="flex items-center gap-1"><ChevronRight className="w-2 h-2 text-primary" /> {act}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <section className="space-y-6">
              <h3 className="text-white/40 font-black uppercase text-xs tracking-widest flex items-center gap-2">
                 <CheckCircle className="w-4 h-4 text-green-500" /> Completed Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {completedTasks.slice(0, 10).map((cmd) => (
                    <div key={cmd.id} className="bg-[#12131c] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4">
                       <div className="flex items-center gap-3 truncate">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          <div className="truncate">
                             <p className="text-[10px] font-black text-white uppercase truncate">{cmd.intent}</p>
                             <p className="text-[9px] text-white/30 truncate">{cmd.resultMessage}</p>
                          </div>
                       </div>
                       <span className="text-[8px] font-black text-white/20 uppercase shrink-0">{new Date(cmd.updatedAt).toLocaleTimeString()}</span>
                    </div>
                 ))}
              </div>
           </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           
           {/* Autopilot Status */}
           <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Activity className="w-5 h-5" /> REAPER Autopilot Live
              </h3>
              <div className="space-y-4">
                 {autopilot?.checks.map((check: any) => (
                    <div key={check.botId} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                       <div>
                          <p className="text-[10px] font-black text-white uppercase">{check.name}</p>
                          <p className="text-[8px] text-white/30 uppercase font-bold">{check.botId}</p>
                       </div>
                       <span className={`text-[8px] px-2 py-0.5 rounded font-black border ${
                          check.status === 'OK' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          check.status === 'ISSUE' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                       }`}>{check.status}</span>
                    </div>
                 ))}
              </div>
              <div className="pt-4 border-t border-white/5">
                 <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-2">Auto Actions This Cycle:</p>
                 <div className="space-y-1">
                    {autopilot?.actionsTriggered.map((act: string, i: number) => (
                       <div key={i} className="text-[8px] text-primary font-black uppercase flex items-center gap-2">
                          <Zap className="w-3 h-3" /> {act}
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Safety Rules */}
           <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-red-500 font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <ShieldCheck className="w-5 h-5" /> Safety Protocols
              </h3>
              <div className="space-y-3">
                 {[
                   "No direct shell execution",
                   "No file deletions via autopilot",
                   "Staged approval for production",
                   "Credential isolation active"
                 ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 text-[10px] text-white/50 font-bold uppercase tracking-widest">
                       <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" /> {rule}
                    </div>
                 ))}
              </div>
           </div>

           {/* Next Best Actions (Top 5) */}
           <div className="bg-[#12131c] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
              <h3 className="text-white font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Rocket className="w-5 h-5 text-primary" /> Top Operations
              </h3>
              <div className="space-y-4">
                 {[
                   "Connect Supabase Database",
                   "Add Google Analytics ID",
                   "Create 10 Content Pages",
                   "Fix Missing Admin Routes",
                   "Verify Media Embeds"
                 ].map((action, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-help">
                       <div className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-black text-white/30 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                          {i + 1}
                       </div>
                       <span className="text-[10px] font-black text-white/60 uppercase tracking-widest group-hover:text-white">{action}</span>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>

    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
   return (
      <svg 
         xmlns="http://www.w3.org/2000/svg" 
         width="24" 
         height="24" 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         strokeWidth="3" 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         className={className}
      >
         <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
   );
}
