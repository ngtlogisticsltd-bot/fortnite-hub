import Navbar from "@/components/Navbar";
import { getFeaturedCosmetics } from "@/lib/fortnite/api";
import SkinsClient from "@/components/SkinsClient";

export default async function SkinsPage() {
  const skins = await getFeaturedCosmetics(100);

  return (
    <>
      <Navbar />
      <SkinsClient initialSkins={skins} />
    </>
  );
}
