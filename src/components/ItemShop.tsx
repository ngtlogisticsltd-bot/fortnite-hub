import { getItemShop } from '@/lib/fortnite/api';
import Link from 'next/link';
import Image from 'next/image';

export default async function ItemShop() {
  const items = await getItemShop();

  if (items.length === 0) return <div className="py-12 text-center text-white/50">Item shop temporarily unavailable</div>;

  // Take only the first 8 items for the homepage preview
  const previewItems = items.slice(0, 8);

  return (
    <section id="shop" className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading font-black uppercase tracking-tight">
          <span className="text-secondary">Daily</span> Item Shop
        </h2>
        <Link href="/item-shop" className="text-sm font-bold text-secondary hover:text-white transition-colors uppercase tracking-wider">
          View All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previewItems.map((item, i) => {
          const rarityColor = item.rarity?.backendValue === 'EFortRarity::Legendary' ? 'from-orange-500/40' :
                              item.rarity?.backendValue === 'EFortRarity::Epic' ? 'from-purple-500/40' :
                              item.rarity?.backendValue === 'EFortRarity::Rare' ? 'from-blue-500/40' :
                              item.rarity?.backendValue === 'EFortRarity::Uncommon' ? 'from-green-500/40' : 'from-gray-500/40';

          return (
            <div key={item.id || i} className={`relative bg-gradient-to-t ${rarityColor} to-card rounded-xl overflow-hidden border border-white/10 group cursor-pointer`}>
              <div className="aspect-square relative p-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
                {item.images?.icon && (
                  <Image src={item.images.icon} alt={item.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl relative z-10" />
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-full p-3 bg-background/95 backdrop-blur border-t border-white/5 z-20">
                <h3 className="font-heading font-black text-lg uppercase truncate leading-none mb-1">{item.name}</h3>
                <div className="flex items-center gap-1 text-sm font-black text-accent">
                  <img src="https://fortnite-api.com/images/vbuck.png" alt="V-Bucks" className="w-4 h-4" />
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
