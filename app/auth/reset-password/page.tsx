'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    setError('');
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#CC1016] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Manrope, sans-serif' }}>Set New Password</h1>
          <p className="text-[#6B6B6B] mt-2 text-sm">Enter your new password below.</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm">
          {submitted ? (
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-2">Password Updated!</h3>
              <p className="text-[#6B6B6B] text-sm mb-6">Your password has been reset successfully. You can now log in with your new password.</p>
              <Link href="/login" className="btn-pink block text-center">Go to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">New Password</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Minimum 8 characters" required
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Confirm Password</label>
                <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} placeholder="Repeat your password" required
                  className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#0D0D0D] focus:outline-none focus:border-[#CC1016] transition-colors" />
              </div>
              <button type="submit" className="w-full bg-[#CC1016] text-white font-bold py-3 rounded-lg hover:bg-[#A80D12] transition-colors">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
