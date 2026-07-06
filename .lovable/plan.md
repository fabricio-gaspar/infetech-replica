# Substituir todo "Infetech" por "WF Digital"

## Escopo

Troca global do nome da marca em todos os arquivos do projeto onde aparece "Infetech" (independente de maiúscula/minúscula).

## Arquivos afetados

- `src/routes/__root.tsx` — meta title/description/og:title
- `src/routes/index.tsx` — meta tags, hero eyebrow e texto institucional
- `src/routes/about.tsx` — meta tags, textos "Sobre" e depoimento
- `src/routes/services.tsx` — meta tags, eyebrow e heading
- `src/routes/blog.tsx` — meta tags
- `src/routes/contact.tsx` — meta tags e e-mail de contato
- `src/components/site/Header.tsx` — topbar welcome, logo text, e-mail
- `src/components/site/Footer.tsx` — logo text, e-mail, copyright
- `src/styles.css` — comentário de identificação da cor da marca

## O que será feito

Substituição literal de `Infetech` por `WF Digital` em todos os textos visíveis, meta tags, alt texts, comentários e endereço de e-mail `contato@infetech.com` → `contato@wfdigital.com`.

## O que NÃO muda

- Cores (a cor primária continua laranja `#FF6933`).
- Layout, componentes e estrutura de rotas.
- Logo no header: já está prevista como imagem `src/assets/logo-wf.png` gerada anteriormente; este plano só substitui os textos, mas pode ser combinado com a troca da logo caso ainda não tenha sido aplicada.

## Validação

- `rg -i "infetech"` deve retornar zero ocorrências após a troca.
- Build do TanStack Start deve passar sem erros.

Aprove para eu aplicar.