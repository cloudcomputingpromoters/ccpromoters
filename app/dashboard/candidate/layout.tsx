'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function verify() {
      const { data } = await insforge.auth.getCurrentUser();
      if (cancelled) return;
      if (!data?.user) {
        router.replace('/login');
        return;
      }
      const u = data.user;
      const role = (u.metadata as Record<string, unknown>)?.role
               ?? (u.profile as Record<string, unknown>)?.role;
      if (role === 'admin') {
        router.replace('/dashboard/admin');
        return;
      }
      if (role === 'employer') {
        router.replace('/dashboard/employer');
        return;
      }
      if (cancelled) return;
      setReady(true);
    }
    verify();
    return () => { cancelled = true; };
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#CC1016] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
