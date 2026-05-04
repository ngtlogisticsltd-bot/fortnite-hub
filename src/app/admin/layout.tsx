"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import AdminCommandNav from '@/components/admin/AdminCommandNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [health, setHealth] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(() => setHealth({ status: 'offline' }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 'r') {
        showToast("Executing Global Run Cycle...");
        fetch('/api/reaper/run', { method: 'POST' }).then(() => {
          showToast("Cycle execution requested.");
        });
      } else if (key === 'd') {
        router.push('/admin/daily');
      } else if (key === 'b') {
        router.push('/admin/bots');
      } else if (key === 'g') {
        router.push('/admin/growth');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="flex h-screen bg-[#05050a] text-white overflow-hidden">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-primary text-black px-6 py-3 rounded-full font-black shadow-[0_0_30px_rgba(0,255,157,0.5)] animate-in fade-in slide-in-from-top-4 duration-300">
          {toast}
        </div>
      )}

      <AdminCommandNav health={health} />

      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#05050a] to-[#0a0b10] custom-scrollbar">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
