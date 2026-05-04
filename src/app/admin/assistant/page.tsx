"use client";
import { useState, useEffect, useRef } from 'react';
import { Cpu, Send, AlertTriangle, ChevronRight, Zap, ShieldCheck, CheckCircle, XCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: any; // user message string or assistant command object
}

export default function AdminAssistantDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState<any>(null);
  const [commandQueue, setCommandQueue] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickCommands = [
    "Run Daily Cycle", "Run Safe Cycle", "Check Site Health", "Check Navigation", 
    "Check Revenue", "Check Accounts", "What's Missing?", "Generate Content Ideas", 
    "Generate Social Drafts", "Generate AI Clip Plan", "Deployment Checklist"
  ];

  const fetchCommandQueue = async () => {
    try {
      const res = await fetch('/api/reaper/command');
      const data = await res.json();
      if (data.success) setCommandQueue(data.commands);
    } catch (err) {
      console.error('Failed to fetch command queue');
    }
  };

  useEffect(() => {
    fetch('/api/reaper/assistant')
      .then(res => res.json())
      .then(data => setStatusData(data));
      
    fetchCommandQueue();

    setMessages([{
      role: 'assistant',
      content: {
        id: 'initial',
        intent: 'welcome',
        targetTeam: 'REAPER Assistant',
        riskLevel: 'low',
        status: 'completed',
        resultMessage: 'REAPER Assistant Action System Initialized. I can now route commands to bot teams, run safe checks, and stage risky actions for your approval. How can I help today?',
        actions: ['Type a command or click a quick action below'],
        warnings: []
      }
    }]);

    const interval = setInterval(fetchCommandQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendCommand = async (cmd: string) => {
    if (!cmd.trim() || loading) return;
    
    setMessages(prev => [...prev, { role: 'user', content: cmd }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/reaper/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cmd })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.command }]);
        fetchCommandQueue();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (commandId: string, decision: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/reaper/command/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commandId, decision })
      });
      const data = await res.json();
      if (data.success) {
        // Update the message in chat if found
        setMessages(prev => prev.map(msg => 
          (msg.role === 'assistant' && msg.content.id === commandId) 
          ? { ...msg, content: data.command } 
          : msg
        ));
        fetchCommandQueue();
      }
    } catch (err) {
      console.error('Decision failed');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col gap-6">
      
      <div className="flex items-center justify-between border-b border-white/10 pb-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-primary" /> REAPER Assistant
          </h2>
          <p className="text-white/50 text-sm mt-1 uppercase font-bold tracking-tighter">Controlled Action System v2.0</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/command-center" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all">
            <Zap className="w-4 h-4 text-primary" /> Command Center
          </Link>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black/20 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="bg-primary/20 text-primary border border-primary/30 px-6 py-4 rounded-3xl rounded-tr-sm max-w-[80%] shadow-lg">
                    <p className="font-mono text-sm font-bold tracking-tight">{msg.content}</p>
                  </div>
                ) : (
                  <div className="bg-[#12131c] border border-white/10 rounded-3xl rounded-tl-sm p-8 w-full max-w-[90%] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="w-5 h-5 text-primary" />
                           <span className="font-black uppercase tracking-[0.2em] text-white text-xs">{msg.content.targetTeam}</span>
                        </div>
                        <h3 className="font-black uppercase tracking-widest text-white/40 text-[10px]">Intent: {msg.content.intent}</h3>
                      </div>
                      <div className="flex gap-2">
                         <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                            msg.content.riskLevel === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            msg.content.riskLevel === 'medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                            'bg-green-500/10 text-green-500 border-green-500/20'
                         }`}>Risk: {msg.content.riskLevel}</span>
                         <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border bg-white/5 text-white/50 border-white/10`}>Status: {msg.content.status}</span>
                      </div>
                    </div>

                    <div className="text-white/80 text-sm leading-relaxed mb-6 font-medium bg-black/30 p-4 rounded-xl border border-white/5 italic">
                      &quot;{msg.content.resultMessage || 'Processing command...'}&quot;
                    </div>

                    {msg.content.status === 'needs_approval' && (
                       <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-6 space-y-4 animate-pulse">
                          <div className="flex items-center gap-3 text-orange-400">
                             <AlertCircle className="w-6 h-6" />
                             <span className="font-black uppercase tracking-widest text-xs">Approval Required</span>
                          </div>
                          <div className="flex gap-3">
                             <button 
                                onClick={() => handleDecision(msg.content.id, 'approve')}
                                className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                             >
                                <CheckCircle className="w-4 h-4" /> Approve Action
                             </button>
                             <button 
                                onClick={() => handleDecision(msg.content.id, 'reject')}
                                className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest flex items-center gap-2 border border-white/10"
                             >
                                <XCircle className="w-4 h-4" /> Reject
                             </button>
                          </div>
                       </div>
                    )}
                    
                    {msg.content.actions && msg.content.actions.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {msg.content.actions.map((action: string, j: number) => (
                          <div key={j} className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
                            <ArrowRight className="w-3 h-3 text-primary" /> {action}
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.content.warnings && msg.content.warnings.length > 0 && (
                      <div className="space-y-2">
                        {msg.content.warnings.map((warn: string, j: number) => (
                          <div key={j} className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] p-3 rounded-lg flex items-center gap-3 font-bold uppercase tracking-widest">
                            <AlertTriangle className="w-4 h-4 shrink-0" /> {warn}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#12131c] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Assistant Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-8 bg-[#12131c]/50 border-t border-white/5">
            <div className="flex flex-wrap gap-2 mb-6">
              {quickCommands.slice(0, 6).map(cmd => (
                <button
                  key={cmd}
                  onClick={() => sendCommand(cmd)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendCommand(input)}
                placeholder="Type command (e.g. 'run daily' or 'check it health')..."
                className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/40 font-mono text-sm shadow-inner"
              />
              <button
                onClick={() => sendCommand(input)}
                disabled={!input.trim() || loading}
                className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,255,157,0.3)]"
              >
                Execute <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Sidebar */}
        <div className="w-80 flex flex-col gap-6 shrink-0">
          <div className="bg-[#12131c] border border-white/10 rounded-3xl p-8 space-y-6">
             <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Live System Stats
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-xs text-white/60">Active Teams</span>
                   <span className="text-xs font-black text-white">15</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs text-white/60">Command Risk</span>
                   <span className="text-xs font-black text-green-500 uppercase">Low</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs text-white/60">Pending Approvals</span>
                   <span className="text-xs font-black text-orange-500 uppercase">{commandQueue.filter(c => c.status === 'needs_approval').length}</span>
                </div>
             </div>
          </div>

          <div className="flex-1 bg-[#12131c] border border-white/10 rounded-3xl p-8 flex flex-col overflow-hidden">
             <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 mb-6">
                <Terminal className="w-4 h-4 text-primary" /> Recent Actions
             </h3>
             <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {commandQueue.length === 0 && <p className="text-[10px] text-white/20 italic">No recent actions.</p>}
                {commandQueue.map(c => (
                   <div key={c.id} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-start text-[9px] font-black uppercase tracking-tighter">
                         <span className="text-white/60 truncate max-w-[100px]">{c.intent}</span>
                         <span className={c.status === 'completed' ? 'text-green-500' : c.status === 'needs_approval' ? 'text-orange-500' : 'text-white/30'}>{c.status}</span>
                      </div>
                      <p className="text-[10px] text-white/30 font-mono truncate">{c.input}</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 flex items-start gap-3">
             <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
             <p className="text-[10px] text-white/50 leading-relaxed font-bold uppercase tracking-widest">
                REAPER cannot execute high-risk shell commands or deletions. All production changes are staged for owner approval.
             </p>
          </div>
        </div>
      </div>

    </div>
  );
}

function Terminal({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
