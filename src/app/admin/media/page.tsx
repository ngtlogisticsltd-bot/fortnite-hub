"use client";
import { useState } from 'react';
import { Film, Shield, AlertTriangle, ChevronRight, Send, Eye } from 'lucide-react';
import { mediaTeam } from '@/lib/media/mediaTeam';
import { mediaItems } from '@/lib/media/mediaRegistry';
import { generateAiClipPlan, AiClipPlan } from '@/lib/media/aiClipPlanner';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function AdminMediaOps() {
  const [clipTopic, setClipTopic] = useState('');
  const [clipPlan, setClipPlan] = useState<AiClipPlan | null>(null);

  const handleGenerate = () => {
    if (!clipTopic.trim()) return;
    const plan = generateAiClipPlan(clipTopic);
    setClipPlan(plan);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-green-500/20 text-green-400';
      case 'MANUAL': return 'bg-yellow-500/20 text-yellow-400';
      case 'MANUAL_REVIEW': return 'bg-orange-500/20 text-orange-400';
      case 'NEEDS_APPROVAL': return 'bg-red-500/20 text-red-400';
      case 'BLOCKED': return 'bg-red-600/20 text-red-500';
      default: return 'bg-white/10 text-white/50';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
          <Film className="w-8 h-8 text-purple-400" /> Media Operations
        </h2>
        <p className="text-white/50 text-sm mt-1">Manage creator embeds, AI clip planning, rights scanning, and media monetization.</p>
      </div>

      <AutoFillPanel context="media" />

      {/* Team Overview */}
      <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
        <h3 className="font-bold text-lg text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> {mediaTeam.name}
        </h3>
        <p className="text-sm text-white/60 mb-6">{mediaTeam.purpose}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaTeam.bots.map(bot => (
            <div key={bot.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-white text-sm">{bot.name}</h4>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${getStatusColor(bot.status)}`}>
                  {bot.status}
                </span>
              </div>
              <p className="text-xs text-white/50 mb-3">{bot.purpose}</p>
              <div className="flex gap-2">
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${bot.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' : bot.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                  {bot.riskLevel.toUpperCase()} RISK
                </span>
                {bot.approvalRequired && <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">APPROVAL REQ</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Embed Queue */}
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <h3 className="font-bold text-lg text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" /> Embed Queue
          </h3>
          <div className="space-y-4">
            {mediaItems.map(item => (
              <div key={item.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <div className="flex gap-2 shrink-0">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      item.sourceType === 'embed' ? 'bg-green-500/20 text-green-400' :
                      item.sourceType === 'ai_original' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.sourceType.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/40">{item.creatorName} • {item.platform}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Clip Planner */}
        <div className="bg-[#12131c] border border-primary/20 rounded-xl p-6">
          <h3 className="font-bold text-lg text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
            <Film className="w-5 h-5 text-primary" /> AI Clip Planner
            <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-auto">LIVE</span>
          </h3>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={clipTopic}
              onChange={e => setClipTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              placeholder="Enter a video topic..."
              className="flex-1 bg-black border border-white/10 rounded px-4 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary/50"
            />
            <button onClick={handleGenerate} className="bg-primary hover:bg-primary/80 text-black font-black uppercase px-4 py-2 rounded text-sm flex items-center gap-2 transition-colors">
              <Send className="w-4 h-4" /> Generate
            </button>
          </div>

          {clipPlan && (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <h4 className="font-bold text-primary">{clipPlan.title}</h4>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Hook</p>
                <p className="text-sm text-white/80">{clipPlan.hook}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Script</p>
                <p className="text-xs text-white/70 bg-white/5 p-3 rounded whitespace-pre-line">{clipPlan.script}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Scenes</p>
                <ul className="space-y-1">
                  {clipPlan.sceneList.map((s, i) => (
                    <li key={i} className="text-xs text-white/60 flex items-start gap-1">
                      <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Legal Checklist</p>
                <ul className="space-y-1">
                  {clipPlan.legalChecklist.map((c, i) => (
                    <li key={i} className="text-xs text-green-400/80 flex items-center gap-1">
                      <span className="w-3 h-3 border border-green-500/30 rounded shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {!clipPlan && (
            <div className="text-center py-8">
              <p className="text-white/30 text-sm">Enter a topic above to generate a script, storyboard, and legal checklist.</p>
            </div>
          )}
        </div>

      </div>

      {/* Monetization Safety */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Monetization Safety Rules
        </h3>
        <ul className="text-sm text-red-400/80 space-y-2 list-disc list-inside">
          <li>Embedded videos may be monetized through surrounding page value (ads, sponsors) — never claim ownership.</li>
          <li>AI-original clips can be monetized if they use only original scripts, royalty-free visuals, and owned assets.</li>
          <li>Never monetize re-uploaded or downloaded creator content.</li>
          <li>Affiliate links and creator codes must be disclosed.</li>
        </ul>
      </div>

    </div>
  );
}
