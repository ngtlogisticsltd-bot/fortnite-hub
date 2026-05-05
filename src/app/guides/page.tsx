import Navbar from "@/components/Navbar";
import { BookOpen, Map, Settings, Target } from "lucide-react";
import guidesData from '@/data/guides.json';

const iconMap: Record<string, any> = {
  settings: <Settings className="w-8 h-8 text-blue-400" />,
  map: <Map className="w-8 h-8 text-green-400" />,
  target: <Target className="w-8 h-8 text-red-400" />,
  "book-open": <BookOpen className="w-8 h-8 text-yellow-400" />,
};

export default function GuidesPage() {
  const categories = guidesData.map(cat => ({
    ...cat,
    icon: iconMap[cat.icon] || <BookOpen className="w-8 h-8 text-white" />
  }));

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary mb-2">FortHub Learn</p>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Strategy <span className="text-white">Guides</span></h1>
            <p className="mt-4 text-white/50 max-w-2xl font-medium">
              Master the Island with our curated collection of pro-level tips, settings, and strategies updated for the latest chapter.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, i) => (
            <div key={i} className="bg-[#12131c] border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="bg-black/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  {cat.icon}
                </div>
                <h3 className="font-black text-xl uppercase mb-2 text-white">{cat.title}</h3>
                <p className="text-sm text-white/50">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white">Status: LIVE</h3>
            <p className="mt-1 text-sm text-white/60">
              Community and curated strategy guides are available.
            </p>
          </div>
          <a
            href="/"
            className="rounded-xl bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20 transition"
          >
            Return Home
          </a>
        </div>
      </main>
    </div>
  );
}
