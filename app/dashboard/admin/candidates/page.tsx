'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Search, MapPin, Briefcase } from 'lucide-react';

export default function AdminCandidatesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    insforge.database
      .from('candidate_profiles')
      .select('id, first_name, last_name, current_title, discipline, location_city, location_state, years_experience, created_at')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }) => { setCandidates(data || []); setLoading(false); });
  }, []);

  const filtered = candidates.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return `${c.first_name} ${c.last_name}`.toLowerCase().includes(q) ||
      c.current_title?.toLowerCase().includes(q) ||
      c.discipline?.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Candidates ({candidates.length})</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, title, or discipline..."
            className="w-full max-w-md pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors" />
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c: { id: string; first_name?: string; last_name?: string; current_title?: string; discipline?: string; location_city?: string; location_state?: string; years_experience?: number; created_at: string }) => (
              <div key={c.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A3A8F] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {c.first_name?.[0]}{c.last_name?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1A3A8F] text-sm">{c.first_name} {c.last_name}</h3>
                    {c.current_title && <p className="text-xs text-[#4A5568] truncate">{c.current_title}</p>}
                    <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-[#4A5568]">
                      {(c.location_city || c.location_state) && (
                        <span className="flex items-center gap-0.5"><MapPin size={10} className="text-[#D4AF37]" />{[c.location_city, c.location_state].filter(Boolean).join(', ')}</span>
                      )}
                      {c.discipline && (
                        <span className="flex items-center gap-0.5 capitalize"><Briefcase size={10} className="text-[#D4AF37]" />{c.discipline.replace(/-/g,' ')}</span>
                      )}
                      {c.years_experience != null && <span>{c.years_experience} yrs</span>}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#4A5568] mt-3">Joined {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center text-[#4A5568] text-sm">No candidates found.</div>
        )}
      </div>
    </div>
  );
}
