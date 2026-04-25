'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';

const DISCIPLINES = ['accounting-finance','engineering','technology','sales-marketing','human-resources','supply-chain','life-sciences','legal','creative','operations'];
const EMP_TYPES = ['full-time','part-time','contract','temporary'];

export default function EditProfilePage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', phone: '', current_title: '', bio: '',
    discipline: '', years_experience: '', employment_type_preference: '',
    salary_expectation_min: '', salary_expectation_max: '',
    location_city: '', location_state: '', open_to_remote: false, skills: '',
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      setUserId(userData.user.id);
      const { data } = await insforge.database
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();
      if (data) {
        setForm({
          first_name: data.first_name || '', last_name: data.last_name || '',
          phone: data.phone || '', current_title: data.current_title || '',
          bio: data.bio || '', discipline: data.discipline || '',
          years_experience: data.years_experience != null ? String(data.years_experience) : '',
          employment_type_preference: data.employment_type_preference || '',
          salary_expectation_min: data.salary_expectation_min != null ? String(data.salary_expectation_min) : '',
          salary_expectation_max: data.salary_expectation_max != null ? String(data.salary_expectation_max) : '',
          location_city: data.location_city || '', location_state: data.location_state || '',
          open_to_remote: data.open_to_remote || false,
          skills: Array.isArray(data.skills) ? data.skills.join(', ') : '',
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setSaving(true); setError('');
    const { error: err } = await insforge.database
      .from('candidate_profiles')
      .upsert({
        user_id: userId,
        first_name: form.first_name, last_name: form.last_name,
        phone: form.phone || null, current_title: form.current_title || null,
        bio: form.bio || null, discipline: form.discipline || null,
        years_experience: form.years_experience ? parseInt(form.years_experience) : null,
        employment_type_preference: form.employment_type_preference || null,
        salary_expectation_min: form.salary_expectation_min ? parseInt(form.salary_expectation_min) : null,
        salary_expectation_max: form.salary_expectation_max ? parseInt(form.salary_expectation_max) : null,
        location_city: form.location_city || null, location_state: form.location_state || null,
        open_to_remote: form.open_to_remote,
        skills: form.skills ? form.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      }, { onConflict: 'user_id' });
    setSaving(false);
    if (err) { setError('Failed to save profile. Please try again.'); }
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="animate-pulse text-[#6B6B6B]">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/candidate/profile" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← My Profile</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Edit Profile</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}
          {saved && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">Profile saved successfully.</div>}

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D] mb-1">Personal Info</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {(['first_name','last_name'] as const).map(key => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">{key === 'first_name' ? 'First Name' : 'Last Name'}</label>
                  <input type="text" value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Current Job Title</label>
              <input type="text" value={form.current_title} onChange={e => setForm({...form, current_title: e.target.value})}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Bio / Summary</label>
              <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm resize-none" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D] mb-1">Career Preferences</h3>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Discipline</label>
              <select value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm bg-white">
                <option value="">Select discipline</option>
                {DISCIPLINES.map(d => <option key={d} value={d}>{d.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Years of Experience</label>
                <input type="number" value={form.years_experience} onChange={e => setForm({...form, years_experience: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Preferred Employment Type</label>
                <select value={form.employment_type_preference} onChange={e => setForm({...form, employment_type_preference: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm bg-white">
                  <option value="">Select type</option>
                  {EMP_TYPES.map(t => <option key={t} value={t}>{t.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Min Salary ($)</label>
                <input type="number" value={form.salary_expectation_min} onChange={e => setForm({...form, salary_expectation_min: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Max Salary ($)</label>
                <input type="number" value={form.salary_expectation_max} onChange={e => setForm({...form, salary_expectation_max: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D] mb-1">Location</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">City</label>
                <input type="text" value={form.location_city} onChange={e => setForm({...form, location_city: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">State</label>
                <input type="text" value={form.location_state} onChange={e => setForm({...form, location_state: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.open_to_remote} onChange={e => setForm({...form, open_to_remote: e.target.checked})} className="w-4 h-4 accent-[#CC1016]" />
              <span className="text-sm text-[#0D0D0D] font-medium">Open to remote opportunities</span>
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#0D0D0D] mb-3">Skills</h3>
            <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Skills (comma-separated)</label>
            <input type="text" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})}
              placeholder="Excel, QuickBooks, Financial Modeling, GAAP"
              className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors text-sm" />
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="flex-1 bg-[#CC1016] text-white font-bold py-3 rounded-lg hover:bg-[#A80D12] transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <Link href="/dashboard/candidate/profile" className="px-6 py-3 border border-[#E5E5E5] rounded-lg text-[#0D0D0D] font-semibold hover:border-[#0D0D0D] transition-colors text-sm flex items-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
