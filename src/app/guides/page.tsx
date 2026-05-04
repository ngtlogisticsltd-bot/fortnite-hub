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
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-4">Strategy <span className="text-white">Guides</span></h1>
          <p className="text-white/50 font-medium max-w-2xl mx-auto">Master the Island with our curated collection of pro-level tips, settings, and strategies updated for the latest chapter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-[#12131c] border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-colors group cursor-pointer">
              <div className="bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                {cat.icon}
              </div>
              <h3 className="font-heading font-black text-xl uppercase mb-2 text-white">{cat.title}</h3>
              <p className="text-sm text-white/50">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
