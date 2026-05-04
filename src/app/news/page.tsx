import Navbar from "@/components/Navbar";
import NewsFeed from "@/components/NewsFeed";
import AdSlot from "@/components/AdSlot";

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-8 border-b border-white/10 pb-4">Latest <span className="text-white">News</span></h1>
          <NewsFeed />
          <AdSlot type="in-article" />
        </div>
      </div>
    </>
  );
}
