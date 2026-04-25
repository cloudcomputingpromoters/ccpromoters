'use client';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import { CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  discipline: string;
  location: string;
}

export default function ApplyButton({ jobId, jobTitle, jobSlug, discipline, location }: Props) {
  const [authState, setAuthState] = useState<'loading' | 'guest' | 'candidate' | 'applied' | 'applying'>('loading');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [candidateId, setCandidateId] = useState<string | null>(null);

  useEffect(() => {
    async function check() {
      const { data } = await insforge.auth.getCurrentUser();
      if (!data?.user) { setAuthState('guest'); return; }

      const user = data.user;
      const role = (user.metadata as Record<string, unknown>)?.role
               ?? (user.profile as Record<string, unknown>)?.role;
      if (role === 'admin' || role === 'employer') { setAuthState('guest'); return; }

      setUserData(user);

      // Get or create candidates row (needed for applications FK)
      let { data: candidate } = await insforge.database
        .from('candidates')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!candidate) {
        const { data: prof } = await insforge.database
          .from('candidate_profiles')
          .select('first_name, last_name, discipline, years_experience, skills')
          .eq('user_id', user.id)
          .maybeSingle();

        const { data: newCand } = await insforge.database
          .from('candidates')
          .insert({
            user_id: user.id,
            first_name: prof?.first_name || user.email.split('@')[0],
            last_name: prof?.last_name || '',
            discipline: prof?.discipline || null,
            years_experience: prof?.years_experience || null,
            skills: prof?.skills || null,
            is_visible: true,
          })
          .select('id')
          .single();
        candidate = newCand;
      }

      if (!candidate) { setAuthState('guest'); return; }
      setCandidateId(candidate.id);

      // Check existing application using candidates.id (the actual FK)
      const { data: existing } = await insforge.database
        .from('applications')
        .select('id')
        .eq('candidate_id', candidate.id)
        .eq('job_id', jobId)
        .maybeSingle();

      setAuthState(existing ? 'applied' : 'candidate');
    }
    check();
  }, [jobId]);

  async function handleApply() {
    if (!candidateId || !userData) return;
    setAuthState('applying');
    try {
      await insforge.database.from('applications').insert({
        candidate_id: candidateId,
        job_id: jobId,
        status: 'applied',
      });
      // Notify HR
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          data: {
            candidateName: userData.email.split('@')[0],
            candidateEmail: userData.email,
            jobTitle,
            discipline,
            location,
          },
        }),
      });
      setAuthState('applied');
    } catch {
      setAuthState('candidate');
    }
  }

  if (authState === 'loading') {
    return (
      <div className="block bg-[#CC1016]/30 text-white font-bold text-center py-4 rounded-xl text-lg mb-3 animate-pulse">
        Loading...
      </div>
    );
  }

  if (authState === 'applied') {
    return (
      <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 font-semibold text-center py-4 rounded-xl mb-3">
        <CheckCircle size={18} /> Application Submitted
      </div>
    );
  }

  if (authState === 'guest') {
    return (
      <div className="space-y-2 mb-3">
        <a href={`/apply?job=${encodeURIComponent(jobTitle)}&loc=${encodeURIComponent(jobSlug)}`}
          className="block bg-[#CC1016] text-white font-bold text-center py-4 rounded-xl hover:bg-[#A80D12] transition-colors text-lg">
          Apply Now →
        </a>
        <a href={`/register/candidate?job=${jobSlug}`}
          className="block border-2 border-[#0D0D0D] text-[#0D0D0D] font-semibold text-center py-3 rounded-xl hover:bg-[#0D0D0D] hover:text-white transition-colors text-sm">
          Create Account &amp; Apply
        </a>
      </div>
    );
  }

  // Logged-in candidate — apply directly into DB
  return (
    <div className="mb-3">
      <button
        onClick={handleApply}
        disabled={authState === 'applying'}
        className="w-full flex items-center justify-center gap-2 bg-[#CC1016] text-white font-bold text-center py-4 rounded-xl hover:bg-[#A80D12] transition-colors text-lg disabled:opacity-60"
      >
        {authState === 'applying'
          ? <><Loader2 size={18} className="animate-spin" /> Submitting…</>
          : 'Apply Now →'}
      </button>
      <p className="text-xs text-center text-[#6B6B6B] mt-2">
        Applying as <span className="font-semibold text-[#0D0D0D]">{userData?.email}</span>
      </p>
    </div>
  );
}
