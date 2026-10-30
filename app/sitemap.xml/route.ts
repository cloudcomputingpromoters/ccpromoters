export const dynamic = 'force-dynamic';
// force-dynamic alone does not stop Next 14 from caching the SDK's fetches; without this,
// job pages kept serving data from before an edit (seen 30 Oct 2026).
export const fetchCache = 'force-no-store';

const BASE = 'https://cizr93dz.insforge.site';

const staticRoutes = [
  '/', '/jobs', '/disciplines', '/services', '/about',
  '/insights', '/salary-guide', '/project-placement-map', '/contact', '/faqs',
  '/privacy-policy', '/terms-of-service', '/cookie-policy', '/sitemap',
  '/login', '/register', '/register/candidate', '/register/employer',
  '/disciplines/structural', '/disciplines/transportation', '/disciplines/geotechnical',
  '/disciplines/water-resources', '/disciplines/environmental', '/disciplines/wastewater',
  '/disciplines/construction', '/disciplines/land-development', '/disciplines/surveying', '/disciplines/coastal',
  '/services/permanent-placement', '/services/contract-staffing', '/services/volume-recruitment',
  '/services/executive-search', '/services/talent-mapping', '/services/compensation-benchmarking',
  '/services/job-search', '/services/resume-optimization', '/services/interview-coaching',
  '/services/salary-negotiation', '/services/career-roadmap',
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${BASE}${route}</loc>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/jobs/') || route.includes('/disciplines/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
  });
}
