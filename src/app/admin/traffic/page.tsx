"use client";
import { BarChart, Search, Share2, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminTrafficDashboard() {
  const checklists = {
    seo: [
      { id: 1, task: "Generate robots.txt", status: "LIVE" },
      { id: 2, task: "Generate sitemap.xml", status: "LIVE" },
      { id: 3, task: "Optimize Homepage Metadata", status: "LIVE" },
      { id: 4, task: "Publish 10 High-Quality Guides", status: "NEEDS_ACTION" }
    ],
    social: [
      { id: 1, task: "Connect YouTube API for Shorts", status: "NEEDS_ACCOUNT" },
      { id: 2, task: "Connect TikTok API", status: "NEEDS_ACCOUNT" },
      { id: 3, task: "Connect Reddit API for Threads", status: "NEEDS_ACCOUNT" },
      { id: 4, task: "Connect X (Twitter) API", status: "NEEDS_ACCOUNT" }
    ]
  };

  const drafts = [
    { type: 'TikTok Script', title: 'Top 5 XP Maps in Chapter 5', status: 'DRAFT' },
    { type: 'X Thread', title: 'All Item Shop Changes Today', status: 'DRAFT' },
    { type: 'Reddit Post', title: 'Guide: How to counter the new Mythic', status: 'DRAFT' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <BarChart className="w-8 h-8 text-yellow-500" /> Traffic Operations
          </h2>
          <p className="text-white/50 text-sm mt-1">Manage SEO opportunities, social drafts, and daily traffic generation workflows.</p>
        </div>
      </div>

      {/* Analytics Warning Placeholder */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex gap-4 items-center">
        <AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" />
        <div>
          <h3 className="font-bold text-yellow-400">Google Analytics 4 Missing</h3>
          <p className="text-sm text-yellow-400/70">Live traffic charts will appear here once you provide NEXT_PUBLIC_ANALYTICS_ID.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SEO Ops */}
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2"><Search className="w-5 h-5 text-blue-400" /> SEO Readiness</h3>
          </div>
          <ul className="space-y-3">
            {checklists.seo.map(item => (
              <li key={item.id} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                <span className="text-white/80">{item.task}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                  item.status === 'LIVE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Ops */}
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2"><Share2 className="w-5 h-5 text-purple-400" /> Social Integrations</h3>
          </div>
          <ul className="space-y-3">
            {checklists.social.map(item => (
              <li key={item.id} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                <span className="text-white/80">{item.task}</span>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Drafts */}
      <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Social Post Drafts (Manual Publishing Only)</h3>
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded font-bold uppercase tracking-wider">DO NOT AUTO-POST YET</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drafts.map((draft, i) => (
            <div key={i} className="border border-white/10 p-4 rounded bg-white/5">
              <span className="text-xs font-mono text-white/40 block mb-2">{draft.type}</span>
              <p className="font-bold text-white mb-4">{draft.title}</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded text-xs font-bold uppercase tracking-wider transition-colors">
                Copy to Clipboard
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
