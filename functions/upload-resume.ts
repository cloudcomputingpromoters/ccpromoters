// Edge function: uploads a candidate's PDF resume from the public Apply form.
// The site's anon key cannot write to storage (storage.objects is owner-only and the
// project_admin role cannot grant anon on the storage schema), so the upload runs here
// with the project API key, which never leaves the server.
import { createClient } from 'npm:@insforge/sdk';

const PUBLIC_BASE = 'https://cizr93dz.us-east.insforge.app';
const BUCKET = 'candidate-files';
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_ORIGINS = [
  'https://www.ccpromoters.com',
  'https://ccpromoters.com',
  'https://cizr93dz.insforge.site',
  'http://localhost:3000',
];

export default async function (req: Request): Promise<Response> {
  const origin = req.headers.get('Origin') || '';
  const cors: Record<string, string> = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': req.headers.get('Access-Control-Request-Headers') || 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let file: FormDataEntryValue | null = null;
  try {
    file = (await req.formData()).get('file');
  } catch {
    return json({ error: 'Expected multipart form data with a "file" field.' }, 400);
  }
  if (!(file instanceof File)) return json({ error: 'No file received.' }, 400);
  if (file.size === 0 || file.size > MAX_BYTES) return json({ error: 'Resume must be a PDF under 5 MB.' }, 400);

  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  const isPdf = String.fromCharCode(...head).startsWith('%PDF');
  if (!isPdf || !/\.pdf$/i.test(file.name)) return json({ error: 'Only PDF resumes are accepted.' }, 400);

  const safeName = file.name.replace(/\.pdf$/i, '').replace(/[^A-Za-z0-9._-]+/g, '_').slice(0, 80) || 'resume';
  const key = `resumes/${Date.now()}_${safeName}.pdf`;

  const admin = createClient({
    baseUrl: Deno.env.get('INSFORGE_BASE_URL')!,
    anonKey: Deno.env.get('API_KEY')!,
    isServerMode: true,
  });
  const { data, error } = await admin.storage
    .from(BUCKET)
    .upload(key, new File([file], `${safeName}.pdf`, { type: 'application/pdf' }));
  if (error || !data) {
    console.error('[upload-resume] storage error', error);
    return json({ error: 'Upload failed.' }, 500);
  }

  const url = `${PUBLIC_BASE}/api/storage/buckets/${BUCKET}/objects/${encodeURIComponent(key)}`;
  return json({ key, url });
}
