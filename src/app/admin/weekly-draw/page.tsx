"use client";
import { useState, useEffect } from 'react';
import { Gift, Check, X, Shield, Users, Trophy, Trash2, AlertCircle } from 'lucide-react';

export default function AdminWeeklyDraw() {
  const [entries, setEntries] = useState<any[]>([]);
  const [winner, setWinner] = useState<any>(null);
  const [mode, setMode] = useState<'waitlist' | 'live'>('waitlist');
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    const res = await fetch('/api/weekly-draw');
    const data = await res.json();
    setEntries(data.entries || []);
    setMode(data.mode || 'waitlist');
    setLoading(false);
  };

  const toggleMode = async (newMode: 'waitlist' | 'live') => {
    if (newMode === 'live' && !confirm('Are you sure? Do not activate until prizes and rules are fully configured and vetted.')) return;
    
    await fetch('/api/weekly-draw', {
      method: 'PATCH',
      body: JSON.stringify({ mode: newMode })
    });
    fetchEntries();
  };

  const handleStatus = async (id: string, status: 'eligible' | 'ineligible' | 'waitlist') => {
    await fetch('/api/weekly-draw', {
      method: 'PATCH',
      body: JSON.stringify({ id, status })
    });
    fetchEntries();
  };

  const handlePickWinner = async () => {
    if (mode === 'waitlist') return;
    const res = await fetch('/api/weekly-draw', { method: 'PUT' });
    const data = await res.json();
    if (data.winner) setWinner(data.winner);
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const waitlistCount = entries.filter(e => e.status === 'waitlist').length;
  const eligibleCount = entries.filter(e => e.status === 'eligible').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
            <Gift className="w-10 h-10 text-primary" /> Weekly Draw Hub
          </h1>
          <p className="text-white/50 text-sm mt-2">Manage entries, verify eligibility, and manually confirm winners.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-black border border-white/10 rounded-lg p-1">
            <button 
              onClick={() => toggleMode('waitlist')}
              className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'waitlist' ? 'bg-white/10 text-white' : 'text-white/30'}`}
            >
              Waitlist
            </button>
            <button 
              onClick={() => toggleMode('live')}
              className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'live' ? 'bg-primary text-black' : 'text-white/30'}`}
            >
              Live
            </button>
          </div>
          <button 
            onClick={handlePickWinner}
            disabled={mode === 'waitlist'}
            className="bg-primary hover:bg-primary/80 disabled:opacity-20 disabled:cursor-not-allowed text-black px-6 py-3 rounded-lg font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            <Trophy className="w-5 h-5" /> Pick Random Winner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Total Waitlist</p>
          <p className="text-3xl font-black text-white">{waitlistCount}</p>
        </div>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Eligible for Draw</p>
          <p className="text-3xl font-black text-green-400">{eligibleCount}</p>
        </div>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Current Mode</p>
          <p className={`text-xl font-black uppercase ${mode === 'live' ? 'text-primary' : 'text-yellow-500'}`}>{mode}</p>
        </div>
      </div>

      {mode === 'waitlist' && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-3 text-xs text-yellow-500 font-bold uppercase tracking-wider">
          <AlertCircle className="w-5 h-5" />
          Warning: Do not activate until prizes + rules are configured and vetted.
        </div>
      )}

      {winner && (
        <div className="bg-primary/10 border border-primary/40 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <h2 className="text-4xl font-black uppercase text-primary tracking-tighter">WINNER SELECTED!</h2>
          <div className="bg-black/40 border border-primary/20 p-6 rounded-xl inline-block">
            <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Fan Nickname</p>
            <p className="text-3xl font-black text-white">{winner.nickname}</p>
            <p className="text-sm text-primary/70 mt-2 font-mono">{winner.email || 'No email provided'}</p>
          </div>
          <div className="flex justify-center gap-4">
            <button className="bg-primary text-black px-6 py-2 rounded font-black uppercase text-xs tracking-widest">Confirm & Announce</button>
            <button onClick={() => setWinner(null)} className="bg-white/10 text-white px-6 py-2 rounded font-black uppercase text-xs tracking-widest">Clear</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
            <h3 className="font-black text-lg text-white uppercase flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Entries Queue ({entries.length})
            </h3>
            <span className="text-[10px] font-black uppercase bg-white/5 text-white/30 px-2 py-1 rounded">Status: Manual Review</span>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] font-black uppercase text-white/30 tracking-widest">
                <tr>
                  <th className="px-6 py-4">Nickname</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Rules</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-white/10 italic">No entries collected yet.</td>
                  </tr>
                ) : (
                  entries.map(e => (
                    <tr key={e.id} className={`hover:bg-white/5 transition-colors ${e.selectedWinner ? 'bg-primary/5' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-black text-white uppercase">{e.nickname}</span>
                          <span className="text-[10px] text-white/30 font-mono">{e.email || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-white/50">{e.comment}</td>
                      <td className="px-6 py-4">
                        {e.agreedRules ? <Shield className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                          e.status === 'eligible' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          e.status === 'ineligible' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleStatus(e.id, 'eligible')} className="text-green-400 hover:text-green-300 transition-colors" title="Eligible"><Check className="w-5 h-5 inline" /></button>
                        <button onClick={() => handleStatus(e.id, 'ineligible')} className="text-red-400 hover:text-red-300 transition-colors" title="Ineligible"><X className="w-5 h-5 inline" /></button>
                        <button className="text-white/20 hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4 inline" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
