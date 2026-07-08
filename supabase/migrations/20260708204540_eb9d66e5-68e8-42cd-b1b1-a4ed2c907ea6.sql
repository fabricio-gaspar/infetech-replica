-- Add 'editor' role to enum (only if it does not exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'app_role' AND e.enumlabel = 'editor'
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'editor';
  END IF;
END$$;

-- Function: check any role in a list
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles public.app_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = ANY(_roles)
  )
$$;

GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) TO authenticated, anon, service_role;

-- Convenience: is admin or editor (used across content tables)
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_any_role(_user_id, ARRAY['admin','editor']::public.app_role[])
$$;

GRANT EXECUTE ON FUNCTION public.is_admin_or_editor(uuid) TO authenticated, anon, service_role;

-- Generic audit trigger: sets updated_by = auth.uid() and updated_at = now()
CREATE OR REPLACE FUNCTION public.set_audit_fields()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  BEGIN
    NEW.updated_by = auth.uid();
  EXCEPTION WHEN OTHERS THEN
    -- ignore if column doesn't exist on this table
    NULL;
  END;
  RETURN NEW;
END;
$$;