'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Briefcase, Users, FileText, MessageSquare, BarChart2, Settings, ClipboardList, Star, TrendingUp, MapPin, HelpCircle, Award } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, employers: 0, applications: 0, contacts: 0, talent_requests: 0 });

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      // Fetch counts in parallel
      const [jobs, candidates, employers, apps, contacts, talent] = await Promise.all([
        insforge.database.from('jobs').select('id', { count: 'exact', head: true }),
        insforge.database.from('candidate_profiles').select('id', { count: 'exact', head: true }),
        insforge.database.from('employer_profiles').select('id', { count: 'exact', head: true }),
        insforge.database.from('applications').select('id', { count: 'exact', head: true }),
        insforge.database.from('contact_submissions').select('id', { count: 'exact', head: true }),
        insforge.database.from('talent_requests').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        jobs: (jobs as { count?: number }).count ?? 0,
        candidates: (candidates as { count?: number }).count ?? 0,
        employers: (employers as { count?: number }).count ?? 0,
        applications: (apps as { count?: number }).count ?? 0,
        contacts: (contacts as { count?: number }).count ?? 0,
        talent_requests: (talent as { count?: number }).count ?? 0,
      });
    }
    load();
  }, []);

  const statCards = [
    { label: 'Active Jobs', value: stats.jobs, icon: Briefcase, color: 'text-blue-600 bg-blue-100' },
    { label: 'Candidates', value: stats.candidates, icon: Users, color: 'text-purple-600 bg-purple-100' },
    { label: 'Employers', value: stats.employers, icon: Star, color: 'text-yellow-600 bg-yellow-100' },
    { label: 'Applications', value: stats.applications, icon: FileText, color: 'text-green-600 bg-green-100' },
    { label: 'Contact Submissions', value: stats.contacts, icon: MessageSquare, color: 'text-pink-600 bg-pink-100' },
    { label: 'Talent Requests', value: stats.talent_requests, icon: ClipboardList, color: 'text-indigo-600 bg-indigo-100' },
  ];

  const navItems = [
    { href: '/dashboard/admin/jobs', label: 'Manage Jobs', desc: 'Review and edit all job listings', icon: Briefcase },
    { href: '/dashboard/admin/candidates', label: 'Candidates', desc: 'Browse and manage candidate profiles', icon: Users },
    { href: '/dashboard/admin/employers', label: 'Employers', desc: 'Review employer accounts', icon: Star },
    { href: '/dashboard/admin/applications', label: 'Applications', desc: 'Monitor all applications', icon: FileText },
    { href: '/dashboard/admin/contacts', label: 'Contact Submissions', desc: 'Review inbound contact requests', icon: MessageSquare },
    { href: '/dashboard/admin/talent-requests', label: 'Talent Requests', desc: 'Manage employer talent requests', icon: ClipboardList },
    { href: '/dashboard/admin/blog', label: 'Blog / Insights', desc: 'Create and manage blog posts', icon: BarChart2 },
    { href: '/dashboard/admin/users', label: 'Users', desc: 'View all registered users', icon: Users },
    { href: '/dashboard/admin/analytics', label: 'Analytics', desc: 'Platform performance overview', icon: TrendingUp },
    { href: '/dashboard/admin/salary-data', label: 'Salary Data', desc: 'Manage salary guide data points', icon: BarChart2 },
    { href: '/dashboard/admin/placements', label: 'Placements', desc: 'Log and track successful placements', icon: MapPin },
    { href: '/dashboard/admin/faqs', label: 'FAQs', desc: 'Manage site FAQ content', icon: HelpCircle },
    { href: '/dashboard/admin/testimonials', label: 'Testimonials', desc: 'Manage client testimonials', icon: Award },
    { href: '/dashboard/admin/settings', label: 'Settings', desc: 'Site configuration and admin tools', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D4AF37] font-semibold text-sm mb-1">Admin Panel</p>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Dashboard Overview</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${color}`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-[#1A3A8F]">{value.toLocaleString()}</p>
              <p className="text-xs text-[#4A5568] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Nav grid */}
        <div>
          <h2 className="text-lg font-bold text-[#1A3A8F] mb-4">Admin Sections</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {navItems.map(({ href, label, desc, icon: Icon }) => (
              <Link key={href} href={href}
                className="group bg-white rounded-xl border border-[#E2E8F0] p-5 hover:border-[#D4AF37] hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-[#1A3A8F] group-hover:text-[#D4AF37] transition-colors text-sm mb-1">{label}</h3>
                <p className="text-xs text-[#4A5568]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
