'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge';

const DISCIPLINES = [
  { value: 'structural',      label: 'Structural Engineering' },
  { value: 'transportation',  label: 'Transportation Engineering' },
  { value: 'geotechnical',    label: 'Geotechnical Engineering' },
  { value: 'water-resources', label: 'Water Resources & Hydrology' },
  { value: 'environmental',   label: 'Environmental Engineering' },
  { value: 'wastewater',      label: 'Wastewater & Utilities' },
  { value: 'construction',    label: 'Construction & Project Management' },
  { value: 'land-development',label: 'Land Development & Urban Planning' },
  { value: 'surveying',       label: 'Surveying & Geospatial' },
  { value: 'coastal',         label: 'Coastal & Marine Engineering' },
];
const EMP_TYPES = [
  { value: 'permanent',         label: 'Permanent / Direct Hire' },
  { value: 'contract',          label: 'Contract' },
  { value: 'contract-to-hire',  label: 'Contract-to-Hire' },
];
const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function PostJobPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState({
    title: '', discipline: '', employment_type: '', location_city: '', location_state: '',
    is_remote: false, salary_min: '', salary_max: '', description: '', requirements: '',
    nice_to_have: '', benefits: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      setUserId(userData.user.id);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.discipline || !form.employment_type) {
      setError('Please fill in all required fields.'); return;
    }
    if (!userId) return;
    setSaving(true); setError('');

    // Get employer profile
    const { data: employer } = await insforge.database
      .from('employer_profiles')
      .select('id, company_name')
      .eq('user_id', userId)
      .single();

    const slug = slugify(form.title) + '-' + Date.now().toString(36);

    const { data, error: err } = await insforge.database
      .from('jobs')
      .insert({
        employer_id: employer?.id || null,
        title: form.title,
        slug,
        discipline: form.discipline,
        employment_type: form.employment_type,
        location_city: form.location_city || null,
        location_state: form.location_state || null,
        is_remote: form.is_remote,
        salary_min: form.salary_min ? parseInt(form.salary_min) : null,
        salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        description: form.description || null,
        requirements: form.requirements || null,
        nice_to_have: form.nice_to_have || null,
        benefits: form.benefits || null,
        status: 'active',
        posted_by: userId,
      })
      .select()
      .single();

    setSaving(false);
    if (err || !data) { setError('Failed to post job. Please try again.'); return; }
    router.push('/dashboard/employer/listings');
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/employer" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Post a New Job</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">Job Details</h3>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Job Title <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required
                placeholder="e.g. Senior Structural Engineer"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Discipline <span className="text-red-500">*</span></label>
                <select value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})} required
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                  <option value="">Select discipline</option>
                  {DISCIPLINES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Employment Type <span className="text-red-500">*</span></label>
                <select value={form.employment_type} onChange={e => setForm({...form, employment_type: e.target.value})} required
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                  <option value="">Select type</option>
                  {EMP_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">Location & Compensation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">City</label>
                <input type="text" value={form.location_city} onChange={e => setForm({...form, location_city: e.target.value})}
                  placeholder="e.g. Dallas"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">State</label>
                <select value={form.location_state} onChange={e => setForm({...form, location_state: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                  <option value="">Select state</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_remote} onChange={e => setForm({...form, is_remote: e.target.checked})}
                className="w-4 h-4 accent-[#CC1016]" />
              <span className="text-sm text-[#0D0D0D] font-medium">This is a remote position</span>
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Min Salary ($)</label>
                <input type="number" value={form.salary_min} onChange={e => setForm({...form, salary_min: e.target.value})}
                  placeholder="60000"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Max Salary ($)</label>
                <input type="number" value={form.salary_max} onChange={e => setForm({...form, salary_max: e.target.value})}
                  placeholder="90000"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">Job Description</h3>
            {[
              { key: 'description', label: 'Description', placeholder: 'Overview of the role and responsibilities...' },
              { key: 'requirements', label: 'Requirements', placeholder: 'Required skills, education, and experience...' },
              { key: 'nice_to_have', label: 'Nice to Have', placeholder: 'Bonus skills or experience...' },
              { key: 'benefits', label: 'Benefits & Perks', placeholder: 'Health insurance, 401k, PTO...' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">{label}</label>
                <textarea value={form[key as keyof typeof form] as string}
                  onChange={e => setForm({...form, [key]: e.target.value})}
                  rows={4} placeholder={placeholder}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="flex-1 bg-[#CC1016] text-white font-bold py-3 rounded-lg hover:bg-[#A80D12] transition-colors disabled:opacity-60">
              {saving ? 'Posting...' : 'Post Job'}
            </button>
            <Link href="/dashboard/employer/listings" className="px-6 py-3 border border-[#E5E5E5] rounded-lg text-[#0D0D0D] font-semibold hover:border-[#0D0D0D] transition-colors text-sm flex items-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
