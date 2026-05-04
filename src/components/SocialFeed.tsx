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
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="YouTube video player" 
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
        <div className="bg-white rounded-lg p-2 flex items-center justify-center text-black font-bold h-32">
           {/* In a real app we'd load the Twitter script. Using a static placeholder for the embed block. */}
           [Twitter Official Embed Block]
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
