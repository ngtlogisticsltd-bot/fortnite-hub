import { CheckCircle2, Circle } from 'lucide-react';

export default function UpdateTimeline() {
  const events = [
    { version: 'v31.00', date: 'Expected: June 2026', status: 'Upcoming', current: false },
    { version: 'v30.20', date: 'June 2024', status: 'Released', current: true },
    { version: 'v30.10', date: 'May 2024', status: 'Released', current: false },
    { version: 'v30.00', date: 'May 24, 2024', status: 'Released', current: false },
  ];

  return (
    <div className="bg-[#12131c] border border-white/10 rounded-xl p-8">
      <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">Version Timeline</h3>
      <div className="relative space-y-8">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
        
        {events.map((event, i) => (
          <div key={i} className="relative flex items-start gap-6">
            <div className={`mt-1.5 z-10 shrink-0 ${event.current ? 'text-primary' : event.status === 'Released' ? 'text-green-400' : 'text-white/20'}`}>
              {event.status === 'Released' ? <CheckCircle2 className="w-6 h-6 bg-[#0a0b14] rounded-full" /> : <Circle className="w-6 h-6 bg-[#0a0b14] rounded-full" />}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className={`text-xl font-black uppercase tracking-tight ${event.current ? 'text-primary' : 'text-white'}`}>{event.version}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                  event.status === 'Released' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-white/30 border-white/10'
                }`}>
                  {event.status}
                </span>
              </div>
              <p className="text-sm text-white/40 mt-1">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
