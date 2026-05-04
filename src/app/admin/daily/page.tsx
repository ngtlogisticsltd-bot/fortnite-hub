"use client";
import { useState, useEffect } from 'react';
import { Zap, Play, FileText, Share2, Search, DollarSign, AlertTriangle, CheckCircle2, Activity, ListChecks, Radio, Rocket, Database, Globe } from 'lucide-react';
import { DailyState } from '@/lib/reaper/teams/dailyLoop';
import ReaperCommandWidget from '@/components/admin/ReaperCommandWidget';

export default function DailyEngineDashboard() {
  const [state, setState] = useState<DailyState | null>(null);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);

  const fetchState = () => {
    fetch('/api/reaper/daily')
      .then(res => res.json())
      .then(data => setState(data))
      .catch(err => console.error("Failed to load daily state", err));
  };

  useEffect(() => {
    fetchState();
  }, []);

  const showMessage = (text: string, type: 'success'|'error') => {
    setMessage({text, type});
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRunCycle = async () => {
    setRunning(true);
    try {
      const res = await fetch('/api/reaper/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'daily-cycle' })
      });
      const data = await res.json();
      if (data.success) {
        showMessage('Daily Execution Engine sequence complete.', 'success');
        fetchState();
      } else {
        showMessage(`Error: ${data.error}`, 'error');
      }
    } catch (err: any) {
      showMessage(`Network Error: ${err.message}`, 'error');
    }
    setRunning(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl z-50 font-bold border ${message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" /> Daily Execution Engine
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Last Run: {state?.lastRun ? new Date(state.lastRun).toLocaleString() : "Never"}
          </p>
        </div>
        <button 
          onClick={handleRunCycle}
          disabled={running}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase px-6 py-3 rounded transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {running ? <Activity className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-black" />}
          {running ? 'Running Engine...' : 'Run Daily Cycle'}
        </button>
      </div>

      <ReaperCommandWidget />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-[#12131c] border border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:bg-primary/5 transition-colors">
          <Rocket className="w-6 h-6 text-primary mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">1. Deploy Live</span>
        </div>
        <div className="bg-[#12131c] border border-blue-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Globe className="w-6 h-6 text-blue-400 mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">2. Connect Domain</span>
        </div>
        <div className="bg-[#12131c] border border-green-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Database className="w-6 h-6 text-green-400 mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">3. Connect Database</span>
        </div>
        <div className="bg-[#12131c] border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <FileText className="w-6 h-6 text-yellow-400 mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">4. Original Guides</span>
        </div>
        <div className="bg-[#12131c] border border-purple-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <DollarSign className="w-6 h-6 text-purple-400 mb-2" />
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">5. Apply Ads</span>
        </div>
      </div>

      {!state ? (
        <div className="text-white/30 italic">Loading engine state...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2"><Radio className="w-5 h-5 text-green-400" /> Live Data Status</h3>
              </div>
              <ul className="space-y-3">
                {state.liveDataStatus.map((item, i) => (
                  <li key={i} className="text-sm text-white/80 flex items-start gap-3 bg-white/5 p-3 rounded">
                    <span className="font-mono text-white/50 w-32">{item.bot}</span>
                    <span className="flex-1">{item.message}</span>
                    <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-2 py-1 rounded uppercase tracking-wider">{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Generated Content Ideas</h3>
              </div>
              <ul className="space-y-3">
                {state.generatedContentIdeas.map((idea, i) => (
                  <li key={i} className="text-sm text-white/80 flex items-start gap-3 bg-white/5 p-3 rounded">
                    <span className="font-mono text-white/50 w-32">{idea.bot}</span>
                    <span className="flex-1">{idea.idea}</span>
                    <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase tracking-wider">{idea.source}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2"><Share2 className="w-5 h-5 text-blue-400" /> Social Post Suggestions</h3>
                <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase tracking-wider">Manual Only</span>
              </div>
              <ul className="space-y-3">
                {state.socialPostSuggestions.map((post, i) => (
                  <li key={i} className="text-sm text-white/80 flex items-start gap-3 bg-white/5 p-3 rounded">
                    <span className="font-mono text-white/50 w-32">{post.bot}</span>
                    <span className="flex-1">{post.post}</span>
                    <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase tracking-wider">{post.source}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Publish & Submit Queue</h3>
              </div>
              <ul className="space-y-3">
                {state.publishQueue.map((item, i) => (
                  <li key={i} className="flex flex-col text-sm bg-white/5 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="font-bold text-white mb-1">{item.title}</span>
                      <span className="text-[10px] font-black bg-orange-400/20 text-orange-400 px-2 py-1 rounded uppercase tracking-wider">{item.source}</span>
                    </div>
                    <span className="text-xs text-white/50">{item.bot}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="font-bold text-lg text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-500" /> Revenue Snapshot</h3>
              </div>
              <p className="text-sm text-white/80 bg-white/5 p-3 rounded italic">
                {state.revenueSnapshot}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/50 space-y-1">
                <p>Sponsor Readiness: <span className="text-yellow-400 font-bold">MANUAL</span></p>
                <p>Analytics: <span className="text-red-400 font-bold">MISSING</span></p>
              </div>
            </div>

            <div className="bg-[#12131c] border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-red-500/10 pb-2">
                <h3 className="font-bold text-lg text-red-400 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Errors / Warnings</h3>
              </div>
              <ul className="space-y-3">
                {state.errorsAndWarnings.length === 0 ? <li className="text-white/30 text-sm">No errors.</li> : state.errorsAndWarnings.map((err, i) => (
                  <li key={i} className="text-sm text-red-300 bg-red-500/10 p-3 rounded">
                    {err}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
