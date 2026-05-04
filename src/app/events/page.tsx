import Navbar from "@/components/Navbar";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-4">Tournaments <span className="text-white">& Events</span></h1>
          <p className="text-white/50 font-medium max-w-2xl mx-auto">Track the FNCS leaderboard, cash cups, and community events.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#12131c] border border-white/5 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🏆</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">FNCS Tracker Offline</h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">The official Epic Games competitive API is currently private. Event tracking will resume when public endpoints are available.</p>
          <a href="https://competitive.fortnite.com" target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded transition-colors inline-block">
            View Official Standings
          </a>
        </div>
      </div>
    </>
  );
}
