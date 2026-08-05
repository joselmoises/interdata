# Interdata — versão HTML estática

Recriação do site **interdata.co.mz** em HTML/CSS/JS puro, sem WordPress, sem
frameworks e sem dependências de build. Inspiração de estilo:
[simplesolutions.co.mz](https://www.simplesolutions.co.mz/) (navy escuro + acento ciano,
tipografia com eyebrows monoespaçados, cartões com borda suave, blocos de estatísticas).

## Estrutura

```
interdata-html/
├── index.html         Página inicial
├── sobre.html         Sobre Nós (missão/visão/valores, números)
├── servicos.html      Hub: liga às 13 páginas + guia editorial de ~1100 palavras
├── contacto.html      Contactos + formulário de cotação + FAQ
├── servicos/          Uma página dedicada por serviço (13)
│   ├── cabeamento-estruturado.html
│   ├── cameras-cctv.html
│   ├── alarmes-seguranca.html
│   ├── controle-acesso.html
│   ├── fibra-optica.html
│   ├── telecomunicacoes.html
│   ├── iptv.html
│   ├── voz-pbx-voip.html
│   ├── assistencia-tecnica.html
│   ├── criacao-websites.html
│   ├── redes-sociais.html
│   ├── marketing-seo.html
│   └── desenvolvimento-software.html
└── assets/
    ├── css/style.css  Folha única, comentada por secções (1–25)
    └── js/main.js     Vanilla JS, sem bibliotecas
```

Cada página de serviço tem: hero com breadcrumb, visão geral com benefícios,
seis itens do que está incluído, razões para escolher a Interdata, cobertura
por província, seis perguntas frequentes e CTA. A barra lateral liga aos
restantes serviços do mesmo grupo (bom para navegação e para SEO interno).

## Como abrir

Basta abrir `index.html` no browser. Para testar tudo como em produção
(caminhos relativos, cache), sirva a pasta:

```bash
python -m http.server 8080
# depois: http://localhost:8080
```

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
- `<title>` e `meta description` próprios por página (17 páginas).
- Open Graph + Twitter Card.
- JSON-LD `ProfessionalService` na home; `Service` + `FAQPage` em cada uma das
  13 páginas de serviço — as perguntas frequentes podem aparecer directamente
  nos resultados do Google.
- Guia editorial de ~1100 palavras em `servicos.html`, com 13 links internos.
- `lang="pt-MZ"`, `canonical`, headings hierárquicos.

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
   valores reais. Estão em `index.html` e `sobre.html`.
2. **Logótipo.** O SVG inline é uma aproximação. Substituir pelo ficheiro oficial
   (`logo-1.png` do site actual, ou de preferência um SVG).
3. **Imagens.** As duas fotos apontam para o Unsplash. Trocar por fotos reais de
   obras da Interdata e guardá-las em `assets/img/`.
4. **Redes sociais.** Os links são `https://facebook.com` etc. — colocar os URLs reais.
5. **Formulário.** É estático: ao submeter, abre o WhatsApp com a mensagem formatada.
   Para receber por email, ligar a Formspree / Netlify Forms / script PHP próprio —
   ver `main.js`, bloco "Formulário de contacto → WhatsApp".
6. **Páginas legais.** "Política de Privacidade" e "Termos de Uso" apontam para `#`.
7. **Favicon.** É um SVG inline em `data:`. Se quiser um `.ico`/`.png` próprio, trocar.

## Notas técnicas

- Fontes: Hanken Grotesk + JetBrains Mono via Google Fonts. Para funcionar offline,
  descarregar os `.woff2` para `assets/fonts/` e declarar `@font-face`.
- As cores da marca estão todas em variáveis CSS no topo de `style.css`
  (`--brand: #0283AA`, tirada do site original). Mudar ali muda o site todo.
