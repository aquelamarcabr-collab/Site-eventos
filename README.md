# Site — G.R. Master Eventos & Consultoria

Site institucional estático (HTML/CSS/JS puro), pronto para deploy na **Netlify**, sem necessidade de build.

## Estrutura

```
index.html          Home
quem-somos.html      Quem Somos (história, missão, visão, valores)
servicos.html        Serviços (todas as categorias do portfólio)
portfolio.html       Portfólio (galeria com filtros)
clientes.html        Clientes / segmentos atendidos
blog.html            Blog & Notícias (posts carregados do Supabase)
post.html            Página de um post individual (?slug=...)
contato.html         Contato + formulário de orçamento (Netlify Forms + Supabase)
obrigado.html        Página de agradecimento pós-formulário
404.html             Página de erro
css/style.css        Estilos (design system: navy + bronze/cobre)
js/main.js           Menu mobile, animações, filtros do portfólio
js/supabase.js        Cliente Supabase compartilhado (URL + chave pública)
assets/              Logo (SVG) gerada para o projeto + favicon
admin/login.html      Login do painel administrativo
admin/index.html      Painel admin (orçamentos + gestão do blog)
admin/admin.css        Estilos do painel admin
robots.txt, sitemap.xml, netlify.toml   SEO e configuração de deploy
```

## Painel Administrativo

O site tem um painel admin em `/admin/login.html`, protegido por login (Supabase Auth). Nele o cliente consegue, sem depender de programador:

- **Orçamentos**: ver todos os pedidos enviados pelo formulário de contato (nome, telefone, e-mail, tipo de evento, data, nº de convidados, mensagem) e marcar o status de cada um (Novo / Em contato / Fechado).
- **Blog**: criar, editar, publicar/despublicar e excluir posts do blog — sem precisar mexer em código. O que estiver marcado "Publicar" aparece automaticamente em `blog.html`.

**Como acessar**: abra `https://grmasterconsultoria.com/admin/login.html` e entre com o e-mail `aquelamarca.br@gmail.com` e a senha que foi enviada separadamente no chat (por segurança, ela não fica salva neste repositório). Recomendo trocar a senha após o primeiro acesso (Supabase → Authentication → Users → ⋮ → Reset password, ou implementar uma tela de "esqueci minha senha" depois).

O `/admin/` está bloqueado para indexação (robots.txt + header `X-Robots-Tag`), mas **não é invisível** — qualquer pessoa que souber a URL cai na tela de login. A segurança real vem do login em si (Supabase Auth) e das políticas de acesso do banco (Row Level Security): só um usuário autenticado consegue ler/editar orçamentos e posts; o público só consegue enviar o formulário de contato e ler posts publicados.

### Backend (Supabase)

- Projeto: `dmigesybgcsjwibeaose` (banco Postgres + Auth), já conectado ao site via `js/supabase.js`.
- Tabelas: `posts` (blog) e `contacts` (orçamentos), com Row Level Security habilitado.
- A chave usada no front-end é a **chave pública (anon)** — é seguro que ela apareça no código-fonte, pois todo o controle de acesso é feito pelas políticas RLS no banco, não pela chave.

## Dados de contato e domínio

WhatsApp (`+55 11 91602-2318`), e-mail (`comercial@grmasterconsultoria.com`) e domínio (`grmasterconsultoria.com`, registrado na Hostinger) já estão atualizados em todo o site — meta tags `canonical`, `og:url`, JSON-LD, `sitemap.xml` e `robots.txt`. O cliente não possui Instagram, então todos os links/ícones foram removidos.

### Apontar o domínio da Hostinger para a Netlify

O domínio está registrado na Hostinger, mas o site é hospedado na Netlify — então é preciso apontar o DNS de um lado para o outro:

1. **Na Netlify**: Site settings → Domain management → Add a domain → digite `grmasterconsultoria.com` → Add domain.
2. A Netlify vai mostrar os registros DNS necessários. Geralmente são:
   - Domínio raiz (`grmasterconsultoria.com`): registro **A** apontando para `75.2.60.5` (IP da Netlify) — ou, se a Hostinger suportar, um registro **ALIAS/ANAME** apontando para o subdomínio `.netlify.app` do site.
   - Subdomínio `www`: registro **CNAME** apontando para `SEUSITE.netlify.app` (o nome gerado automaticamente pela Netlify, visível em Site settings → Domain management).
3. **Na Hostinger**: hPanel → Domínios → selecione `grmasterconsultoria.com` → Zona DNS → edite/adicione os registros A e CNAME acima (apague qualquer registro A/CNAME antigo que aponte pra outro servidor, pra evitar conflito).
4. Aguarde a propagação do DNS (pode levar de alguns minutos a até 24h). A Netlify emite o certificado SSL automaticamente assim que detectar o domínio apontado corretamente — não precisa comprar certificado à parte.
5. Depois de propagado, confirme que `https://grmasterconsultoria.com` abre o site com o cadeado verde (HTTPS) antes de divulgar o novo endereço.

## Logo

Como o cliente ainda não enviou uma logo, foi criada uma marca original em SVG (`assets/logo.svg`, `assets/logo-white.svg`, `assets/logo-icon.svg`) nas cores da identidade informada no briefing (branco, azul-marinho e bronze/cobre). É totalmente editável (texto e vetores) e pode ser substituída a qualquer momento pela logo oficial do cliente, se houver.

## Formulário de orçamento (Netlify Forms)

O formulário em `contato.html` grava em dois lugares ao mesmo tempo:
1. **Supabase** (tabela `contacts`) — para aparecer no painel admin (`/admin/`).
2. **Netlify Forms** (`data-netlify="true"`) — para notificação por e-mail nativa da Netlify.

Após o primeiro deploy:
1. No painel Netlify → **Forms**, o formulário `orcamento` aparecerá automaticamente.
2. Para receber um e-mail toda vez que alguém pedir orçamento, configure em **Site settings → Forms → Form notifications → Add notification → Email notification**, formulário `orcamento`, e-mail `comercial@grmasterconsultoria.com`. Isso não dá pra configurar por código — é uma configuração do painel da Netlify.
3. Recomenda-se ativar o reCAPTCHA/Akismet do Netlify Forms para reduzir spam.

**Sobre o erro 404 ao enviar o orçamento**: era causado por um redirect `/* → /404.html` no `netlify.toml` que acabava interceptando o redirecionamento do formulário para `/obrigado.html`. Esse redirect era desnecessário — a Netlify já serve automaticamente o `404.html` da raiz pra qualquer página inexistente, sem precisar de regra nenhuma — então ele foi removido. Depois do próximo deploy, o envio do formulário deve funcionar normalmente.

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
- `canonical`, `og:url` e JSON-LD já apontam para `grmasterconsultoria.com`.
