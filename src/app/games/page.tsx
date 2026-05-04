import Navbar from "@/components/Navbar";
import TriviaGame from "@/components/TriviaGame";

export default function GamesPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-4">Arcade <span className="text-white">& Mini-Games</span></h1>
          <p className="text-white/50 font-medium max-w-2xl mx-auto">Test your knowledge and compete against the community while waiting in the lobby.</p>
        </div>

        <div className="max-w-md mx-auto">
          <TriviaGame />
        </div>
      </div>
    </>
  );
}
