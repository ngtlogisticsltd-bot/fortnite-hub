"use client";
import { useState, useEffect } from 'react';
import { Zap, Clock, Shield, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LiveFeed() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/data-dispatcher');
      const data = await res.json();
      setItems(data.items);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
          <Activity className="w-5 h-5 text-primary animate-pulse" /> Live Dispatch Feed
        </h2>
        <span className="text-[10px] font-black uppercase bg-green-500/20 text-green-400 px-2 py-1 rounded animate-pulse">LIVE</span>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="bg-[#12131c] border border-white/5 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-white/20 italic text-sm">No live updates currently dispatching.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-[#12131c] border border-white/5 rounded-xl p-4 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    item.priority === 'CRITICAL' ? 'bg-red-500 animate-ping' :
                    item.priority === 'HIGH' ? 'bg-orange-500' : 'bg-primary'
                  }`} />
                  <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                <span className="text-[9px] font-bold text-white/30 whitespace-nowrap flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-white/50 mb-4 line-clamp-2">{item.summary}</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex gap-2">
                  <span className="text-[8px] font-black uppercase bg-white/5 text-white/40 px-1.5 py-0.5 rounded border border-white/10">{item.type}</span>
                  <span className="text-[8px] font-black uppercase text-primary/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Shield className="w-2 h-2" /> {item.sourceLabel}
                  </span>
                </div>
                <Link href={`/${item.routeTarget}`} className="text-[9px] font-black uppercase text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
