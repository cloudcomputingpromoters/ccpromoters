'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Plus, Trash2 } from 'lucide-react';

const DISCIPLINES = ['accounting-finance','engineering','technology','sales-marketing','human-resources','supply-chain','life-sciences','legal','creative','operations'];

export default function AdminPlacementsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [placements, setPlacements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ candidate_name: '', role_title: '', company: '', discipline: '', location_city: '', location_state: '', placement_date: '', salary: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const { data } = await insforge.database
        .from('placements')
        .select('*')
        .order('placement_date', { ascending: false });
      setPlacements(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data } = await insforge.database
      .from('placements')
      .insert({
        candidate_name: form.candidate_name,
        role_title: form.role_title,
        company: form.company || null,
        discipline: form.discipline || null,
        location_city: form.location_city || null,
        location_state: form.location_state || null,
        placement_date: form.placement_date || null,
        salary: form.salary ? parseInt(form.salary) : null,
      })
      .select()
      .single();
    if (data) setPlacements(prev => [data, ...prev]);
    setForm({ candidate_name: '', role_title: '', company: '', discipline: '', location_city: '', location_state: '', placement_date: '', salary: '' });
    setAdding(false);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await insforge.database.from('placements').delete().eq('id', id);
    setPlacements(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Placements</h1>
          <p className="text-white/70 text-sm mt-1">Track successful candidate placements</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-end">
          <button onClick={() => setAdding(!adding)}
            className="flex items-center gap-2 bg-[#D4AF37] text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-[#B8960C] transition-colors">
            <Plus size={15} /> Log Placement
          </button>
        </div>

        {adding && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
            <h3 className="font-bold text-[#1A3A8F]">New Placement</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {key:'candidate_name',label:'Candidate Name *'},
                {key:'role_title',label:'Role Title *'},
                {key:'company',label:'Company'},
                {key:'location_city',label:'City'},
                {key:'location_state',label:'State'},
                {key:'salary',label:'Salary ($)', type:'number'},
              ].map(({ key, label, type='text' }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#1A3A8F] mb-1">{label}</label>
                  <input type={type} value={form[key as keyof typeof form]}
                    onChange={e => setForm({...form, [key]: e.target.value})}
                    required={label.includes('*')}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-[#1A3A8F] mb-1">Discipline</label>
                <select value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] bg-white">
                  <option value="">Select</option>
                  {DISCIPLINES.map(d => <option key={d} value={d}>{d.replace(/-/g,' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A3A8F] mb-1">Placement Date</label>
                <input type="date" value={form.placement_date} onChange={e => setForm({...form, placement_date: e.target.value})}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="bg-[#D4AF37] text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#B8960C] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setAdding(false)}
                className="px-5 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#1A3A8F] hover:border-[#1A3A8F] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-14 bg-white rounded-lg border border-[#E2E8F0] animate-pulse" />)}</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1A3A8F] text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Candidate</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Company</th>
                  <th className="text-left px-4 py-3 font-semibold">Location</th>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-right px-4 py-3 font-semibold">Salary</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {placements.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                    <td className="px-5 py-3 font-semibold text-[#1A3A8F]">{p.candidate_name}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{p.role_title}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{p.company || '—'}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{[p.location_city, p.location_state].filter(Boolean).join(', ') || '—'}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{p.placement_date ? new Date(p.placement_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}</td>
                    <td className="px-4 py-3 text-right text-[#D4AF37] font-semibold">{p.salary ? `$${p.salary.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(p.id)} className="text-[#4A5568] hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {placements.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-[#4A5568]">No placements logged yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
