'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { Bell, Trash2, Plus } from 'lucide-react';

const DISCIPLINES = ['accounting-finance','engineering','technology','sales-marketing','human-resources','supply-chain','life-sciences','legal','creative','operations'];
const EMP_TYPES = ['full-time','part-time','contract','temporary'];

export default function JobAlertsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [alerts, setAlerts] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ keywords: '', discipline: '', employment_type: '', location: '', frequency: 'daily' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      setUserId(userData.user.id);
      const { data } = await insforge.database
        .from('job_alerts')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });
      setAlerts(data || []); setLoading(false);
    }
    load();
  }, []);

  async function createAlert() {
    if (!userId) return;
    setSaving(true);
    const { data } = await insforge.database
      .from('job_alerts')
      .insert({
        user_id: userId,
        keywords: form.keywords || null,
        discipline: form.discipline || null,
        employment_type: form.employment_type || null,
        location: form.location || null,
        frequency: form.frequency,
        is_active: true,
      })
      .select()
      .single();
    if (data) setAlerts(prev => [data, ...prev]);
    setForm({ keywords: '', discipline: '', employment_type: '', location: '', frequency: 'daily' });
    setShowForm(false);
    setSaving(false);
  }

  async function deleteAlert(id: string) {
    await insforge.database.from('job_alerts').delete().eq('id', id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  async function toggleAlert(id: string, current: boolean) {
    await insforge.database.from('job_alerts').update({ is_active: !current }).eq('id', id);
    setAlerts(prev => prev.map(a => a.id === id ? {...a, is_active: !current} : a));
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/dashboard/candidate" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Job Alerts</h1>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#CC1016] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#A80D12] transition-colors">
            <Plus size={16} /> New Alert
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {showForm && (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 mb-6">
            <h3 className="font-bold text-[#0D0D0D] mb-4">Create Job Alert</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Keywords</label>
                <input type="text" value={form.keywords} onChange={e => setForm({...form, keywords: e.target.value})}
                  placeholder="e.g. Senior Accountant, CPA"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Discipline</label>
                  <select value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                    <option value="">Any</option>
                    {DISCIPLINES.map(d => <option key={d} value={d}>{d.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Employment Type</label>
                  <select value={form.employment_type} onChange={e => setForm({...form, employment_type: e.target.value})}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                    <option value="">Any</option>
                    {EMP_TYPES.map(t => <option key={t} value={t}>{t.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Location</label>
                  <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                    placeholder="e.g. Dallas, TX"
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Frequency</label>
                  <select value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                    <option value="instant">Instant</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={createAlert} disabled={saving}
                className="bg-[#CC1016] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#A80D12] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Create Alert'}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-[#E5E5E5] rounded-lg text-sm text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors">Cancel</button>
            </div>
          </div>
        )}
        {loading ? (
          <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-[#E5E5E5] animate-pulse" />)}</div>
        ) : alerts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-16 text-center">
            <Bell size={48} className="text-[#CC1016]/30 mx-auto mb-4" />
            <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">No Job Alerts</h3>
            <p className="text-[#6B6B6B] mb-6 text-sm">Create an alert to get notified when new matching jobs are posted.</p>
            <button onClick={() => setShowForm(true)} className="btn-pink">Create Your First Alert</button>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert: { id: string; keywords?: string; discipline?: string; employment_type?: string; location?: string; frequency: string; is_active: boolean }) => (
              <div key={alert.id} className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {alert.keywords && <span className="font-semibold text-[#0D0D0D] text-sm">{alert.keywords}</span>}
                    {alert.discipline && <span className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded-full text-[#6B6B6B]">{alert.discipline.replace(/-/g,' ')}</span>}
                    {alert.employment_type && <span className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded-full text-[#6B6B6B] capitalize">{alert.employment_type}</span>}
                    {alert.location && <span className="text-xs bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded-full text-[#6B6B6B]">{alert.location}</span>}
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-1 capitalize">{alert.frequency} · {alert.is_active ? 'Active' : 'Paused'}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleAlert(alert.id, alert.is_active)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-colors ${alert.is_active ? 'border-green-200 text-green-700 bg-green-50' : 'border-[#E5E5E5] text-[#6B6B6B]'}`}>
                    {alert.is_active ? 'Active' : 'Paused'}
                  </button>
                  <button onClick={() => deleteAlert(alert.id)} className="p-1.5 text-[#6B6B6B] hover:text-red-600 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
