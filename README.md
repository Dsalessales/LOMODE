# Lomode: protótipo visual da loja

Protótipo navegável para apresentar o design da loja virtual da Lomode ao cliente. É **só uma demonstração visual**: não tem checkout, pagamento, banco de dados, login nem estoque. Produtos, preços e textos são ilustrativos.

Site estático em HTML, CSS e JavaScript puro, sem dependências nem etapa de build.

## Rodar no computador

Qualquer servidor estático serve. Na raiz do repositório:

```bash
python3 -m http.server 8080
# ou
npx serve .
```

Depois é só abrir http://localhost:8080.

## O que tem no protótipo

| Página | Arquivo | Destaques |
| --- | --- | --- |
| Início | `index.html` | Barra de avisos, cabeçalho com mega menu, banner com 3 slides, benefícios, categorias, vitrine de lançamentos, guia "Guarda-roupa inteligente", "Compre o look" com pontos clicáveis na foto, acessórios com abas, banners de campanha, Instagram, newsletter e rodapé completo |
| Coleção | `colecao.html?c=roupas` | Filtros de categoria, tamanho e cor, ordenação e atalhos por categoria. Também funciona com `novidades`, `acessorios`, `sale`, `alfaiataria`, `tricos`, `camisaria`, `calcas`, `casacos`, `bolsas`, `sapatos`, `joias`, `oculos` e `inverno` |
| Produto | `produto.html?id=…` | Galeria com zoom, cores, tamanhos (com tamanho esgotado), guia de medidas, cálculo de frete demonstrativo, abas de descrição e "Complete o look" |

Interações demonstrativas: menu do celular, busca ao vivo, sacola lateral com quantidade e barra de frete grátis, favoritos, compra rápida no card e newsletter. Sacola e favoritos ficam salvos só no navegador de quem está vendo, para a navegação entre páginas parecer real.

Os produtos ficam em `assets/js/data.js`. Para trocar nome, preço ou foto, basta editar esse arquivo.

## Publicar no Cloudflare Pages

### Opção A: pelo GitHub (recomendado)

1. No painel do Cloudflare, abra **Workers e Pages → Criar → Pages → Conectar ao Git** e escolha o repositório `LOMODE`.
2. Em **Branch de produção**, deixe `main`.
3. Configurações de build:
   - **Framework**: nenhum
   - **Comando de build**: deixe em branco
   - **Diretório de saída**: `/` (a raiz do repositório)
4. Clique em **Salvar e implantar**. O endereço sai no formato `https://<nome-do-projeto>.pages.dev`, e cada novo commit no `main` atualiza o site sozinho.

### Opção B: pela linha de comando

```bash
npx wrangler login
npx wrangler pages deploy . --project-name lomode-prototipo
```

O arquivo `_headers` já configura cache para fontes e imagens. Ele também, junto com o `robots.txt`, pede aos buscadores que não indexem o protótipo.

## Antes de virar loja de verdade

- **Fotos**: as imagens de produtos e editoriais são de bancos de demonstração e servem só para a apresentação. As exceções são as fotos enviadas no briefing: os dois looks do banner e os posts do Instagram. Na versão final, troque tudo pelas fotos próprias da marca.
- **Contatos**: WhatsApp, e-mail e CNPJ do rodapé são fictícios.
- **Fontes**: títulos em Bodoni Moda, que combina com o contraste do logo, e textos em Jost. As duas são de licença livre (SIL Open Font License) e ficam hospedadas no próprio site.
