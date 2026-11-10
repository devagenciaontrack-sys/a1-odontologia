# A1 Odontologia — site

Site estático da A1 Odontologia (São Paulo), publicado no GitHub Pages.

## Estrutura
- `build.mjs` — gera todas as páginas HTML (conteúdo, menu, rodapé e tratamentos ficam neste arquivo)
- `assets/css/style.css` — estilos
- `assets/js/main.js` — menu mobile, animações e formulário → WhatsApp
- `assets/img/` — logo e fotos

## Editar
1. Altere textos/dados em `build.mjs` (telefones e endereço ficam no objeto `C` no topo).
2. Rode `node build.mjs` para regenerar os `.html`.
3. Faça commit e push — o GitHub Pages atualiza sozinho.
