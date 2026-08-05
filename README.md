# Interdata — versão HTML estática

Recriação do site **interdata.co.mz** em HTML/CSS/JS puro, sem WordPress, sem
frameworks e sem dependências de build. Inspiração de estilo:
[simplesolutions.co.mz](https://www.simplesolutions.co.mz/) (navy escuro + acento ciano,
tipografia com eyebrows monoespaçados, cartões com borda suave, blocos de estatísticas).

## Estrutura

Site bilingue: **34 páginas** (17 em português, 17 em inglês).

## URLs sem `.html`

Cada página é uma pasta com um `index.html` dentro. É isso que dá URLs limpos:

```
/contacto/                   →  contacto/index.html
/servicos/cameras-cctv/      →  servicos/cameras-cctv/index.html
/en/services/cctv-cameras/   →  en/services/cctv-cameras/index.html
```

Não é preciso configuração nenhuma no servidor. Funciona igual em Apache,
Nginx, IIS, cPanel, GitHub Pages, Netlify, Vercel e Cloudflare Pages, porque
todos servem o `index.html` de uma pasta por omissão. Não há `.htaccess`,
`vercel.json` nem regras de *rewrite* — e por isso mudar de alojamento não
quebra nada.

O único efeito secundário: **abrir o `index.html` com duplo clique já não
navega**, porque `file://` não resolve pastas para o seu `index.html`. Para ver
localmente, sirva a pasta:

```bash
python -m http.server 8080
# depois: http://localhost:8080
```

## Estrutura

```
interdata-html/
│                                    ── PORTUGUÊS (raiz) ──
├── index.html                       /            Página inicial
├── sobre/index.html                 /sobre/      Missão, visão, valores, números
├── servicos/index.html              /servicos/   Hub + guia editorial (~1100 palavras)
├── contacto/index.html              /contacto/   Contactos, cotação e FAQ
├── servicos/                        Uma pasta por serviço (13)
│   ├── cabeamento-estruturado/      ├── voz-pbx-voip/
│   ├── cameras-cctv/                ├── assistencia-tecnica/
│   ├── alarmes-seguranca/           ├── criacao-websites/
│   ├── controle-acesso/             ├── redes-sociais/
│   ├── fibra-optica/                ├── marketing-seo/
│   ├── telecomunicacoes/            └── desenvolvimento-software/
│   └── iptv/
│                                    ── INGLÊS ──
├── en/index.html                    /en/
├── en/about/  ·  en/services/  ·  en/contact/
├── en/services/                     13 pastas com slugs próprios em inglês
│   structured-cabling · cctv-cameras · security-alarms · access-control
│   fibre-optic · telecommunications · iptv · voice-pbx-voip
│   technical-support · web-design · social-media · seo-marketing
│   software-development
└── assets/
    ├── css/style.css                Folha única, comentada por secções
    ├── js/main.js                   Vanilla JS, sem bibliotecas
    └── img/
        ├── logo.png                 Logótipo oficial (fundos claros)
        ├── logo-branco.png          Variante para o rodapé escuro
        ├── icone.png                Símbolo 180×180 (apple-touch-icon, Open Graph)
        └── favicon-32.png           Favicon
```

Cada página de serviço tem: hero com breadcrumb, visão geral com benefícios,
seis itens do que está incluído, razões para escolher a Interdata, cobertura
por província, seis perguntas frequentes e CTA. A barra lateral liga aos
restantes serviços do mesmo grupo (bom para navegação e para SEO interno).

## Idiomas

O selector **PT | EN** está no cabeçalho de todas as páginas e leva sempre à
página equivalente — de `servicos/cameras-cctv.html` vai para
`en/services/cctv-cameras.html`, não para a inicial. Cada página declara
`hreflang` para `pt-MZ`, `en` e `x-default` (aponta para o português), e o
`lang` do `<html>` muda com o idioma, o que faz a hifenização do texto
justificado seguir as regras da língua certa.

Os slugs em inglês são próprios em vez de traduzidos à letra, porque é o que
as pessoas escrevem no Google: `structured-cabling`, não `cabeamento-estruturado`.

Para acrescentar um terceiro idioma, o padrão é o mesmo: uma pasta com o código
do idioma na raiz, e o selector passa a ter três entradas.

## Como publicar

Copiar o conteúdo desta pasta para a raiz do alojamento. Não há passo de
compilação, dependências nem configuração de servidor.

## O que foi mantido do site original

- Estrutura de navegação, incluindo os submenus de Serviços e Marketing Digital
- Todos os textos de serviços, secção "Sobre Nós" e os três testemunhos
- Contactos reais: `info@interdata.co.mz`, `+258 86 6610 649`, Maputo e Pemba
- Horário Segunda–Sexta 8h–17h e o botão flutuante de WhatsApp

## Melhorias em relação ao original

**Performance**
- Zero jQuery, zero Elementor, zero plugins. Só uma folha de CSS e um ficheiro JS.
- Removido o preloader com percentagem — o conteúdo aparece imediatamente.
- Ícones em SVG inline (sem icon font a bloquear o render).
- Imagens com `loading="lazy"` e `width`/`height` para evitar layout shift.

**Bugs corrigidos**
- Os contadores do original mostravam `0+` e `4+` (Anos de Experiência / Clientes
  Satisfeitos). Aqui há contadores animados com valores coerentes — **ajuste-os**
  nos atributos `data-count` para os números reais da empresa.
- Testemunhos apareciam repetidos três vezes; agora são três, distintos.
- Rodapé com `Copyright © 2026 .` (nome em falta) — corrigido e o ano é dinâmico.

**Conteúdo novo**
- Faixa de tecnologias/parceiros (Cisco, Ubiquiti, Hikvision, MikroTik…).
- Secção "Como trabalhamos" em 4 passos.
- FAQ na home e na página de contacto (bom para SEO e reduz emails repetidos).
- Página de contacto completa, com formulário e cartão de tempos de resposta.
- Cartão de "áreas de actuação" no hero, em vez de imagem de stock genérica.

**SEO e partilha**
- `<title>` e `meta description` próprios em cada uma das 34 páginas.
- Open Graph + Twitter Card, com o símbolo da marca como imagem.
- JSON-LD `ProfessionalService` + `FAQPage` nas duas páginas iniciais;
  `Service` + `FAQPage` em cada uma das 26 páginas de serviço — as perguntas
  frequentes podem aparecer directamente nos resultados do Google.
- Guia editorial de ~1100 palavras em `servicos.html` e em `en/services.html`,
  cada um com 13 links internos.
- `hreflang` (`pt-MZ`, `en`, `x-default`), `canonical`, headings hierárquicos.

**Marca**
- Logótipo oficial da Interdata em PNG, em vez da aproximação em SVG.
- Variante para fundo escuro gerada a partir do oficial: o "inter" passa a
  branco e o ciano a `#22C7E8`, para se ler no rodapé navy. O ciano da marca
  (`#0283AA`) foi extraído do próprio ficheiro e é o `--brand` do CSS.
- Favicon e apple-touch-icon recortados do símbolo do logótipo.

**Tipografia**
- Texto justificado com hifenização automática nas colunas largas de prosa
  (visão geral dos serviços, respostas do FAQ, guia editorial). Em cartões e
  em ecrãs até 640 px volta a alinhamento à esquerda, porque em colunas
  estreitas a justificação abre "rios" de espaço em branco.

**Acessibilidade**
- Link "saltar para o conteúdo", `aria-label` em todos os ícones-link.
- `aria-expanded` no burger, `aria-current` na página activa.
- Estados `:focus-visible` visíveis, contraste verificado nos fundos escuros.
- `prefers-reduced-motion` desliga animações.

**Responsividade**
- Testado a 430 px: menu lateral deslizante com acordeões, grelhas colapsadas,
  tipografia fluida com `clamp()`.
- Folha de estilos de impressão.

## Antes de publicar — checklist

1. **Números das estatísticas.** Substituir os `data-count` (15, 150, 60) pelos
   valores reais. Aparecem nas quatro páginas iniciais e "sobre", nos dois idiomas.
2. **Imagens.** As duas fotos apontam para o Unsplash. Trocar por fotos reais de
   obras da Interdata e guardá-las em `assets/img/`.
3. **Redes sociais.** Os links são `https://facebook.com` etc. — colocar os URLs reais.
4. **Formulário.** É estático: ao submeter, abre o WhatsApp com a mensagem formatada
   no idioma da página (os rótulos vêm dos atributos `data-wa-*` do `<form>`, para
   o `main.js` servir os dois idiomas). Para receber por email, ligar a Formspree /
   Netlify Forms / script PHP próprio.
5. **Páginas legais.** "Política de Privacidade" e "Termos de Uso" apontam para `#`.
6. **Tradução.** O inglês foi escrito por nós, não traduzido automaticamente, mas
   vale uma revisão de quem conhece o vocabulário técnico usado nos vossos concursos.
7. **Logótipo em SVG.** O PNG oficial é usado a 34 px de altura e serve bem. Se
   tiverem o vector original, um SVG fica mais nítido em ecrãs de alta densidade.

## Se precisar de editar o conteúdo

As 34 páginas partilham o mesmo cabeçalho, rodapé e estrutura. Alterar um menu
ou um contacto significa alterá-lo em 34 ficheiros — foram gerados por script
precisamente por isso. Se prevê edições frequentes, vale a pena manter esse
gerador ou passar para um gerador estático (Eleventy, Hugo). Para mudanças
pontuais de texto, editar o HTML directamente é perfeitamente razoável.

## Notas técnicas

- Fontes: Hanken Grotesk + JetBrains Mono via Google Fonts. Para funcionar offline,
  descarregar os `.woff2` para `assets/fonts/` e declarar `@font-face`.
- As cores da marca estão todas em variáveis CSS no topo de `style.css`
  (`--brand: #0283AA`, tirada do site original). Mudar ali muda o site todo.
