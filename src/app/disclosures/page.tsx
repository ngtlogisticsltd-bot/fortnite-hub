import Navbar from "@/components/Navbar";

export default function AffiliateDisclosures() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8 border-b border-white/10 pb-4">Affiliate Disclosures</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-white mt-8">Unofficial Fan Site</h2>
          <p>FortHub is an independent, community-driven platform. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Epic Games, Inc., or any of its subsidiaries or its affiliates. The official Fortnite website can be found at <a href="https://www.fortnite.com" className="text-primary hover:underline">www.fortnite.com</a>.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8">Data Sources & APIs</h2>
          <p>All game data, item shop rotations, and cosmetic images are retrieved via public APIs or official embeds. User submissions are manually reviewed before publishing to ensure compliance with community safety guidelines.</p>

          <h2 className="text-2xl font-bold text-white mt-8">Embedded Media Policy</h2>
          <p>FortHub embeds third-party content using official platform embed tools (YouTube, Twitch, TikTok, X, Instagram). Embedded content remains owned by the original creators and platforms. FortHub adds original commentary, analysis, organization, and editorial tools around embedded content. We never download, re-upload, or claim ownership of creator media.</p>

          <h2 className="text-2xl font-bold text-white mt-8">AI-Generated Content Disclosure</h2>
          <p>FortHub produces AI-generated media plans including scripts, storyboards, thumbnail concepts, and captions. These are original creative drafts and must not incorporate copyrighted footage without permission. All AI-generated content is clearly labeled.</p>

          <h2 className="text-2xl font-bold text-white mt-8">Epic Games Support-A-Creator</h2>
          <p>In connection with Epic Games&apos; Support-A-Creator Program, we may receive a commission from certain in-game purchases when you use our creator code.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8">Amazon Associates</h2>
          <p>FortHub is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8">Weekly Fan Draws</h2>
          <p>Our weekly draws are community engagement activities and are always free to enter. We do not charge for entry, and winning does not require any form of payment or purchase. These draws are not associated with or endorsed by Epic Games.</p>
        </div>
      </div>
    </>
  );
}
