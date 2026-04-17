'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Plus, Trash2 } from 'lucide-react';

const DISCIPLINES = ['structural','transportation','geotechnical','water-resources','environmental','construction'];
const LEVELS = ['Graduate','EIT','Mid-Level','Senior','Principal'];

export default function AdminSalaryDataPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ discipline: '', experience_level: '', salary_min: '', salary_median: '', salary_max: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const { data } = await insforge.database
        .from('salary_data_points')
        .select('*')
        .order('discipline')
        .order('experience_level');
      setRows(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data } = await insforge.database
      .from('salary_data_points')
      .insert({
        discipline: form.discipline,
        experience_level: form.experience_level,
        salary_min: parseInt(form.salary_min),
        salary_median: parseInt(form.salary_median),
        salary_max: parseInt(form.salary_max),
      })
      .select()
      .single();
    if (data) setRows(prev => [...prev, data]);
    setForm({ discipline: '', experience_level: '', salary_min: '', salary_median: '', salary_max: '' });
    setAdding(false);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await insforge.database.from('salary_data_points').delete().eq('id', id);
    setRows(prev => prev.filter(r => r.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#1A3A8F] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard/admin" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Admin</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Salary Data</h1>
          <p className="text-white/70 text-sm mt-1">Manage salary data points for the salary guide page</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-end">
          <button onClick={() => setAdding(!adding)}
            className="flex items-center gap-2 bg-[#D4AF37] text-white font-bold px-4 py-2.5 rounded-lg text-sm hover:bg-[#B8960C] transition-colors">
            <Plus size={15} /> Add Data Point
          </button>
        </div>

        {adding && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
            <h3 className="font-bold text-[#1A3A8F]">New Data Point</h3>
            <div className="grid sm:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A3A8F] mb-1">Discipline</label>
                <select value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})} required
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] bg-white">
                  <option value="">Select</option>
                  {DISCIPLINES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A3A8F] mb-1">Level</label>
                <select value={form.experience_level} onChange={e => setForm({...form, experience_level: e.target.value})} required
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] bg-white">
                  <option value="">Select</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              {[{key:'salary_min',label:'Min ($)'},{key:'salary_median',label:'Median ($)'},{key:'salary_max',label:'Max ($)'}].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#1A3A8F] mb-1">{label}</label>
                  <input type="number" value={form[key as keyof typeof form]}
                    onChange={e => setForm({...form, [key]: e.target.value})} required
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
              ))}
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
          <div className="h-64 bg-white rounded-xl border border-[#E2E8F0] animate-pulse" />
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1A3A8F] text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Discipline</th>
                  <th className="text-left px-4 py-3 font-semibold">Level</th>
                  <th className="text-right px-4 py-3 font-semibold">Min</th>
                  <th className="text-right px-4 py-3 font-semibold">Median</th>
                  <th className="text-right px-4 py-3 font-semibold">Max</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                    <td className="px-5 py-3 text-[#1A3A8F] font-medium">{r.discipline}</td>
                    <td className="px-4 py-3 text-[#4A5568]">{r.experience_level}</td>
                    <td className="px-4 py-3 text-right text-[#4A5568]">${r.salary_min?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-[#D4AF37] font-semibold">${r.salary_median?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-[#4A5568]">${r.salary_max?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(r.id)} className="text-[#4A5568] hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-[#4A5568]">No salary data yet. Add data points above.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
