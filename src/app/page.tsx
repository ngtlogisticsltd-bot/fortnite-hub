import Link from "next/link";
import Navbar from "@/components/Navbar";
import SupportBanner from "@/components/SupportBanner";
import AdSlot from "@/components/AdSlot";
import NewsFeed from "@/components/NewsFeed";
import ItemShop from "@/components/ItemShop";
import SocialFeed from "@/components/SocialFeed";
import TriviaGame from "@/components/TriviaGame";
import PatchNotesBot from "@/components/PatchNotesBot";
import ClipsBot from "@/components/ClipsBot";
import SponsorAdsBot from "@/components/SponsorAdsBot";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <SupportBanner />
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* Top Ad Slot - Driven by Sponsor Bot */}
        <div className="container mx-auto px-4 py-6">
          <AdSlot 
            type="banner" 
            inHouse={true} 
            imageUrl="https://cdn2.unrealengine.com/fortnite-competitive-1920x1080-602931211.jpg"
            linkUrl="https://competitive.fortnite.com"
            sponsorName="FNCS"
          />
        </div>

        {/* Hero Section with Video Background */}
        <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden border-y border-primary/20 bg-black">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-50 mix-blend-screen scale-105"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-loop-20352-large.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10"></div>
          
          <div className="container mx-auto px-4 relative z-20 text-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ultimate</span><br/>
              Fortnite Hub
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-lg">
              Live news, daily item shop updates, player stats, and leaks. Updated automatically, 24/7.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/news" className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-8 py-4 rounded clip-diagonal transition-colors hover:scale-105 duration-200 shadow-[0_0_20px_rgba(0,229,255,0.4)] inline-block">
                Explore Content
              </Link>
              <Link href="/community" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black uppercase px-8 py-4 rounded clip-diagonal transition-all backdrop-blur-md hover:scale-105 duration-200 inline-block">
                Join Community
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col xl:flex-row gap-8 relative z-20 -mt-24">
            
            {/* Left Column (Main Content) */}
            <div className="w-full xl:w-8/12 space-y-12">
              
              <FadeIn delay={0.1} id="news">
                <NewsFeed />
              </FadeIn>

              <FadeIn delay={0.2} className="my-8">
                <AdSlot type="in-article" />
              </FadeIn>

              <FadeIn delay={0.3}>
                <ItemShop />
              </FadeIn>

              <FadeIn delay={0.4} id="clips">
                 <ClipsBot />
              </FadeIn>

              <FadeIn delay={0.5}>
                 <PatchNotesBot />
              </FadeIn>

            </div>

            {/* Right Column (Sidebar & Community) */}
            <aside className="w-full xl:w-4/12 space-y-8">
              <div className="sticky top-24 space-y-8">
                
                <FadeIn delay={0.2} id="games">
                  <TriviaGame />
                </FadeIn>

                <FadeIn delay={0.3} id="community">
                  <SocialFeed />
                </FadeIn>

                <FadeIn delay={0.4}>
                  <SponsorAdsBot />
                </FadeIn>

                <FadeIn delay={0.5}>
                  <AdSlot type="sidebar" />
                </FadeIn>
                
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-card py-16 mt-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="font-heading font-black text-2xl mb-4">FORT<span className="text-primary">HUB</span></h4>
            <p className="text-white/50 text-sm mb-4">Your ultimate automated companion for everything related to the Island. Built by the community, for the community.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-white/80 tracking-wider text-sm">Legal</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclosures" className="hover:text-primary transition-colors">Disclosures</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-white/80 tracking-wider text-sm">Community</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><Link href="/community" className="hover:text-primary transition-colors">Discord</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Twitter</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Apply for Team</Link></li>
            </ul>
          </div>
        </div>
        
        {/* PROMINENT LEGAL DISCLAIMER */}
        <div className="container mx-auto px-4 text-center border-t border-white/10 pt-8 mt-8">
          <div className="inline-block bg-background/80 border border-red-500/30 px-6 py-4 rounded-lg shadow-lg">
            <h5 className="font-black text-red-500 uppercase tracking-widest mb-1 text-sm">Disclaimer</h5>
            <p className="text-white/70 text-sm font-medium">
              Unofficial Fortnite fan site. Not affiliated with Epic Games.
            </p>
            <p className="text-white/40 text-xs mt-2 max-w-2xl mx-auto">
              Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
