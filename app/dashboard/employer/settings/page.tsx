'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';

const INDUSTRIES = ['Accounting & Finance','Engineering','Technology','Manufacturing','Healthcare','Retail & Consumer','Professional Services','Real Estate','Energy','Other'];

export default function EmployerSettingsPage() {
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState({
    company_name: '', industry: '', company_size: '', website: '',
    contact_name: '', contact_title: '', contact_phone: '', about: '',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await insforge.auth.getCurrentUser();
      if (!userData?.user) { window.location.href = '/login'; return; }
      const user = userData.user;
      setUserId(user.id);
      const { data } = await insforge.database
        .from('employer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (data) setProfile({
        company_name: data.company_name || '',
        industry: data.industry || '',
        company_size: data.company_size || '',
        website: data.website || '',
        contact_name: data.contact_name || '',
        contact_title: data.contact_title || '',
        contact_phone: data.contact_phone || '',
        about: data.about || '',
      });
    }
    load();
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setProfileSaving(true);
    await insforge.database
      .from('employer_profiles')
      .upsert({ user_id: userId, ...profile }, { onConflict: 'user_id' });
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard/employer" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Settings</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {/* Company profile */}
        <form onSubmit={saveProfile} className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
          <h3 className="font-bold text-[#0D0D0D]">Company Profile</h3>
          {profileSaved && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">Profile saved.</div>}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: 'company_name', label: 'Company Name' },
              { key: 'website', label: 'Website', type: 'url' },
              { key: 'contact_name', label: 'Primary Contact Name' },
              { key: 'contact_title', label: 'Contact Title' },
              { key: 'contact_phone', label: 'Phone', type: 'tel' },
            ].map(({ key, label, type = 'text' }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">{label}</label>
                <input type={type} value={profile[key as keyof typeof profile]}
                  onChange={e => setProfile({...profile, [key]: e.target.value})}
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Industry</label>
              <select value={profile.industry} onChange={e => setProfile({...profile, industry: e.target.value})}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                <option value="">Select industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Company Size</label>
              <select value={profile.company_size} onChange={e => setProfile({...profile, company_size: e.target.value})}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors bg-white">
                <option value="">Select size</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="201-500">201–500</option>
                <option value="501-1000">501–1,000</option>
                <option value="1001+">1,001+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">About the Company</label>
            <textarea value={profile.about} onChange={e => setProfile({...profile, about: e.target.value})} rows={4}
              placeholder="Brief description of your company and culture..."
              className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors resize-none" />
          </div>
          <button type="submit" disabled={profileSaving}
            className="bg-[#CC1016] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#A80D12] transition-colors disabled:opacity-60">
            {profileSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#0D0D0D] mb-2">Change Password</h3>
          <p className="text-sm text-[#6B6B6B] mb-4">To update your password, use the password reset flow.</p>
          <Link href="/auth/forgot-password"
            className="inline-block bg-[#CC1016] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#A80D12] transition-colors">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
}
