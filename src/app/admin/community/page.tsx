"use client";
import { Users, Mail, Video, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function AdminCommunityDashboard() {
  const submissions = [
    { id: 1, type: "Clip", user: "NinjaFan99", content: "https://youtube.com/watch?v=...", status: "PENDING", risk: "Medium" },
    { id: 2, type: "App", user: "CreativeBuilder", content: "I build XP maps and want to write guides.", status: "PENDING", risk: "Low" },
    { id: 3, type: "Newsletter", user: "user@example.com", content: "Subscribed to Daily Drop", status: "APPROVED", risk: "None" }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" /> Community Moderation
          </h2>
          <p className="text-white/50 text-sm mt-1">Review fan submissions, clip highlights, and team applications.</p>
        </div>
      </div>

      <AutoFillPanel context="social" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-white uppercase">Clip Queue</h3>
          </div>
          <p className="text-3xl font-black text-primary">12</p>
          <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase tracking-wider mt-2 inline-block">Needs Review</span>
        </div>
        
        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-green-400" />
            <h3 className="font-bold text-lg text-white uppercase">Team Apps</h3>
          </div>
          <p className="text-3xl font-black text-green-400">4</p>
          <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded uppercase tracking-wider mt-2 inline-block">Needs Review</span>
        </div>

        <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg text-white uppercase">Newsletter</h3>
          </div>
          <p className="text-3xl font-black text-blue-400">1,204</p>
          <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-2 py-1 rounded uppercase tracking-wider mt-2 inline-block">Mock Data</span>
        </div>
      </div>

      <div className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-black/20">
          <h3 className="font-bold text-lg text-white uppercase">Moderation Queue</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{sub.type}</td>
                  <td className="px-6 py-4 font-mono text-white/50">{sub.user}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{sub.content}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                      sub.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {sub.status === 'PENDING' && (
                      <>
                        <button className="text-green-400 hover:text-green-300 transition-colors" title="Approve"><CheckCircle2 className="w-5 h-5 inline" /></button>
                        <button className="text-red-400 hover:text-red-300 transition-colors" title="Reject"><XCircle className="w-5 h-5 inline" /></button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center border-t border-white/5 text-xs text-white/30 uppercase tracking-widest italic">
            Note: Moderation actions are currently mocked until database integration.
          </div>
        </div>
      </div>
    </div>
  );
}
