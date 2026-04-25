import { Suspense } from 'react';
import JobsClient from './JobsClient';

export const metadata = {
  title: 'Civil Engineering Jobs | CCPromoters',
  description: 'Browse 200+ active civil engineering jobs across all disciplines. Filter by location, salary, discipline, and license requirement.',
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F5]" />}>
      <JobsClient />
    </Suspense>
  );
}
