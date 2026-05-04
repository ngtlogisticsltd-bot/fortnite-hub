import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Best Fortnite XP Maps to Level Up Fast",
  description: "Discover the best active Fortnite XP Maps in Creative. Level up your Battle Pass quickly with these updated map codes.",
};

export default function SEOXPMaps() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6">Fortnite XP <span className="text-white">Maps</span></h1>
        <p className="text-xl text-white/70 mb-12">Need to finish your Battle Pass? We test and verify the best Fortnite XP Maps every single week.</p>
        
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-12">
          <a href="/guides" className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-8 py-4 rounded transition-colors inline-block text-lg">
            View XP Guides
          </a>
        </div>
      </div>
    </>
  );
}
