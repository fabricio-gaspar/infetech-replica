-- ============================================================
-- SITE SETTINGS: expand
-- ============================================================
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS logo_dark_url text,
  ADD COLUMN IF NOT EXISTS color_accent text,
  ADD COLUMN IF NOT EXISTS address_street text,
  ADD COLUMN IF NOT EXISTS address_number text,
  ADD COLUMN IF NOT EXISTS address_district text,
  ADD COLUMN IF NOT EXISTS address_city text,
  ADD COLUMN IF NOT EXISTS address_state text,
  ADD COLUMN IF NOT EXISTS address_zip text,
  ADD COLUMN IF NOT EXISTS footer_text text,
  ADD COLUMN IF NOT EXISTS head_snippet text,
  ADD COLUMN IF NOT EXISTS google_analytics_id text,
  ADD COLUMN IF NOT EXISTS meta_pixel_id text,
  ADD COLUMN IF NOT EXISTS updated_by uuid;

-- ============================================================
-- Helper: shared updated_at + updated_by trigger already exists (set_audit_fields)
-- ============================================================

-- ============================================================
-- HERO BANNERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.hero_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  support_text text,
  image_desktop_url text,
  image_mobile_url text,
  cta_primary_label text,
  cta_primary_url text,
  cta_secondary_label text,
  cta_secondary_url text,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_banners TO authenticated;
GRANT SELECT ON public.hero_banners TO anon;
GRANT ALL ON public.hero_banners TO service_role;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published banners" ON public.hero_banners FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all banners" ON public.hero_banners FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage banners" ON public.hero_banners FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER hero_banners_audit BEFORE UPDATE ON public.hero_banners FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  full_description text,
  icon_name text,
  image_url text,
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  differentials jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_label text,
  cta_url text,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  featured_on_home boolean NOT NULL DEFAULT false,
  seo_title text,
  seo_description text,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT SELECT ON public.services TO anon;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all services" ON public.services FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage services" ON public.services FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER services_audit BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  author_company text,
  avatar_url text,
  quote text NOT NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  featured_on_home boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT SELECT ON public.testimonials TO anon;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER testimonials_audit BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- FAQS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT SELECT ON public.faqs TO anon;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published faqs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all faqs" ON public.faqs FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage faqs" ON public.faqs FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER faqs_audit BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- TEAM MEMBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  bio text,
  photo_url text,
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT SELECT ON public.team_members TO anon;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published team" ON public.team_members FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all team" ON public.team_members FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage team" ON public.team_members FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER team_members_audit BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- PRICING PLANS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text,
  description text,
  image_url text,
  price numeric(10,2),
  currency text DEFAULT 'BRL',
  billing_period text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  excluded_features jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_label text,
  cta_url text,
  badge text,
  is_popular boolean NOT NULL DEFAULT false,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pricing_plans TO authenticated;
GRANT SELECT ON public.pricing_plans TO anon;
GRANT ALL ON public.pricing_plans TO service_role;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published plans" ON public.pricing_plans FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all plans" ON public.pricing_plans FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage plans" ON public.pricing_plans FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER pricing_plans_audit BEFORE UPDATE ON public.pricing_plans FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- PARTNERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  external_url text,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT SELECT ON public.partners TO anon;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published partners" ON public.partners FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all partners" ON public.partners FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage partners" ON public.partners FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER partners_audit BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- GALLERY
-- ============================================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  album text,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT SELECT ON public.gallery_items TO anon;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published gallery" ON public.gallery_items FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all gallery" ON public.gallery_items FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER gallery_items_audit BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- BLOG
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_categories TO authenticated;
GRANT SELECT ON public.blog_categories TO anon;
GRANT ALL ON public.blog_categories TO service_role;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Editors manage categories" ON public.blog_categories FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER blog_categories_updated BEFORE UPDATE ON public.blog_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  cover_url text,
  author_id uuid,
  author_name text,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  tags text[] DEFAULT ARRAY[]::text[],
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_url text,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Editors read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage posts" ON public.blog_posts FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER blog_posts_audit BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts(status, published_at DESC);

-- ============================================================
-- CONTACT MESSAGES (public write, admin read)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text,
  message text NOT NULL,
  source text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_progress','answered','closed','lost')),
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT INSERT ON public.contact_messages TO anon;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view messages" ON public.contact_messages FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER contact_messages_updated BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- QUOTES / LEADS (public write, admin read)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  company text,
  service_interest text,
  budget text,
  message text,
  answers jsonb,
  source text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_progress','answered','closed','lost')),
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quotes TO authenticated;
GRANT INSERT ON public.quotes TO anon;
GRANT ALL ON public.quotes TO service_role;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit quote" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view quotes" ON public.quotes FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update quotes" ON public.quotes FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete quotes" ON public.quotes FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER quotes_updated BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- WHATSAPP CONFIG (single row via unique)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.whatsapp_config (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  enabled boolean NOT NULL DEFAULT true,
  phone_number text,
  greeting text,
  position text NOT NULL DEFAULT 'bottom-right',
  chatbot_enabled boolean NOT NULL DEFAULT false,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.whatsapp_config TO anon, authenticated;
GRANT INSERT, UPDATE ON public.whatsapp_config TO authenticated;
GRANT ALL ON public.whatsapp_config TO service_role;
ALTER TABLE public.whatsapp_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads whatsapp" ON public.whatsapp_config FOR SELECT USING (true);
CREATE POLICY "Admins manage whatsapp" ON public.whatsapp_config FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
INSERT INTO public.whatsapp_config (id, enabled) VALUES (1, true) ON CONFLICT DO NOTHING;

-- ============================================================
-- CHATBOT STEPS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chatbot_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_key text UNIQUE NOT NULL,
  prompt text NOT NULL,
  input_type text NOT NULL DEFAULT 'free_text' CHECK (input_type IN ('free_text','choice','name','email','phone')),
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  order_index int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.chatbot_steps TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.chatbot_steps TO authenticated;
GRANT ALL ON public.chatbot_steps TO service_role;
ALTER TABLE public.chatbot_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads chatbot" ON public.chatbot_steps FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage chatbot" ON public.chatbot_steps FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER chatbot_steps_updated BEFORE UPDATE ON public.chatbot_steps FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- PAGE SEO
-- ============================================================
CREATE TABLE IF NOT EXISTS public.page_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text UNIQUE NOT NULL,
  title text,
  description text,
  keywords text,
  og_image_url text,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_seo TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.page_seo TO authenticated;
GRANT ALL ON public.page_seo TO service_role;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads seo" ON public.page_seo FOR SELECT USING (true);
CREATE POLICY "Admins manage seo" ON public.page_seo FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER page_seo_audit BEFORE UPDATE ON public.page_seo FOR EACH ROW EXECUTE FUNCTION public.set_audit_fields();

-- ============================================================
-- FOOTER COLUMNS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.footer_columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.footer_columns TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.footer_columns TO authenticated;
GRANT ALL ON public.footer_columns TO service_role;
ALTER TABLE public.footer_columns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads footer" ON public.footer_columns FOR SELECT USING (is_published = true);
CREATE POLICY "Editors manage footer" ON public.footer_columns FOR ALL TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER footer_columns_updated BEFORE UPDATE ON public.footer_columns FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- MEDIA LIBRARY (index of files in site-assets bucket)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  storage_path text UNIQUE NOT NULL,
  public_url text NOT NULL,
  mime_type text,
  size_bytes bigint,
  width int,
  height int,
  alt_text text,
  uploaded_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_library TO authenticated;
GRANT ALL ON public.media_library TO service_role;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors read media" ON public.media_library FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors insert media" ON public.media_library FOR INSERT TO authenticated WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors update media" ON public.media_library FOR UPDATE TO authenticated USING (private.is_admin_or_editor(auth.uid())) WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors delete media" ON public.media_library FOR DELETE TO authenticated USING (private.is_admin_or_editor(auth.uid()));