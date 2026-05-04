import Navbar from "@/components/Navbar";
import ItemShop from "@/components/ItemShop";

export const metadata = {
  title: "Fortnite Item Shop Today - Daily Shop Updates",
  description: "Check out the Fortnite Item Shop today! Live daily updates of all new and returning cosmetics, skins, pickaxes, and emotes.",
};

export default function SEOItemShop() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6">Fortnite Item Shop <span className="text-white">Today</span></h1>
          <p className="text-xl text-white/70">Looking for the Fortnite Item Shop today? Our autonomous bot updates the storefront every day at 00:00 UTC so you never miss a rare skin return!</p>
        </div>
        
        <ItemShop />
      </div>
    </>
  );
}
