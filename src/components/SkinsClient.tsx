"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Cosmetic } from "@/lib/fortnite/api";

export default function SkinsClient({ initialSkins }: { initialSkins: Cosmetic[] }) {
  const [search, setSearch] = useState("");

  const filteredSkins = initialSkins.filter(skin => 
    skin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-2">Cosmetics <span className="text-white">Database</span></h1>
          <p className="text-white/50 font-medium">Search the latest added Fortnite Outfits.</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search loaded outfits..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12131c] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-colors shadow-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        </div>
      </div>

      {filteredSkins.length === 0 ? (
        <div className="text-center py-12 text-white/50">No outfits match your search.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredSkins.map(skin => {
            const isLegendary = skin.rarity?.backendValue === 'EFortRarity::Legendary';
            const isEpic = skin.rarity?.backendValue === 'EFortRarity::Epic';
            const isRare = skin.rarity?.backendValue === 'EFortRarity::Rare';
            const isUncommon = skin.rarity?.backendValue === 'EFortRarity::Uncommon';
            
            return (
              <div key={skin.id} className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group">
                <div className="aspect-square bg-gradient-to-tr from-black to-slate-800 p-4 relative">
                  <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity ${isLegendary ? 'bg-yellow-500' : isEpic ? 'bg-purple-500' : isRare ? 'bg-blue-500' : isUncommon ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  {skin.images?.icon && (
                    <Image src={skin.images.icon} alt={skin.name} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-contain p-4 relative z-10 drop-shadow-2xl" />
                  )}
                </div>
                <div className="p-4 text-center border-t border-white/5">
                  <h3 className="font-bold text-lg leading-tight mb-1 truncate">{skin.name}</h3>
                  <p className={`text-[10px] font-black uppercase tracking-wider ${isLegendary ? 'text-yellow-400' : isEpic ? 'text-purple-400' : isRare ? 'text-blue-400' : isUncommon ? 'text-green-400' : 'text-gray-400'}`}>{skin.rarity?.displayValue || 'Common'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
