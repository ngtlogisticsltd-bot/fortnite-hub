export default function AdminAdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-white">
      <nav className="bg-[#12131c] border-b border-primary/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center font-black text-black">$</div>
          <h1 className="font-heading font-black text-xl tracking-widest text-yellow-400">MONETIZATION <span className="text-white/50">TEAM</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <a href="/admin/reaper" className="text-white/50 hover:text-white transition-colors mr-4">Back to Orchestrator</a>
        </div>
      </nav>
      {children}
    </div>
  );
}
