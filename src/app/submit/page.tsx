"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { GitPullRequest, Search, FileText, AlertTriangle, Activity } from "lucide-react";

export default function SubmitPage() {
  const [formData, setFormData] = useState({ type: 'news-tip', title: '', details: '', credit: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{msg: string, isError: boolean} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.details) {
      setStatus({ msg: 'Please provide a title and details.', isError: true });
      return;
    }
    
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus({ msg: `Successfully submitted! Reference: ${data.submission.id}. ${data.dbStatus === 'NEEDS_DATABASE' ? '(Warning: No database connected)' : ''}`, isError: false });
        setFormData({ type: 'news-tip', title: '', details: '', credit: '' });
      } else {
        setStatus({ msg: data.error || 'Failed to submit', isError: true });
      }
    } catch (err: any) {
      setStatus({ msg: 'Network error occurred.', isError: true });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black uppercase text-primary mb-6 flex items-center justify-center gap-4">
            <GitPullRequest className="w-12 h-12 text-white" /> Fan <span className="text-white">Contributions</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Help us keep FortHub accurate and up-to-date. Submit your findings, corrections, and map codes for manual review by our editorial team.</p>
        </div>

        <div className="bg-[#12131c] border border-white/5 rounded-xl p-8 mb-8 relative">
          {status && (
            <div className={`mb-6 p-4 rounded text-sm font-bold border ${status.isError ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-green-500/10 border-green-500 text-green-400'}`}>
              {status.msg}
            </div>
          )}

          <h2 className="text-2xl font-bold text-white uppercase mb-6 border-b border-white/5 pb-4">Create New Submission</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Contribution Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-[#05050a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-primary appearance-none">
                <option value="news-tip">News Tip / Leak</option>
                <option value="guide-suggestion">Guide Suggestion</option>
                <option value="xp-map">XP Map Code</option>
                <option value="correction">Correction / Typo</option>
                <option value="clip-link">Clip Link</option>
                <option value="sponsor">Sponsor Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Typo in 'Best Settings' guide" className="w-full bg-[#05050a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Details / Source Link</label>
              <textarea value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="Provide details, map codes, or links to the official source..." rows={5} className="w-full bg-[#05050a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-primary"></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Credit Name (Optional)</label>
              <input type="text" value={formData.credit} onChange={(e) => setFormData({...formData, credit: e.target.value})} placeholder="Your Twitter handle or Epic ID" className="w-full bg-[#05050a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-primary" />
            </div>

            <div className="pt-4 border-t border-white/5">
              <button type="submit" disabled={loading} className="bg-primary hover:bg-primary-hover text-black font-black uppercase px-8 py-4 rounded transition-colors w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Activity className="w-5 h-5 animate-spin" /> : <GitPullRequest className="w-5 h-5 fill-black" />} 
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4">* Note: All submissions are staged securely and do not go live without manual admin approval.</p>
            </div>
          </form>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-bold text-primary uppercase text-sm mb-1">Safety Policy</h4>
            <p className="text-xs text-white/60 leading-relaxed">Do not submit malicious links, self-promotion outside of the credit field, or content that violates the Epic Games Fan Site Policy. Submitting false reports will result in an IP ban from the contribution queue.</p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white">Status: READY</h3>
            <p className="mt-1 text-sm text-white/60">
              Submission queue is open for manual review.
            </p>
          </div>
          <a
            href="/"
            className="rounded-xl bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20 transition"
          >
            Return Home
          </a>
        </div>
      </div>
    </>
  );
}
