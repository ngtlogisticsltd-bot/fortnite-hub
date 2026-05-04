"use client";
import { useState, useEffect } from 'react';
import { Share2, Zap, RefreshCw, AlertTriangle, Shield, MapPin, Clock } from 'lucide-react';
import { DispatchItem } from '@/lib/dataDispatcher/types';

export default function DataDispatcherAdmin() {
  const [items, setItems] = useState<DispatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('/api/data-dispatcher');
    const data = await res.json();
    setItems(data.items);
    setLoading(false);
  };

  const runDispatch = async () => {
    setLoading(true);
    await fetch('/api/data-dispatcher', { method: 'POST' });
    await fetchItems();
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
            <Share2 className="w-10 h-10 text-primary" /> Data Dispatcher
          </h1>
          <p className="text-white/50 text-sm mt-2">Central pipeline for pulling, normalizing, and routing Fortnite data.</p>
        </div>
        <button 
          onClick={runDispatch}
          disabled={loading}
          className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-6 py-3 rounded-lg font-black uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /> Run Dispatch Cycle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.length === 0 ? (
          <div className="bg-[#12131c] border border-white/5 rounded-xl p-20 text-center text-white/20 italic">
            No data dispatched yet. Click "Run Dispatch Cycle" to start.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-[#12131c] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="shrink-0">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                  item.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                  item.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' :
                  'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}>
                  {item.priority}
                </span>
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <span className="text-[9px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">{item.type}</span>
                </div>
                <p className="text-sm text-white/50">{item.summary}</p>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest pt-2">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Route: /{item.routeTarget}</span>
                  <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Source: {item.source} ({item.sourceLabel})</span>
                  <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> {item.legalStatus}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(item.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="shrink-0 flex gap-2">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-4 py-2 rounded text-xs font-black uppercase tracking-widest transition-all">
                  Re-Route
                </button>
                <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded text-xs font-black uppercase tracking-widest transition-all">
                  Kill
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
