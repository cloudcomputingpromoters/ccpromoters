export function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /auth/

Sitemap: https://cizr93dz.insforge.site/sitemap.xml`;

  return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}
