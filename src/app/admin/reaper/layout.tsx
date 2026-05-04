import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REAPER Admin | FortHub",
  description: "Internal Automation Dashboard",
};

export default function ReaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-white font-sans">
      <nav className="bg-[#12131c] border-b border-primary/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-black">R</div>
          <h1 className="font-heading font-black text-xl tracking-widest text-primary">REAPER <span className="text-white/50">OS</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <a href="/" className="text-white/50 hover:text-white transition-colors mr-4">View Live Site</a>
          <span className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            SYSTEM ONLINE
          </span>
        </div>
      </nav>
      {children}
    </div>
  );
}
