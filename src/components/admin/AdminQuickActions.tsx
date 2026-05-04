"use client";
import { useState } from "react";
import { Play, Activity, Zap, Shield, MonitorSmartphone, RefreshCw, HelpCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AdminQuickActions() {
  const [loading, setLoading] = useState<string | null>(null);

  const runAction = async (action: string, path: string) => {
    setLoading(action);
    try {
      await fetch(path, { method: "POST" });
      alert(`${action} triggered successfully.`);
    } catch (err) {
      alert(`Failed to run ${action}`);
    }
    setLoading(null);
  };

  const actions = [
    { label: "Run Bots", id: "run-bots", path: "/api/reaper/run", icon: <Play className="w-4 h-4" />, color: "bg-primary" },
    { label: "Check Issues", id: "check-issues", path: "/api/reaper/maintenance", icon: <AlertTriangle className="w-4 h-4" />, color: "bg-red-500" },
    { label: "Daily Cycle", id: "daily-cycle", path: "/api/reaper/daily", icon: <Zap className="w-4 h-4" />, color: "bg-yellow-400" },
    { label: "Growth Cycle", id: "growth-cycle", path: "/api/reaper/growth", icon: <Activity className="w-4 h-4" />, color: "bg-purple-500" },
    { label: "Media Cycle", id: "media-cycle", path: "/api/reaper/media-ops", icon: <MonitorSmartphone className="w-4 h-4" />, color: "bg-blue-500" },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => runAction(action.label, action.path)}
          disabled={loading !== null}
          className={`${action.color} text-black font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition-all disabled:opacity-50`}
        >
          {loading === action.label ? <RefreshCw className="w-3 h-3 animate-spin" /> : action.icon}
          {action.label}
        </button>
      ))}
      <Link href="/admin/domain-setup" className="bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
        <Shield className="w-4 h-4" /> Domain Setup
      </Link>
      <Link href="/help" className="bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
        <HelpCircle className="w-4 h-4" /> Help
      </Link>
    </div>
  );
}
