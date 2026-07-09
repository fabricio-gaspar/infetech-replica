
CREATE TABLE public.hero_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL DEFAULT '01',
  title text NOT NULL,
  description text,
  icon_name text DEFAULT 'Code2',
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hero_cards TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_cards TO authenticated;
GRANT ALL ON public.hero_cards TO service_role;
ALTER TABLE public.hero_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published hero_cards" ON public.hero_cards
  FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all hero_cards" ON public.hero_cards
  FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage hero_cards" ON public.hero_cards
  FOR ALL TO authenticated
  USING (private.is_admin_or_editor(auth.uid()))
  WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER hero_cards_updated_at BEFORE UPDATE ON public.hero_cards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon_name text DEFAULT 'Award',
  order_index int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_pillars TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_pillars TO authenticated;
GRANT ALL ON public.site_pillars TO service_role;
ALTER TABLE public.site_pillars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published site_pillars" ON public.site_pillars
  FOR SELECT USING (is_published = true);
CREATE POLICY "Editors read all site_pillars" ON public.site_pillars
  FOR SELECT TO authenticated USING (private.is_admin_or_editor(auth.uid()));
CREATE POLICY "Editors manage site_pillars" ON public.site_pillars
  FOR ALL TO authenticated
  USING (private.is_admin_or_editor(auth.uid()))
  WITH CHECK (private.is_admin_or_editor(auth.uid()));
CREATE TRIGGER site_pillars_updated_at BEFORE UPDATE ON public.site_pillars
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS about_eyebrow text,
  ADD COLUMN IF NOT EXISTS about_title text,
  ADD COLUMN IF NOT EXISTS about_description text,
  ADD COLUMN IF NOT EXISTS about_image_url text,
  ADD COLUMN IF NOT EXISTS about_checklist jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS about_cta_label text,
  ADD COLUMN IF NOT EXISTS about_cta_url text,
  ADD COLUMN IF NOT EXISTS home_solutions_eyebrow text,
  ADD COLUMN IF NOT EXISTS home_solutions_title text,
  ADD COLUMN IF NOT EXISTS home_solutions_description text,
  ADD COLUMN IF NOT EXISTS home_solutions_image_url text,
  ADD COLUMN IF NOT EXISTS home_solutions_cta_label text,
  ADD COLUMN IF NOT EXISTS home_solutions_cta_url text,
  ADD COLUMN IF NOT EXISTS home_services_eyebrow text,
  ADD COLUMN IF NOT EXISTS home_services_title text,
  ADD COLUMN IF NOT EXISTS home_testimonials_eyebrow text,
  ADD COLUMN IF NOT EXISTS home_testimonials_title text,
  ADD COLUMN IF NOT EXISTS home_pillars_eyebrow text,
  ADD COLUMN IF NOT EXISTS home_pillars_title text,
  ADD COLUMN IF NOT EXISTS home_blog_eyebrow text,
  ADD COLUMN IF NOT EXISTS home_blog_title text;

INSERT INTO public.hero_cards (number, title, description, icon_name, order_index) VALUES
  ('01', 'Sistemas Personalizados', 'Software sob medida para automatizar processos e organizar sua operação.', 'Code2', 1),
  ('02', 'Automação com IA', 'Inteligência artificial aplicada ao atendimento, dados e rotinas.', 'Sparkles', 2),
  ('03', 'Servidores e Nuvem', 'Implantação de servidores locais e em nuvem com segurança e backup.', 'Server', 3);

INSERT INTO public.site_pillars (title, description, icon_name, order_index) VALUES
  ('Experiência', 'Entrega comprovada de projetos de tecnologia para empresas de diferentes portes.', 'Users', 1),
  ('Sob Medida', 'Cada solução é pensada a partir da realidade e necessidade do seu negócio.', 'Award', 2),
  ('Profissionalismo', 'Suporte próximo e equipe dedicada ao sucesso da sua operação.', 'Trophy', 3);

UPDATE public.site_settings SET
  about_eyebrow = COALESCE(about_eyebrow, 'Sobre a nossa empresa'),
  about_title = COALESCE(about_title, 'Somos parceiros das suas inovações'),
  about_description = COALESCE(about_description, 'A WF Digital é especialista em consultoria de TI e desenvolvimento de software. Apoiamos organizações e empresas a melhorar a performance do negócio, atuando junto às suas equipes do descobrimento ao lançamento.'),
  about_image_url = COALESCE(about_image_url, 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80'),
  about_checklist = COALESCE(about_checklist, '["Suporte de alta qualidade","Atendimento excelente","Garantia de satisfação","Profissionais confiáveis"]'::jsonb),
  about_cta_label = COALESCE(about_cta_label, 'Saiba mais'),
  about_cta_url = COALESCE(about_cta_url, '/contact'),
  home_solutions_eyebrow = COALESCE(home_solutions_eyebrow, 'Soluções de TI'),
  home_solutions_title = COALESCE(home_solutions_title, 'As melhores soluções e serviços de TI ao seu alcance'),
  home_solutions_description = COALESCE(home_solutions_description, 'Entregamos soluções corporativas completas — de infraestrutura a aplicações — projetadas para impulsionar seu negócio em todas as fases de crescimento.'),
  home_solutions_image_url = COALESCE(home_solutions_image_url, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80'),
  home_solutions_cta_label = COALESCE(home_solutions_cta_label, 'Saiba mais'),
  home_solutions_cta_url = COALESCE(home_solutions_cta_url, '/servicos'),
  home_services_eyebrow = COALESCE(home_services_eyebrow, 'O que oferecemos aos nossos clientes'),
  home_services_title = COALESCE(home_services_title, 'Atendimento em tempo real em todas as soluções e serviços profissionais de TI'),
  home_testimonials_eyebrow = COALESCE(home_testimonials_eyebrow, 'Depoimentos de Clientes'),
  home_testimonials_title = COALESCE(home_testimonials_title, 'Veja o que estão falando sobre nós'),
  home_pillars_eyebrow = COALESCE(home_pillars_eyebrow, 'Caminho da Tecnologia'),
  home_pillars_title = COALESCE(home_pillars_title, 'A agência de soluções e serviços de TI em que você pode confiar'),
  home_blog_eyebrow = COALESCE(home_blog_eyebrow, 'Novidades'),
  home_blog_title = COALESCE(home_blog_title, 'Notícias & Artigos');
