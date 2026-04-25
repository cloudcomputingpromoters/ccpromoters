'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge';
import { Shield, LogIn } from 'lucide-react';

export default function SetupAdminPage() {
  const router = useRouter();
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const { data: userData } = await insforge.auth.getCurrentUser();
    if (!userData?.user) {
      setStatus('error');
      setMessage('You must be logged in. Go to /login first.');
      return;
    }

    // Server validates the secret
    const res = await fetch('/api/admin-grant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    });

    const body = await res.json();
    if (!res.ok) {
      setStatus('error');
      setMessage(body.error || 'Failed. Check the secret token.');
      return;
    }

    // Secret validated — now set role: admin on this user's profile
    const { error: profileErr } = await insforge.auth.setProfile({ role: 'admin' });
    if (profileErr) {
      setStatus('error');
      setMessage('Secret accepted but profile update failed. Try signing out and back in first.');
      return;
    }

    setStatus('done');
    setMessage(`Admin role granted to ${userData.user.email}. Sign out and back in, then visit /dashboard/admin.`);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E5E5E5] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#0D0D0D] rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-[#CC1016]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0D0D0D]">Admin Setup</h1>
            <p className="text-xs text-[#6B6B6B]">One-time admin role activation</p>
          </div>
        </div>

        {status === 'done' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-1">Done!</p>
            <p>{message}</p>
            <button onClick={() => insforge.auth.signOut().then(() => router.push('/login'))}
              className="mt-4 w-full bg-[#0D0D0D] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#152d6e] transition-colors">
              Sign Out &amp; Sign Back In →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSetup} className="space-y-4">
            <p className="text-sm text-[#6B6B6B]">
              Enter the <code className="bg-[#F5F5F5] px-1.5 py-0.5 rounded text-[#0D0D0D] border border-[#E5E5E5] text-xs">ADMIN_SETUP_SECRET</code> from your environment to grant admin access to your current account.
            </p>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D0D] mb-1.5">Setup Secret</label>
              <input
                type="password"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                placeholder="Enter secret token"
                required
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#CC1016] transition-colors"
              />
            </div>
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">{message}</div>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#CC1016] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#A80D12] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              {status === 'loading' ? 'Granting...' : 'Grant Admin Role'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
