'use client';

import { useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { insforge } from '@/lib/insforge';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await insforge.database.from('newsletter_signups').insert([{ email, is_employer: isEmployer }]);
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section className="py-20 bg-[#1A3A8F]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Bell size={32} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Never Miss the Right{' '}
          <span className="text-[#D4AF37]">Opportunity</span>
        </h2>
        <p className="text-white/60 text-lg mb-8">
          {isEmployer
            ? 'Get notified when qualified civil engineers matching your requirements become available.'
            : 'Get new civil engineering jobs matching your discipline delivered to your inbox.'
          }
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-white">
            <CheckCircle size={24} className="text-[#059669]" />
            <span className="text-lg font-semibold">You&apos;re on the list! We&apos;ll be in touch.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isEmployer ? 'Your work email address' : 'Your email address'}
                className="flex-1 px-5 py-4 rounded-lg text-[#1A3A8F] text-base outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#D4AF37] text-white font-semibold px-7 py-4 rounded-lg hover:bg-[#B8960C] transition-colors whitespace-nowrap disabled:opacity-70">
                {loading ? 'Subscribing...' : 'Notify Me of New Roles'}
              </button>
            </div>
            <label className="flex items-center justify-center gap-2 text-white/60 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isEmployer}
                onChange={e => setIsEmployer(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37]"
              />
              I&apos;m an employer looking for engineering talent
            </label>
          </form>
        )}
        <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe at any time. We respect your privacy.</p>
      </div>
    </section>
  );
}
