import { Heart } from 'lucide-react';

export default function SupportBanner() {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-1">
      <div className="bg-background w-full h-full py-2 px-4 flex items-center justify-center gap-2 text-sm font-bold">
        <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
        <span>Use Support-A-Creator Code:</span>
        <span className="text-primary font-black tracking-wider ml-1">YOUR-CODE-HERE</span>
      </div>
    </div>
  );
}
