'use client';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import { CheckCircle } from 'lucide-react';

interface Props {
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  discipline: string;
  location: string;
}

export default function ApplyButton({ jobId, jobTitle, jobSlug }: Props) {
  const [authState, setAuthState] = useState<'loading' | 'guest' | 'candidate' | 'applied'>('loading');
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
        <CheckCircle size={18} /> Application Submitted
      </div>
    );
  }

  if (authState === 'guest') {
    return (
      <div className="space-y-2 mb-3">
        <a href={`/apply?job=${encodeURIComponent(jobTitle)}&loc=${encodeURIComponent(jobSlug)}`}
          className="block bg-[#D4AF37] text-white font-bold text-center py-4 rounded-xl hover:bg-[#B8960C] transition-colors text-lg">
          Apply Now →
        </a>
        <a href={`/register/candidate?job=${jobSlug}`}
          className="block border-2 border-[#1A3A8F] text-[#1A3A8F] font-semibold text-center py-3 rounded-xl hover:bg-[#1A3A8F] hover:text-white transition-colors text-sm">
          Create Account &amp; Apply
        </a>
      </div>
    );
  }

  // logged-in candidate — redirect to apply form pre-filled with their email
  return (
    <div className="mb-3">
      <a
        href={`/apply?job=${encodeURIComponent(jobTitle)}&loc=${encodeURIComponent(jobSlug)}&email=${encodeURIComponent(userData?.email || '')}`}
        className="block bg-[#D4AF37] text-white font-bold text-center py-4 rounded-xl hover:bg-[#B8960C] transition-colors text-lg"
      >
        Apply Now →
      </a>
      <p className="text-xs text-center text-[#4A5568] mt-2">
        Applying as <span className="font-semibold text-[#1A3A8F]">{userData?.email}</span>
      </p>
    </div>
  );
}
