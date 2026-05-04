"use client";
import { useState } from 'react';
import { HelpCircle, MessageSquare, Send, Sparkles, X, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminHelpWidget({ context }: { context: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'admin', message: `${context}: ${input}` })
      });
      const data = await res.json();
      if (data.success) setResponse(data.response);
    } catch (err) {
      setResponse({ answer: "Failed to connect to helper bot." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-primary text-black p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,255,157,0.4)] hover:scale-110 transition-all z-[100] group"
      >
         <HelpCircle className="w-6 h-6" />
         <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-primary border border-primary/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Need Help with {context}?
         </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-[#12131c] border border-white/10 rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
       <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
             <Sparkles className="w-4 h-4" />
             <h4 className="text-[10px] font-black uppercase tracking-widest">{context} Helper</h4>
          </div>
          <button onClick={() => { setIsOpen(false); setResponse(null); setInput(''); }} className="text-white/20 hover:text-white transition-colors">
             <X className="w-4 h-4" />
          </button>
       </div>

       <div className="flex-1 p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          {!response && !loading && (
             <div className="space-y-4">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-relaxed">
                   Ask a question about this page or setup. I have context of your current operations.
                </p>
                <div className="space-y-2">
                   {["What is missing here?", "How do I setup this?", "Give me a link"].map(q => (
                     <button key={q} onClick={() => { setInput(q); askBot(); }} className="w-full text-left bg-white/5 hover:bg-white/10 p-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                        {q}
                     </button>
                   ))}
                </div>
             </div>
          )}

          {loading && (
            <div className="p-8 text-center animate-pulse text-primary font-black uppercase tracking-widest text-[10px]">
               Consulting Matrix...
            </div>
          )}

          {response && (
            <div className="space-y-4 animate-in fade-in duration-300">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center text-[8px] font-black text-primary italic">HB</div>
                  <h4 className="text-[9px] font-black text-primary uppercase tracking-widest">{response.title}</h4>
               </div>
               <p className="text-[10px] leading-relaxed font-bold text-white/80">{response.answer}</p>
               
               {response.links && response.links.length > 0 && (
                 <div className="flex flex-wrap gap-2 pt-2">
                    {response.links.map((link: any, i: number) => (
                      <a key={i} href={link.url} target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                         {link.label} <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                 </div>
               )}
               <button onClick={() => setResponse(null)} className="text-[8px] font-black text-primary uppercase tracking-widest pt-2">Ask another question &larr;</button>
            </div>
          )}
       </div>

       <div className="p-4 bg-black/40 border-t border-white/5 space-y-3">
          <div className="relative">
             <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && askBot()}
                placeholder="Type question..."
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 pr-10 text-[10px] text-white focus:border-primary outline-none transition-all"
             />
             <button 
                onClick={askBot}
                className="absolute right-3 top-3 text-primary hover:scale-110 transition-transform"
             >
                <Send className="w-4 h-4" />
             </button>
          </div>
          <Link href="/admin/help" className="flex items-center justify-center gap-2 w-full py-2 text-[8px] font-black text-white/20 hover:text-white uppercase tracking-widest transition-all">
             Full Help Center <ArrowRight className="w-2.5 h-2.5" />
          </Link>
       </div>
    </div>
  );
}
