'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Bookmark, MapPin, DollarSign } from 'lucide-react';

export default function SavedJobsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }

      // saved_jobs.candidate_id is a FK to candidates.id (not auth user id)
      const { data: candidate } = await insforge.database
        .from('candidates')
        .select('id')
        .eq('user_id', userData.user.id)
        .maybeSingle();

      if (!candidate) { setLoading(false); return; }

      const { data } = await insforge.database
        .from('saved_jobs')
        .select('*, jobs(id, title, slug, discipline, location_city, location_state, is_remote, salary_min, salary_max, employment_type, status)')
        .eq('candidate_id', candidate.id)
        .order('saved_at', { ascending: false });
      setSavedJobs(data || []); setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Saved Jobs</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : savedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-16 text-center">
            <Bookmark size={48} className="text-[#CC1016]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">No Saved Jobs</h3>
            <p className="text-[#6B6B6B] mb-6">Bookmark jobs you like and they will appear here.</p>
            <Link href="/jobs" className="btn-pink">Browse Open Roles</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {savedJobs.map((saved: { id: string; saved_at: string; jobs?: { id: string; title: string; slug: string; discipline?: string; location_city?: string; location_state?: string; is_remote?: boolean; salary_min?: number; salary_max?: number; employment_type?: string; status?: string } }) => {
              const job = saved.jobs;
              if (!job) return null;
              return (
                <Link key={saved.id} href={`/jobs/${job.slug}`}
                  className="group bg-white rounded-xl border border-[#E5E5E5] p-5 hover:border-[#CC1016] hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-[#0D0D0D] group-hover:text-[#CC1016] transition-colors">{job.title}</h3>
                    {job.status !== 'active' && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full shrink-0">Closed</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-[#6B6B6B]">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-[#CC1016]" />{job.is_remote ? 'Remote' : `${job.location_city}, ${job.location_state}`}</span>
                    {job.salary_min && job.salary_max && (
                      <span className="flex items-center gap-1"><DollarSign size={12} className="text-[#CC1016]" />${Math.round(job.salary_min/1000)}k–${Math.round(job.salary_max/1000)}k</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
