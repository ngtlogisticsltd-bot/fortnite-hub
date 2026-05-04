"use client";
import { Zap } from 'lucide-react';
import BotAutomationPanel from '@/components/admin/BotAutomationPanel';
import AdminHelpWidget from '@/components/admin/AdminHelpWidget';

export default function BotAutomationPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <AdminHelpWidget context="Bot Automation" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">BOT <span className="text-primary">AUTOMATION</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Operational Fleet Control & Cron Readiness</p>
          </div>
        </div>
      </div>

      <BotAutomationPanel />

    </div>
  );
}
