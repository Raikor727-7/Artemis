# Portfólio — como mexer

Site estático (HTML + CSS + JS puro). Sem build, sem dependências.

## Testar local
```
cd portfolio && python3 -m http.server 8000
# abrir http://localhost:8000
```

## O que editar
| Quero...                     | Arquivo                     |
|------------------------------|-----------------------------|
| Colocar WhatsApp/e-mail/redes | `js/config.js`              |
| Adicionar/editar projeto      | `js/projects.js`            |
| Fotos e vídeos de um projeto  | `assets/projects/<projeto>/` + campo `media` |
| Esconder um projeto           | `hidden: true` no projeto   |
| Tirar cybersecurity do "Sobre"| `showSecurityInAbout: false` em `js/config.js` |
| Trocar cores                  | bloco `:root` em `css/style.css` |

## Adicionar um projeto
1. Em `js/projects.js`, copie um bloco `{ ... }` e cole na lista (a ordem da lista é a ordem no site).
2. Troque `id`, `title`, `kind` (`site`/`sistema`), `status` (`no-ar`/`mvp`/`prototipo`/`demo`), textos.
3. Fotos/vídeos: copie os arquivos para `assets/projects/<pasta>/` e liste em `media`:
```js
media: [
  { type: "image",   src: "assets/projects/meu-projeto/home.jpg", caption: "Página inicial" },
  { type: "video",   src: "assets/projects/meu-projeto/demo.mp4", poster: "assets/projects/meu-projeto/demo.jpg" },
  { type: "youtube", id: "ID_DO_VIDEO" }
]
```
A primeira imagem vira a capa na lista (ou defina `cover`).

## Publicar (VPS + Nginx)
```
rsync -av --delete portfolio/ usuario@SEU_IP:/var/www/portfolio/
```
```
server {
    server_name seudominio.com.br;
    root /var/www/portfolio;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```
Depois: `certbot --nginx -d seudominio.com.br`.

Obs.: as fontes vêm do Google Fonts. Se o site abrir sem elas, ele usa fontes do sistema e continua funcionando.
