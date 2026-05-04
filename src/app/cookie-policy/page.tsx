import Navbar from "@/components/Navbar";

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-black uppercase mb-8 border-b border-white/10 pb-4">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold text-white">What Are Cookies</h2>
          <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
          <h2 className="text-2xl font-bold text-white">How We Use Cookies</h2>
          <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
          <h2 className="text-2xl font-bold text-white">The Cookies We Set</h2>
          <ul>
            <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it.</li>
            <li><strong>Third Party Cookies:</strong> In some special cases we also use cookies provided by trusted third parties, such as Google Analytics and advertising partners.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
