'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { insforge } from '@/lib/insforge';
import { Clock, ChevronDown, Users } from 'lucide-react';

const STATUS_OPTIONS = ['applied','under_review','shortlisted','interview_scheduled','offer_made','hired','not_progressing','withdrawn'];

const statusStyles: Record<string, { label: string; color: string }> = {
  applied:             { label: 'Applied',           color: 'bg-blue-100 text-blue-700' },
  under_review:        { label: 'Under Review',      color: 'bg-yellow-100 text-yellow-700' },
  shortlisted:         { label: 'Shortlisted',       color: 'bg-purple-100 text-purple-700' },
  interview_scheduled: { label: 'Interview',         color: 'bg-indigo-100 text-indigo-700' },
  offer_made:          { label: 'Offer Made',        color: 'bg-green-100 text-green-700' },
  hired:               { label: 'Hired',             color: 'bg-emerald-100 text-emerald-700' },
  not_progressing:     { label: 'Not Progressing',   color: 'bg-red-100 text-red-700' },
  withdrawn:           { label: 'Withdrawn',         color: 'bg-gray-100 text-gray-500' },
};

export default function JobApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [job, setJob] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const userId = userData.user.id;

      // Verify this job belongs to the current employer
      const { data: jobData } = await insforge.database
        .from('jobs')
        .select('id, title, slug, posted_by')
        .eq('id', jobId)
        .eq('posted_by', userId)
        .maybeSingle();

      if (!jobData) { setUnauthorized(true); setLoading(false); return; }
      setJob(jobData);

      // Fetch applications for this job
      const { data: apps } = await insforge.database
        .from('applications')
        .select('id, candidate_id, status, applied_at, cover_letter')
        .eq('job_id', jobId)
        .order('applied_at', { ascending: false });

      if (!apps || apps.length === 0) { setApplications([]); setLoading(false); return; }

      // Fetch candidate profiles in one query using the candidate_id (which is the auth user_id)
      const candidateIds = apps.map((a: { candidate_id: string }) => a.candidate_id);
      const { data: profiles } = await insforge.database
        .from('candidate_profiles')
        .select('user_id, first_name, last_name, current_title, location_city, location_state, discipline')
        .in('user_id', candidateIds);

      const profileMap: Record<string, typeof profiles extends (infer T)[] | null ? T : never> = {};
      if (profiles) {
        for (const p of profiles) {
          profileMap[p.user_id] = p;
        }
      }

      const enriched = apps.map((app: { candidate_id: string }) => ({
        ...app,
        profile: profileMap[app.candidate_id] || null,
      }));

      setApplications(enriched);
      setLoading(false);
    }
    load();
  }, [jobId]);

  async function updateStatus(appId: string, status: string) {
    await insforge.database.from('applications').update({ status }).eq('id', appId);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  }

  const filtered = filterStatus ? applications.filter(a => a.status === filterStatus) : applications;

  if (unauthorized) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
        <p className="text-[#4A5568]">This job listing was not found or does not belong to your account.</p>
        <Link href="/dashboard/employer/listings" className="text-[#D4AF37] font-semibold hover:underline mt-4 inline-block">
          ← Back to My Listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/employer/applicants" className="text-[#4A5568] hover:text-[#1A3A8F] text-sm mb-2 inline-block">
          ← All Applicants
        </Link>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#1A3A8F]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {job?.title || 'Applicants'}
          </h1>
          {job?.slug && (
            <a href={`/jobs/${job.slug}`} target="_blank" rel="noreferrer"
              className="text-sm text-[#D4AF37] font-semibold hover:underline shrink-0">
              View Job →
            </a>
          )}
        </div>
        <p className="text-[#4A5568] text-sm mt-1">{applications.length} total applicant{applications.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Status filters */}
      {applications.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setFilterStatus('')}
            className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition-colors ${!filterStatus ? 'bg-[#1A3A8F] text-white border-[#1A3A8F]' : 'border-[#E2E8F0] text-[#4A5568] hover:border-[#1A3A8F]'}`}>
            All ({applications.length})
          </button>
          {STATUS_OPTIONS.filter(s => applications.some(a => a.status === s)).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition-colors ${filterStatus === s ? 'bg-[#1A3A8F] text-white border-[#1A3A8F]' : 'border-[#E2E8F0] text-[#4A5568] hover:border-[#1A3A8F]'}`}>
              {statusStyles[s]?.label} ({applications.filter(a => a.status === s).length})
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
          <Users size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
          <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">
            {applications.length === 0 ? 'No Applications Yet' : 'No applicants for this filter'}
          </h3>
          <p className="text-[#4A5568] text-sm">
            {applications.length === 0
              ? 'Candidates who apply to this job will appear here.'
              : 'Try selecting a different status filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app: {
            id: string; status: string; applied_at: string; cover_letter?: string;
            profile?: { first_name?: string; last_name?: string; current_title?: string; location_city?: string; location_state?: string; discipline?: string } | null;
          }) => {
            const p = app.profile;
            const name = p ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : 'Unknown Candidate';
            const statusInfo = statusStyles[app.status] || { label: app.status, color: 'bg-gray-100 text-gray-600' };
            return (
              <div key={app.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1A3A8F]">{name || 'Candidate'}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-[#4A5568] mt-1">
                      {p?.current_title && <span>{p.current_title}</span>}
                      {p?.discipline && <span className="text-[#1A3A8F]/70">· {p.discipline}</span>}
                      {(p?.location_city || p?.location_state) && (
                        <span>· {[p.location_city, p.location_state].filter(Boolean).join(', ')}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {app.cover_letter && (
                      <p className="text-sm text-[#4A5568] mt-2 line-clamp-2 max-w-lg italic">&ldquo;{app.cover_letter}&rdquo;</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={e => updateStatus(app.id, e.target.value)}
                        className="appearance-none text-xs font-semibold border border-[#E2E8F0] rounded-lg px-3 py-1.5 pr-7 text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors bg-white cursor-pointer">
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{statusStyles[s]?.label || s}</option>
                        ))}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
