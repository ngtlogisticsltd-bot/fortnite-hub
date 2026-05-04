"use client";
import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Play, Clock, CheckCircle2, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ReaperLog } from '@/lib/reaper/types';

import AssistantWidget from '@/components/admin/AssistantWidget';
import ReaperCommandWidget from '@/components/admin/ReaperCommandWidget';

export default function ReaperDashboard() {
  const [teams, setTeams] = useState<any[]>([]);
  const [logs, setLogs] = useState<ReaperLog[]>([]);
  const [running, setRunning] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/reaper/status')
      .then(res => res.json())
      .then(data => {
        setTeams(data.teams || []);
        setLogs(data.logs || []);
      })
      .catch(err => console.error("Failed to load status", err));
  }, []);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRunTeam = async (teamId: string) => {
    setRunning(teamId);
    try {
      const res = await fetch('/api/reaper/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId })
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        showMessage(`Successfully executed team: ${teamId}`, 'success');
      } else {
        showMessage(`Error: ${data.error}`, 'error');
      }
    } catch (err: any) {
      showMessage(`Network Error: ${err.message}`, 'error');
    }
    setRunning(null);
  };

  const handleRunAll = async () => {
    setRunning('ALL');
    try {
      const res = await fetch('/api/reaper/run', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        showMessage(`Safe cycle completed successfully`, 'success');
      } else {
        showMessage(`Error: ${data.error}`, 'error');
      }
    } catch (err: any) {
      showMessage(`Network Error: ${err.message}`, 'error');
    }
    setRunning(null);
  };

  const handleRunDaily = async () => {
    setRunning('DAILY');
    try {
      const res = await fetch('/api/reaper/run', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'daily-cycle' })
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        showMessage(`Daily Execution Engine completed successfully`, 'success');
      } else {
        showMessage(`Error: ${data.error}`, 'error');
      }
    } catch (err: any) {
      showMessage(`Network Error: ${err.message}`, 'error');
    }
    setRunning(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Toast Message */}
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl z-50 font-bold border ${message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white">REAPER Orchestrator</h2>
          <p className="text-white/50 text-sm">Autonomous Fleet Control | <span className="font-mono text-primary">API Test: GET /api/reaper/bots</span></p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/admin/daily" className="text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors uppercase tracking-wider">
            Daily Engine &rarr;
          </a>
          <button 
            onClick={handleRunDaily}
            disabled={running !== null}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase px-6 py-3 rounded transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {running === 'DAILY' ? <Activity className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-black" />}
            {running === 'DAILY' ? 'Running Daily...' : 'Run Daily Cycle'}
          </button>
          <button 
            onClick={handleRunAll}
            disabled={running !== null}
            className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-6 py-3 rounded transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {running === 'ALL' ? <Activity className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-black" />}
            {running === 'ALL' ? 'Executing Cycle...' : 'Run Safe Cycle'}
          </button>
        </div>
      </div>

      <AssistantWidget />
      <ReaperCommandWidget />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-bold text-primary uppercase mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> Next Best Action</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3 text-white"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">1</span> Connect real domain</li>
            <li className="flex items-center gap-3 text-white/70"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">2</span> Deploy live to Vercel</li>
            <li className="flex items-center gap-3 text-white/70"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">3</span> Connect analytics ID</li>
            <li className="flex items-center gap-3 text-white/70"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">4</span> Add real sponsor/ad account</li>
            <li className="flex items-center gap-3 text-white/70"><span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">5</span> Publish 5 original guides</li>
          </ul>
        </div>
        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-white uppercase mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Daily Operating Checklist</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-background" /> Check API Health</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-background" /> Review Staged Content</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-background" /> Publish Approved Guides</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-background" /> Post 2 Social Updates</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-background" /> Check Traffic</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded border-white/20 bg-background" /> Check Revenue</label>
          </div>
        </div>
        <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
           <h3 className="font-bold text-white uppercase mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Growth Engine</h3>
           <div className="space-y-4">
              <div className="flex justify-between text-xs text-white/50 uppercase font-bold">
                 <span>Status</span>
                 <span className="text-primary">Active</span>
              </div>
              <button 
                 onClick={async () => {
                    await fetch('/api/reaper/growth', { method: 'POST' });
                    window.location.reload();
                 }}
                 className="w-full bg-primary hover:bg-primary/80 text-black font-black uppercase py-2 rounded text-xs transition-all"
              >
                 Run Growth Cycle
              </button>
              <Link href="/admin/growth" className="block text-center text-[10px] font-bold text-white/30 uppercase hover:text-white transition-colors">
                 Full Growth Dashboard &rarr;
              </Link>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Teams Fleet List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold uppercase tracking-wider text-white/50 border-b border-white/10 pb-2 mb-4">Deployed Teams</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.length === 0 ? <p className="text-white/30 italic">Loading teams...</p> : teams.map(team => (
              <div key={team.id} className="bg-[#12131c] border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors relative overflow-hidden group">
                {team.riskLevel === 'high' && <div className="absolute top-0 right-0 w-2 h-full bg-red-500/50"></div>}
                
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-lg text-white">{team.name}</h4>
                  {team.approvalRequired && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded uppercase">
                      <ShieldAlert className="w-3 h-3" /> Approval Req
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-white/50 mb-4 h-10 line-clamp-2">{team.purpose}</p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <div className="flex items-center gap-3 text-xs font-bold text-white/40 uppercase">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {team.schedule}</span>
                    <span className={`px-2 py-0.5 rounded ${team.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' : team.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {team.riskLevel} RISK
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleRunTeam(team.id)}
                    disabled={running !== null}
                    className="bg-white/5 hover:bg-white/10 text-white p-2 rounded transition-colors disabled:opacity-50"
                  >
                    {running === team.id ? <Activity className="w-4 h-4 animate-spin text-primary" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Logs */}
        <div className="bg-[#12131c] border border-white/5 rounded-xl flex flex-col h-[800px]">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-wider text-white">Execution Logs</h3>
            <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-1 rounded">LIVE</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-3 font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-white/30 text-center mt-10 italic">Awaiting execution...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="border-l-2 pl-3 py-1 border-white/10 relative">
                  <div className="absolute -left-[5px] top-2">
                    {log.status === 'SUCCESS' && <CheckCircle2 className="w-2 h-2 text-green-500 bg-black rounded-full" />}
                    {log.status === 'FAILED' && <XCircle className="w-2 h-2 text-red-500 bg-black rounded-full" />}
                    {log.status === 'PENDING_APPROVAL' && <AlertTriangle className="w-2 h-2 text-yellow-500 bg-black rounded-full" />}
                  </div>
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span className="text-primary font-bold">{log.teamId}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      log.source === 'live' ? 'bg-green-500/20 text-green-400' : 
                      log.source === 'mock' ? 'bg-gray-500/20 text-gray-400' : 
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {log.source}
                    </span>
                  </div>
                  <p className={`text-white/80 ${log.status === 'FAILED' ? 'text-red-400' : log.status === 'PENDING_APPROVAL' ? 'text-yellow-400' : ''}`}>
                    {log.message}
                  </p>
                  {log.status === 'PENDING_APPROVAL' && (
                    <button 
                      onClick={() => {
                        const newLogs = [...logs];
                        newLogs[i].status = 'SUCCESS';
                        newLogs[i].source = 'manual';
                        newLogs[i].message = 'Approved and published by admin.';
                        setLogs(newLogs);
                        showMessage('Content Approved and Published', 'success');
                      }}
                      className="mt-2 text-xs font-bold bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded transition-colors"
                    >
                      Approve & Publish
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
