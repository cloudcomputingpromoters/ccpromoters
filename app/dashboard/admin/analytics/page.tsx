'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { TrendingUp, Users, Briefcase, FileText } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState({
    totalJobs: 0, activeJobs: 0, totalCandidates: 0, totalEmployers: 0,
    totalApplications: 0, totalContacts: 0, totalTalentRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const [jobs, activeJobs, candidates, employers, apps, contacts, talent] = await Promise.all([
        insforge.database.from('jobs').select('id', { count: 'exact', head: true }),
        insforge.database.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        insforge.database.from('candidate_profiles').select('id', { count: 'exact', head: true }),
        insforge.database.from('employer_profiles').select('id', { count: 'exact', head: true }),
        insforge.database.from('applications').select('id', { count: 'exact', head: true }),
        insforge.database.from('contact_submissions').select('id', { count: 'exact', head: true }),
        insforge.database.from('talent_requests').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        totalJobs: (jobs as { count?: number }).count ?? 0,
        activeJobs: (activeJobs as { count?: number }).count ?? 0,
        totalCandidates: (candidates as { count?: number }).count ?? 0,
        totalEmployers: (employers as { count?: number }).count ?? 0,
        totalApplications: (apps as { count?: number }).count ?? 0,
        totalContacts: (contacts as { count?: number }).count ?? 0,
        totalTalentRequests: (talent as { count?: number }).count ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: 'Total Jobs', value: stats.totalJobs, sub: `${stats.activeJobs} active`, icon: Briefcase, color: 'text-blue-600 bg-[#F5F5F5]' },
    { label: 'Candidates', value: stats.totalCandidates, sub: 'registered profiles', icon: Users, color: 'text-purple-600 bg-purple-100' },
    { label: 'Employers', value: stats.totalEmployers, sub: 'company accounts', icon: TrendingUp, color: 'text-yellow-600 bg-yellow-100' },
    { label: 'Applications', value: stats.totalApplications, sub: 'total submissions', icon: FileText, color: 'text-green-600 bg-green-100' },
    { label: 'Contact Leads', value: stats.totalContacts, sub: 'inbound inquiries', icon: FileText, color: 'text-pink-600 bg-pink-100' },
    { label: 'Talent Requests', value: stats.totalTalentRequests, sub: 'employer requests', icon: FileText, color: 'text-indigo-600 bg-indigo-100' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Analytics</h1>
          <p className="text-white/70 text-sm mt-1">Platform performance overview</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{[1,2,3,4,5,6].map(i => <div key={i} className="h-28 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-3xl font-bold text-[#0D0D0D]">{value.toLocaleString()}</p>
                <p className="text-sm font-semibold text-[#0D0D0D] mt-0.5">{label}</p>
                <p className="text-xs text-[#6B6B6B]">{sub}</p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h2 className="font-bold text-[#0D0D0D] mb-4">Key Ratios</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-[#CC1016]">
                {stats.totalJobs > 0 ? (stats.totalApplications / stats.totalJobs).toFixed(1) : '—'}
              </p>
              <p className="text-sm text-[#6B6B6B] mt-1">Applications per Job</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#CC1016]">
                {stats.totalCandidates > 0 ? Math.round((stats.totalApplications / stats.totalCandidates) * 100) + '%' : '—'}
              </p>
              <p className="text-sm text-[#6B6B6B] mt-1">Candidate Engagement Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#CC1016]">
                {stats.totalEmployers > 0 ? (stats.totalJobs / stats.totalEmployers).toFixed(1) : '—'}
              </p>
              <p className="text-sm text-[#6B6B6B] mt-1">Jobs per Employer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
