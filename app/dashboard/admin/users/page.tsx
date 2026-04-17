'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Search } from 'lucide-react';

export default function AdminUsersPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const [candidatesRes, employersRes] = await Promise.all([
        insforge.database.from('candidate_profiles').select('user_id, first_name, last_name, discipline, created_at').order('created_at', { ascending: false }),
        insforge.database.from('employer_profiles').select('user_id, company_name, contact_name, contact_email, created_at').order('created_at', { ascending: false }),
      ]);
      const candidates = (candidatesRes.data || []).map((u: { user_id: string; first_name?: string; last_name?: string; discipline?: string; created_at: string }) => ({
        id: u.user_id, name: `${u.first_name || ''} ${u.last_name || ''}`.trim(), role: 'Candidate', detail: u.discipline || '', created_at: u.created_at,
      }));
      const employers = (employersRes.data || []).map((u: { user_id: string; company_name?: string; contact_name?: string; contact_email?: string; created_at: string }) => ({
        id: u.user_id, name: u.company_name || u.contact_name || 'Unknown', role: 'Employer', detail: u.contact_email || '', created_at: u.created_at,
      }));
      setUsers([...candidates, ...employers].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      setLoading(false);
    }
    load();
  }, []);

  const filtered = search
    ? users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.detail.toLowerCase().includes(search.toLowerCase()))
    : users;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Users</h1>
          <p className="text-white/70 text-sm mt-1">{users.length} total registered users</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors" />
        </div>
        {loading ? (
          <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-14 bg-white rounded-lg border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1A3A8F] text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                    <td className="px-5 py-3 font-semibold text-[#1A3A8F]">{u.name || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.role === 'Employer' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-[#4A5568]">{u.detail || '—'}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-10 text-center text-[#4A5568]">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
