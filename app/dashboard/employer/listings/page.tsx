'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Briefcase, Edit3, Users, Eye, Trash2, PlusCircle } from 'lucide-react';

const statusColor: Record<string, string> = {
  active:  'bg-green-100 text-green-700',
  paused:  'bg-yellow-100 text-yellow-700',
  closed:  'bg-gray-100 text-gray-500',
  filled:  'bg-[#F5F5F5] text-[#0D0D0D]',
  draft:   'bg-gray-100 text-gray-500',
  expired: 'bg-red-50 text-red-500',
};

export default function EmployerListingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const uid = userData.user.id;
      setUserId(uid);
      const { data } = await insforge.database
        .from('jobs')
        .select('id, title, slug, discipline, employment_type, location_city, location_state, is_remote, status, posted_at, applications(count)')
        .eq('posted_by', uid)
        .order('posted_at', { ascending: false });
      setJobs(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function toggleStatus(id: string, current: string) {
    const next = current === 'active' ? 'paused' : 'active';
    // Ownership enforced by double-filtering on both id AND posted_by
    await insforge.database.from('jobs').update({ status: next }).eq('id', id).eq('posted_by', userId);
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: next } : j));
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    // Only delete the job if it belongs to this employer
    await insforge.database.from('jobs').delete().eq('id', id).eq('posted_by', userId);
    setJobs(prev => prev.filter(j => j.id !== id));
    setDeletingId(null);
    setConfirmDeleteId(null);
  }

  return (
    <div>
      {/* Confirm delete modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">Delete this job?</h3>
            <p className="text-[#6B6B6B] text-sm mb-6">
              This will permanently remove the job listing and all associated applications. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60">
                {deletingId === confirmDeleteId ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 border border-[#E5E5E5] text-[#6B6B6B] font-semibold py-3 rounded-lg hover:border-[#0D0D0D] transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Manrope, sans-serif' }}>My Job Listings</h1>
        <Link href="/dashboard/employer/post-job"
          className="flex items-center gap-2 bg-[#CC1016] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#A80D12] transition-colors">
          <PlusCircle size={15} /> Post New Job
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-16 text-center">
          <Briefcase size={48} className="text-[#CC1016]/30 mx-auto mb-4" />
          <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">No Job Listings</h3>
          <p className="text-[#6B6B6B] mb-6 text-sm">Post your first job to start receiving applications.</p>
          <Link href="/dashboard/employer/post-job"
            className="bg-[#CC1016] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#A80D12] transition-colors text-sm inline-block">
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job: {
            id: string; title: string; slug: string; discipline?: string; employment_type?: string;
            location_city?: string; location_state?: string; is_remote?: boolean;
            status: string; posted_at: string; applications?: { count: number }[]
          }) => (
            <div key={job.id} className="bg-white rounded-xl border border-[#E5E5E5] p-5 hover:border-[#CC1016]/40 transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-[#0D0D0D]">{job.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor[job.status] || 'bg-gray-100 text-gray-500'}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-[#6B6B6B]">
                    {job.discipline && <span className="capitalize">{job.discipline.replace(/-/g,' ')}</span>}
                    {job.employment_type && <span className="capitalize">{job.employment_type.replace(/-/g,' ')}</span>}
                    <span>{job.is_remote ? 'Remote' : [job.location_city, job.location_state].filter(Boolean).join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <Link href={`/dashboard/employer/applicants/${job.id}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0D0D0D] border border-[#E5E5E5] px-3 py-1.5 rounded-lg hover:border-[#CC1016] hover:text-[#CC1016] transition-colors">
                    <Users size={13} /> {job.applications?.[0]?.count ?? 0} Applicants
                  </Link>
                  <a href={`/jobs/${job.slug}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0D0D0D] border border-[#E5E5E5] px-3 py-1.5 rounded-lg hover:border-[#CC1016] hover:text-[#CC1016] transition-colors">
                    <Eye size={13} /> View
                  </a>
                  <Link href={`/dashboard/employer/listings/${job.id}/edit`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0D0D0D] border border-[#E5E5E5] px-3 py-1.5 rounded-lg hover:border-[#CC1016] hover:text-[#CC1016] transition-colors">
                    <Edit3 size={13} /> Edit
                  </Link>
                  <button onClick={() => toggleStatus(job.id, job.status)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                      job.status === 'active'
                        ? 'border-yellow-200 text-yellow-700 hover:bg-yellow-50'
                        : 'border-green-200 text-green-700 hover:bg-green-50'
                    }`}>
                    {job.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  <button onClick={() => setConfirmDeleteId(job.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
