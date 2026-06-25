# Plano: Reconstrução fiel do template Infetech

Vou refazer as 5 páginas (Home, About, Services, Blog, Contact) seguindo pixel-a-pixel as 5 capturas fornecidas, mantendo a mesma composição, hierarquia, densidade e microinterações do template original.

## 1. Design System (src/styles.css)
- Confirmar paleta: roxo vibrante `#6A47ED` (primary), navy profundo `#140C44` (dark/footer), cinza ultra claro `#F4F1FB` (section), preto-quase `#0F0A2E` (texto).
- Tipografia: **Rubik** (já configurada) — peso 700/800 para títulos grandes, 500 para botões CAPS.
- Container max-width 1200px, section padding 90px desktop.
- Utilitários: `eyebrow` (label roxa com traço), `btn-primary` (retangular roxo), `card-soft`, `circuit-bg` (footer/CTA escuro), `diag-overlay` (overlay roxo diagonal nos heroes), `purple-gradient` (faixas CTA).

## 2. Componentes globais
- **Header** (`Header.tsx`): topbar escura com email + horário + sociais; barra branca com logo S+infetech, nav (Home/About/Pages▾/Services▾/Blog/Contact), busca, círculo roxo com telefone + "Call Anytime / +88(9800)6802". Sticky com shrink suave + sombra.
- **Footer** (`Footer.tsx`): fundo navy com textura de circuito, 4 colunas (logo+social, Links, Newsletter, Contact), copyright.
- **InternalHero**: banner P&B + overlay roxo diagonal + título caixa-alta + breadcrumb.
- **Counters** animados, **LogoStrip**, **PurpleCTA** (faixa roxa "Looking for the Best..."), **DarkCTA** (banner escuro "Better IT Solutions...").
- **SiteShell** com IntersectionObserver para `.reveal`.

## 3. Home (`/`)
Seções na ordem exata da captura:
1. Hero claro: label "WELCOME TO INFETECH" + H1 "Future belongs to technology" + botão LEARN MORE + foto P&B de mulher executiva à direita + textura circuito ao fundo.
2. 3 cards de serviço sobrepostos (Backup and Recovery / Internet & Cyber Security / Cloud Based Services) com numerais 01/02/03 grandes em cinza.
3. "Best Tech Solutions for Our Clients" — colagem circular roxa + 4 imagens à esquerda, texto + 2 features (End to End Development / Software IT Outsourcing) à direita.
4. Seção escura "Improve & Enhance Our Tech Projects" — 3 cards (Web Development, Virtual Reality, Smart Marketing) com setas de slider.
5. "Why you Should choose Our Services" — bloco fotográfico esquerda + lista com checks roxos circulares (Cloud Based Services / Payroll Taxes Reviews).
6. Grid 3x2 de serviços (Automated Software, IT Consultancy, Market Strategy, Data Structuring, Managed IT Services, Software Develop) com ícone roxo no canto.
7. Mini CTA faixa roxa clara.
8. Big Dark CTA "Better IT Solutions & Services at your Fingertips" com diagonais roxas.
9. 3 cards horizontais (Gaming and Entertainment / Business and Finance / Information Technology) com imagem circular.
10. Faixa roxa "Trusted IT Solution & Service Business Agency" + 3 KPIs (Experienced / Convenience / Professional).
11. "News & Articles" — 3 cards de blog.
12. Logo strip.

## 4. About (`/about`)
1. InternalHero "ABOUT".
2. "We're Partner of Your Innovations" — foto + selo circular roxo sobreposto à esquerda; texto + 4 checks (Best quality support / Serve the best / Money back guarantee / Trusted Professionals) + botão LEARN MORE.
3. 4 Counters (Active Clients / Projects Completed / Glorious Years / Professional Team).
4. "Check What They're Talking About" — depoimento (avatar Mike Hardson, 5 estrelas) à esquerda; composição circular de retratos com shapes roxos à direita.
5. Big Dark CTA "Better IT Solutions & Services at your Fingertips".
6. Logo strip.
7. "Meet Our Professional Team Member" — 3 cards (Christine Eve, Mike Hardson, Jessica Brown) com botão share roxo.
8. Faixa roxa CTA "Looking for the Best IT Business Solutions?".

## 5. Services (`/services`)
Segue layout "Services 3":
1. InternalHero "SERVICES 3".
2. Título central + 2 imagens grandes com card branco sobreposto ("We're providing IT solutions..." / "Our happy clients loved...") e botão circular roxo.
3. Logo strip.
4. Mission/Vision — colagem 3 imagens + ícones quadrados roxos (Lightbulb, Cpu) + texto vertical "MISSIONS"/"VISIONS"; à direita "Infetech Leading in IT Technology Market" + quote + LEARN MORE + Watch video.
5. "Improve & Enhance Our Tech Projects" — 3 cards (Smart Marketing / Platform Integration / Tech Solutions) + dots de slider.
6. 4 Counters (330+ / 980+ / 20+ / 112+).
7. PurpleCTA.

## 6. Blog (`/blog`)
1. InternalHero "BLOG".
2. Grid 2 colunas: 8 posts em 2x4 (esquerda) + sidebar (Search, Categories com contadores, Archives, Tags em pills).
3. Cada card: imagem grande, título, metadata (data + categoria + comments), excerpt, botão roxo "Read more".
4. Paginação 1 2 ›.

## 7. Contact (`/contact`)
1. InternalHero "CONTACT".
2. 2 colunas: esquerda label + "Feel Free to Get in Touch" + 3 itens com ícones circulares outline roxo (Call Anytime, Send Email, Visit Now); direita formulário em bloco cinza claro com 4 inputs (Name/Email/Phone/Subject) + textarea + botão roxo largo "SEND A MESSAGE".
3. Mid CTA banner escuro "World class IT solutions partner of choice" + barra roxa lateral + botão LEARN MORE.
4. Mapa grayscale via iframe Google Maps.

## 8. Microinterações
- Header shrink suave + topbar collapse no scroll.
- `.reveal` fade-up via IntersectionObserver.
- Cards hover: translateY(-6px) + sombra roxa sutil.
- Counters animando de 0 ao valor ao entrar na viewport.
- Hover de imagem com zoom 1.05 muito suave.
- Botões com troca de fundo + lift.
- Dots de slider (estáticos, visual idêntico).
- Inputs com ring roxo no focus.

## 9. Assets
Como não tenho os PNGs originais do template, uso fotos do Unsplash com enquadramento equivalente (executivos, equipes, reuniões, tech, VR headset, smartwatch). Logo "S+infetech" recriado em CSS (quadrado roxo com S branco). Logo strip "envato" placeholder em cinza claro.

## Detalhes técnicos
- Stack: TanStack Start + Tailwind v4 (já no projeto).
- Rotas existentes (`index`, `about`, `services`, `blog`, `contact`) serão **reescritas integralmente** seguindo as capturas.
- Componentes existentes (`Header`, `Footer`, `InternalHero`, `Counters`, `CTAs`, `LogoStrip`, `SiteShell`) serão revisados/ajustados para casar com os prints.
- Meta head por rota (title + description + og).
- Sem backend — formulário de contato com `e.preventDefault()`.
