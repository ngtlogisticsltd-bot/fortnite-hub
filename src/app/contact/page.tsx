import Navbar from "@/components/Navbar";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-4">Contact <span className="text-white">Us</span></h1>
          <p className="text-white/50 font-medium max-w-2xl mx-auto">Have a question, business inquiry, or found a bug? Get in touch with the team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#12131c] border border-white/5 p-8 rounded-2xl text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Business & Ads</h3>
            <p className="text-white/50 text-sm mb-4">For sponsorship opportunities and direct ad placements.</p>
            <a href="mailto:business@forthub.mock" className="text-primary font-bold hover:underline">business@forthub.mock</a>
          </div>
          
          <div className="bg-[#5865F2]/10 border border-[#5865F2]/30 p-8 rounded-2xl text-center">
            <MessageSquare className="w-12 h-12 text-[#5865F2] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2 text-[#5865F2]">Community Support</h3>
            <p className="text-white/50 text-sm mb-4">Join our Discord server for immediate community help.</p>
            <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-6 py-2 rounded transition-colors">Join Discord</button>
          </div>
        </div>
      </div>
    </>
  );
}
