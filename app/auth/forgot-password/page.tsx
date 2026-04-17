'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError('Please enter your email address.'); return; }
    setError('');
    // In production this would trigger an email via backend
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A3A8F]" style={{ fontFamily: 'Manrope, sans-serif' }}>Reset Your Password</h1>
          <p className="text-[#4A5568] mt-2 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
          {submitted ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold text-[#1A3A8F] text-lg mb-2">Check Your Email</h3>
              <p className="text-[#4A5568] text-sm mb-6">If an account exists for <strong>{email}</strong>, we have sent a password reset link. Check your inbox and spam folder.</p>
              <Link href="/login" className="btn-pink block text-center">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#1A3A8F] mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A3A8F] focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B8960C] transition-colors">
                Send Reset Link
              </button>
              <p className="text-center text-sm text-[#4A5568] mt-4">
                Remember your password? <Link href="/login" className="text-[#D4AF37] font-semibold hover:underline">Log in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
