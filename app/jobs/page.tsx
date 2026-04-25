import JobsClient from './JobsClient';

export const metadata = {
  title: 'Civil Engineering Jobs | CCPromoters',
  description: 'Browse 200+ active civil engineering jobs across all disciplines. Filter by location, salary, discipline, and license requirement.',
};

export default function JobsPage() {
  return <JobsClient />;
}
