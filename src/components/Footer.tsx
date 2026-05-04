import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0b10] border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-black text-lg rotate-3">
                F
              </div>
              <span className="font-heading font-black text-xl tracking-widest uppercase">
                Fort<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm max-w-sm mb-6">
              Your ultimate destination for live updates, item shop rotations, cosmetic databases, and pro-level guides.
            </p>
            <div className="text-xs text-white/40 space-y-2">
              <p className="text-white/70 font-bold uppercase border-l-2 border-primary pl-2">Unofficial Fan Site</p>
              <p>FortHub is not affiliated with, maintained, authorized, or endorsed by Epic Games. We strictly use public APIs, official embeds, and manually reviewed fan submissions. No fake official branding is used.</p>
              <p>User submissions are reviewed prior to publishing. No guarantee of absolute accuracy. Sponsored and affiliate content may appear and will be clearly labeled.</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/news" className="hover:text-primary transition-colors">News</Link></li>
              <li><Link href="/item-shop" className="hover:text-primary transition-colors">Item Shop</Link></li>
              <li><Link href="/skins" className="hover:text-primary transition-colors">Cosmetics</Link></li>
              <li><Link href="/patch-notes" className="hover:text-primary transition-colors">Update Tracker</Link></li>
              <li><Link href="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="/submit" className="hover:text-primary transition-colors">Submit Info</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclosures" className="hover:text-primary transition-colors">Disclosures</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} FortHub. All rights reserved.</p>
          <p>Built for the community.</p>
        </div>
      </div>
    </footer>
  );
}
