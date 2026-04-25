export const dynamic = 'force-dynamic';

import { insforge } from '@/lib/insforge';
import JobsClient from './JobsClient';

export const metadata = {
  title: 'Civil Engineering Jobs | CCPromoters',
  description: 'Browse 200+ active civil engineering jobs across all disciplines. Filter by location, salary, discipline, and license requirement.',
};

function applyFilters(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any,
  searchParams: Record<string, string>
) {
  if (searchParams.discipline && searchParams.discipline !== 'all') {
    query = query.eq('discipline_slug', searchParams.discipline);
  }
  if (searchParams.type) {
    query = query.eq('employment_type', searchParams.type);
  }
  if (searchParams.state) {
    query = query.eq('location_state', searchParams.state);
  }
  if (searchParams.remote === 'true') {
    query = query.eq('is_remote', true);
  }
  if (searchParams.license) {
    query = query.ilike('license_required', `%${searchParams.license}%`);
  }
  return query;
}

async function getJobs(searchParams: Record<string, string>) {
  const page = parseInt(searchParams.page || '1');
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Separate count query so a count failure never kills the data fetch
  let countQuery = insforge.database
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');
  countQuery = applyFilters(countQuery, searchParams);
  const { count, error: countError } = await countQuery;
  if (countError) console.error('[jobs] count error:', countError);

  // Data query — no count option to avoid combined-request failures
  let dataQuery = insforge.database
    .from('jobs')
    .select('id, title, slug, discipline, discipline_slug, employment_type, location_city, location_state, is_remote, salary_min, salary_max, rate_min, rate_max, license_required, experience_level, is_featured, posted_at, status')
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('posted_at', { ascending: false })
    .range(from, to);
  dataQuery = applyFilters(dataQuery, searchParams);
  const { data, error: dataError } = await dataQuery;
  if (dataError) console.error('[jobs] data error:', dataError);

  return { jobs: data || [], total: count || 0 };
}

export default async function JobsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { jobs, total } = await getJobs(searchParams);

  return <JobsClient initialJobs={jobs} total={total} searchParams={searchParams} />;
}
