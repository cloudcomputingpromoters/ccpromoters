-- NOTE (2026-10-30): applied, but it does not take effect on its own. The two GRANTs below
-- are silently skipped ("no privileges were granted for storage") because the migration role
-- (project_admin) does not own the storage schema (owner: postgres), so anon still has no
-- USAGE on storage. The policy is harmless and stays dormant. Anonymous resume uploads now go
-- through the upload-resume edge function (functions/upload-resume.ts) instead.
-- Let visitors who are not logged in upload a PDF resume from the public Apply form.
-- Insert only: anon still cannot list, read through the API, change, or delete any object.
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA storage TO anon;
GRANT INSERT ON storage.objects TO anon;

DROP POLICY IF EXISTS storage_objects_anon_resume_insert ON storage.objects;
CREATE POLICY storage_objects_anon_resume_insert ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (
    bucket = 'candidate-files'
    AND key LIKE 'resumes/%'
    AND lower(storage.extension(key)) = 'pdf'
  );
