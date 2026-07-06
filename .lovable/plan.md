# Plano — Micro-detalhes visuais estilo IT enterprise premium

Observação importante: o site referência usa roxo, mas a WF Digital já tem identidade laranja `#FF6933` (definida em `--primary`). Vou reproduzir **exatamente os mesmos efeitos** (textura de circuito, quadrado no canto, overlay no hover, elevação, sombra), mas usando o laranja de marca em vez de roxo, para manter coerência visual. Se preferir que eu troque a marca para roxo, me diga.

Escopo: **apenas CSS/visual e classes utilitárias**. Nada de mudança de conteúdo, layout de grid, textos ou rotas.

## 1. Novas utilities em `src/styles.css`

Criar um único "design system de card tech" reutilizável:

- `@utility circuit-texture` — pseudo-elemento `::before` com SVG/linear-gradients em baixa opacidade (linhas finas horizontais + verticais + pequenos "nós" em radial-gradient) imitando trilhas de placa-mãe. Opacidade ~0.06 no estado normal, ~0.18 no hover (mantém visível no hover).
- `@utility card-tech` — o card base:
  - fundo branco, borda sutil `1px solid color-mix(primary 8%, transparent)`, sombra elegante `0 10px 30px -12px rgba(20,16,60,0.12)`.
  - `position: relative; overflow: hidden;` para ancorar pseudos.
  - transição `background, color, box-shadow, transform` em `320ms cubic-bezier(0.22, 1, 0.36, 1)`.
  - contém internamente `circuit-texture` via `&::before`.
  - `&::after` = quadrado de acento laranja (`--primary`) no canto superior direito, 14×14px, com pequeno chanfro/rotação, opacidade 0.85.
  - `&:hover`:
    - `background: linear-gradient(135deg, primary 0%, primary-dark 100%)`.
    - `color: #fff` (cascata em títulos, parágrafos, ícones internos via `& h3, & p, & svg`).
    - `transform: translateY(-6px)`.
    - `box-shadow: 0 24px 60px -20px color-mix(primary 55%, transparent)`.
    - o `::before` (circuit) ganha opacidade e vira branco.
    - o `::after` (quadrado) cresce para 22×22px e vira branco translúcido.
- `@utility card-tech-icon` — moldura do ícone dentro do card (quadrado 56×56, borda fina laranja, transição de fundo para branco no hover do card pai).
- `@utility corner-accent` — versão standalone do quadradinho de canto para blocos que não são cards (ex.: CTAs, hero cards).
- `@utility circuit-panel` — variação da textura para painéis grandes (hero, CTA), com escala maior das trilhas.

Motion: todas as transições entre 280–360ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Sem glow/neon.

## 2. Aplicação nos componentes existentes

Aplicar as classes acima aos cards já existentes, **sem tocar em texto/layout**:

- `src/routes/index.tsx`
  - Cards da seção "Serviços" / features → adicionar `card-tech` + `card-tech-icon` no ícone.
  - Cards de estatísticas/blocos modulares → `card-tech` quando forem cartões independentes.
  - Cards de blog/preview → `card-tech`.
- `src/routes/services.tsx`
  - Blocos de serviço (dois blocos com imagem) → adicionar `corner-accent` no card branco flutuante `absolute -bottom-6 left-6…`.
  - Painel Missão/Visão → adicionar `circuit-panel` no `bg-section`.
- `src/routes/about.tsx` e `src/routes/blog.tsx` — cards internos recebem `card-tech`.
- `src/components/site/CTAs.tsx`
  - `PurpleCTA` e `DarkCTA` → sobrepor `circuit-panel` (textura de trilhas sutil sobre o gradiente já existente), sem alterar cor base.
- `src/components/site/Counters.tsx` — cada contador vira um `card-tech` leve (variante sem sombra pesada), com `corner-accent`.

## 3. Reveal / entrada

O projeto já tem `.reveal` com IntersectionObserver em `SiteShell.tsx`. Vou adicionar uma variante `reveal-stagger` que, quando aplicada num container, aplica `transition-delay` incremental (0ms, 80ms, 160ms…) nos filhos `.reveal` — via `:nth-child` no CSS. Sem JS novo.

## 4. Fora do escopo (não vou fazer)

- Não mudo textos, imagens, rotas, grid, tipografia base, cores de marca.
- Não adiciono libs de animação (sem Motion/GSAP).
- Não mexo em Header/Footer estruturalmente.
- Não troco a paleta laranja para roxa (a menos que você peça).

## Detalhes técnicos (para referência)

```text
card-tech
├── ::before  → circuit texture (linhas 40px + pontos radial)
├── ::after   → quadrado 14px canto superior direito (--primary)
├── children  → conteúdo original intacto
└── :hover    → gradient primary, texto branco, ↑6px, sombra +
```

Transições: `background 320ms, color 280ms, transform 320ms, box-shadow 360ms` com easing `cubic-bezier(0.22, 1, 0.36, 1)`.

Confirma que posso seguir com o laranja da marca (mantendo os mesmos efeitos do site de referência)?
