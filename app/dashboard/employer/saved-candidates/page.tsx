'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { UserCheck, MapPin, Briefcase, Trash2 } from 'lucide-react';

export default function SavedCandidatesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const user = userData.user;
      insforge.database
      .from('saved_candidates')
      .select('id, saved_at, candidate_profiles(first_name, last_name, current_title, discipline, location_city, location_state, years_experience)')
      .eq('employer_id', user.id)
      .order('saved_at', { ascending: false })
      .then(({ data }) => { setSaved(data || []); setLoading(false); });
    }
    load();
  }, []);

  async function removeSaved(id: string) {
    await insforge.database.from('saved_candidates').delete().eq('id', id);
    setSaved(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/employer" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Saved Candidates</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : saved.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
            <UserCheck size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#1A3A8F] text-xl mb-2">No Saved Candidates</h3>
            <p className="text-[#4A5568] text-sm">Candidates you shortlist will appear here for easy reference.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {saved.map((s: { id: string; saved_at: string; candidate_profiles?: { first_name?: string; last_name?: string; current_title?: string; discipline?: string; location_city?: string; location_state?: string; years_experience?: number } }) => {
              const c = s.candidate_profiles;
              return (
                <div key={s.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-[#1A3A8F]">{c?.first_name} {c?.last_name}</h3>
                      {c?.current_title && <p className="text-sm text-[#4A5568]">{c.current_title}</p>}
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#4A5568]">
                        {(c?.location_city || c?.location_state) && (
                          <span className="flex items-center gap-1"><MapPin size={11} className="text-[#D4AF37]" />{[c.location_city, c.location_state].filter(Boolean).join(', ')}</span>
                        )}
                        {c?.discipline && <span className="flex items-center gap-1"><Briefcase size={11} className="text-[#D4AF37]" />{c.discipline.replace(/-/g,' ')}</span>}
                        {c?.years_experience != null && <span>{c.years_experience} yrs exp</span>}
                      </div>
                    </div>
                    <button onClick={() => removeSaved(s.id)} className="p-1.5 text-[#4A5568] hover:text-red-600 transition-colors shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="text-xs text-[#4A5568] mt-3">Saved {new Date(s.saved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
