'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminFAQsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState({ question: '', answer: '', category: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const { data } = await insforge.database
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });
      setFaqs(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data } = await insforge.database
      .from('faqs')
      .insert({ question: form.question, answer: form.answer, category: form.category || null, is_published: true })
      .select()
      .single();
    if (data) setFaqs(prev => [...prev, data]);
    setForm({ question: '', answer: '', category: '' });
    setAdding(false);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await insforge.database.from('faqs').delete().eq('id', id);
    setFaqs(prev => prev.filter(f => f.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>FAQs</h1>
          <p className="text-white/70 text-sm mt-1">Manage frequently asked questions shown on the site</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-end">
          <button onClick={() => setAdding(!adding)}
            className="flex items-center gap-2 bg-[#CC1016] text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-[#A80D12] transition-colors">
            <Plus size={15} /> Add FAQ
          </button>
        </div>

        {adding && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">New FAQ</h3>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Question</label>
              <input type="text" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Answer</label>
              <textarea value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} required rows={4}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Category (optional)</label>
              <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                placeholder="e.g. Candidates, Employers, General"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="bg-[#CC1016] text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#A80D12] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save FAQ'}
              </button>
              <button type="button" onClick={() => setAdding(false)}
                className="px-5 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : faqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-12 text-center text-[#6B6B6B]">No FAQs yet. Add one above.</div>
        ) : (
          <div className="space-y-2">
            {faqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0D0D0D] text-sm">{faq.question}</p>
                    {faq.category && <p className="text-xs text-[#6B6B6B] mt-0.5">{faq.category}</p>}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={e => { e.stopPropagation(); handleDelete(faq.id); }} className="p-1.5 text-[#6B6B6B] hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                    {expanded === faq.id ? <ChevronUp size={16} className="text-[#6B6B6B]" /> : <ChevronDown size={16} className="text-[#6B6B6B]" />}
                  </div>
                </div>
                {expanded === faq.id && (
                  <div className="px-5 pb-5 border-t border-[#E5E5E5] pt-4">
                    <p className="text-sm text-[#6B6B6B] whitespace-pre-wrap">{faq.answer}</p>
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
