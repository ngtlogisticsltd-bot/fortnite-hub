import Navbar from "@/components/Navbar";

export const metadata = { title: 'Pro Gear & Settings | FortHub', description: 'What the pros use — gear, settings, and loadouts.' };

export default function ProGearPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8">Pro Gear & Settings</h1>
        <p className="text-white/60 mb-8">Discover the peripherals, keybinds, and sensitivity settings used by top competitive Fortnite players. All data is sourced from public interviews, streams, and community databases.</p>
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 text-center">
          <p className="text-white/40 text-sm">Pro gear database launching soon. Submit pro setups via the <a href="/submit" className="text-primary hover:underline">Submit page</a>.</p>
        </div>
      </div>
    </>
  );
}
