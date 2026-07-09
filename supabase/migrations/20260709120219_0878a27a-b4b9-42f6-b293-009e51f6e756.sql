-- Create a private schema not exposed via PostgREST
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

-- Recreate role helpers inside private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION private.has_any_role(_user_id uuid, _roles public.app_role[])
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = ANY(_roles))
$$;

CREATE OR REPLACE FUNCTION private.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT private.has_any_role(_user_id, ARRAY['admin','editor']::public.app_role[])
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.has_any_role(uuid, public.app_role[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin_or_editor(uuid) FROM PUBLIC;

-- Recreate policies to reference private.* instead of public.*
DROP POLICY IF EXISTS "Admins view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins update settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins insert settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins manage nav" ON public.nav_items;
DROP POLICY IF EXISTS "Admins manage social" ON public.social_links;
DROP POLICY IF EXISTS "Admin/editor can upload site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin/editor can update site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin/editor can delete site-assets" ON storage.objects;

CREATE POLICY "Admins view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update settings" ON public.site_settings
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins insert settings" ON public.site_settings
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins manage nav" ON public.nav_items
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins manage social" ON public.social_links
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admin/editor can upload site-assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin/editor can update site-assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND private.is_admin_or_editor(auth.uid()))
  WITH CHECK (bucket_id = 'site-assets' AND private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admin/editor can delete site-assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND private.is_admin_or_editor(auth.uid()));

-- Drop public copies (now unreferenced)
DROP FUNCTION IF EXISTS public.is_admin_or_editor(uuid);
DROP FUNCTION IF EXISTS public.has_any_role(uuid, public.app_role[]);
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);