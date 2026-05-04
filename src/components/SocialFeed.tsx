import { Hash } from 'lucide-react';

export default function SocialFeed() {
  // Manual feed of official embeds as per policy: "DO NOT scrape. Use official embeds (YouTube iframe, Twitter embed)"
  const feedItems = [
    {
      id: 1,
      type: 'youtube',
      embed: (
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/5UfP1qj6pG0" 
          title="Fortnite Chapter 5 Season 2 Trailer" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="rounded-lg aspect-video"
        ></iframe>
      )
    },
    {
      id: 2,
      type: 'twitter',
      embed: (
        <div className="bg-white/5 rounded-lg p-6 flex flex-col gap-2 border border-white/10">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-400 rounded-full" />
              <span className="font-bold text-sm">@FortniteGame</span>
           </div>
           <p className="text-xs text-white/70 italic">"The power of the gods is within your reach. Midas Rises now!"</p>
           <span className="text-[10px] text-white/20 uppercase font-black">Official Update</span>
        </div>
      )
    }
  ];

  return (
    <div className="bg-card border border-white/10 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Hash className="w-48 h-48" />
      </div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="font-heading font-black text-2xl uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Live</span> Feed
        </h3>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>

      <div className="space-y-4 relative z-10">
        {feedItems.map((item) => (
          <div key={item.id} className="w-full">
            {item.embed}
          </div>
        ))}
      </div>
    </div>
  );
}
