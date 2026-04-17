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
  const [authState, setAuthState] = useState<'loading' | 'guest' | 'candidate' | 'applied'>('loading');
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function check() {
      const { data } = await insforge.auth.getCurrentUser();
      if (!data?.user) { setAuthState('guest'); return; }

      const user = data.user;
      const role = (user.metadata as Record<string, unknown>)?.role;
      if (role === 'admin' || role === 'employer') { setAuthState('guest'); return; }

      setUserData(user);

      // Check if already applied
      const { data: existing } = await insforge.database
        .from('applications')
        .select('id')
        .eq('candidate_id', user.id)
        .eq('job_id', jobId)
        .maybeSingle();

      setAuthState(existing ? 'applied' : 'candidate');
    }
    check();
  }, [jobId]);

  async function handleApply() {
    if (!userData) return;
    setApplying(true);
    setError('');

    try {
      // Fetch candidate profile for email data
      const { data: prof } = await insforge.database
        .from('candidate_profiles')
        .select('first_name, last_name')
        .eq('user_id', userData.id)
        .maybeSingle();

      const candidateName = prof
        ? `${prof.first_name || ''} ${prof.last_name || ''}`.trim()
        : (userData.profile as Record<string, unknown>)?.name as string || userData.email;

      // Insert application
      const { error: insertErr } = await insforge.database
        .from('applications')
        .insert({
          candidate_id: userData.id,
          job_id: jobId,
          status: 'applied',
          applied_at: new Date().toISOString(),
        });

      if (insertErr) {
        setError('Could not submit application. Please try again.');
        setApplying(false);
        return;
      }

      // Notify HR (fire-and-forget)
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          data: {
            candidateName,
            candidateEmail: userData.email,
            jobTitle,
            discipline,
            location,
          },
        }),
      }).catch(() => {});

      setAuthState('applied');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setApplying(false);
    }
  }

  if (authState === 'loading') {
    return (
      <div className="block bg-[#D4AF37]/30 text-white font-bold text-center py-4 rounded-xl text-lg mb-3 animate-pulse">
        Loading...
      </div>
    );
  }

  if (authState === 'applied') {
    return (
      <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 font-semibold text-center py-4 rounded-xl mb-3">
        <CheckCircle size={18} />
        Application Submitted
      </div>
    );
  }

  if (authState === 'guest') {
    return (
      <div className="space-y-2 mb-3">
        <a
          href={`/apply?job=${jobSlug}`}
          className="block bg-[#D4AF37] text-white font-bold text-center py-4 rounded-xl hover:bg-[#B8960C] transition-colors text-lg"
        >
          Apply Now →
        </a>
        <a
          href={`/register/candidate?job=${jobSlug}`}
          className="block border-2 border-[#1A3A8F] text-[#1A3A8F] font-semibold text-center py-3 rounded-xl hover:bg-[#1A3A8F] hover:text-white transition-colors text-sm"
        >
          Create Account &amp; Apply
        </a>
      </div>
    );
  }

  // candidate
  return (
    <>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <button
        onClick={handleApply}
        disabled={applying}
        className="block w-full bg-[#D4AF37] text-white font-bold text-center py-4 rounded-xl hover:bg-[#B8960C] transition-colors text-lg mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {applying ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Submitting...
          </span>
        ) : (
          'Apply Now →'
        )}
      </button>
      <p className="text-xs text-center text-[#4A5568] -mt-1 mb-3">
        Applying as <span className="font-semibold text-[#1A3A8F]">{userData?.email as string}</span>
      </p>
    </>
  );
}
