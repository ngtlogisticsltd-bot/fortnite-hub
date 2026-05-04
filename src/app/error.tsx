"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (Mock Error Monitoring Bot)
    console.error("REAPER Error Bot Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <AlertOctagon className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-black uppercase mb-2">Something went wrong!</h2>
      <p className="text-white/50 mb-6">Our automated engineering bots have been notified.</p>
      <button
        className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-6 py-3 rounded transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
