-- Public read for site-assets bucket
CREATE POLICY "Public can view site-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Admin/editor can upload to site-assets
CREATE POLICY "Admin/editor can upload site-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-assets' AND public.is_admin_or_editor(auth.uid()));

-- Admin/editor can update site-assets
CREATE POLICY "Admin/editor can update site-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets' AND public.is_admin_or_editor(auth.uid()))
WITH CHECK (bucket_id = 'site-assets' AND public.is_admin_or_editor(auth.uid()));

-- Admin/editor can delete from site-assets
CREATE POLICY "Admin/editor can delete site-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets' AND public.is_admin_or_editor(auth.uid()));