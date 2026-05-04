"use client";
import { useState, useEffect } from 'react';
import { Search, Filter, ShieldAlert, Cpu, Activity, Play, CheckCircle2 } from 'lucide-react';
import { ReaperBot } from '@/lib/reaper/botRegistry';

export default function BotsDashboard() {
  const [bots, setBots] = useState<ReaperBot[]>([]);
  const [summary, setSummary] = useState<any>(null);
  
  // Filters
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [approvalFilter, setApprovalFilter] = useState("ALL");

  useEffect(() => {
    fetch('/api/reaper/bots')
      .then(res => res.json())
      .then(data => {
        setBots(data.bots || []);
        setSummary(data.summary || null);
      })
      .catch(err => console.error("Failed to load bots", err));
  }, []);

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(search.toLowerCase()) || 
                          bot.team.toLowerCase().includes(search.toLowerCase()) ||
                          bot.purpose.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = teamFilter === "ALL" || bot.team === teamFilter;
    const matchesSource = sourceFilter === "ALL" || bot.source === sourceFilter;
    const matchesRisk = riskFilter === "ALL" || bot.riskLevel === riskFilter;
    const matchesApproval = approvalFilter === "ALL" || 
                            (approvalFilter === "YES" && bot.approvalRequired) || 
                            (approvalFilter === "NO" && !bot.approvalRequired);
    
    return matchesSearch && matchesTeam && matchesSource && matchesRisk && matchesApproval;
  });

  const uniqueTeams = Array.from(new Set(bots.map(b => b.team))).sort();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-primary" /> REAPER Bot Army
          </h2>
          <p className="text-white/50 text-sm mt-1">Registry of all 500 automated processing units.</p>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Total</p>
            <p className="text-3xl font-black text-white">{summary.total}</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Enabled</p>
            <p className="text-3xl font-black text-primary">{summary.enabled}</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Live</p>
            <p className="text-3xl font-black text-green-400">{summary.live}</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Mock</p>
            <p className="text-3xl font-black text-gray-400">{summary.mock}</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Manual</p>
            <p className="text-3xl font-black text-yellow-400">{summary.manual}</p>
          </div>
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-4 text-center">
            <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Approval Req</p>
            <p className="text-3xl font-black text-orange-400">{summary.approvalRequired}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-[#12131c] border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative md:col-span-1">
          <input 
            type="text" 
            placeholder="Search bots..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-white/10 rounded py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        </div>
        
        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="bg-background border border-white/10 rounded py-2 px-3 text-sm text-white focus:outline-none focus:border-primary">
          <option value="ALL">All Teams</option>
          {uniqueTeams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="bg-background border border-white/10 rounded py-2 px-3 text-sm text-white focus:outline-none focus:border-primary">
          <option value="ALL">All Sources</option>
          <option value="live">Live</option>
          <option value="mock">Mock</option>
          <option value="manual">Manual</option>
        </select>

        <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="bg-background border border-white/10 rounded py-2 px-3 text-sm text-white focus:outline-none focus:border-primary">
          <option value="ALL">All Risks</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select value={approvalFilter} onChange={(e) => setApprovalFilter(e.target.value)} className="bg-background border border-white/10 rounded py-2 px-3 text-sm text-white focus:outline-none focus:border-primary">
          <option value="ALL">Any Approval</option>
          <option value="YES">Approval Required</option>
          <option value="NO">Auto Deploy</option>
        </select>
      </div>

      <div className="text-white/50 text-sm font-bold uppercase tracking-widest">
        Showing {filteredBots.length} Bots
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBots.map(bot => (
          <div key={bot.id} className="bg-[#12131c] border border-white/5 rounded-lg p-5 flex flex-col relative overflow-hidden group hover:border-white/20 transition-colors">
            {bot.riskLevel === 'high' && <div className="absolute top-0 right-0 w-1 h-full bg-red-500/50"></div>}
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{bot.id}</span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider
                ${bot.source === 'live' ? 'bg-green-500/20 text-green-400' : 
                  bot.source === 'manual' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-gray-500/20 text-gray-400'}
              `}>
                {bot.source}
              </span>
            </div>
            
            <h3 className="font-bold text-white mb-1">{bot.name}</h3>
            <p className="text-xs text-white/40 mb-4 flex-1">{bot.purpose}</p>
            
            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-wider">
              <span className={`px-2 py-1 rounded ${bot.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' : bot.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                {bot.riskLevel} RISK
              </span>
              {bot.approvalRequired && (
                <span className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                  <ShieldAlert className="w-3 h-3" /> APPR REQ
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
