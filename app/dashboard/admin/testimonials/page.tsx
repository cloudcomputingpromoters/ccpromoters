'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Plus, Trash2, Star } from 'lucide-react';

export default function AdminTestimonialsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', title: '', company: '', quote: '', rating: '5', category: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const { data } = await insforge.database
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      setTestimonials(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data } = await insforge.database
      .from('testimonials')
      .insert({
        name: form.name, title: form.title || null, company: form.company || null,
        quote: form.quote, rating: parseInt(form.rating), category: form.category || null,
        is_published: true,
      })
      .select()
      .single();
    if (data) setTestimonials(prev => [data, ...prev]);
    setForm({ name: '', title: '', company: '', quote: '', rating: '5', category: '' });
    setAdding(false);
    setSaving(false);
  }

  async function togglePublished(id: string, current: boolean) {
    await insforge.database.from('testimonials').update({ is_published: !current }).eq('id', id);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_published: !current } : t));
  }

  async function handleDelete(id: string) {
    await insforge.database.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Testimonials</h1>
          <p className="text-white/70 text-sm mt-1">Manage client testimonials shown on the site</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-end">
          <button onClick={() => setAdding(!adding)}
            className="flex items-center gap-2 bg-[#CC1016] text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-[#A80D12] transition-colors">
            <Plus size={15} /> Add Testimonial
          </button>
        </div>

        {adding && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">New Testimonial</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[{key:'name',label:'Name *'},{key:'title',label:'Job Title'},{key:'company',label:'Company'},{key:'category',label:'Category'}].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">{label}</label>
                  <input type="text" value={form[key as keyof typeof form]} onChange={e => setForm({...form, [key]: e.target.value})}
                    required={key === 'name'}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC1016] transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Quote *</label>
              <textarea value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} required rows={3}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Rating</label>
              <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}
                className="border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CC1016] bg-white">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="bg-[#CC1016] text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#A80D12] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setAdding(false)}
                className="px-5 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-28 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-12 text-center text-[#6B6B6B]">No testimonials yet. Add one above.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map(t => (
              <div key={t.id} className={`bg-white rounded-xl border p-5 ${t.is_published ? 'border-[#E5E5E5]' : 'border-dashed border-[#CBD5E0] opacity-70'}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-bold text-[#0D0D0D] text-sm">{t.name}</p>
                    {(t.title || t.company) && <p className="text-xs text-[#6B6B6B]">{[t.title, t.company].filter(Boolean).join(' · ')}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => togglePublished(t.id, t.is_published)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${t.is_published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {t.is_published ? 'Live' : 'Hidden'}
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 text-[#6B6B6B] hover:text-red-600 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} size={12} className="text-[#CC1016] fill-[#CC1016]" />)}
                </div>
                <p className="text-sm text-[#6B6B6B] line-clamp-3 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
