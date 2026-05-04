"use client";
import { useState, useEffect } from 'react';
import { Search, ExternalLink, Globe, GitBranch, Rocket, Database, TrendingUp, Share2, Shield, Copy, Check, Terminal } from 'lucide-react';
import { SETUP_LINKS, SetupLink } from '@/lib/help/setupLinks';

export default function SetupLinksPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/control-core/intake').then(r => r.json()).then(setData);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLinks = SETUP_LINKS.filter(link => 
    link.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groups = Array.from(new Set(filteredLinks.map(l => l.group)));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">SETUP <span className="text-primary">LINKS</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Official Service Portals & External Configuration</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-4 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search setup resources..."
            className="bg-[#12131c] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white focus:border-primary outline-none transition-all w-64 md:w-96"
          />
        </div>
      </div>

      <div className="space-y-16">
         {groups.map(group => (
            <section key={group} className="space-y-8">
               <h3 className="text-white font-black uppercase text-sm tracking-[0.3em] flex items-center gap-4">
                  <div className="w-8 h-px bg-primary" />
                  {group}
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredLinks.filter(l => l.group === group).map(link => (
                    <div key={link.id} className="bg-[#12131c] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group shadow-xl">
                       <div className="flex items-start justify-between mb-6">
                          <div className="p-3 bg-black/40 rounded-2xl border border-white/5 text-primary group-hover:scale-110 transition-transform">
                             {getGroupIcon(link.group)}
                          </div>
                          <a 
                             href={link.url} 
                             target="_blank" 
                             className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all border border-transparent hover:border-white/10"
                             title="Open external link"
                          >
                             <ExternalLink className="w-4 h-4" />
                          </a>
                       </div>

                       <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{link.label}</h4>
                       <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed mb-6 h-12 overflow-hidden">
                          {link.purpose}
                       </p>

                       <div className="space-y-4 pt-6 border-t border-white/5">
                          <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest">
                             <span className="text-white/20">Related Fields</span>
                             <span className={`px-2 py-0.5 rounded ${link.riskLevel === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                                {link.riskLevel} Risk
                             </span>
                          </div>
                          <div className="space-y-2">
                             {link.relatedFields.map(field => {
                                const val = data?.intake?.[field];
                                const hasVal = val && val !== "" && val !== "••••••••••••";
                                return (
                                  <div key={field} className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 group/field">
                                     <span className="text-[9px] font-black text-white/30 uppercase truncate mr-2">{field}</span>
                                     {hasVal ? (
                                        <button 
                                           onClick={() => copyToClipboard(val, `${link.id}-${field}`)}
                                           className="text-primary hover:text-primary/80 transition-colors"
                                        >
                                           {copiedId === `${link.id}-${field}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                     ) : (
                                        <span className="text-[8px] font-black text-red-500/50 uppercase">Needs Info</span>
                                     )}
                                  </div>
                                );
                             })}
                          </div>
                       </div>

                       <a 
                         href={link.url} 
                         target="_blank" 
                         className="w-full mt-6 bg-white/5 hover:bg-primary hover:text-black py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all border border-white/5 hover:border-transparent"
                       >
                          Visit {link.group} <ArrowRight className="w-3.5 h-3.5" />
                       </a>
                    </div>
                  ))}
               </div>
            </section>
         ))}
      </div>

    </div>
  );
}

function getGroupIcon(group: string) {
   switch (group) {
      case 'GitHub': return <GitBranch className="w-5 h-5" />;
      case 'Vercel': return <Rocket className="w-5 h-5" />;
      case 'Supabase': return <Database className="w-5 h-5" />;
      case 'Ads': return <TrendingUp className="w-5 h-5" />;
      case 'Social APIs': return <Share2 className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
   }
}

function ArrowRight({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>;
}
