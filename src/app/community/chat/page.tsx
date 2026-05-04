"use client";
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Send, ShieldAlert, User, Clock, CheckCircle2 } from 'lucide-react';

export default function CommunityChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('General');
  const [sent, setSent] = useState(false);

  const fetchMessages = async () => {
    const res = await fetch('/api/community/chat?status=approved');
    const data = await res.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !message) return;

    await fetch('/api/community/chat', {
      method: 'POST',
      body: JSON.stringify({ nickname, message, topic })
    });

    setMessage('');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="bg-[#0a0b14] min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-5xl font-black uppercase tracking-tighter text-white flex items-center gap-4">
                <MessageSquare className="w-10 h-10 text-primary" /> COMMUNITY <span className="text-primary">CHAT</span>
              </h1>
              <p className="text-white/50 mt-2">Discuss the meta, share strategies, and find squadmates.</p>
            </div>

            <div className="bg-[#12131c] border border-white/5 rounded-2xl p-6 h-[500px] flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-6 pr-4 scrollbar-hide">
                {messages.map((m) => (
                  <div key={m.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-primary uppercase">{m.nickname}</span>
                      <span className="text-[9px] bg-white/5 text-white/30 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">{m.topic}</span>
                      <span className="text-[9px] text-white/20 ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl rounded-tl-none">
                      <p className="text-sm text-white/80 leading-relaxed">{m.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                    <input 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Nickname"
                      className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-primary outline-none"
                    />
                  </div>
                  <select 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-primary outline-none"
                  >
                    <option>General</option>
                    <option>Gameplay</option>
                    <option>Shop</option>
                    <option>Leaks</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-primary outline-none"
                  />
                  <button className="bg-primary hover:bg-primary/80 text-black px-6 py-2 rounded-lg font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                    <Send className="w-4 h-4" /> Send
                  </button>
                </div>
                {sent && <p className="text-center text-[10px] font-black uppercase text-green-400 flex items-center justify-center gap-2"><CheckCircle2 className="w-3 h-3" /> Message sent to moderation queue.</p>}
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#12131c] border border-white/10 rounded-xl p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Moderation Rules
              </h3>
              <ul className="space-y-3 text-xs text-white/50 list-disc list-inside leading-relaxed">
                <li>Be respectful to all members.</li>
                <li>No spam or self-promotion.</li>
                <li>No leaks from restricted sources.</li>
                <li>Do not impersonate Epic Games.</li>
                <li>All messages are reviewed before appearing.</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h4 className="font-bold text-red-400 mb-2 uppercase text-xs">Safety Warning</h4>
              <p className="text-[10px] text-red-400/80 leading-relaxed">
                Never share personal info, passwords, or emails in public chat. FortHub staff will NEVER ask for your Epic Games credentials.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
