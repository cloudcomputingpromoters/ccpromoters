'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Clock } from 'lucide-react';

const statusStyles: Record<string, { label: string; color: string }> = {
  applied:             { label: 'Applied',         color: 'bg-[#F5F5F5] text-[#0D0D0D]' },
  under_review:        { label: 'Under Review',    color: 'bg-yellow-100 text-yellow-700' },
  shortlisted:         { label: 'Shortlisted',     color: 'bg-purple-100 text-purple-700' },
  interview_scheduled: { label: 'Interview',       color: 'bg-indigo-100 text-indigo-700' },
  offer_made:          { label: 'Offer Made',      color: 'bg-green-100 text-green-700' },
  hired:               { label: 'Hired',           color: 'bg-emerald-100 text-emerald-700' },
  not_progressing:     { label: 'Not Progressing', color: 'bg-red-100 text-red-700' },
  withdrawn:           { label: 'Withdrawn',       color: 'bg-gray-100 text-gray-500' },
};

export default function AdminApplicationsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    insforge.database
      .from('applications')
      .select('id, status, applied_at, jobs(title), candidate_profiles(first_name, last_name)')
      .order('applied_at', { ascending: false })
      .limit(200)
      .then(({ data }) => { setApplications(data || []); setLoading(false); });
  }, []);

  const filtered = filterStatus ? applications.filter(a => a.status === filterStatus) : applications;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Applications ({applications.length})</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setFilterStatus('')}
            className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition-colors ${!filterStatus ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]' : 'border-[#E5E5E5] text-[#6B6B6B]'}`}>
            All
          </button>
          {Object.entries(statusStyles).map(([key, { label }]) => (
            <button key={key} onClick={() => setFilterStatus(key)}
              className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition-colors ${filterStatus === key ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]' : 'border-[#E5E5E5] text-[#6B6B6B]'}`}>
              {label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D]">Candidate</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D]">Job</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D] hidden md:table-cell">Applied</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0D0D0D]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {filtered.map((app: { id: string; status: string; applied_at: string; jobs?: { title: string }; candidate_profiles?: { first_name?: string; last_name?: string } }) => {
                  const si = statusStyles[app.status] || { label: app.status, color: 'bg-gray-100 text-gray-600' };
                  return (
                    <tr key={app.id} className="hover:bg-[#F5F5F5] transition-colors">
                      <td className="px-4 py-3 font-medium text-[#0D0D0D]">{app.candidate_profiles?.first_name} {app.candidate_profiles?.last_name}</td>
                      <td className="px-4 py-3 text-[#6B6B6B]">{app.jobs?.title}</td>
                      <td className="px-4 py-3 text-[#6B6B6B] hidden md:table-cell">
                        <span className="flex items-center gap-1"><Clock size={12} />{new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${si.color}`}>{si.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-12 text-center text-[#6B6B6B] text-sm">No applications found.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
