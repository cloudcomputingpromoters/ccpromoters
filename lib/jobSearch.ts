// Pure, framework-free job search/filter helpers.
// Shared by the /jobs UI (JobsClient) and the test harness so behavior is identical.

export type SearchJob = {
  title?: string | null;
  discipline?: string | null;
  discipline_slug?: string | null;
  employment_type?: string | null;
  location_city?: string | null;
  location_state?: string | null;
  license_required?: string | null;
  experience_level?: string | null;
  is_remote?: boolean | null;
};

// State/territory code -> full name, so a search for "texas" matches a job
// whose location_state is stored as the code "TX".
export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  PR: 'Puerto Rico', US: 'United States',
};

function norm(s: string): string {
  return (s || '').trim().toLowerCase();
}

// City + state code + full state name (+ "remote" when applicable), lowercased.
export function locationHaystack(job: SearchJob): string {
  const code = (job.location_state || '').toUpperCase();
  const parts = [job.location_city || '', job.location_state || '', STATE_NAMES[code] || ''];
  if (job.is_remote) parts.push('remote');
  return parts.join(' ').toLowerCase();
}

export function matchesLocation(job: SearchJob, term: string): boolean {
  const t = norm(term);
  if (!t) return true; // empty = no filter
  return locationHaystack(job).includes(t);
}

export function matchesKeyword(job: SearchJob, term: string): boolean {
  const t = norm(term);
  if (!t) return true; // empty = no filter
  const hay = [
    job.title,
    job.discipline,
    job.employment_type,
    job.license_required || '',
    job.experience_level || '',
  ].join(' ').toLowerCase();
  return hay.includes(t);
}

export function matchesDiscipline(job: SearchJob, discipline: string): boolean {
  if (!discipline || discipline === 'all') return true;
  // The "Concrete Inspector" pill covers ALL concrete roles (inspectors +
  // testing/materials/QA technicians), all of which have "Concrete" in the title.
  if (discipline === 'concrete-inspector') {
    return (job.title || '').toLowerCase().includes('concrete');
  }
  return job.discipline_slug === discipline;
}

export type JobFilters = {
  keyword?: string;
  location?: string;
  discipline?: string;
  type?: string;
  remote?: string;
  license?: string;
};

export function matchesAll(job: SearchJob, f: JobFilters): boolean {
  return (
    matchesDiscipline(job, f.discipline || 'all') &&
    matchesKeyword(job, f.keyword || '') &&
    matchesLocation(job, f.location || '') &&
    (f.type ? job.employment_type === f.type : true) &&
    (f.remote === 'true' ? job.is_remote === true : true) &&
    (f.license ? (job.license_required || '').toUpperCase().includes(f.license.toUpperCase()) : true)
  );
}

export function filterJobs<T extends SearchJob>(jobs: T[], f: JobFilters): T[] {
  return jobs.filter((j) => matchesAll(j, f));
}
