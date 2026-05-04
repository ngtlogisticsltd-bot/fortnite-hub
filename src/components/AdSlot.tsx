interface AdSlotProps {
  type?: "banner" | "sidebar" | "in-article";
  inHouse?: boolean;
  imageUrl?: string;
  linkUrl?: string;
  sponsorName?: string;
}

export default function AdSlot({ type = "banner", inHouse = false, imageUrl, linkUrl, sponsorName }: AdSlotProps) {
  const dimensions = {
    banner: "w-full max-w-5xl h-[90px] mx-auto",
    sidebar: "w-[300px] h-[250px] mx-auto",
    "in-article": "w-full h-[250px]",
  }[type];

  if (inHouse && imageUrl) {
    return (
      <a 
        href={linkUrl || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`block bg-card border border-primary/30 flex items-center justify-center rounded-lg overflow-hidden relative group hover:border-primary transition-colors shadow-lg shadow-primary/5 ${dimensions}`}
      >
        <img src={imageUrl} alt={sponsorName || "Sponsor"} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white/70 uppercase tracking-wider">
          Sponsored
        </div>
      </a>
    );
  }

  const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (adSenseId) {
    return (
      <div className={`${dimensions} overflow-hidden flex justify-center`}>
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client={adSenseId}
             data-ad-slot="auto"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-white/5 flex items-center justify-center rounded-lg overflow-hidden relative group ${dimensions}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
      <div className="text-center z-10 p-4">
        <p className="text-xs font-bold text-white/40 tracking-widest uppercase mb-1">Advertisement</p>
        <p className="text-sm font-medium text-white/20">Ad Network Placeholder</p>
      </div>
    </div>
  );
}
