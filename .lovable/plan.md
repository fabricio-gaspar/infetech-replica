
## Situação atual

O painel admin **já existe e está bastante completo** — 24 telas cobrindo: Hero, Cards do Hero, Serviços, Depoimentos, FAQs, Equipe, Planos, Parceiros, Galeria, Blog, Mídia, Mensagens, Orçamentos, Rodapé, Menu, SEO, Configurações do site, Redes sociais, WhatsApp, Chatbot, Usuários e Pilares.

O problema real é que **as páginas do site ainda usam textos e imagens escritos direto no código** (arrays hardcoded em `index.tsx`, `about.tsx`, `servicos.tsx`, `contact.tsx`, `plans.tsx`, `blog.tsx`, `Header`, `Footer`). Ou seja, mesmo com o admin pronto, editar por lá não muda nada no site.

## O que vou fazer

### 1. Conectar o frontend ao CMS (usar os hooks que já existem)

Trocar arrays hardcoded pelos dados do banco em:

- **`src/routes/index.tsx`** (Home) — hero, cards do hero, serviços, pilares, depoimentos (com fallback para as fotos e citações reais), posts recentes do blog
- **`src/routes/about.tsx`** — dados do site (missão/visão), equipe, pilares
- **`src/routes/servicos.tsx`** — já usa `usePublicServices`, garantir SEO e textos do topo vindos de `page_seo`/`site_settings`
- **`src/routes/plans.tsx`** — já usa `usePublicPlans`, verificar cabeçalho
- **`src/routes/blog.tsx`** e `blog.$slug.tsx` — garantir consumo real
- **`src/routes/contact.tsx`** — endereço, telefone, e-mail, horário vindos de `site_settings`
- **`Header.tsx`** — logo, nome, itens de menu (`useNavItems`), redes (`useSocialLinks`)
- **`Footer.tsx`** — colunas do rodapé, redes sociais, textos legais

### 2. Popular o banco com o conteúdo real que está hoje no site

Inserir/atualizar linhas em:

- `site_settings` (nome, tagline, telefone, e-mail, endereço, horário, textos institucionais)
- `hero_banners` + `hero_cards` (3 cards atuais: Sistemas Personalizados, Automação com IA, Servidores e Nuvem)
- `services` (9 serviços atuais)
- `site_pillars` (Experiência, Sob Medida, Profissionalismo)
- `testimonials` (4 depoimentos atuais)
- `team_members` (equipe da página Sobre)
- `faqs` (perguntas frequentes já visíveis)
- `pricing_plans` (planos exibidos)
- `nav_items` (Home, Sobre, Serviços, Planos, Blog, Contato)
- `social_links` (redes ativas)
- `footer_columns` (colunas com links do rodapé)
- `page_seo` (title/description por página)

### 3. O que NÃO vou fazer nesta rodada

- Não vou criar telas de admin novas — as existentes cobrem o modelo de dados
- Não vou mexer no design/visual das páginas do site — só troco a origem dos dados
- Não vou criar autenticação nova nem alterar RLS (já existe user_roles + has_role)

## Resultado prático

Depois disso, tudo que você edita em `/admin/...` reflete no site imediatamente: hero, cards, serviços, depoimentos, equipe, planos, FAQs, rodapé, menu, redes sociais, textos de contato, SEO. E o banco já vem preenchido com o conteúdo que hoje aparece hardcoded.

## Observação técnica

É um volume grande de arquivos alterados (7 páginas + 2 componentes de layout) e uma migração de seed em SQL. Vou entregar em uma única leva para você poder revisar de uma vez.
