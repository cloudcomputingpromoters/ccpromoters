'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { MessageSquare, ChevronDown } from 'lucide-react';

export default function AdminContactsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    insforge.database
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(100)
      .then(({ data }) => { setSubmissions(data || []); setLoading(false); });
  }, []);

  async function updateReadState(id: string, isRead: boolean) {
    const { error } = await insforge.database.from('contact_submissions').update({ is_read: isRead }).eq('id', id);
    if (error) return;
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, is_read: isRead } : s));
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Contact Submissions</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-16 text-center">
            <MessageSquare size={48} className="text-[#CC1016]/30 mx-auto mb-4" />
            <p className="text-[#6B6B6B]">No contact submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((s: { id: string; name: string; email: string; subject?: string; message: string; submitted_at: string; is_read?: boolean }) => (
              <div key={s.id} className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[#0D0D0D] text-sm">{s.name}</p>
                      <p className="text-xs text-[#6B6B6B]">{s.email}</p>
                      {s.subject && <p className="text-xs text-[#6B6B6B]">· {s.subject}</p>}
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{new Date(s.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <select value={s.is_read ? 'read' : 'new'} onClick={e => e.stopPropagation()}
                      onChange={e => updateReadState(s.id, e.target.value === 'read')}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 focus:outline-none cursor-pointer ${s.is_read ? 'bg-green-100 text-green-700' : 'bg-[#F5F5F5] text-[#0D0D0D]'}`}>
                      <option value="new">New</option>
                      <option value="read">Read</option>
                    </select>
                    <ChevronDown size={16} className={`text-[#6B6B6B] transition-transform ${expanded === s.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {expanded === s.id && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E5E5E5]">
                    <p className="text-sm text-[#0D0D0D] whitespace-pre-wrap">{s.message}</p>
                    <a href={`mailto:${s.email}?subject=Re: ${s.subject || 'Your enquiry'}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#CC1016] hover:underline">
                      Reply via email →
                    </a>
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
