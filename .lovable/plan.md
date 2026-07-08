# Painel Administrativo Completo — Plano em Fases

Vou entregar o CMS solicitado em **6 fases**, cada uma testável isoladamente. Ao fim de cada fase o painel continua funcionando, você valida, e passamos para a próxima.

O que já existe hoje: `/admin` com Dashboard, Identidade & Contato (parcial), Menu, Redes Sociais, Administradores. Vou aproveitar essa base.

---

## Fase 1 — Fundação (RBAC + Storage + Dashboard + Auditoria)

**Banco (migration única):**
- Adiciona role `editor` ao enum `app_role` (já existe `admin`, `moderator`, `user`).
- Cria função `has_any_role(_user_id, _roles[])` e helper `is_admin_or_editor()`.
- Bucket público `site-assets` no Storage (logos, banners, avatars, capas).
- Bucket privado `admin-uploads` (rascunhos, docs internos).
- Coluna `updated_by uuid` + trigger de auditoria em todas as tabelas de conteúdo, gravando quem alterou e quando. Consulta `SELECT nome, email FROM profiles JOIN auth.users` para exibir "Última alteração por…".
- Ajuste do bloco "Sem permissão" em `admin.tsx` para aceitar admin **ou** editor, ocultando seções sensíveis para editor via `hasRole()`.

**UI:**
- Dashboard populado: total de posts, orçamentos pendentes, mensagens de contato novas, últimos 5 itens alterados.
- Layout com sidebar já existente ganha seções colapsáveis (Conteúdo / Layout / Configurações / Admin).
- Toasts em todas as ações, indicador "Última alteração por X em Y".

## Fase 2 — Identidade Visual + Header/Footer completos

**Banco:** expande `site_settings` com campos: `logo_url`, `favicon_url`, `primary_color`, `secondary_color`, `bg_color`, `text_color`, `accent_color`, `heading_font`, `body_font`, `header_phone`, `header_email`, `footer_html`, `footer_address_*` (rua, número, bairro, cidade, estado, cep), `google_maps_embed`, `head_snippet` (SEO global). Tabela `footer_columns` (título + links JSON, drag-drop).

**UI:**
- **Identidade Visual**: upload de logo/favicon (Supabase Storage + crop com `react-image-crop`), 5 color pickers com preview aplicado em cartão de exemplo, dropdown de Google Fonts (lista curada) com preview live.
- **Header**: já existe, adiciono campos telefone/e-mail e toggle "exibir contato no topo".
- **Menu**: já existe, adiciono drag-drop com `@dnd-kit`, toggle "abrir em nova aba", submenu de 1 nível.
- **Redes Sociais**: já existe, adiciono toggle "exibir no rodapé" separado do "exibir no header".
- **Footer**: novo — texto institucional (WYSIWYG), colunas de links, endereço, mapa, contatos, toggle redes.
- **DynamicTheme.tsx** aplica cores/fontes globais no site público lendo `site_settings`.

## Fase 3 — Conteúdo Modular (parte 1): Hero, Serviços, Depoimentos, FAQ, Equipe

**Banco:** tabelas `hero_banners`, `services`, `testimonials`, `faqs`, `team_members` — todas com `title/subtitle/content/image_url/order_index/is_published/updated_by/updated_at` + campos específicos.

**UI padrão comum:**
- Lista com busca + paginação + drag-drop de ordem.
- Toggle Publicado/Rascunho.
- Editor WYSIWYG (`@tiptap/react` — leve, moderno, sem TinyMCE) com formatação básica, imagens (upload) e links.
- Upload de imagem com preview e crop.
- Modal/drawer de edição.

**Específicos:**
- **Serviços**: campo `icon_name` (Lucide) com picker.
- **Depoimentos**: `author_name`, `author_role`, `rating (1-5)`, `avatar_url`.
- **FAQ**: só question/answer, drag-drop.
- **Equipe**: `name`, `role`, `bio`, `photo_url`, `social_links` (JSON).

## Fase 4 — Conteúdo Modular (parte 2): Blog + Planos + Galeria

**Banco:** `blog_posts` (com `slug`, `excerpt`, `cover_url`, `author_id`, `published_at`, `meta_title`, `meta_description`, `og_image_url`); `blog_categories`; `blog_post_categories` (M2M); `blog_tags` + `blog_post_tags`; `pricing_plans` (`name`, `price`, `period`, `features` JSON, `cta_text`, `cta_url`, `is_popular`); `gallery_items` (`image_url`, `caption`, `album`).

**UI:**
- **Blog**: lista, editor rico Tiptap com imagens, seletor de categorias/tags com autocompletar (`cmdk`), preview de slug automático, campo SEO por post.
- **Planos**: CRUD com preview do card renderizado.
- **Galeria**: grid, upload múltiplo, agrupamento por álbum.

## Fase 5 — Contato + WhatsApp + Chatbot + Orçamentos

**Banco:** `contact_messages` (formulário público), `whatsapp_config` (linha única JSON: enabled/number/position), `chatbot_steps` (fluxo configurável — texto, tipo `free_text|choice|name|email|phone`, opções JSON, ordem), `quotes` (respostas coletadas + status).

**UI:**
- **Contato**: texto intro (WYSIWYG), endereço estruturado, listas de telefones/e-mails, mapa, tabela de submissões.
- **WhatsApp/Chatbot**: toggles, número, posição, editor visual de fluxo (lista drag-drop de etapas), preview mockup do chatbot em iframe lateral, escolha entre "enviar para WhatsApp" ou "salvar em orçamentos".
- **Orçamentos**: tabela com filtro por status (Novo/Em Contato/Concluído/Descartado), detalhe em drawer.
- **Frontend público**: botão flutuante + chatbot lendo config do banco; endpoint `/api/public/quotes` (server route) para persistir com validação Zod + rate limit simples.

## Fase 6 — SEO por página + Usuários + Preview + Populate

**Banco:** `page_seo` (por `path` → meta_title, meta_description, og_image_url, keywords). Adiciona colunas SEO nos módulos que ainda não têm.

**UI:**
- **SEO Global**: já criado em fase 2 (head_snippet). Adiciono editor Monaco leve para syntax highlight.
- **SEO por página**: aba dentro de cada item + tela global para páginas fixas (Home, Sobre, Contato…).
- **Usuários**: aprimoro tela existente — convite por magic link via server-fn com `supabaseAdmin.auth.admin.inviteUserByEmail`, seleção de role no convite, mudança de role, remoção com confirmação.
- **Preview ao vivo**: botão "Ver site" abre `/` em nova aba já existente; adiciono botão "Preview" que abre a rota específica do item editado em nova aba.
- **Populate**: seed migration inserindo dados de exemplo em todas as tabelas (5 serviços, 3 planos, 6 depoimentos, 10 FAQ, 4 membros de equipe, 3 posts de blog, 4 banners hero, galeria com 8 imagens placeholder, 8 mensagens de contato mockadas, 3 orçamentos, config completa de WhatsApp + fluxo padrão de chatbot).

---

## Detalhes técnicos

- **Stack**: TanStack Start + Supabase (já em uso). Servidor via `createServerFn` para operações admin (`requireSupabaseAuth` + verificação `has_any_role`). Uploads via cliente Supabase Storage. RLS em todas as tabelas: leitura pública apenas onde `is_published = true`; escrita apenas para admin/editor via `has_any_role`.
- **Bibliotecas novas**: `@dnd-kit/core`+`@dnd-kit/sortable` (drag-drop), `@tiptap/react`+`@tiptap/starter-kit`+`@tiptap/extension-image`+`@tiptap/extension-link` (WYSIWYG), `react-image-crop` (crop), `@monaco-editor/react` (editor de código — só na tela SEO global).
- **RLS por role**: função `is_admin_or_editor()` autoriza módulos de conteúdo; `has_role(uid,'admin')` continua sendo o único acesso para Identidade Visual, SEO global, WhatsApp/Chatbot e Usuários.
- **Storage**: bucket público com policy `authenticated + is_admin_or_editor` para upload/delete; leitura pública.
- **Cache**: TanStack Query com `staleTime` de 60s nas leituras públicas; server functions no site público usam client publishable + policies TO anon.

---

## Como quero avançar

Cada fase = 1 mensagem sua "ok, próxima". Se quiser mudar prioridade (ex: pular blog e ir direto para chatbot), me diga. Se quiser tudo em uma tacada mesmo — considerando o risco de código menos polido — me confirme e eu tento comprimir.

**Aprova o plano?** Se sim, começo pela Fase 1 imediatamente.
