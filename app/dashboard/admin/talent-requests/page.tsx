'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { ClipboardList, ChevronDown } from 'lucide-react';

export default function AdminTalentRequestsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    insforge.database
      .from('talent_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => { setRequests(data || []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    await insforge.database.from('talent_requests').update({ status }).eq('id', id);
    setRequests(prev => prev.map(r => r.id === id ? {...r, status} : r));
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    fulfilled: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Talent Requests</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
            <ClipboardList size={48} className="text-[#D4AF37]/30 mx-auto mb-4" />
            <p className="text-[#4A5568]">No talent requests yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((r: { id: string; company_name?: string; role_title: string; discipline?: string; employment_type?: string; quantity?: number; timeline?: string; contact_name?: string; contact_email?: string; description?: string; additional_notes?: string; created_at: string; status?: string }) => (
              <div key={r.id} className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                <button onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[#1A3A8F] text-sm">{r.role_title}</p>
                      {r.company_name && <span className="text-xs bg-[#F7F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded-full text-[#4A5568]">{r.company_name}</span>}
                      {r.discipline && <span className="text-xs text-[#4A5568] capitalize">{r.discipline.replace(/-/g,' ')}</span>}
                    </div>
                    <div className="flex gap-3 mt-0.5 text-xs text-[#4A5568] flex-wrap">
                      {r.quantity && r.quantity > 1 && <span>{r.quantity} hires</span>}
                      {r.timeline && <span>Timeline: {r.timeline}</span>}
                      <span>{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <select value={r.status || 'new'} onClick={e => e.stopPropagation()} onChange={e => updateStatus(r.id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 focus:outline-none cursor-pointer ${statusColors[r.status || 'new']}`}>
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="fulfilled">Fulfilled</option>
                      <option value="closed">Closed</option>
                    </select>
                    <ChevronDown size={16} className={`text-[#4A5568] transition-transform ${expanded === r.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {expanded === r.id && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E2E8F0] space-y-3">
                    <dl className="grid sm:grid-cols-2 gap-3 text-sm">
                      {r.contact_name && <div><dt className="font-semibold text-[#1A3A8F]">Contact</dt><dd className="text-[#4A5568]">{r.contact_name} · {r.contact_email}</dd></div>}
                      {r.employment_type && <div><dt className="font-semibold text-[#1A3A8F]">Type</dt><dd className="text-[#4A5568] capitalize">{r.employment_type.replace(/-/g,' ')}</dd></div>}
                    </dl>
                    {r.description && <div><p className="text-sm font-semibold text-[#1A3A8F] mb-1">Description</p><p className="text-sm text-[#4A5568] whitespace-pre-wrap">{r.description}</p></div>}
                    {r.additional_notes && <div><p className="text-sm font-semibold text-[#1A3A8F] mb-1">Notes</p><p className="text-sm text-[#4A5568] whitespace-pre-wrap">{r.additional_notes}</p></div>}
                    {r.contact_email && (
                      <a href={`mailto:${r.contact_email}?subject=Re: Talent Request - ${r.role_title}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] hover:underline">
                        Contact employer →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
