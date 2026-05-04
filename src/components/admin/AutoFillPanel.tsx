"use client";
import { useState, useEffect } from 'react';
import { Zap, Shield, AlertTriangle, CheckCircle2, ChevronRight, Lock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AutoFillPanelProps {
  context: string;
}

export default function AutoFillPanel({ context }: AutoFillPanelProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/control-core/autofill?context=${context}`);
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [context]);

  if (loading) return (
    <div className="bg-[#12131c] border border-white/5 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-white/5 rounded w-1/3 mb-4"></div>
      <div className="h-20 bg-white/5 rounded"></div>
    </div>
  );

  if (!data) return null;

  const { result } = data;
  const availableCount = Object.keys(result.availableFields).length;
  const missingCount = result.missingFields.length;

  return (
    <div className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase text-white tracking-widest flex items-center gap-2">
          <Zap className="w-3 h-3 text-primary" /> Auto-Fill Assistant: {context}
        </h3>
        <Link href="/admin/control-core" className="text-[10px] font-black uppercase text-primary hover:underline flex items-center gap-1">
          Open Core <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Status Row */}
        <div className="flex gap-4">
          <div className="flex-1 bg-black/40 rounded-lg p-2 border border-white/5">
            <p className="text-[9px] font-black uppercase text-white/30 mb-0.5">Saved</p>
            <p className="text-sm font-bold text-white">{availableCount}</p>
          </div>
          <div className="flex-1 bg-black/40 rounded-lg p-2 border border-white/5">
            <p className="text-[9px] font-black uppercase text-white/30 mb-0.5">Missing</p>
            <p className="text-sm font-bold text-red-400">{missingCount}</p>
          </div>
        </div>

        {/* Info/Warning List */}
        <div className="space-y-2">
          {result.warnings.map((w: string, i: number) => (
            <div key={i} className="text-[10px] text-yellow-500/80 flex items-start gap-1.5 leading-tight">
              <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" /> {w}
            </div>
          ))}
          {availableCount > 0 && (
            <div className="text-[10px] text-green-400/80 flex items-start gap-1.5 leading-tight">
              <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" /> {availableCount} fields are ready to pre-fill.
            </div>
          )}
          {missingCount > 0 && (
            <div className="text-[10px] text-white/30 flex items-start gap-1.5 leading-tight">
              <ChevronRight className="w-3 h-3 shrink-0 mt-0.5" /> {missingCount} fields still need owner input.
            </div>
          )}
        </div>

        {/* Action Button */}
        {availableCount > 0 && (
          <div className="pt-2 border-t border-white/5">
            <p className="text-[9px] text-white/40 italic">Note: Forms on this page will automatically use saved values where available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
