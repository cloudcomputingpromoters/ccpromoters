'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react';

const statusStyles: Record<string, { label: string; color: string; desc: string }> = {
  applied:             { label: 'Applied',            color: 'bg-[#F5F5F5] text-[#0D0D0D]',      desc: 'Your application has been received.' },
  under_review:        { label: 'Under Review',       color: 'bg-yellow-100 text-yellow-700',  desc: 'A recruiter is reviewing your profile.' },
  shortlisted:         { label: 'Shortlisted',        color: 'bg-purple-100 text-purple-700',  desc: 'You have been shortlisted for this role.' },
  interview_scheduled: { label: 'Interview Scheduled',color: 'bg-indigo-100 text-indigo-700',  desc: 'An interview has been arranged.' },
  offer_made:          { label: 'Offer Made',         color: 'bg-green-100 text-green-700',    desc: 'Congratulations — an offer has been extended.' },
  hired:               { label: 'Hired',              color: 'bg-emerald-100 text-emerald-700',desc: 'You have been successfully placed.' },
  not_progressing:     { label: 'Not Progressing',    color: 'bg-red-100 text-red-700',        desc: 'This application will not be moving forward.' },
  withdrawn:           { label: 'Withdrawn',          color: 'bg-gray-100 text-gray-500',      desc: 'You withdrew this application.' },
};

const filterTabs = [
  { key: '',               label: 'All'           },
  { key: 'active',         label: 'Active'        },
  { key: 'interview',      label: 'Interview'     },
  { key: 'offer',          label: 'Offer/Hired'   },
  { key: 'closed',         label: 'Closed'        },
];

const activeStatuses   = ['applied', 'under_review', 'shortlisted'];
const interviewStatuses = ['interview_scheduled'];
const offerStatuses     = ['offer_made', 'hired'];
const closedStatuses    = ['not_progressing', 'withdrawn'];

export default function CandidateApplicationsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }

      // applications.candidate_id is a FK to candidates.id (not auth user id)
      const { data: candidate } = await insforge.database
        .from('candidates')
        .select('id')
        .eq('user_id', userData.user.id)
        .maybeSingle();

      if (!candidate) { setLoading(false); return; }

      const { data } = await insforge.database
        .from('applications')
        .select('id, status, applied_at, job_id, jobs(title, slug, discipline, location_city, location_state, is_remote, employment_type, salary_min, salary_max)')
        .eq('candidate_id', candidate.id)
        .order('applied_at', { ascending: false });
      setApplications(data || []);
      setLoading(false);
    }
    load();
  }, []);

  function filterApps() {
    if (!activeFilter) return applications;
    if (activeFilter === 'active')    return applications.filter(a => activeStatuses.includes(a.status));
    if (activeFilter === 'interview') return applications.filter(a => interviewStatuses.includes(a.status));
    if (activeFilter === 'offer')     return applications.filter(a => offerStatuses.includes(a.status));
    if (activeFilter === 'closed')    return applications.filter(a => closedStatuses.includes(a.status));
    return applications;
  }

  const filtered = filterApps();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>My Applications</h1>
          {!loading && (
            <p className="text-white/60 text-sm mt-1">{applications.length} total application{applications.length !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Filter tabs */}
        {!loading && applications.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {filterTabs.map(tab => {
              let count = applications.length;
              if (tab.key === 'active')    count = applications.filter(a => activeStatuses.includes(a.status)).length;
              if (tab.key === 'interview') count = applications.filter(a => interviewStatuses.includes(a.status)).length;
              if (tab.key === 'offer')     count = applications.filter(a => offerStatuses.includes(a.status)).length;
              if (tab.key === 'closed')    count = applications.filter(a => closedStatuses.includes(a.status)).length;
              return (
                <button key={tab.key} onClick={() => setActiveFilter(tab.key)}
                  className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition-colors ${
                    activeFilter === tab.key
                      ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                      : 'border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0D0D0D]'
                  }`}>
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-16 text-center">
            <Briefcase size={48} className="text-[#CC1016]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">No Applications Yet</h3>
            <p className="text-[#6B6B6B] mb-6 text-sm max-w-sm mx-auto">
              Browse available civil engineering roles and click &ldquo;Apply Now&rdquo; to track your applications here.
            </p>
            <Link href="/jobs"
              className="bg-[#CC1016] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#A80D12] transition-colors inline-block">
              Browse Open Roles →
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-12 text-center">
            <p className="text-[#6B6B6B]">No applications match this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((app: {
              id: string; status: string; applied_at: string;
              jobs?: { title: string; slug: string; discipline?: string; location_city?: string; location_state?: string; is_remote?: boolean; employment_type?: string; salary_min?: number; salary_max?: number };
            }) => {
              const job = app.jobs;
              const statusInfo = statusStyles[app.status] || { label: app.status, color: 'bg-gray-100 text-gray-600', desc: '' };
              const salaryText = job?.salary_min && job?.salary_max
                ? `$${Math.round(job.salary_min / 1000)}k–$${Math.round(job.salary_max / 1000)}k`
                : null;

              return (
                <div key={app.id} className="bg-white rounded-xl border border-[#E5E5E5] p-5 hover:border-[#CC1016]/40 transition-colors">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      {job ? (
                        <Link href={`/jobs/${job.slug}`}
                          className="font-bold text-[#0D0D0D] hover:text-[#CC1016] transition-colors">
                          {job.title}
                        </Link>
                      ) : (
                        <span className="font-bold text-[#0D0D0D]">Job listing removed</span>
                      )}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-[#6B6B6B]">
                        {job?.discipline && <span>{job.discipline}</span>}
                        {job && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {job.is_remote ? 'Remote' : [job.location_city, job.location_state].filter(Boolean).join(', ')}
                          </span>
                        )}
                        {salaryText && <span>{salaryText}/yr</span>}
                        {job?.employment_type && (
                          <span className="capitalize">{job.employment_type.replace(/-/g,' ')}</span>
                        )}
                        <span className="flex items-center gap-1 text-xs">
                          <Clock size={11} />
                          Applied {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      {statusInfo.desc && (
                        <p className="text-xs text-[#718096] mt-1.5">{statusInfo.desc}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      {job && (
                        <Link href={`/jobs/${job.slug}`}
                          className="flex items-center gap-1 text-xs text-[#CC1016] font-semibold hover:underline">
                          View Role <ChevronRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Status legend */}
        {!loading && applications.length > 0 && (
          <div className="mt-10 bg-white rounded-xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#0D0D0D] mb-4 text-sm">Application Status Guide</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {Object.entries(statusStyles).map(([key, s]) => (
                <div key={key} className="flex items-center gap-3 text-sm">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${s.color}`}>{s.label}</span>
                  <span className="text-[#6B6B6B] text-xs">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
