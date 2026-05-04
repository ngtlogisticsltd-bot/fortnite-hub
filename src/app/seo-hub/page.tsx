import Link from 'next/link';
import { Search, Rocket, Zap, FileText, Globe, ArrowRight } from 'lucide-react';

export default function SeoHub() {
  const categories = [
    {
      title: "Daily Updates",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      links: [
        { name: "Fortnite Item Shop Today", href: "/fortnite-item-shop-today" },
        { name: "Fortnite Update Today", href: "/fortnite-update-today" },
        { name: "Patch Notes Tracker", href: "/fortnite-patch-notes" },
      ]
    },
    {
      title: "Performance & Strategy",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      links: [
        { name: "Best Fortnite Settings", href: "/fortnite-best-settings" },
        { name: "Fortnite XP Maps Guide", href: "/fortnite-xp-maps" },
        { name: "Pro Gear & Keybinds", href: "/pro-gear" },
      ]
    },
    {
      title: "Community & Media",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      links: [
        { name: "Top Creators Hub", href: "/top-creators" },
        { name: "Live Activity Feed", href: "/live-feed" },
        { name: "Fortnite Guides Home", href: "/guides" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <div className="container mx-auto px-4 py-20 max-w-6xl space-y-16">
        
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black uppercase tracking-tighter">FORTHUB <span className="text-primary">SEO HUB</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium uppercase tracking-widest text-[10px]">The Ultimate Fortnite Resource Matrix</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {categories.map((cat, i) => (
             <div key={i} className="bg-[#12131c] border border-white/5 p-8 rounded-3xl space-y-8 hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-all">
                      {cat.icon}
                   </div>
                   <h2 className="text-xl font-black uppercase tracking-tight">{cat.title}</h2>
                </div>
                <ul className="space-y-4">
                   {cat.links.map((link, j) => (
                     <li key={j}>
                        <Link href={link.href} className="flex items-center justify-between text-white/60 hover:text-primary font-bold uppercase tracking-widest text-[10px] transition-colors group/link">
                           <span>{link.name}</span>
                           <ArrowRight className="w-3 h-3 translate-x-[-10px] opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all" />
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>

        {/* Search Callout */}
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-12 text-center space-y-6">
           <Search className="w-12 h-12 text-primary mx-auto" />
           <h3 className="text-3xl font-black uppercase">Looking for something specific?</h3>
           <p className="text-white/60 max-w-xl mx-auto uppercase font-bold text-[10px] tracking-widest leading-loose">
              Our automated crawlers are constantly indexing new Fortnite updates, skins, and XP maps. Browse our full library of guides and real-time trackers.
           </p>
           <Link href="/guides" className="inline-block bg-primary text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,255,157,0.3)] hover:scale-105 transition-transform">
              Browse All Guides
           </Link>
        </div>

      </div>
    </div>
  );
}
