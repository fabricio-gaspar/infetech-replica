
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner reads profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Owner updates profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Owner inserts profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'WF Digital',
  logo_url TEXT,
  favicon_url TEXT,
  color_primary TEXT NOT NULL DEFAULT '#FF6933',
  color_primary_dark TEXT NOT NULL DEFAULT '#E0541F',
  color_secondary TEXT NOT NULL DEFAULT '#f5f5f5',
  color_background TEXT NOT NULL DEFAULT '#ffffff',
  color_foreground TEXT NOT NULL DEFAULT '#111111',
  color_dark TEXT NOT NULL DEFAULT '#05070d',
  font_display TEXT NOT NULL DEFAULT 'Roboto',
  font_body TEXT NOT NULL DEFAULT 'Roboto',
  phone TEXT DEFAULT '+55 (11) 9 9744-1875',
  whatsapp TEXT DEFAULT '5511997441875',
  email TEXT DEFAULT 'contato@wfdigital.com',
  address TEXT DEFAULT 'Av. Paulista, 1000 — São Paulo, SP',
  map_embed_url TEXT,
  topbar_text TEXT DEFAULT 'Bem-vindo à WF Digital — Soluções e Serviços de TI',
  business_hours TEXT DEFAULT 'Seg - Sáb: 8h às 19h',
  seo_title TEXT DEFAULT 'WF Digital — Soluções e Serviços de TI',
  seo_description TEXT DEFAULT 'Soluções premium de TI, cibersegurança, nuvem e desenvolvimento.',
  seo_keywords TEXT DEFAULT 'TI, cibersegurança, nuvem, desenvolvimento, software',
  footer_about TEXT DEFAULT 'Aceleramos a inovação com equipes de tecnologia de classe mundial.',
  whatsapp_enabled BOOLEAN NOT NULL DEFAULT true,
  whatsapp_greeting TEXT DEFAULT 'Olá! Como podemos ajudar?',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins update settings" ON public.site_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert settings" ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

CREATE TABLE public.nav_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.nav_items TO anon, authenticated;
GRANT ALL ON public.nav_items TO service_role;
ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads nav" ON public.nav_items FOR SELECT USING (true);
CREATE POLICY "Admins manage nav" ON public.nav_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_nav_items_updated BEFORE UPDATE ON public.nav_items
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.nav_items (label, url, sort_order) VALUES
  ('Início', '/', 1), ('Sobre', '/about', 2), ('Serviços', '/servicos', 3),
  ('Planos', '/plans', 4), ('Blog', '/blog', 5), ('Contato', '/contact', 6);

CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.social_links TO anon, authenticated;
GRANT ALL ON public.social_links TO service_role;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads social" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Admins manage social" ON public.social_links FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_social_links_updated BEFORE UPDATE ON public.social_links
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.social_links (platform, url, sort_order) VALUES
  ('facebook', 'https://facebook.com', 1),
  ('twitter', 'https://twitter.com', 2),
  ('instagram', 'https://instagram.com', 3),
  ('linkedin', 'https://linkedin.com', 4);

CREATE POLICY "Site assets public read" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Admins upload site assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update site assets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete site assets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
