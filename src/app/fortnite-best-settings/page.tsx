import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Best Fortnite Settings for Max FPS & Low Ping",
  description: "Optimize your game with the best Fortnite settings for PC and console. Maximize FPS, reduce input delay, and find the perfect sensitivity.",
};

export default function SEOSettings() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6">Best Fortnite <span className="text-white">Settings</span></h1>
        <p className="text-xl text-white/70 mb-12">Tired of lag? Our Guides Team has compiled the absolute best Fortnite settings used by top tier pros and content creators.</p>
        
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-12">
          <a href="/guides" className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-8 py-4 rounded transition-colors inline-block text-lg">
            View Optimization Guide
          </a>
        </div>
      </div>
    </>
  );
}
