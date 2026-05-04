"use client";
import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 animate-in slide-in-from-bottom-8">
      <div className="container mx-auto max-w-5xl bg-[#12131c] border border-primary/30 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
        <div className="flex items-start gap-4">
          <div className="bg-primary/20 p-2 rounded hidden sm:block">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Data Privacy Notice</h4>
            <p className="text-white/60 text-sm max-w-2xl">
              We use cookies and similar tracking technologies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for more details.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={() => setShow(false)} className="px-4 py-2 text-sm font-bold text-white/50 hover:text-white transition-colors">
            Manage
          </button>
          <button onClick={accept} className="w-full md:w-auto bg-primary hover:bg-primary/80 text-black font-black uppercase px-6 py-3 rounded transition-colors whitespace-nowrap">
            Accept All
          </button>
        </div>
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-white/30 hover:text-white hidden md:block">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
