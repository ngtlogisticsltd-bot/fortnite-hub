import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-5xl font-heading font-black uppercase text-primary mb-8">About <span className="text-white">Us</span></h1>
        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-lg">
          <p>
            FortHub is the ultimate destination for Fortnite enthusiasts. Founded by a dedicated team of gamers, our mission is to provide the fastest, most accurate, and most engaging coverage of the Island.
          </p>
          <p>
            Using an advanced automated backend, we aggregate official news, daily item shops, and patch notes so you never miss a drop.
          </p>
          <p className="text-sm text-white/50 mt-12 border-t border-white/10 pt-8">
            Note: We are an unofficial community resource and are not affiliated with Epic Games.
          </p>
        </div>
      </div>
    </>
  );
}
