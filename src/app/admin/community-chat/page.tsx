"use client";
import { useState, useEffect } from 'react';
import { MessageSquare, Check, X, Shield, AlertCircle, Clock } from 'lucide-react';

export default function AdminCommunityChat() {
  const [pending, setPending] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [resP, resA] = await Promise.all([
      fetch('/api/community/chat?status=pending'),
      fetch('/api/community/chat?status=approved')
    ]);
    const [dataP, dataA] = await Promise.all([resP.json(), resA.json()]);
    setPending(dataP.messages);
    setApproved(dataA.messages);
    setLoading(false);
  };

  const handleModerate = async (id: string, status: 'approved' | 'blocked') => {
    await fetch('/api/community/chat', {
      method: 'PATCH',
      body: JSON.stringify({ id, status })
    });
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
            <MessageSquare className="w-10 h-10 text-primary" /> Chat Moderation
          </h1>
          <p className="text-white/50 text-sm mt-2">Approve, block, and manage community discussion messages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Pending Queue */}
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-yellow-500 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Pending Queue ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.length === 0 ? (
              <div className="bg-[#12131c] border border-white/5 rounded-xl p-12 text-center text-white/20 italic">No pending messages.</div>
            ) : (
              pending.map(m => (
                <div key={m.id} className="bg-[#12131c] border border-yellow-500/20 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-primary uppercase">{m.nickname}</span>
                    <span className="text-[9px] text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(m.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-white/80">{m.message}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleModerate(m.id, 'approved')}
                      className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 py-2 rounded font-black uppercase text-[10px] flex items-center justify-center gap-2 transition-all"
                    >
                      <Check className="w-3 h-3" /> Approve
                    </button>
                    <button 
                      onClick={() => handleModerate(m.id, 'blocked')}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 py-2 rounded font-black uppercase text-[10px] flex items-center justify-center gap-2 transition-all"
                    >
                      <X className="w-3 h-3" /> Block
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Approved Feed */}
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-green-500 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Approved Feed ({approved.length})
          </h2>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-hide">
            {approved.map(m => (
              <div key={m.id} className="bg-white/5 border border-white/5 rounded-xl p-4 opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black text-primary uppercase">{m.nickname}</span>
                  <span className="text-[9px] text-white/30 ml-auto">{new Date(m.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-xs text-white/60">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
