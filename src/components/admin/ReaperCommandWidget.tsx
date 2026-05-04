"use client";
import { useState, useEffect } from 'react';
import { Send, Terminal, Zap, ShieldAlert, CheckCircle, Activity, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ReaperCommandWidget() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [autopilot, setAutopilot] = useState<any>(null);
  const [pendingTasks, setPendingTasks] = useState(0);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/reaper/command');
      const data = await res.json();
      if (data.success) {
        setAutopilot(data.autopilot);
        setPendingTasks(data.commands.filter((c: any) => c.status === 'needs_approval').length);
      }
    } catch (err) {
      console.error('Failed to fetch widget status');
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  const execute = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/reaper/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.command);
        setAutopilot(data.autopilot);
        setInput('');
      }
    } catch (err) {
      console.error('Command failed');
    } finally {
      setLoading(false);
    }
  };

  const hasIssues = autopilot?.checks.some((c: any) => c.status !== 'OK');

  return (
    <div className="bg-[#12131c] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
        <h3 className="font-black text-xs text-white uppercase tracking-widest flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" /> REAPER Autopilot Status
        </h3>
        <Link href="/admin/command-center" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
          Full Command Center
        </Link>
      </div>
      
      <div className="p-6 space-y-6">
        
        {/* System Summary */}
        <div className="grid grid-cols-2 gap-4">
           <div className={`p-4 rounded-2xl border flex flex-col gap-1 ${hasIssues ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
              <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">System Status</span>
              <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${hasIssues ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
                 <span className={`text-xs font-black uppercase ${hasIssues ? 'text-yellow-500' : 'text-green-500'}`}>
                    {hasIssues ? 'Issues Found' : 'All Systems OK'}
                 </span>
              </div>
           </div>
           <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex flex-col gap-1">
              <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Pending Tasks</span>
              <div className="flex items-center gap-2">
                 <ShieldAlert className={`w-4 h-4 ${pendingTasks > 0 ? 'text-orange-500' : 'text-white/20'}`} />
                 <span className="text-xs font-black text-white">{pendingTasks} Tasks Staged</span>
              </div>
           </div>
        </div>

        {result && (
          <div className={`p-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2 duration-300 ${
            result.status === 'needs_approval' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-green-500/10 border-green-500/20 text-green-400'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {result.status === 'needs_approval' ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              <span>{result.status === 'needs_approval' ? 'Action Staged' : 'Action Completed'}</span>
            </div>
            <p className="text-white/60 normal-case italic">&quot;{result.resultMessage}&quot;</p>
          </div>
        )}

        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && execute()}
            placeholder="Tell REAPER what to do..."
            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-all font-mono shadow-inner"
          />
          <button
            onClick={execute}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-3 bg-primary hover:bg-primary/80 disabled:opacity-30 text-black p-2 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/20">
           <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> Auto-Loop Active</span>
           <span>Last Check: {autopilot ? new Date(autopilot.timestamp).toLocaleTimeString() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}
