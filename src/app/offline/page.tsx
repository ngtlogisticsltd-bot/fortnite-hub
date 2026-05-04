"use client";
import Navbar from "@/components/Navbar";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32 text-center max-w-2xl flex flex-col items-center justify-center">
        <WifiOff className="w-24 h-24 text-white/20 mb-8" />
        <h1 className="text-4xl font-heading font-black uppercase text-white mb-4">You are Offline</h1>
        <p className="text-xl text-white/50 mb-8">It looks like you've lost your connection. FortHub requires an active internet connection to pull live updates and cosmetic data.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-8 py-4 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    </>
  );
}
