'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Search, Globe } from 'lucide-react';

export default function AdminEmployersPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    insforge.database
      .from('employer_profiles')
      .select('id, company_name, industry, company_size, contact_name, contact_email, website, created_at')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }) => { setEmployers(data || []); setLoading(false); });
  }, []);

  const filtered = employers.filter(e => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.company_name?.toLowerCase().includes(q) || e.industry?.toLowerCase().includes(q) || e.contact_name?.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Employers ({employers.length})</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by company or industry..."
            className="w-full max-w-md pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors" />
        </div>
        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F7F9FC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F]">Company</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F] hidden md:table-cell">Industry</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F] hidden lg:table-cell">Contact</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F] hidden lg:table-cell">Size</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1A3A8F]">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filtered.map((e: { id: string; company_name?: string; industry?: string; contact_name?: string; contact_email?: string; company_size?: string; website?: string; created_at: string }) => (
                  <tr key={e.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#1A3A8F]">{e.company_name || '—'}</p>
                        {e.website && <a href={e.website} target="_blank" rel="noreferrer" className="text-[#4A5568] hover:text-[#D4AF37] transition-colors"><Globe size={13} /></a>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#4A5568] hidden md:table-cell">{e.industry || '—'}</td>
                    <td className="px-4 py-3 text-[#4A5568] hidden lg:table-cell">
                      <p>{e.contact_name}</p>
                      <p className="text-xs">{e.contact_email}</p>
                    </td>
                    <td className="px-4 py-3 text-[#4A5568] hidden lg:table-cell">{e.company_size || '—'}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-12 text-center text-[#4A5568] text-sm">No employers found.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
