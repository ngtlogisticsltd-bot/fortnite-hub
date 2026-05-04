"use client";
import { useState, useEffect } from 'react';
import { GitPullRequest, Check, X, AlertCircle, Database } from 'lucide-react';

export default function AdminSubmissionsDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [dbStatus, setDbStatus] = useState<string>('CONNECTING');
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'}|null>(null);

  useEffect(() => {
    fetch('/api/submissions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSubmissions(data.submissions || []);
          setDbStatus(data.dbStatus);
        }
      })
      .catch(err => {
        setDbStatus('ERROR');
      });
  }, []);

  const showMessage = (text: string, type: 'success'|'error') => {
    setMessage({text, type});
    setTimeout(() => setMessage(null), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'needs-review': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    // Optimistic UI update
    setSubmissions(subs => subs.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
    showMessage(`Submission ${id} marked as ${newStatus}`, 'success');
    
    // In a real app, we would PUT/PATCH to /api/submissions here
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl z-50 font-bold border ${message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <GitPullRequest className="w-8 h-8 text-primary" /> Submissions Queue
          </h2>
          <p className="text-white/50 text-sm mt-1">Review community contributions (News Tips, Map Codes, Corrections).</p>
        </div>
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-white/30" />
          <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
            dbStatus === 'CONNECTED' ? 'bg-green-500/20 text-green-400' : 
            dbStatus === 'NEEDS_DATABASE' ? 'bg-red-500/20 text-red-400' : 
            'bg-gray-500/20 text-gray-400'
          }`}>
            DB: {dbStatus}
          </span>
        </div>
      </div>

      <div className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <h3 className="font-bold text-lg text-white uppercase flex items-center gap-2"><AlertCircle className="w-5 h-5 text-yellow-400" /> Pending Review</h3>
          <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold">{submissions.filter(s => s.status === 'pending' || s.status === 'needs-review').length} Active</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {submissions.length === 0 ? (
            <div className="p-10 text-center text-white/30 italic">No submissions found.</div>
          ) : submissions.map((sub) => (
            <div key={sub.id} className="p-6 hover:bg-white/5 transition-colors flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-white/50">{sub.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${getStatusColor(sub.status)}`}>
                    {sub.status.replace('-', ' ')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-white/30 tracking-wider bg-white/5 px-2 py-0.5 rounded">
                    {sub.type}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{sub.title}</h4>
                <p className="text-sm text-white/50">Submitted by <span className="font-bold text-primary">@{sub.user}</span> • {new Date(sub.date).toLocaleString()}</p>
              </div>
              
              {sub.status === 'pending' || sub.status === 'needs-review' ? (
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button onClick={() => handleStatusUpdate(sub.id, 'approved')} className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 font-bold text-xs uppercase px-4 py-2 rounded flex items-center gap-2 transition-colors">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => handleStatusUpdate(sub.id, 'rejected')} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs uppercase px-4 py-2 rounded flex items-center gap-2 transition-colors">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
