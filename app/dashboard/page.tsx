'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge';

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      const { data } = await insforge.auth.getCurrentUser();
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
      const { data: emp } = await insforge.database
        .from('employer_profiles')
        .select('user_id')
        .eq('user_id', u.id)
        .maybeSingle();
      router.replace(emp ? '/dashboard/employer' : '/dashboard/candidate');
    }
    redirect();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#CC1016] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
