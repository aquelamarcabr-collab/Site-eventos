# Site — G.R. Master Eventos & Consultoria

Site institucional estático (HTML/CSS/JS puro), pronto para deploy na **Netlify**, sem necessidade de build.

## Estrutura

```
index.html          Home
quem-somos.html      Quem Somos (história, missão, visão, valores)
servicos.html        Serviços (todas as categorias do portfólio)
portfolio.html       Portfólio (galeria com filtros)
clientes.html        Clientes / segmentos atendidos
blog.html            Blog & Notícias
contato.html         Contato + formulário de orçamento (Netlify Forms)
obrigado.html        Página de agradecimento pós-formulário
404.html             Página de erro
css/style.css        Estilos (design system: navy + bronze/cobre)
js/main.js           Menu mobile, animações, filtros do portfólio
assets/              Logo (SVG) gerada para o projeto + favicon
robots.txt, sitemap.xml, netlify.toml   SEO e configuração de deploy
```

## ⚠️ Antes de publicar — dados a confirmar com o cliente

WhatsApp (`+55 11 97705-3323`) e e-mail (`aquelamarca.br@gmail.com`) já estão atualizados em todo o site. Ainda restam estes placeholders para confirmar:

| Placeholder usado | Onde aparece | Trocar por |
|---|---|---|
| `@grmastereventos` / `instagram.com/grmastereventos` | Footer, Contato | Perfil real do Instagram |
| `grmastereventos.com.br` | Meta tags `canonical`, `og:url`, JSON-LD, `sitemap.xml`, `robots.txt` | Domínio definitivo do site |

Dica: como todos os arquivos repetem o mesmo header/footer, um `find` + `sed` resolve rápido, por exemplo:
```bash
grep -rl "grmastereventos.com.br" . | xargs sed -i 's/grmastereventos\.com\.br/SEUDOMINIO.com.br/g'
```

## Logo

Como o cliente ainda não enviou uma logo, foi criada uma marca original em SVG (`assets/logo.svg`, `assets/logo-white.svg`, `assets/logo-icon.svg`) nas cores da identidade informada no briefing (branco, azul-marinho e bronze/cobre). É totalmente editável (texto e vetores) e pode ser substituída a qualquer momento pela logo oficial do cliente, se houver.

## Formulário de orçamento (Netlify Forms)

O formulário em `contato.html` já está configurado para o **Netlify Forms** (`data-netlify="true"`), sem precisar de backend. Após o primeiro deploy:
1. No painel Netlify → **Forms**, o formulário `orcamento` aparecerá automaticamente.
2. Configure notificações por e-mail em Site settings → Forms → Form notifications.
3. Recomenda-se ativar o reCAPTCHA/Akismet do Netlify Forms para reduzir spam.

Há também um formulário de newsletter em `blog.html` (`name="newsletter"`).

## Portfólio e Clientes

As páginas `portfolio.html` e `clientes.html` usam placeholders visuais (sem fotos reais e sem depoimentos atribuídos a clientes específicos), já que nenhum material fotográfico foi enviado. Assim que o cliente fornecer fotos de eventos reais, substitua os blocos `.gallery-item` por `<img>` das fotos.

## Deploy na Netlify

1. Suba este repositório no GitHub (já feito) e conecte o repo na Netlify.
2. Build command: (vazio) — não há build.
3. Publish directory: `.` (raiz).
4. Configure o domínio customizado e ative o SSL automático (Netlify já provê HTTPS grátis).

## SEO

- Meta tags de título/descrição, Open Graph e `robots` configuradas em cada página.
- `sitemap.xml` e `robots.txt` na raiz.
- Dados estruturados (JSON-LD `LocalBusiness`) na Home.
- Atualize `canonical`/`og:url`/JSON-LD com o domínio real antes de publicar.
