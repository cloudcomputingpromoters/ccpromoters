'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';

const DISCIPLINES = ['accounting-finance','engineering','technology','sales-marketing','human-resources','supply-chain','life-sciences','legal','creative','operations'];
const TIMELINES = ['immediately','1-2 weeks','2-4 weeks','1-2 months','2-3 months','3+ months'];

export default function RequestTalentPage() {
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState({
    company_name: '', contact_name: '', contact_email: '', contact_phone: '',
    discipline: '', role_title: '', employment_type: '', quantity: '1',
    location: '', is_remote: false, salary_budget: '',
    timeline: '', description: '', additional_notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const user = userData.user;
      setUserId(user.id);
      const { data } = await insforge.database
        .from('employer_profiles')
        .select('company_name, contact_name, contact_email, contact_phone')
        .eq('user_id', user.id)
        .single();
      if (data) setForm(prev => ({
        ...prev,
        company_name: data.company_name || '',
        contact_name: data.contact_name || '',
        contact_email: data.contact_email || '',
        contact_phone: data.contact_phone || '',
      }));
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.discipline || !form.role_title) { setError('Please fill in all required fields.'); return; }
    setSubmitting(true); setError('');
    const { error: err } = await insforge.database
      .from('talent_requests')
      .insert({
        user_id: userId || null,
        company_name: form.company_name,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || null,
        discipline: form.discipline,
        role_title: form.role_title,
        employment_type: form.employment_type || null,
        quantity: parseInt(form.quantity) || 1,
        location: form.location || null,
        is_remote: form.is_remote,
        salary_budget: form.salary_budget || null,
        timeline: form.timeline || null,
        description: form.description || null,
        additional_notes: form.additional_notes || null,
        status: 'new',
      });
    setSubmitting(false);
    if (err) { setError('Submission failed. Please try again.'); return; }
    setSubmitted(true);
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-12 text-center max-w-md">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-[#0D0D0D] mb-2">Request Received!</h2>
        <p className="text-[#6B6B6B] text-sm mb-6">Our team will review your talent request and reach out within 1 business day to discuss your needs.</p>
        <Link href="/dashboard/employer" className="btn-pink">Back to Dashboard</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/employer" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Request Talent</h1>
          <p className="text-white/70 text-sm mt-1">Tell us what you are looking for and our team will source top candidates.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">Contact Info</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'company_name', label: 'Company Name', placeholder: 'Acme Corp' },
                { key: 'contact_name', label: 'Your Name', placeholder: 'Jane Smith' },
                { key: 'contact_email', label: 'Email', placeholder: 'jane@acme.com', type: 'email' },
                { key: 'contact_phone', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel' },
              ].map(({ key, label, placeholder, type = 'text' }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">{label}</label>
                  <input type={type} value={form[key as keyof typeof form] as string}
                    onChange={e => setForm({...form, [key]: e.target.value})}
                    placeholder={placeholder}
                    className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">Role Requirements</h3>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Role Title <span className="text-red-500">*</span></label>
              <input type="text" value={form.role_title} onChange={e => setForm({...form, role_title: e.target.value})} required
                placeholder="e.g. Senior Accountant"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Discipline <span className="text-red-500">*</span></label>
                <select value={form.discipline} onChange={e => setForm({...form, discipline: e.target.value})} required
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                  <option value="">Select discipline</option>
                  {DISCIPLINES.map(d => <option key={d} value={d}>{d.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Employment Type</label>
                <select value={form.employment_type} onChange={e => setForm({...form, employment_type: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                  <option value="">Select type</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Number of Hires</label>
                <input type="number" min="1" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Hiring Timeline</label>
                <select value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                  <option value="">Select timeline</option>
                  {TIMELINES.map(t => <option key={t} value={t}>{t.replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Location</label>
                <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. Dallas, TX"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Salary Budget</label>
                <input type="text" value={form.salary_budget} onChange={e => setForm({...form, salary_budget: e.target.value})} placeholder="e.g. $70k-$90k"
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_remote} onChange={e => setForm({...form, is_remote: e.target.checked})} className="w-4 h-4 accent-[#CC1016]" />
              <span className="text-sm text-[#0D0D0D] font-medium">Remote or hybrid acceptable</span>
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
            <h3 className="font-bold text-[#0D0D0D]">Additional Details</h3>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Role Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4}
                placeholder="Key responsibilities, must-have skills, team structure..."
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Additional Notes</label>
              <textarea value={form.additional_notes} onChange={e => setForm({...form, additional_notes: e.target.value})} rows={3}
                placeholder="Any other context that would help us find the right candidate..."
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
            </div>
          </div>

          <button type="submit" disabled={submitting}
            className="w-full bg-[#CC1016] text-white font-bold py-3 rounded-lg hover:bg-[#A80D12] transition-colors disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Submit Talent Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
