import { Suspense } from 'react';
import { insforge } from '@/lib/insforge';
import JobsClient from './JobsClient';

export const metadata = {
  title: 'Civil Engineering Jobs | CCPromoters',
  description: 'Browse 500+ active civil engineering jobs across all disciplines. Filter by location, salary, discipline, and license requirement.',
};

type Job = {
  id: string;
  title: string;
  slug: string;
  discipline: string;
  discipline_slug: string;
  employment_type: string;
  location_city: string;
  location_state: string;
  is_remote: boolean;
  salary_min: number | null;
  salary_max: number | null;
  rate_min: number | null;
  rate_max: number | null;
  license_required: string | null;
  experience_level: string | null;
  is_featured: boolean;
  posted_at?: string;
};

async function fetchAllJobs(): Promise<Job[]> {
  try {
    console.log('[Server] Starting job fetch from InsForge...');

    const { data, error } = await insforge.database
      .from('jobs')
      .select('id,title,slug,discipline,discipline_slug,employment_type,location_city,location_state,is_remote,salary_min,salary_max,rate_min,rate_max,license_required,experience_level,is_featured,posted_at')
      .order('is_featured', { ascending: false })
      .order('posted_at', { ascending: false });

    if (error) {
      console.error('[Server] InsForge Database Error:', error);
      console.error('[Server] Error details:', JSON.stringify(error, null, 2));
      return [];
    }

    if (!data) {
      console.error('[Server] InsForge returned null data despite no error');
      return [];
    }

    console.log(`[Server] Successfully fetched ${data.length} jobs from InsForge`);
    return data as Job[];
  } catch (err) {
    console.error('[Server] Exception during job fetch:', err);
    console.error('[Server] Error type:', err instanceof Error ? err.message : String(err));
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await fetchAllJobs();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F5]" />}>
      <JobsClient initialJobs={jobs} />
    </Suspense>
  );
}
