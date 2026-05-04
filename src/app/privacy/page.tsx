import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8 border-b border-white/10 pb-4">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
          <p>Welcome to FortHub. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          <h2 className="text-2xl font-bold text-white">2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you, including Identity Data, Contact Data, Technical Data (IP address, browser type), and Usage Data.</p>
          <h2 className="text-2xl font-bold text-white">3. Third-Party Links & Ads</h2>
          <p>This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We use third-party advertising companies to serve ads when you visit our website.</p>
          <h2 className="text-2xl font-bold text-white">4. Epic Games Disclaimer</h2>
          <p>Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.</p>
        </div>
      </div>
    </>
  );
}
