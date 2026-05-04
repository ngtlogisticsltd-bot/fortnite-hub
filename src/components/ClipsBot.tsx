"use client";
import { Video, Play, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClipsBot() {
  const clips = [
    {
      id: 1,
      title: "INSANE 300m SNIPE W/ REAPER",
      author: "Ninja",
      views: "1.2M",
      thumb: "https://cdn2.unrealengine.com/t-ch5s2-art-1920x1080-1e5828469d80.jpg"
    },
    {
      id: 2,
      title: "How to perfectly counter Waterbending",
      author: "MrSavage",
      views: "850K",
      thumb: "https://cdn2.unrealengine.com/fortnite-competitive-1920x1080-602931211.jpg"
    }
  ];

  return (
    <div className="bg-card border border-white/10 rounded-xl p-6 shadow-xl shadow-black/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
            <Video className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-heading font-black text-2xl uppercase leading-none">Clips <span className="text-red-500">Bot</span></h3>
            <p className="text-white/50 text-sm font-medium">Trending gameplay automation</p>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-white/30" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clips.map((clip, idx) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            key={clip.id} 
            className="group cursor-pointer border border-white/5 rounded-lg overflow-hidden bg-background"
          >
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img src={clip.thumb} alt={clip.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-red-500/80 flex items-center justify-center relative z-10 backdrop-blur scale-90 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/50">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-sm line-clamp-1 group-hover:text-red-400 transition-colors">{clip.title}</h4>
              <div className="flex items-center justify-between mt-2 text-xs text-white/50 font-medium">
                <span>{clip.author}</span>
                <span>{clip.views} views</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
