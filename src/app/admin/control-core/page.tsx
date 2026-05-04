"use client";
import { useState, useEffect } from 'react';
import { Shield, GitBranch, Globe, Server, BarChart, Mail, DollarSign, Share2, AlertTriangle, Save, CheckCircle2, ChevronRight, Lock, Zap } from 'lucide-react';

export default function ControlCorePage() {
  const [data, setData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/control-core');
      const json = await res.json();
      if (json.success) {
        setData(json);
        setFormData(json.maskedData);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      // Filter out masked values that weren't changed
      const updates: any = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] && !formData[key].includes('********')) {
          updates[key] = formData[key];
        }
      });

      const res = await fetch('/api/control-core', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: 'Control Core updated successfully.' });
        fetchData();
      } else {
        setMessage({ type: 'error', text: json.error || 'Failed to update.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error.' });
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-white/50">Initializing Control Core...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white flex items-center gap-4">
            <Shield className="w-10 h-10 text-primary" /> Control Core
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-2xl">
            One-stop setup for FortHub operations. Enter your production details here to power the entire autonomous fleet.
          </p>
        </div>
        <div className="bg-[#12131c] border border-primary/20 px-6 py-3 rounded-xl">
          <p className="text-[10px] font-black uppercase text-white/50 tracking-widest">Setup Status</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${data.summary.percentComplete}%` }}></div>
            </div>
            <p className="text-sm font-bold text-white">{data.summary.percentComplete}% Complete</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 border ${
          message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <p className="font-bold">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Setup Form */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-[#12131c] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Master Integration Vault
              </h3>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/80 text-black px-4 py-2 rounded font-black uppercase text-xs flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save All Updates</>}
              </button>
            </div>

            <div className="p-8 space-y-8">
              
              {/* Deploy Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Deployment & Domain
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">GitHub Repo URL</label>
                    <input name="githubRepo" value={formData.githubRepo} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Vercel Project ID</label>
                    <input name="vercelProject" value={formData.vercelProject} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Live Domain (e.g. forthub.com)</label>
                    <input name="domain" value={formData.domain} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                </div>
              </div>

              {/* Admin Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Admin Access
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Admin Username</label>
                    <input name="adminUser" value={formData.adminUser} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Admin Password</label>
                    <input name="adminPass" type="password" value={formData.adminPass} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                </div>
              </div>

              {/* Database Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Server className="w-4 h-4" /> Supabase Database
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Supabase Project URL</label>
                    <input name="supabaseUrl" value={formData.supabaseUrl} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Anon Key</label>
                    <input name="supabaseAnonKey" type="password" value={formData.supabaseAnonKey} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Service Role Key (CRITICAL)</label>
                    <input name="supabaseServiceRoleKey" type="password" value={formData.supabaseServiceRoleKey} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                </div>
              </div>

              {/* Marketing Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <BarChart className="w-4 h-4" /> Analytics & Marketing
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Analytics Provider</label>
                    <select name="analyticsProvider" value={formData.analyticsProvider} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none">
                      <option value="Google Analytics">Google Analytics</option>
                      <option value="Plausible">Plausible</option>
                      <option value="Umami">Umami</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Tracking ID</label>
                    <input name="analyticsId" value={formData.analyticsId} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Newsletter Provider</label>
                    <input name="newsletterProvider" value={formData.newsletterProvider} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Newsletter API Key</label>
                    <input name="newsletterApiKey" type="password" value={formData.newsletterApiKey} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                </div>
              </div>

              {/* Revenue Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Revenue & Affiliates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Ad Client ID (AdSense)</label>
                    <input name="adClientId" value={formData.adClientId} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Amazon Affiliate ID</label>
                    <input name="affiliateAmazon" value={formData.affiliateAmazon} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Epic Creator Code</label>
                    <input name="affiliateEpic" value={formData.affiliateEpic} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                </div>
              </div>

              {/* Social Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Social & External APIs
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">YouTube API Key</label>
                    <input name="youtubeApiKey" type="password" value={formData.youtubeApiKey} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Discord Webhook</label>
                    <input name="discordWebhookUrl" type="password" value={formData.discordWebhookUrl} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">X API Key</label>
                    <input name="xApiKey" type="password" value={formData.xApiKey} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-white/30 mb-1 ml-1">Meta Access Token</label>
                    <input name="metaAccessToken" type="password" value={formData.metaAccessToken} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:border-primary/50 outline-none" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sidebar: Next Actions & Missing Data */}
        <div className="space-y-8">
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-bold text-primary uppercase text-sm mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Next Best Actions
            </h3>
            <ul className="space-y-3">
              {data.nextBestActions.map((action: string, i: number) => (
                <li key={i} className="text-sm text-white flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#12131c] border border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-white uppercase text-sm mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> Missing Configuration
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.missingFields.length === 0 ? (
                <p className="text-xs text-green-400 font-bold">All systems GO!</p>
              ) : (
                data.missingFields.map((field: string) => (
                  <span key={field} className="text-[9px] bg-white/5 text-white/40 px-2 py-1 rounded font-mono">
                    {field}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-red-400 uppercase text-sm flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Safety Protocol
            </h3>
            <ul className="text-xs text-red-400/80 space-y-2 list-disc list-inside">
              <li>Never expose service role keys publicly.</li>
              <li>Do not commit your .env.local file.</li>
              <li>Always label sites as Unofficial.</li>
              <li>Review automated commentary before publishing.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

function Rocket(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  )
}

function ShieldAlert(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}
