'use client';

import { useState, useEffect } from 'react';
import { insforge } from '@/lib/insforge';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface Props {
  jobId: string;
}

export default function SaveJobButton({ jobId }: Props) {
  const [state, setState] = useState<'loading' | 'guest' | 'saved' | 'unsaved'>('loading');
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [savedRowId, setSavedRowId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function check() {
      const { data } = await insforge.auth.getCurrentUser();
      if (!data?.user) { setState('guest'); return; }

      const user = data.user;
      const role = (user.metadata as Record<string, unknown>)?.role
               ?? (user.profile as Record<string, unknown>)?.role;
      if (role === 'admin' || role === 'employer') { setState('guest'); return; }

      // Resolve candidates.id
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

      if (!candidate) { setState('guest'); return; }
      setCandidateId(candidate.id);

      const { data: existing } = await insforge.database
        .from('saved_jobs')
        .select('id')
        .eq('candidate_id', candidate.id)
        .eq('job_id', jobId)
        .maybeSingle();

      setSavedRowId(existing?.id || null);
      setState(existing ? 'saved' : 'unsaved');
    }
    check();
  }, [jobId]);

  async function toggle() {
    if (!candidateId || busy) return;
    setBusy(true);
    try {
      if (state === 'saved' && savedRowId) {
        await insforge.database.from('saved_jobs').delete().eq('id', savedRowId);
        setSavedRowId(null);
        setState('unsaved');
      } else {
        const { data } = await insforge.database
          .from('saved_jobs')
          .insert({ candidate_id: candidateId, job_id: jobId })
          .select('id')
          .single();
        setSavedRowId(data?.id || null);
        setState('saved');
      }
    } catch {
      // silently ignore
    } finally {
      setBusy(false);
    }
  }

  if (state === 'loading') {
    return (
      <button disabled className="flex-1 flex items-center justify-center gap-2 border border-[#E5E5E5] rounded-lg py-2.5 text-sm text-[#6B6B6B] opacity-50">
        <Bookmark size={15} /> Save Job
      </button>
    );
  }

  if (state === 'guest') {
    return (
      <a href="/login" className="flex-1 flex items-center justify-center gap-2 border border-[#E5E5E5] rounded-lg py-2.5 text-sm text-[#6B6B6B] hover:border-[#CC1016] hover:text-[#CC1016] transition-colors">
        <Bookmark size={15} /> Save Job
      </a>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${
        state === 'saved'
          ? 'border-[#CC1016] text-[#CC1016] bg-[#CC1016]/5'
          : 'border-[#E5E5E5] text-[#6B6B6B] hover:border-[#CC1016] hover:text-[#CC1016]'
      }`}
    >
      {state === 'saved'
        ? <><BookmarkCheck size={15} /> Saved</>
        : <><Bookmark size={15} /> Save Job</>}
    </button>
  );
}
