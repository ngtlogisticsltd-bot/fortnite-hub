import Navbar from "@/components/Navbar";
import NewsFeed from "@/components/NewsFeed";

export const metadata = {
  title: "Fortnite Update Today - Latest Server Status & News",
  description: "Is there a Fortnite update today? Get the latest live news, server downtime alerts, and game changes directly from our News Team.",
};

export default function SEOUpdateToday() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6">Fortnite Update <span className="text-white">Today</span></h1>
          <p className="text-xl text-white/70">Wondering about the Fortnite update today? We track official server status and news drops 24/7.</p>
        </div>
        
        <NewsFeed />
      </div>
    </>
  );
}
