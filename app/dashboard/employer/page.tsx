'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import Link from 'next/link';
import { Briefcase, Eye, PlusCircle, Users, Star, BarChart2 } from 'lucide-react';

const statusColors: Record<string, string> = {
  active:  'bg-green-100 text-green-700',
  draft:   'bg-gray-100 text-gray-600',
  paused:  'bg-yellow-100 text-yellow-700',
  closed:  'bg-red-100 text-red-700',
  expired: 'bg-red-50 text-red-500',
  filled:  'bg-[#F5F5F5] text-[#0D0D0D]',
};

export default function EmployerDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) return;
      const userId = userData.user.id;

      const { data: jobList } = await insforge.database
        .from('jobs')
        .select('id, title, slug, discipline, status, view_count, is_featured, posted_at, employment_type, applications(count)')
        .eq('posted_by', userId)
        .order('created_at', { ascending: false });

      const list = jobList || [];
      setJobs(list);
      setTotalApplicants(list.reduce((sum: number, j: { applications?: { count: number }[] }) => sum + (j.applications?.[0]?.count ?? 0), 0));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}
      </div>
    );
  }

  const activeJobs = jobs.filter(j => j.status === 'active');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs',       value: activeJobs.length,                                      icon: Briefcase, color: '#CC1016' },
          { label: 'Total Listings',    value: jobs.length,                                            icon: BarChart2, color: '#0D0D0D' },
          { label: 'Total Views',       value: jobs.reduce((s, j) => s + (j.view_count || 0), 0),     icon: Eye,       color: '#CC1016' },
          { label: 'Total Applicants',  value: totalApplicants,                                        icon: Users,     color: '#0D0D0D' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#E5E5E5] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: stat.color + '20' }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0D0D0D]">{stat.value}</div>
              <div className="text-xs text-[#6B6B6B]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#0D0D0D] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-white font-bold text-xl mb-1">Need to hire a civil engineer?</h3>
          <p className="text-white/70 text-sm">Post a job and receive pre-screened candidates within 48 hours.</p>
        </div>
        <Link href="/dashboard/employer/post-job"
          className="bg-[#CC1016] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#A80D12] transition-colors whitespace-nowrap flex items-center gap-2 shrink-0">
          <PlusCircle size={18} /> Post a Job
        </Link>
      </div>

      {/* Recent listings */}
      {jobs.length > 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#0D0D0D]">Recent Listings</h3>
            <Link href="/dashboard/employer/listings" className="text-[#CC1016] text-sm font-semibold hover:underline">
              Manage All →
            </Link>
          </div>
          <div className="space-y-0">
            {jobs.slice(0, 5).map(job => (
              <div key={job.id} className="flex items-center justify-between py-3.5 border-b border-[#E5E5E5] last:border-0 gap-3">
                <div className="flex-1 min-w-0">
                  <Link href={`/jobs/${job.slug}`} target="_blank"
                    className="font-semibold text-[#0D0D0D] hover:text-[#CC1016] text-sm transition-colors truncate block">
                    {job.title} {job.is_featured && <Star size={12} className="inline text-yellow-500 ml-1" />}
                  </Link>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-[#6B6B6B]">
                    <span>{job.discipline}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {job.view_count || 0}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {job.applications?.[0]?.count ?? 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[job.status] || 'bg-gray-100'}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <Link href={`/dashboard/employer/listings/${job.id}/edit`}
                    className="text-xs text-[#CC1016] font-semibold hover:underline">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-12 text-center">
          <Briefcase size={48} className="text-[#E5E5E5] mx-auto mb-4" />
          <h4 className="font-bold text-[#0D0D0D] mb-2">No listings yet</h4>
          <p className="text-[#6B6B6B] text-sm mb-5">Post your first civil engineering job to start receiving applications.</p>
          <Link href="/dashboard/employer/post-job"
            className="bg-[#CC1016] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#A80D12] transition-colors text-sm inline-block">
            Post a Job
          </Link>
        </div>
      )}
    </div>
  );
}
