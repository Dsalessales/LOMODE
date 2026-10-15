/* Catálogo demonstrativo da Lomode.
   Produtos, preços e textos são ilustrativos: servem só para a apresentação do design. */
window.LOMODE_PRODUCTS = [
  {
    id: 'blazer-alfaiataria-areia', name: 'Blazer Alfaiataria Areia', cat: 'roupas', sub: 'Alfaiataria',
    price: 549.9, badge: 'Novo', img: 'p-blazer-areia', img2: 'p-blazer-areia-2',
    colors: [{ n: 'Areia', h: '#E4D9C6' }, { n: 'Preto', h: '#1E1B19' }],
    sizes: ['PP', 'P', 'M', 'G', 'GG'], soldOut: ['GG'],
    desc: 'Blazer de alfaiataria com modelagem levemente oversized, ombro estruturado e um botão. Feito para ir do escritório ao jantar sem esforço.',
    comp: '64% poliéster, 33% viscose, 3% elastano. Forro 100% viscose.'
  },
  {
    id: 'calca-pantalona-rose', name: 'Calça Pantalona Alfaiataria Rosé', cat: 'roupas', sub: 'Calças',
    price: 389.9, badge: 'Novo', img: 'p-pantalona', img2: 'p-pantalona-2',
    colors: [{ n: 'Rosé', h: '#CDB5A7' }, { n: 'Off white', h: '#EEE8DE' }],
    sizes: ['36', '38', '40', '42', '44'], soldOut: [],
    desc: 'Pantalona de cintura alta com pregas frontais e caimento fluido até o chão. Alonga a silhueta e combina com tudo.',
    comp: '70% poliéster, 28% viscose, 2% elastano.'
  },
  {
    id: 'sueter-decote-v-chocolate', name: 'Suéter Decote V Mescla Chocolate', cat: 'roupas', sub: 'Tricôs',
    price: 329.9, badge: 'Novo', img: 'p-sueter', img2: 'p-sueter-2',
    colors: [{ n: 'Chocolate', h: '#7B5844' }, { n: 'Areia', h: '#D8CAB6' }],
    sizes: ['P', 'M', 'G'], soldOut: [],
    desc: 'Suéter em tricô mescla com toque macio, decote V profundo e mangas amplas. Para usar solto ou com a frente por dentro.',
    comp: '45% acrílico, 30% poliamida, 20% lã, 5% elastano.'
  },
  {
    id: 'casaco-gola-pelucia', name: 'Casaco Gola Pelúcia Taupe', cat: 'roupas', sub: 'Casacos',
    price: 789.9, badge: 'Novo', img: 'p-casaco', img2: 'p-casaco-2',
    colors: [{ n: 'Taupe', h: '#9C8A74' }],
    sizes: ['P', 'M', 'G'], soldOut: ['P'],
    desc: 'Casaco transpassado com gola em pelúcia removível e botões de resina. Proteção e elegância para os dias mais frios.',
    comp: '100% poliéster. Gola 100% poliéster (pelúcia).'
  },
  {
    id: 'camisa-fluida-off-white', name: 'Camisa Fluida Off White', cat: 'roupas', sub: 'Camisaria',
    price: 299.9, img: 'p-camisa-off', img2: 'p-camisa-off-2',
    colors: [{ n: 'Off white', h: '#F1ECE3' }, { n: 'Preto', h: '#1E1B19' }],
    sizes: ['PP', 'P', 'M', 'G', 'GG'], soldOut: [],
    desc: 'Camisa em tecido fluido com mangas bufantes e punho alongado. O básico que deixa qualquer look mais elegante.',
    comp: '100% viscose.'
  },
  {
    id: 'trico-trancas-cafe', name: 'Tricô Tranças Café', cat: 'roupas', sub: 'Tricôs',
    price: 349.9, img: 'p-trico-trancas', img2: 'p-trico-trancas-2',
    colors: [{ n: 'Café', h: '#3F2B21' }, { n: 'Cru', h: '#E7DFD1' }],
    sizes: ['P', 'M', 'G'], soldOut: [],
    desc: 'Tricô de tranças com ponto encorpado, gola careca e modelagem ampla. Aquece sem perder a leveza.',
    comp: '60% algodão, 40% acrílico.'
  },
  {
    id: 'calca-wide-leg-cafe', name: 'Calça Wide Leg Café', cat: 'roupas', sub: 'Calças',
    price: 319.9, old: 399.9, img: 'p-calca-wide', img2: 'p-calca-wide-2',
    colors: [{ n: 'Café', h: '#3B2E27' }],
    sizes: ['36', '38', '40', '42', '44'], soldOut: ['36'],
    desc: 'Calça wide leg de cintura alta em sarja encorpada, com bolsos faca e barra a fio.',
    comp: '98% algodão, 2% elastano.'
  },
  {
    id: 'blazer-linho-off-white', name: 'Blazer Linho Off White', cat: 'roupas', sub: 'Alfaiataria',
    price: 599.9, img: 'p-blazer-linho', img2: 'p-blazer-linho-2',
    colors: [{ n: 'Off white', h: '#F2EEE6' }],
    sizes: ['PP', 'P', 'M', 'G'], soldOut: [],
    desc: 'Blazer em linho misto com lapela clássica e mangas que podem ser dobradas. Leve, respirável e atemporal.',
    comp: '55% linho, 45% viscose.'
  },
  {
    id: 'camisa-cetim-champagne', name: 'Camisa Cetim Champagne', cat: 'roupas', sub: 'Camisaria',
    price: 279.9, old: 339.9, img: 'p-camisa-cetim', img2: 'p-camisa-cetim-2',
    colors: [{ n: 'Champagne', h: '#E2D3BD' }],
    sizes: ['P', 'M', 'G'], soldOut: [],
    desc: 'Camisa em cetim acetinado com gola transpassada. Brilho sutil para o dia e para a noite.',
    comp: '100% poliéster (cetim).'
  },
  {
    id: 'bolsa-hobo-couro', name: 'Bolsa Hobo Couro Chocolate', cat: 'acessorios', sub: 'Bolsas',
    price: 489.9, badge: 'Novo', img: 'p-bolsa-hobo', img2: 'p-bolsa-hobo-2',
    colors: [{ n: 'Chocolate', h: '#4A3027' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Bolsa hobo em couro legítimo com alça de ombro e formato macio que acompanha o corpo.',
    comp: 'Couro bovino. Forro em algodão.'
  },
  {
    id: 'bolsa-baguete-matelasse', name: 'Bolsa Baguete Matelassê Café', cat: 'acessorios', sub: 'Bolsas',
    price: 459.9, img: 'p-bolsa-baguete', img2: 'p-bolsa-baguete-2',
    colors: [{ n: 'Café', h: '#3E2D25' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Baguete estruturada com textura matelassê, fecho dourado e alça curta.',
    comp: 'Couro sintético premium. Ferragens em metal dourado.'
  },
  {
    id: 'bolsa-tote-canvas', name: 'Bolsa Tote Canvas Cru', cat: 'acessorios', sub: 'Bolsas',
    price: 229.9, img: 'p-tote', img2: 'p-tote-2',
    colors: [{ n: 'Cru', h: '#ECE3D2' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Tote em canvas de algodão encorpado com alças em couro. Cabe o dia inteiro.',
    comp: '100% algodão. Alças em couro bovino.'
  },
  {
    id: 'bota-cano-curto-preta', name: 'Bota Cano Curto Couro Preta', cat: 'acessorios', sub: 'Sapatos',
    price: 529.9, img: 'p-bota', img2: 'p-bota-2',
    colors: [{ n: 'Preto', h: '#1E1B19' }],
    sizes: ['34', '35', '36', '37', '38', '39'], soldOut: ['34'],
    desc: 'Bota de cano curto em couro com forro aquecido e solado tratorado leve.',
    comp: 'Cabedal em couro. Forro em pelúcia sintética. Solado de borracha.'
  },
  {
    id: 'scarpin-off-white', name: 'Scarpin Bico Fino Off White', cat: 'acessorios', sub: 'Sapatos',
    price: 389.9, img: 'p-scarpin', img2: 'p-scarpin-2',
    colors: [{ n: 'Off white', h: '#EFE6D8' }],
    sizes: ['34', '35', '36', '37', '38', '39'], soldOut: [],
    desc: 'Scarpin de bico fino com salto de 9 cm. O clássico que nunca sai de cena.',
    comp: 'Cabedal em couro texturizado. Palmilha acolchoada.'
  },
  {
    id: 'brinco-argola-canelada', name: 'Brinco Argola Canelada Dourado', cat: 'acessorios', sub: 'Joias',
    price: 159.9, img: 'p-brinco', img2: 'p-brinco-2',
    colors: [{ n: 'Dourado', h: '#C9A45C' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Argola canelada com volume e banho de ouro 18k. Leve para usar o dia todo.',
    comp: 'Latão com banho de ouro 18k. Antialérgico.'
  },
  {
    id: 'colar-snake-dourado', name: 'Colar Snake Dourado', cat: 'acessorios', sub: 'Joias',
    price: 189.9, img: 'p-colar', img2: 'p-colar-2',
    colors: [{ n: 'Dourado', h: '#C9A45C' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Colar de malha snake rente ao pescoço. Brilho líquido que valoriza o decote.',
    comp: 'Latão com banho de ouro 18k. Antialérgico.'
  },
  {
    id: 'relogio-dourado-champagne', name: 'Relógio Dourado Mostrador Champagne', cat: 'acessorios', sub: 'Joias',
    price: 459.9, old: 539.9, img: 'p-relogio', img2: 'p-relogio-2',
    colors: [{ n: 'Dourado', h: '#C9A45C' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Relógio analógico com pulseira de elos e mostrador champagne minimalista.',
    comp: 'Aço inoxidável com acabamento dourado. Resistente a respingos.'
  },
  {
    id: 'oculos-gatinho-preto', name: 'Óculos de Sol Gatinho Preto', cat: 'acessorios', sub: 'Óculos',
    price: 249.9, img: 'p-oculos', img2: 'p-oculos-2',
    colors: [{ n: 'Preto', h: '#1E1B19' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Óculos de sol gatinho em acetato com lentes de proteção UV400.',
    comp: 'Armação em acetato. Lentes em policarbonato UV400.'
  },
  {
    id: 'gorro-canelado-caramelo', name: 'Gorro Canelado Caramelo', cat: 'acessorios', sub: 'Inverno',
    price: 139.9, old: 169.9, img: 'p-gorro', img2: 'p-gorro-2',
    colors: [{ n: 'Caramelo', h: '#B98A5A' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Gorro em tricô canelado com barra dobrada e etiqueta aplicada.',
    comp: '50% lã, 50% acrílico.'
  },
  {
    id: 'cachecol-la-camel', name: 'Cachecol Lã Camel', cat: 'acessorios', sub: 'Inverno',
    price: 199.9, old: 249.9, img: 'p-cachecol', img2: 'p-cachecol-2',
    colors: [{ n: 'Camel', h: '#C9A27E' }],
    sizes: ['Único'], soldOut: [],
    desc: 'Cachecol em lã escovada com franjas. Toque macio e caimento generoso.',
    comp: '70% lã, 30% poliamida.'
  }
];
