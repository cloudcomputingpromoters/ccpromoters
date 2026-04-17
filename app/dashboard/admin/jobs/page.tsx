'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Search, Eye, Edit3 } from 'lucide-react';

export default function AdminJobsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    insforge.database
      .from('jobs')
      .select('id, title, slug, discipline, employment_type, location_city, location_state, is_remote, status, posted_at, applications(count)')
      .order('posted_at', { ascending: false })
      .limit(200)
      .then(({ data }) => { setJobs(data || []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    await insforge.database.from('jobs').update({ status }).eq('id', id);
    setJobs(prev => prev.map(j => j.id === id ? {...j, status} : j));
  }

  const filtered = jobs.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusColor: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-gray-100 text-gray-500',
    filled: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Manage Jobs</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..."
              className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors bg-white">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
            <option value="filled">Filled</option>
          </select>
          <Link href="/dashboard/employer/post-job" className="bg-[#D4AF37] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#B8960C] transition-colors">+ Post Job</Link>
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F7F9FC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F]">Job Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F] hidden md:table-cell">Discipline</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F] hidden lg:table-cell">Apps</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F]">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filtered.map((job: { id: string; title: string; slug: string; discipline?: string; status: string; applications?: { count: number }[] }) => (
                  <tr key={job.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#1A3A8F]">{job.title}</td>
                    <td className="px-4 py-3 text-[#4A5568] hidden md:table-cell capitalize">{job.discipline?.replace(/-/g,' ')}</td>
                    <td className="px-4 py-3 text-[#4A5568] hidden lg:table-cell">{job.applications?.[0]?.count ?? 0}</td>
                    <td className="px-4 py-3">
                      <select value={job.status} onChange={e => updateStatus(job.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 focus:outline-none cursor-pointer ${statusColor[job.status] || 'bg-gray-100 text-gray-500'}`}>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="closed">Closed</option>
                        <option value="filled">Filled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <a href={`/jobs/${job.slug}`} target="_blank" rel="noreferrer" className="p-1.5 text-[#4A5568] hover:text-[#D4AF37] transition-colors"><Eye size={15} /></a>
                        <Link href={`/dashboard/employer/listings/${job.id}/edit`} className="p-1.5 text-[#4A5568] hover:text-[#D4AF37] transition-colors"><Edit3 size={15} /></Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-[#4A5568] text-sm">No jobs found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
