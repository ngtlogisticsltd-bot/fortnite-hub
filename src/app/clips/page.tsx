import Navbar from "@/components/Navbar";

export default function ClipsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-4">Trending <span className="text-white">Clips</span></h1>
          <p className="text-white/50 font-medium max-w-2xl mx-auto">Top community plays, fails, and competitive highlights. Safely embedded from official creators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Safe Embed Placeholders */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <span className="text-white/20 font-bold uppercase tracking-widest text-sm z-10">YouTube Embed</span>
                <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-1">Awesome Community Clip #{i}</h3>
                <p className="text-sm text-white/50">via YouTube • 100k views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
