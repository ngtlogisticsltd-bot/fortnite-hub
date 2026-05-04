"use client";
import { MonitorSmartphone, Download, ShieldCheck } from 'lucide-react';

export default function AppInstallPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-widest text-white">FortHub Control App</h2>
        <p className="text-white/50 text-sm mt-1">Install the Progressive Web App to use FortHub as a standalone desktop or mobile app.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#12131c] border border-white/10 rounded-xl p-8">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30">
            <MonitorSmartphone className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Desktop Installation (Chrome/Edge)</h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex gap-4"><span className="font-black text-primary">1.</span> Look for the install icon (usually a monitor with an arrow) in the right side of your address bar.</li>
            <li className="flex gap-4"><span className="font-black text-primary">2.</span> Click "Install FortHub Control".</li>
            <li className="flex gap-4"><span className="font-black text-primary">3.</span> The app will now open in a secure, standalone window, acting as your local WARLOCK control panel.</li>
            <li className="flex gap-4"><span className="font-black text-primary">4.</span> Pin it to your taskbar or dock for instant access.</li>
          </ul>
        </div>

        <div className="bg-[#12131c] border border-white/10 rounded-xl p-8">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
            <Download className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Mobile Installation (iOS/Android)</h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex gap-4"><span className="font-black text-blue-400">iOS:</span> Open in Safari, tap the Share button at the bottom, and select "Add to Home Screen".</li>
            <li className="flex gap-4"><span className="font-black text-green-400">Android:</span> Open in Chrome, tap the three dots menu, and select "Install app" or "Add to Home screen".</li>
            <li className="flex gap-4"><ShieldCheck className="w-5 h-5 text-white/50 shrink-0" /> Note: Administrative routes remain protected by basic auth even when launched from the home screen.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
