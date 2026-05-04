import { UpdateMediaItem } from '@/lib/updates/updateMedia';
import { Shield, ExternalLink, Calendar, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface UpdateMediaCardProps {
  item: UpdateMediaItem;
}

export default function UpdateMediaCard({ item }: UpdateMediaCardProps) {
  return (
    <div className="bg-[#12131c] border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border border-white/10">
            {item.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
            item.legalStatus === 'LIVE' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
            item.legalStatus === 'EMBED' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
            'bg-white/10 text-white/50 border-white/20'
          }`}>
            {item.legalStatus}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">
          <Calendar className="w-3 h-3" /> {item.date}
        </div>
        
        <h3 className="text-xl font-black text-white uppercase mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
        
        <p className="text-sm text-white/60 mb-4 line-clamp-3">{item.summary}</p>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <MessageSquare className="w-3 h-3" /> FortHub Commentary
            </h4>
            <p className="text-xs text-white/50 leading-relaxed italic">
              "{item.fortHubCommentary}"
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {item.attribution}</span>
            {item.embedUrl && <span className="text-primary flex items-center gap-1">View Embed <ExternalLink className="w-3 h-3" /></span>}
          </div>
        </div>
      </div>
    </div>
  );
}
