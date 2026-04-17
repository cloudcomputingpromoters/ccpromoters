'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Users } from 'lucide-react';

export default function EmployerApplicantsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const user = userData.user;
      insforge.database
      .from('jobs')
      .select('id, title, status, applications(count)')
      .eq('posted_by', user.id)
      .order('posted_at', { ascending: false })
      .then(({ data }) => { setJobs((data || []).filter((j: { applications?: { count: number }[] }) => (j.applications?.[0]?.count ?? 0) > 0)); setLoading(false); });
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/employer" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Applicants</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
            <Users size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">No Applications Yet</h3>
            <p className="text-[#4A5568] text-sm mb-6">Once candidates apply to your jobs, they will appear here.</p>
            <Link href="/dashboard/employer/listings" className="btn-pink">View My Listings</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job: { id: string; title: string; status: string; applications?: { count: number }[] }) => (
              <Link key={job.id} href={`/dashboard/employer/applicants/${job.id}`}
                className="group flex items-center justify-between bg-white rounded-xl border border-[#E2E8F0] p-5 hover:border-[#D4AF37] transition-colors">
                <div>
                  <h3 className="font-bold text-[#1A3A8F] group-hover:text-[#D4AF37] transition-colors">{job.title}</h3>
                  <p className="text-sm text-[#4A5568] capitalize mt-0.5">{job.status}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                  <Users size={16} />
                  {job.applications?.[0]?.count ?? 0} applicant{(job.applications?.[0]?.count ?? 0) !== 1 ? 's' : ''}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
