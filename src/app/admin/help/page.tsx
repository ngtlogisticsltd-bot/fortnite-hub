"use client";
import { useState, useEffect, useRef } from 'react';
import { HelpCircle, MessageSquare, Send, Sparkles, Rocket, Shield, ExternalLink, ChevronRight, AlertTriangle, CheckCircle, Search, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function AdminHelpPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickCommands = [
    "What is missing?",
    "How do I deploy?",
    "Connect GitHub",
    "Connect Supabase",
    "Setup Ads",
    "Add Domain"
  ];

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;
    const userMsg = { role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'admin', message: msg })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', ...data.response }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', title: 'Error', answer: 'Failed to reach helper bot.', source: 'ADMIN_HELP' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">ADMIN <span className="text-primary">HELPER</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Automated Guidance & Setup Intelligence</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Chat Section */}
        <div className="lg:col-span-2 flex flex-col h-[600px] bg-[#12131c] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
           <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Helper Bot Online</span>
              </div>
              <Sparkles className="w-4 h-4 text-primary" />
           </div>

           <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                   <MessageSquare className="w-12 h-12 text-primary" />
                   <p className="text-xs font-black uppercase tracking-widest">Ask me anything about your setup or deployment.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] rounded-2xl p-6 ${
                     m.role === 'user' 
                       ? 'bg-primary/10 border border-primary/20 text-white' 
                       : 'bg-black/40 border border-white/5 text-white/80'
                   }`}>
                      {m.role === 'bot' && (
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center text-[10px] font-black text-primary italic">HB</div>
                              <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">{m.title}</h4>
                           </div>
                           <p className="text-xs leading-relaxed font-medium">{m.answer}</p>
                           
                           {m.nextActions && m.nextActions.length > 0 && (
                             <div className="space-y-2 pt-4 border-t border-white/5">
                                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Next Actions</p>
                                {m.nextActions.map((act: string, j: number) => (
                                  <div key={j} className="flex items-center gap-2 text-[10px] font-bold text-white/60">
                                     <ChevronRight className="w-3 h-3 text-primary" /> {act}
                                  </div>
                                ))}
                             </div>
                           )}

                           {m.links && m.links.length > 0 && (
                             <div className="flex flex-wrap gap-2 pt-4">
                                {m.links.map((link: any, j: number) => (
                                  <a key={j} href={link.url} target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                                     {link.label} <ExternalLink className="w-3 h-3" />
                                  </a>
                                ))}
                             </div>
                           )}
                        </div>
                      )}
                      {m.role === 'user' && <p className="text-xs font-bold uppercase tracking-widest">{m.text}</p>}
                   </div>
                </div>
              ))}
              {loading && <div className="text-primary animate-pulse text-[10px] font-black uppercase">Thinking...</div>}
           </div>

           <div className="p-6 bg-black/40 border-t border-white/5 space-y-4">
              <div className="flex flex-wrap gap-2">
                 {quickCommands.map(cmd => (
                    <button 
                       key={cmd} 
                       onClick={() => sendMessage(cmd)}
                       className="bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-full text-[9px] font-black text-white/40 hover:text-primary transition-all"
                    >
                       {cmd}
                    </button>
                 ))}
              </div>
              <div className="relative">
                 <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                    placeholder="Type your question..."
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 pr-16 text-xs text-white focus:border-primary outline-none transition-all"
                 />
                 <button 
                    onClick={() => sendMessage(input)}
                    className="absolute right-4 top-4 text-primary hover:scale-110 transition-transform"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           
           <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-primary font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Rocket className="w-5 h-5" /> Quick Checklist
              </h3>
              <div className="space-y-4">
                 {[
                   { label: "Connect GitHub", status: "READY" },
                   { label: "Import Project Vercel", status: "READY" },
                   { label: "Deploy Hook Config", status: "READY" },
                   { label: "Supabase Schema", status: "READY" },
                   { label: "Public SEO Hub", status: "READY" }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[10px] font-black text-white/40 uppercase group-hover:text-white transition-colors">{item.label}</span>
                       <span className="text-[8px] px-2 py-0.5 rounded bg-primary/10 text-primary font-black">{item.status}</span>
                    </div>
                 ))}
              </div>
              <Link href="/admin/control-core" className="block text-center text-[9px] font-black text-white/20 uppercase hover:text-white transition-colors pt-4 border-t border-white/5">
                 View Full Launch Matrix &rarr;
              </Link>
           </section>

           <section className="bg-[#12131c] border border-white/5 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-black uppercase text-xs flex items-center gap-2 tracking-widest">
                <Shield className="w-5 h-5 text-primary" /> Setup Security
              </h3>
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                       Never share your <span className="text-white">GITHUB_TOKEN</span> or <span className="text-white">SUPABASE_SERVICE_ROLE_KEY</span> with anyone, including help bots.
                    </p>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-loose">
                       All setup links provided by the bot are official and open in a new secure tab.
                    </p>
                 </div>
              </div>
           </section>

           <Link href="/admin/setup-links" className="block p-8 bg-[#12131c] border border-white/5 rounded-3xl hover:border-primary/20 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-all">
                    <Search className="w-5 h-5 text-primary" />
                 </div>
                 <h4 className="text-sm font-black uppercase text-white">Setup Registry</h4>
              </div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                 Browse all external service links, documentation, and API consoles in one place.
              </p>
           </Link>

        </div>

      </div>

    </div>
  );
}
