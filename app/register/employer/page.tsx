'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function EmployerRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [verifyStep, setVerifyStep] = useState(false);
  const [otp, setOtp] = useState('');

  const [form, setForm] = useState({
    companyName: '', industry: '', size: '', website: '', state: '',
    contactName: '', contactTitle: '', email: '', phone: '',
    password: '', confirmPassword: '',
  });

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    const { data, error: err } = await insforge.auth.signUp({
      email: form.email,
      password: form.password,
      name: `${form.contactName} at ${form.companyName}`,
    });

    if (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
      return;
    }

    if (data?.requireEmailVerification) {
      setVerifyStep(true);
      setLoading(false);
      return;
    }

    if (data?.accessToken) {
      await saveProfile();
      router.push('/dashboard/employer');
    }
    setLoading(false);
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error: err } = await insforge.auth.verifyEmail({ email: form.email, otp });
    if (err) {
      setError('Invalid code. Please check your email.');
      setLoading(false);
      return;
    }
    if (data?.accessToken) {
      await saveProfile();
      router.push('/dashboard/employer');
    }
    setLoading(false);
  }

  async function saveProfile() {
    await insforge.auth.setProfile({
      role: 'employer',
      company_name: form.companyName,
      industry: form.industry,
      size: form.size,
      website: form.website,
      state: form.state,
      contact_name: form.contactName,
      contact_title: form.contactTitle,
      phone: form.phone,
    });
  }

  if (verifyStep) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#E91E8C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#E91E8C]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2">Verify Your Email</h2>
          <p className="text-[#4A5568] mb-6">We sent a 6-digit code to <strong>{form.email}</strong></p>
          {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleVerify} className="space-y-4">
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} required
              placeholder="000000"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest outline-none focus:border-[#E91E8C]" />
            <button type="submit" disabled={loading}
              className="w-full bg-[#E91E8C] text-white font-bold py-3 rounded-lg hover:bg-[#C0176E] transition-colors">
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E91E8C] rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-[#0B1F3A] text-lg">CC<span className="text-[#E91E8C]">Promoters</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0B1F3A] mt-4">Register as an Employer</h1>
          <p className="text-[#4A5568] mt-1">Start hiring pre-screened civil engineers today</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-bold text-[#0B1F3A] pb-3 border-b border-[#E2E8F0]">Company Information</h2>
            <Field label="Company Name *" value={form.companyName} onChange={v => update('companyName', v)} placeholder="Apex Civil Engineering" required />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Industry *</label>
                <select value={form.industry} onChange={e => update('industry', e.target.value)} required
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select...</option>
                  {['Engineering Firm', 'Government Agency', 'Construction Company', 'Consulting Firm', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Company Size</label>
                <select value={form.size} onChange={e => update('size', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select...</option>
                  {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Website" value={form.website} onChange={v => update('website', v)} placeholder="https://yourfirm.com" />
              <Field label="Primary State" value={form.state} onChange={v => update('state', v)} placeholder="TX" />
            </div>

            <h2 className="text-lg font-bold text-[#0B1F3A] pt-2 pb-3 border-b border-[#E2E8F0]">Contact Person</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Contact Name *" value={form.contactName} onChange={v => update('contactName', v)} placeholder="Jane Smith" required />
              <Field label="Job Title" value={form.contactTitle} onChange={v => update('contactTitle', v)} placeholder="HR Director" />
            </div>
            <Field label="Work Email *" type="email" value={form.email} onChange={v => update('email', v)} placeholder="jane@yourfirm.com" required />
            <Field label="Phone Number" type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+1 (555) 000-0000" />

            <h2 className="text-lg font-bold text-[#0B1F3A] pt-2 pb-3 border-b border-[#E2E8F0]">Create Password</h2>
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Password *</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} required
                  placeholder="At least 6 characters"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#E91E8C]" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Field label="Confirm Password *" type="password" value={form.confirmPassword} onChange={v => update('confirmPassword', v)} placeholder="Repeat password" required />

            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>}

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="w-full bg-[#E91E8C] text-white font-bold py-4 rounded-lg hover:bg-[#C0176E] transition-colors disabled:opacity-70 text-base">
                {loading ? 'Creating Account...' : 'Create Employer Account →'}
              </button>
            </div>
            <p className="text-xs text-[#4A5568] text-center">
              By registering, you agree to our{' '}
              <Link href="/terms-of-service" className="text-[#E91E8C] hover:underline">Terms</Link> and{' '}
              <Link href="/privacy-policy" className="text-[#E91E8C] hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>
        <p className="text-center text-sm text-[#4A5568] mt-6">
          Looking for a job?{' '}
          <Link href="/register/candidate" className="text-[#E91E8C] font-semibold hover:underline">Register as a Candidate →</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C] focus:ring-1 focus:ring-[#E91E8C] transition-colors" />
    </div>
  );
}
