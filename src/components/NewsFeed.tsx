import { getNews } from '@/lib/fortnite/api';
import Link from 'next/link';
import Image from 'next/image';

export default async function NewsFeed() {
  const motds = await getNews();

  if (motds.length === 0) return <div className="py-12 text-center text-white/50">No news available.</div>;

  return (
    <section id="news" className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading font-black uppercase tracking-tight">
          <span className="text-primary">Latest</span> News
        </h2>
        <Link href="/news" className="text-sm font-bold text-primary hover:text-white transition-colors uppercase tracking-wider">
          Read All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {motds.map((motd) => (
          <div key={motd.id} className="bg-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 border border-white/5 shadow-xl group cursor-pointer">
            <div className="relative aspect-video bg-black/50">
              {motd.image && (
                <Image src={motd.image} alt={motd.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 z-10"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-[10px] font-black tracking-widest rounded mb-2 uppercase">
                  {motd.tabTitle || 'Update'}
                </span>
                <h3 className="text-xl font-heading font-black uppercase leading-tight mb-1 group-hover:text-primary transition-colors">
                  {motd.title}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-white/60 text-sm font-medium line-clamp-2">
                {motd.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
