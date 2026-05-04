"use client";
import { useState, useRef, useEffect } from 'react';
import { HelpCircle, MessageSquare, Send, Sparkles, ChevronRight, Globe, Info, Heart, Share2, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PublicHelpPage() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'bot', title: 'Welcome to FortHub Support', answer: 'How can I help you navigate the hub today? I can answer questions about the item shop, latest updates, and our community programs.', source: 'SITE_HELP' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ mode: 'public', message: msg })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', ...data.response }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', title: 'Error', answer: 'Support system currently offline.', source: 'SITE_HELP' }]);
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
    <div className="min-h-screen bg-[#05050a] text-white">
      <div className="container mx-auto px-4 py-20 max-w-5xl space-y-16">
        
        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="inline-block p-4 bg-primary/10 rounded-3xl border border-primary/20 mb-4">
             <HelpCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter">FORTHUB <span className="text-primary">SUPPORT</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium uppercase tracking-widest text-[10px]">Real-time Community Help & Navigation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Chat Hub */}
           <div className="lg:col-span-2 flex flex-col h-[600px] bg-[#12131c] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
              <div className="p-8 border-b border-white/5 bg-black/20 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">FortHub Intelligence Bot</span>
                 </div>
                 <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse delay-150" />
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                 {messages.map((m, i) => (
                   <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-[32px] p-8 ${
                        m.role === 'user' 
                          ? 'bg-primary text-black font-black' 
                          : 'bg-black/40 border border-white/5 text-white/80 shadow-xl'
                      }`}>
                         {m.role === 'bot' && (
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{m.title}</h4>
                              <p className="text-sm leading-loose font-medium">{m.answer}</p>
                              
                              {m.nextActions && m.nextActions.length > 0 && (
                                <div className="space-y-3 pt-6 border-t border-white/5">
                                   {m.nextActions.map((act: string, j: number) => (
                                     <div key={j} className="flex items-center gap-3 text-[10px] font-black text-white/50 hover:text-primary cursor-pointer transition-colors uppercase tracking-widest">
                                        <ChevronRight className="w-4 h-4 text-primary" /> {act}
                                     </div>
                                   ))}
                                </div>
                              )}

                              {m.links && m.links.length > 0 && (
                                <div className="flex flex-wrap gap-3 pt-6">
                                   {m.links.map((link: any, j: number) => (
                                     <Link key={j} href={link.url} className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                                        {link.label}
                                     </Link>
                                   ))}
                                </div>
                              )}
                           </div>
                         )}
                         {m.role === 'user' && <p className="text-sm uppercase tracking-widest leading-relaxed">{m.text}</p>}
                      </div>
                   </div>
                 ))}
                 {loading && <div className="text-primary animate-pulse text-[10px] font-black uppercase tracking-widest ml-4">Bot is typing...</div>}
              </div>

              <div className="p-8 bg-black/40 border-t border-white/5">
                 <div className="relative group">
                    <input 
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                       placeholder="How can we help?"
                       className="w-full bg-black border border-white/10 rounded-full px-10 py-6 pr-20 text-xs text-white focus:border-primary outline-none transition-all placeholder:text-white/20"
                    />
                    <button 
                       onClick={() => sendMessage(input)}
                       className="absolute right-6 top-6 text-primary hover:scale-110 transition-transform"
                    >
                       <Send className="w-8 h-8" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Quick Links Sidebar */}
           <div className="space-y-8">
              <div className="bg-[#12131c] border border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl">
                 <h3 className="text-white font-black uppercase text-xs flex items-center gap-3 tracking-[0.2em]">
                   <Info className="w-5 h-5 text-primary" /> Quick Links
                 </h3>
                 <div className="space-y-4">
                    {[
                      { label: "Item Shop", url: "/item-shop" },
                      { label: "Patch Notes", url: "/patch-notes" },
                      { label: "News Feed", url: "/news" },
                      { label: "Community", url: "/community" },
                      { label: "Submit Tip", url: "/submit" }
                    ].map(link => (
                      <Link key={link.label} href={link.url} className="flex items-center justify-between group">
                         <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{link.label}</span>
                         <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                 </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-[40px] p-10 space-y-6 shadow-2xl">
                 <h3 className="text-primary font-black uppercase text-xs flex items-center gap-3 tracking-[0.2em]">
                   <Heart className="w-5 h-5" /> Mission
                 </h3>
                 <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em] leading-loose">
                    FortHub was created to serve the Fortnite community with accurate, real-time data and high-quality creator guides. We are 100% community-driven and unofficial.
                 </p>
                 <div className="flex gap-4 pt-4 border-t border-white/5">
                    <button className="text-white/20 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                    <button className="text-white/20 hover:text-white transition-colors"><Globe className="w-5 h-5" /></button>
                    <button className="text-white/20 hover:text-white transition-colors"><Mail className="w-5 h-5" /></button>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
