"use client";
import { CheckSquare, Globe, Server, Shield, Database, BarChart, Mail, DollarSign, Users, Link2, MonitorSmartphone } from 'lucide-react';
import AutoFillPanel from '@/components/admin/AutoFillPanel';

export default function SetupChecklistDashboard() {
  const sections = [
    {
      title: "1. Domain",
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      items: ["Buy domain", "Connect DNS", "Set NEXT_PUBLIC_SITE_URL", "Verify SSL"]
    },
    {
      title: "2. Vercel Hosting",
      icon: <Server className="w-5 h-5 text-gray-300" />,
      items: ["Connect GitHub repo", "Import project", "Add env vars", "Deploy production", "Check build logs"]
    },
    {
      title: "3. Security",
      icon: <Shield className="w-5 h-5 text-red-400" />,
      items: ["Change ADMIN_USER", "Change ADMIN_PASS", "Remove secure123", "Keep /admin blocked in robots"]
    },
    {
      title: "4. Supabase Database",
      icon: <Database className="w-5 h-5 text-green-400" />,
      items: ["Create project", "Add DATABASE_URL", "Create table: submissions", "Create table: staged_content", "Create table: sponsor_campaigns", "Create table: click_events", "Create table: newsletter_signups"]
    },
    {
      title: "5. Analytics",
      icon: <BarChart className="w-5 h-5 text-yellow-400" />,
      items: ["Choose provider", "Add NEXT_PUBLIC_ANALYTICS_ID", "No fake numbers"]
    },
    {
      title: "6. Newsletter",
      icon: <Mail className="w-5 h-5 text-orange-400" />,
      items: ["Choose provider", "Add provider key", "Connect signup form"]
    },
    {
      title: "7. Ad Network",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      items: ["Finish 15+ original guide/news pages before applying", "Add AdSense ID only after approval", "Keep original content high quality"]
    },
    {
      title: "8. Affiliates",
      icon: <Link2 className="w-5 h-5 text-purple-400" />,
      items: ["Create affiliate accounts", "Add affiliate disclosure", "Add config safely"]
    },
    {
      title: "9. Sponsors",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      items: ["Finish /media-kit", "Create sponsor inquiry flow", "Add manual approval"]
    },
    {
      title: "10. Social APIs",
      icon: <MonitorSmartphone className="w-5 h-5 text-pink-400" />,
      items: ["YouTube API", "Reddit API", "Discord webhook", "TikTok/Meta/X tools", "Keep posting manual until approved"]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-primary" /> Launch Checklist
          </h2>
          <p className="text-white/50 text-sm mt-1">Real-world production readiness and deployment steps.</p>
        </div>
      </div>

      <AutoFillPanel context="setup" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-[#12131c] border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-2">
              {section.icon}
              <h3 className="font-bold text-white text-lg">{section.title}</h3>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded bg-background border-white/20" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
