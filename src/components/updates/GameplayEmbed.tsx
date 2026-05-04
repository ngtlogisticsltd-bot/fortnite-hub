import { ExternalLink, Video } from 'lucide-react';

interface GameplayEmbedProps {
  title: string;
  creatorName: string;
  platform: string;
  embedUrl: string;
  originalUrl: string;
}

export default function GameplayEmbed({ title, creatorName, platform, embedUrl, originalUrl }: GameplayEmbedProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/20 p-2 rounded">
            <Video className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{title}</h4>
            <p className="text-xs text-white/50">via {creatorName} • {platform}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:block text-[10px] font-bold text-white/20 uppercase tracking-widest max-w-[200px] leading-tight">
            Embedded content belongs to original creator/source.
          </div>
          <a 
            href={originalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-xs font-black uppercase tracking-widest transition-all"
          >
            Watch Original <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
