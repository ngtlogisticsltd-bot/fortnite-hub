"use client";
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Activity, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Item Shop', href: '/item-shop' },
    { name: 'Patch Notes', href: '/patch-notes' },
    { name: 'Community', href: '/community' },
  ];

  const exploreDropdown = [
    { name: 'Skins', href: '/skins' },
    { name: 'Clips', href: '/clips' },
    { name: 'Events', href: '/events' },
    { name: 'Games', href: '/games' },
    { name: 'Media', href: '/media' },
    { name: 'AI Clips', href: '/ai-clips' },
    { name: 'Top Creators', href: '/top-creators' },
    { name: 'Live Hub', href: '/live' },
    { name: 'Live Feed', href: '/live-feed' },
  ];

  const guidesDropdown = [
    { name: 'Guides Home', href: '/guides' },
    { name: 'XP Maps', href: '/fortnite-xp-maps' },
    { name: 'Best Settings', href: '/fortnite-best-settings' },
    { name: 'Item Shop Today', href: '/fortnite-item-shop-today' },
    { name: 'Update Today', href: '/fortnite-update-today' },
    { name: 'Patch Notes Tracker', href: '/fortnite-patch-notes' },
    { name: 'Pro Gear', href: '/pro-gear' },
  ];

  const infoDropdown = [
    { name: 'Help', href: '/help', badge: 'NEW' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Submit', href: '/submit' },
    { name: 'Weekly Draw', href: '/weekly-draw', badge: 'SOON' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Disclosures', href: '/disclosures' },
    { name: 'Media Kit', href: '/media-kit' },
  ];

  const dropdowns = [
    { label: 'Explore', items: exploreDropdown },
    { label: 'Guides', items: guidesDropdown },
    { label: 'Info', items: infoDropdown }
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay to close
  };

  const handleToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(label);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0b10]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-black text-xl rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_20px_rgba(0,255,157,0.4)]">
              F
            </div>
            <span className="font-heading font-black text-2xl tracking-widest uppercase">
              Fort<span className="text-primary group-hover:text-white transition-colors">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-6">
            {mainLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg transition-all hover:bg-white/5 ${
                  pathname === link.href ? 'text-primary' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdowns */}
            {dropdowns.map(dropdown => (
              <div 
                key={dropdown.label} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(dropdown.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  onClick={() => handleToggle(dropdown.label)}
                  onKeyDown={(e) => handleKeyDown(e, dropdown.label)}
                  className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg transition-all hover:bg-white/5 outline-none focus:ring-1 focus:ring-primary/50 ${
                    activeDropdown === dropdown.label ? 'text-primary bg-white/5' : 'text-white/60 hover:text-white'
                  }`}
                  aria-expanded={activeDropdown === dropdown.label}
                  aria-haspopup="true"
                >
                  {dropdown.label} 
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === dropdown.label ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === dropdown.label && (
                  <div 
                    className="absolute top-[calc(100%+8px)] left-0 w-64 bg-[#12131c] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => handleMouseEnter(dropdown.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    {dropdown.items.map(item => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        className="flex items-center justify-between px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-primary hover:bg-primary/5 transition-all group"
                      >
                        <span>{item.name}</span>
                        {(item as any).badge && (
                          <span className="text-[8px] bg-primary text-black px-1.5 py-0.5 rounded font-black uppercase tracking-widest shadow-[0_0_10px_rgba(0,255,157,0.3)]">
                            {(item as any).badge}
                          </span>
                        )}
                        <Activity className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white/70 hover:text-white p-2 bg-white/5 rounded-xl border border-white/10" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0b10] border-b border-white/10 py-8 px-6 h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="flex flex-col gap-8 pb-12">
            
            <div className="space-y-4">
              <div className="font-black text-primary uppercase text-[10px] tracking-[0.3em] pl-4">Main Navigation</div>
              <div className="grid grid-cols-1 gap-2">
                {mainLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-white font-black p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all uppercase text-xs tracking-widest" 
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {dropdowns.map(dropdown => (
              <div key={dropdown.label} className="space-y-4">
                <div className="font-black text-primary uppercase text-[10px] tracking-[0.3em] pl-4">{dropdown.label}</div>
                <div className="grid grid-cols-2 gap-2">
                  {dropdown.items.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="text-white/60 font-bold p-4 rounded-xl bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider" 
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}
