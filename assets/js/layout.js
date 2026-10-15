/* Partes comuns a todas as páginas: ícones, cabeçalho, menus, busca, sacola e rodapé.
   Este script roda logo depois do <header id="site-header">, então o cabeçalho aparece
   antes da primeira pintura da página. */
(function () {
  'use strict';

  var PRODUCTS = window.LOMODE_PRODUCTS || [];
  var IMG = 'assets/img/';
  var FREE_SHIPPING = 499;

  /* ---------- utilidades ---------- */
  function fmt(v) {
    return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function pix(v) { return v * 0.95; }
  function inst(v) { return '6x de ' + fmt(v / 6) + ' sem juros'; }
  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem('lomode:' + key) || 'null');
      localStorage.setItem('lomode:' + key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  function icon(name, cls) {
    return '<svg class="i ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  /* ---------- ícones (traço fino, 24px) ---------- */
  var SPRITE =
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    '<symbol id="logo" viewBox="0 0 1690 338"><path fill="currentColor" fill-rule="evenodd" d="M 4.667 4.667 C 4.300 5.033, 4 79.067, 4 169.186 L 4 333.038 178.250 332.769 L 352.500 332.500 359.500 330.158 C 367.846 327.366, 380.047 321.423, 386.697 316.910 C 422.674 292.498, 455.820 243.371, 464.426 201.703 C 468.062 184.104, 467.344 151.918, 462.852 131.092 C 448.434 64.251, 395.546 17.163, 324.503 7.917 C 311.237 6.191, 282.139 7.285, 269.500 9.986 C 225.101 19.473, 189.322 43.954, 166.755 80.287 C 156.676 96.512, 147.831 119.515, 144.371 138.500 C 141.887 152.128, 141.880 183.734, 144.358 200 C 148.353 226.228, 156.176 247.881, 164.977 257.072 C 170.053 262.374, 175.364 263.272, 196.557 262.418 L 213.615 261.730 208.153 253.615 C 187.330 222.674, 175.556 175.432, 178.902 136.250 C 180.085 122.399, 183.517 104.593, 187.141 93.500 C 190.502 83.213, 199.643 65.597, 205.990 57.173 C 219.917 38.691, 239.007 26.304, 261.147 21.381 C 271.455 19.089, 294.592 19.069, 307 21.341 C 318.254 23.402, 337.208 29.563, 346.133 34.063 C 393.249 57.815, 423.965 108.714, 429.163 171.651 C 432.396 210.792, 421.366 255.835, 402.248 281.570 C 388.021 300.720, 367.593 315.195, 344.933 322.184 L 337.500 324.477 190.250 324.761 L 43 325.045 43 164.522 L 43 4 24.167 4 C 13.808 4, 5.033 4.300, 4.667 4.667 M 488.009 12.750 C 488.029 32.340, 490.958 265.974, 491.588 298.250 L 492.266 333 496.629 333 L 500.993 333 501.247 189.478 L 501.500 45.956 551.461 152.228 C 578.940 210.677, 608.734 273.992, 617.671 292.927 L 633.919 327.354 636.076 322.427 C 637.262 319.717, 639.484 314.575, 641.014 311 C 642.544 307.425, 647.031 297.075, 650.986 288 C 654.941 278.925, 660.120 267, 662.494 261.500 C 664.869 256, 669.375 245.650, 672.508 238.500 C 675.641 231.350, 679.453 222.575, 680.980 219 C 683.550 212.985, 690.257 197.512, 721.509 125.500 C 746.694 67.467, 749.403 61.223, 752.978 52.954 C 755.010 48.254, 757.182 43.529, 757.806 42.454 C 758.654 40.991, 758.947 77.152, 758.970 186.270 L 759 332.041 779.750 331.770 L 800.500 331.500 800.753 167.729 L 801.006 3.958 781.343 4.229 L 761.679 4.500 749.929 30.500 C 743.467 44.800, 736.126 61, 733.615 66.500 C 731.105 72, 724.490 86.625, 718.915 99 C 713.340 111.375, 698.196 144.900, 685.260 173.500 C 672.325 202.100, 659.830 229.775, 657.493 235 C 655.156 240.225, 651.802 247.650, 650.041 251.500 L 646.839 258.500 645.257 255.500 C 644.386 253.850, 638.740 241.475, 632.711 228 C 626.681 214.525, 619.727 199, 617.259 193.500 C 614.790 188, 611.073 179.675, 609 175 C 606.927 170.325, 603.210 162, 600.741 156.500 C 586.534 124.849, 572.854 94.350, 565.980 79 C 561.669 69.375, 553.585 51.375, 548.016 39 C 542.446 26.625, 536.676 13.692, 535.194 10.261 L 532.500 4.022 510.250 4.011 L 488 4 488.009 12.750 M 974 4.598 C 942.546 7.359, 915.802 16.343, 892 32.142 C 878.991 40.777, 860.477 59.350, 851.771 72.500 C 838.536 92.490, 829.203 115.781, 824.812 139.770 C 821.743 156.545, 821.731 188.437, 824.789 205 C 840.423 289.680, 906.086 340.095, 991.750 333.188 C 1024.197 330.573, 1049.783 322.182, 1074 306.215 C 1085.452 298.664, 1104.956 279.156, 1112.747 267.461 C 1132.269 238.154, 1142 205.178, 1142 168.327 C 1142 121.694, 1125.616 78.409, 1096.505 48.135 C 1084.323 35.467, 1073.019 27.177, 1057.500 19.531 C 1044.286 13.021, 1031.994 8.922, 1018.173 6.415 C 1010.459 5.016, 982.388 3.861, 974 4.598 M 1166.462 5.250 C 1166.200 5.938, 1166.102 79.850, 1166.243 169.500 L 1166.500 332.500 1238.500 332.768 C 1283.771 332.936, 1312.251 332.664, 1315.218 332.035 C 1322.628 330.464, 1344.108 322.396, 1359.180 315.522 C 1378.353 306.778, 1391.074 298.091, 1404.500 284.574 C 1426.440 262.487, 1440.498 235.260, 1447.100 202.069 C 1449.774 188.626, 1450.741 161.667, 1449.076 146.965 C 1442.663 90.342, 1411.423 44.015, 1364.866 22.088 C 1355.313 17.589, 1325.587 7.438, 1315 5.060 C 1307.904 3.466, 1167.072 3.646, 1166.462 5.250 M 1467.247 170.250 L 1467.500 332.500 1576.750 332.754 L 1686 333.009 1686 329.010 L 1686 325.011 1595.250 324.755 L 1504.500 324.500 1504.500 247.500 L 1504.500 170.500 1579.250 170.244 L 1654 169.987 1654 165.994 L 1654 162 1579 162 L 1504 162 1504 89.005 L 1504 16.011 1594.750 15.755 L 1685.500 15.500 1685.810 11.750 L 1686.121 8 1576.557 8 L 1466.994 8 1467.247 170.250 M 1205.496 13.161 C 1205.216 13.898, 1205.102 84.250, 1205.243 169.500 L 1205.500 324.500 1251.500 324.467 C 1301.938 324.430, 1305.215 324.139, 1323.935 318.021 C 1370.594 302.774, 1402.026 259.741, 1410.143 200 C 1413.052 178.585, 1411.132 143.563, 1405.941 123.369 C 1392.481 71.004, 1364.679 34.516, 1326.773 19.469 C 1310.377 12.961, 1308.521 12.775, 1254.753 12.276 C 1214.636 11.903, 1205.915 12.059, 1205.496 13.161 M 951.678 20.022 C 908.265 24.994, 875.591 54.773, 862.567 101.237 C 858.568 115.504, 857.131 124.756, 856.392 141 C 854.265 187.699, 868.995 236.412, 895.819 271.395 C 903.501 281.412, 917.690 294.679, 928.333 301.794 C 956.796 320.825, 990.718 326.348, 1025.283 317.580 C 1084.143 302.649, 1116.634 238.654, 1105.527 159.528 C 1100.707 125.196, 1086.297 91.297, 1065.982 66.500 C 1046.838 43.133, 1021.355 27.329, 993.422 21.498 C 983.983 19.528, 962.597 18.772, 951.678 20.022"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M15.5 15.5 20 20" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4.5 20c.9-3.6 3.9-5.6 7.5-5.6s6.6 2 7.5 5.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 19.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6c0 5.3-7.5 9.7-7.5 9.7Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-heart-fill" viewBox="0 0 24 24"><path d="M12 19.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6c0 5.3-7.5 9.7-7.5 9.7Z" fill="currentColor" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-bag" viewBox="0 0 24 24"><path d="M5.5 8h13l-.9 12H6.4L5.5 8Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 8V6.8a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" stroke-width="1.3"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M3.5 7h17M3.5 12h17M3.5 17h11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-left" viewBox="0 0 24 24"><path d="m14.5 6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-right" viewBox="0 0 24 24"><path d="m9.5 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-down" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-truck" viewBox="0 0 24 24"><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><circle cx="6.5" cy="17" r="1.8" fill="var(--bg,#fff)" stroke="currentColor" stroke-width="1.2"/><circle cx="17" cy="17" r="1.8" fill="var(--bg,#fff)" stroke="currentColor" stroke-width="1.2"/></symbol>' +
    '<symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M3 9.5h18M6.5 15h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-pix" viewBox="0 0 24 24"><path d="m12 3.5 8.5 8.5-8.5 8.5L3.5 12 12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="m8 12 4-4 4 4-4 4-4-4Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-swap" viewBox="0 0 24 24"><path d="M5 9h13.5M15 5.5 18.5 9 15 12.5M19 15H5.5M9 11.5 5.5 15 9 18.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.2"/></symbol>' +
    '<symbol id="i-ruler" viewBox="0 0 24 24"><rect x="2.5" y="8" width="19" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 8v3M10 8v4.5M13.5 8v3M17 8v4.5" stroke="currentColor" stroke-width="1.2"/></symbol>' +
    '<symbol id="i-trash" viewBox="0 0 24 24"><path d="M5 7h14M10 7V5h4v2M7 7l.8 12h8.4L17 7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="16" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="17" cy="7" r="1" fill="currentColor"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24"><path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.3-3.8M14 3.5c.4 2.6 2.2 4.4 5 4.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-pinterest" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M10.6 20.3 12.4 13M11 14.5c.5.8 1.3 1.2 2.2 1.2 2.1 0 3.4-2 3.4-4.3 0-2.4-2-4.2-4.6-4.2-2.8 0-4.6 2-4.6 4.2 0 1 .4 2 1.1 2.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6l-3.9.9Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.3.5-2.1.3-2.4-.6-4.7-2.9-5.3-5.3-.2-.8 0-1.6.3-2.1Z" fill="currentColor"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></symbol>' +
    '</svg>';

  /* ---------- navegação ---------- */
  var MEGA_ROUPAS =
    '<div class="mega" role="region" aria-label="Roupas"><div class="mega__inner container">' +
      '<div class="mega__col"><p class="mega__title">Roupas</p><ul>' +
        '<li><a href="colecao.html?c=alfaiataria">Blazers e alfaiataria</a></li>' +
        '<li><a href="colecao.html?c=camisaria">Camisas</a></li>' +
        '<li><a href="colecao.html?c=tricos">Tricôs</a></li>' +
        '<li><a href="colecao.html?c=calcas">Calças</a></li>' +
        '<li><a href="colecao.html?c=casacos">Casacos</a></li>' +
        '<li><a href="colecao.html?c=roupas" class="mega__all">Ver todas as roupas</a></li>' +
      '</ul></div>' +
      '<div class="mega__col"><p class="mega__title">Destaques</p><ul>' +
        '<li><a href="colecao.html?c=novidades">Lançamentos</a></li>' +
        '<li><a href="colecao.html?c=roupas">Mais vendidos</a></li>' +
        '<li><a href="index.html#guia">Básicos essenciais</a></li>' +
        '<li><a href="index.html#look">Looks prontos</a></li>' +
        '<li><a href="colecao.html?c=sale">Sale</a></li>' +
      '</ul></div>' +
      '<a class="mega__promo" href="colecao.html?c=alfaiataria"><img src="' + IMG + 'cat-alfaiataria.webp" alt="" loading="lazy" width="720" height="960"><span>Alfaiataria fluida</span></a>' +
      '<a class="mega__promo" href="colecao.html?c=tricos"><img src="' + IMG + 'cat-tricos.webp" alt="" loading="lazy" width="720" height="960"><span>Tricôs de inverno</span></a>' +
    '</div></div>';

  var MEGA_ACESS =
    '<div class="mega" role="region" aria-label="Acessórios"><div class="mega__inner container">' +
      '<div class="mega__col"><p class="mega__title">Acessórios</p><ul>' +
        '<li><a href="colecao.html?c=bolsas">Bolsas</a></li>' +
        '<li><a href="colecao.html?c=sapatos">Sapatos</a></li>' +
        '<li><a href="colecao.html?c=joias">Joias e relógios</a></li>' +
        '<li><a href="colecao.html?c=oculos">Óculos</a></li>' +
        '<li><a href="colecao.html?c=inverno">Gorros e cachecóis</a></li>' +
        '<li><a href="colecao.html?c=acessorios" class="mega__all">Ver todos os acessórios</a></li>' +
      '</ul></div>' +
      '<div class="mega__col"><p class="mega__title">Para presentear</p><ul>' +
        '<li><a href="colecao.html?c=joias">Até R$ 199</a></li>' +
        '<li><a href="colecao.html?c=bolsas">Bolsas em couro</a></li>' +
        '<li><a href="colecao.html?c=acessorios">Vale-presente</a></li>' +
      '</ul></div>' +
      '<a class="mega__promo" href="colecao.html?c=bolsas"><img src="' + IMG + 'cat-bolsas.webp" alt="" loading="lazy" width="720" height="960"><span>Bolsas em couro</span></a>' +
      '<a class="mega__promo" href="colecao.html?c=joias"><img src="' + IMG + 'cat-acessorios.webp" alt="" loading="lazy" width="720" height="960"><span>Dourados delicados</span></a>' +
    '</div></div>';

  var HEADER =
    '<div class="announce" aria-label="Avisos da loja">' +
      '<div class="announce__inner container">' +
        '<button class="announce__btn" type="button" data-announce="-1" aria-label="Aviso anterior">' + icon('left') + '</button>' +
        '<div class="announce__track" aria-live="polite">' +
          '<p class="is-active">Frete grátis nas compras acima de R$ 499</p>' +
          '<p>Até 6x sem juros · 5% off no Pix</p>' +
          '<p>Primeira troca grátis em todo o site</p>' +
        '</div>' +
        '<button class="announce__btn" type="button" data-announce="1" aria-label="Próximo aviso">' + icon('right') + '</button>' +
      '</div>' +
    '</div>' +
    '<div class="header__main">' +
      '<div class="header__bar container">' +
        '<div class="header__left">' +
          '<button class="icon-btn header__burger" type="button" data-open="menu" aria-label="Abrir menu">' + icon('menu') + '</button>' +
          '<button class="header__search" type="button" data-open="search" aria-label="Buscar">' + icon('search') + '<span>Buscar</span></button>' +
        '</div>' +
        '<a class="header__logo" href="index.html" aria-label="Lomode, página inicial"><svg viewBox="0 0 1690 338" role="img" aria-hidden="true"><use href="#logo"></use></svg></a>' +
        '<div class="header__right">' +
          '<a class="icon-btn hide-sm" href="#" data-demo="Área do cliente" aria-label="Minha conta">' + icon('user') + '</a>' +
          '<a class="icon-btn" href="#" data-demo="Lista de desejos" aria-label="Lista de desejos">' + icon('heart') + '<span class="count" data-wish-count hidden>0</span></a>' +
          '<button class="icon-btn" type="button" data-open="cart" aria-label="Abrir sacola">' + icon('bag') + '<span class="count" data-cart-count hidden>0</span></button>' +
        '</div>' +
      '</div>' +
      '<nav class="nav" aria-label="Principal"><ul class="nav__list container">' +
        '<li><a href="colecao.html?c=novidades">Novidades</a></li>' +
        '<li class="has-mega"><a href="colecao.html?c=roupas" aria-haspopup="true">Roupas ' + icon('down', 'i--sm') + '</a>' + MEGA_ROUPAS + '</li>' +
        '<li><a href="colecao.html?c=alfaiataria">Alfaiataria</a></li>' +
        '<li><a href="colecao.html?c=tricos">Tricôs</a></li>' +
        '<li class="has-mega"><a href="colecao.html?c=acessorios" aria-haspopup="true">Acessórios ' + icon('down', 'i--sm') + '</a>' + MEGA_ACESS + '</li>' +
        '<li><a href="index.html#guia">Guarda-roupa inteligente</a></li>' +
        '<li><a href="colecao.html?c=sale" class="nav__sale">Sale</a></li>' +
      '</ul></nav>' +
    '</div>';

  var DRAWERS =
    '<div class="scrim" data-close></div>' +
    /* menu mobile */
    '<aside class="drawer drawer--left" id="drawer-menu" aria-label="Menu" aria-hidden="true">' +
      '<div class="drawer__head">' +
        '<svg class="drawer__logo" viewBox="0 0 1690 338" aria-hidden="true"><use href="#logo"></use></svg>' +
        '<button class="icon-btn" type="button" data-close aria-label="Fechar menu">' + icon('close') + '</button>' +
      '</div>' +
      '<div class="drawer__body">' +
        '<ul class="mnav">' +
          '<li><a href="colecao.html?c=novidades">Novidades</a></li>' +
          '<li class="mnav__group"><button type="button" aria-expanded="false">Roupas' + icon('plus') + '</button><ul>' +
            '<li><a href="colecao.html?c=alfaiataria">Blazers e alfaiataria</a></li><li><a href="colecao.html?c=camisaria">Camisas</a></li>' +
            '<li><a href="colecao.html?c=tricos">Tricôs</a></li><li><a href="colecao.html?c=calcas">Calças</a></li>' +
            '<li><a href="colecao.html?c=casacos">Casacos</a></li><li><a href="colecao.html?c=roupas">Ver tudo</a></li></ul></li>' +
          '<li class="mnav__group"><button type="button" aria-expanded="false">Acessórios' + icon('plus') + '</button><ul>' +
            '<li><a href="colecao.html?c=bolsas">Bolsas</a></li><li><a href="colecao.html?c=sapatos">Sapatos</a></li>' +
            '<li><a href="colecao.html?c=joias">Joias e relógios</a></li><li><a href="colecao.html?c=oculos">Óculos</a></li>' +
            '<li><a href="colecao.html?c=inverno">Gorros e cachecóis</a></li><li><a href="colecao.html?c=acessorios">Ver tudo</a></li></ul></li>' +
          '<li><a href="colecao.html?c=alfaiataria">Alfaiataria</a></li>' +
          '<li><a href="colecao.html?c=tricos">Tricôs</a></li>' +
          '<li><a href="index.html#guia">Guarda-roupa inteligente</a></li>' +
          '<li><a href="colecao.html?c=sale" class="nav__sale">Sale</a></li>' +
        '</ul>' +
        '<a class="mnav__promo" href="colecao.html?c=novidades"><img src="' + IMG + 'look-1.webp" alt="" loading="lazy" width="1200" height="1600"><span><small>Inverno 26</small>Nova coleção</span></a>' +
        '<ul class="mnav__aux">' +
          '<li><a href="#" data-demo="Área do cliente">' + icon('user') + 'Entrar ou cadastrar</a></li>' +
          '<li><a href="#" data-demo="Meus pedidos">' + icon('bag') + 'Meus pedidos</a></li>' +
          '<li><a href="#" data-demo="Atendimento por WhatsApp">' + icon('whatsapp') + 'Fale com a gente</a></li>' +
        '</ul>' +
      '</div>' +
    '</aside>' +
    /* busca */
    '<div class="search" id="drawer-search" role="dialog" aria-label="Buscar produtos" aria-hidden="true">' +
      '<div class="search__inner container">' +
        '<form class="search__form" role="search" onsubmit="return false">' +
          icon('search') +
          '<input type="search" placeholder="O que você procura?" aria-label="Buscar produtos" autocomplete="off" data-search-input>' +
          '<button class="icon-btn" type="button" data-close aria-label="Fechar busca">' + icon('close') + '</button>' +
        '</form>' +
        '<div class="search__hints"><span>Mais buscados</span>' +
          '<button type="button" data-q="Blazer">Blazer</button><button type="button" data-q="Tricô">Tricô</button>' +
          '<button type="button" data-q="Pantalona">Pantalona</button><button type="button" data-q="Bolsa">Bolsa</button>' +
          '<button type="button" data-q="Dourado">Dourado</button>' +
        '</div>' +
        '<div class="search__results" data-search-results></div>' +
      '</div>' +
    '</div>' +
    /* sacola */
    '<aside class="drawer drawer--right" id="drawer-cart" aria-label="Sacola" aria-hidden="true">' +
      '<div class="drawer__head"><p class="drawer__title">Sacola <span data-cart-qty>(0)</span></p>' +
        '<button class="icon-btn" type="button" data-close aria-label="Fechar sacola">' + icon('close') + '</button></div>' +
      '<div class="cart__ship" data-cart-ship></div>' +
      '<div class="drawer__body cart__items" data-cart-items></div>' +
      '<div class="cart__foot" data-cart-foot></div>' +
    '</aside>' +
    '<div class="toast" role="status" aria-live="polite" data-toast></div>' +
    '<a class="wa-float" href="#" data-demo="Atendimento por WhatsApp" aria-label="Fale com a gente pelo WhatsApp">' + icon('whatsapp') + '</a>';

  var FOOTER =
    '<div class="footer__top container">' +
      '<div class="footer__brand">' +
        '<svg class="footer__logo" viewBox="0 0 1690 338" role="img" aria-label="Lomode"><use href="#logo"></use></svg>' +
        '<p>Peças atemporais para um guarda-roupa inteligente: menos excesso, mais intenção em cada escolha.</p>' +
        '<div class="footer__social">' +
          '<a href="#" data-demo="Instagram" aria-label="Instagram">' + icon('instagram') + '</a>' +
          '<a href="#" data-demo="TikTok" aria-label="TikTok">' + icon('tiktok') + '</a>' +
          '<a href="#" data-demo="Pinterest" aria-label="Pinterest">' + icon('pinterest') + '</a>' +
          '<a href="#" data-demo="WhatsApp" aria-label="WhatsApp">' + icon('whatsapp') + '</a>' +
        '</div>' +
      '</div>' +
      '<details class="footer__col" open><summary>Institucional' + icon('plus') + '</summary><ul>' +
        '<li><a href="#" data-demo="Sobre a Lomode">Sobre a Lomode</a></li><li><a href="#" data-demo="Nossa loja">Nossa loja</a></li>' +
        '<li><a href="#" data-demo="Trabalhe conosco">Trabalhe conosco</a></li><li><a href="index.html#guia">Guarda-roupa inteligente</a></li></ul></details>' +
      '<details class="footer__col" open><summary>Ajuda' + icon('plus') + '</summary><ul>' +
        '<li><a href="#" data-demo="Trocas e devoluções">Trocas e devoluções</a></li><li><a href="#" data-demo="Prazos e entregas">Prazos e entregas</a></li>' +
        '<li><a href="#" data-demo="Guia de medidas">Guia de medidas</a></li><li><a href="#" data-demo="Perguntas frequentes">Perguntas frequentes</a></li>' +
        '<li><a href="#" data-demo="Política de privacidade">Política de privacidade</a></li></ul></details>' +
      '<details class="footer__col" open><summary>Atendimento' + icon('plus') + '</summary><ul class="footer__contact">' +
        '<li>' + icon('whatsapp') + '<span>WhatsApp<br><b>(11) 90000-0000</b></span></li>' +
        '<li>' + icon('mail') + '<span>E-mail<br><b>atendimento@lomode.com.br</b></span></li>' +
        '<li>' + icon('clock') + '<span>Seg. a sex., 9h às 18h<br>Sáb., 9h às 13h</span></li></ul></details>' +
    '</div>' +
    '<div class="footer__pay container">' +
      '<div><p class="footer__label">Formas de pagamento</p><ul class="pay">' +
        '<li>Visa</li><li>Mastercard</li><li>Elo</li><li>Amex</li><li>Hipercard</li><li>' + icon('pix') + 'Pix</li><li>Boleto</li></ul></div>' +
      '<div><p class="footer__label">Segurança</p><ul class="pay"><li>' + icon('lock') + 'Site seguro · SSL</li></ul></div>' +
    '</div>' +
    '<div class="footer__legal container">' +
      '<p>© 2026 Lomode. Protótipo de demonstração: produtos, preços e dados são ilustrativos.</p>' +
      '<p>CNPJ 00.000.000/0001-00</p>' +
    '</div>';

  /* ---------- montagem síncrona ---------- */
  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    document.body.insertAdjacentHTML('afterbegin', SPRITE);
    headerEl.className = 'header';
    headerEl.innerHTML = HEADER;
  }

  function renderFooter() {
    var f = document.getElementById('site-footer');
    if (!f) return;
    f.className = 'footer';
    f.innerHTML = FOOTER;
    document.body.insertAdjacentHTML('beforeend', DRAWERS);
  }

  /* ---------- card de produto ---------- */
  function card(p, opts) {
    opts = opts || {};
    var off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    var badge = off ? '<span class="badge badge--sale">-' + off + '%</span>' : (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '');
    var sizes = p.sizes.map(function (s) {
      var out = (p.soldOut || []).indexOf(s) > -1;
      return '<button type="button" class="quick__size" data-add="' + p.id + '" data-size="' + s + '"' + (out ? ' disabled aria-label="' + s + ' esgotado"' : '') + '>' + (s === 'Único' ? 'Adicionar à sacola' : s) + '</button>';
    }).join('');
    var swatches = p.colors.map(function (c) {
      return '<span class="swatch" style="--c:' + c.h + '" title="' + esc(c.n) + '"></span>';
    }).join('');
    var href = 'produto.html?id=' + p.id;
    return '<article class="card' + (opts.cls ? ' ' + opts.cls : '') + '" data-id="' + p.id + '">' +
      '<div class="card__media">' +
        '<a href="' + href + '" class="card__link" tabindex="-1" aria-hidden="true">' +
          '<img class="card__img" src="' + IMG + p.img + '.webp" alt="" loading="lazy" decoding="async" width="900" height="1200">' +
          '<img class="card__img card__img--alt" src="' + IMG + p.img2 + '.webp" alt="" loading="lazy" decoding="async" width="900" height="1200">' +
        '</a>' + badge +
        '<button type="button" class="card__wish" data-wish="' + p.id + '" aria-pressed="false" aria-label="Favoritar ' + esc(p.name) + '">' + icon('heart') + icon('heart-fill', 'i--on') + '</button>' +
        '<div class="quick"><p class="quick__label">' + (p.sizes[0] === 'Único' ? 'Compra rápida' : 'Adicionar · escolha o tamanho') + '</p><div class="quick__sizes">' + sizes + '</div></div>' +
      '</div>' +
      '<div class="card__body">' +
        '<div class="card__swatches">' + swatches + (p.colors.length > 1 ? '<span class="card__more">' + p.colors.length + ' cores</span>' : '') + '</div>' +
        '<h3 class="card__name"><a href="' + href + '">' + esc(p.name) + '</a></h3>' +
        '<p class="card__price">' + (p.old ? '<s>' + fmt(p.old) + '</s>' : '') + '<span>' + fmt(p.price) + '</span></p>' +
        '<p class="card__inst">' + inst(p.price) + '</p>' +
        '<p class="card__pix">' + icon('pix', 'i--xs') + fmt(pix(p.price)) + ' no Pix</p>' +
      '</div>' +
    '</article>';
  }

  window.Lomode = {
    products: PRODUCTS, byId: byId, fmt: fmt, pix: pix, inst: inst, esc: esc,
    store: store, icon: icon, card: card, renderFooter: renderFooter,
    FREE_SHIPPING: FREE_SHIPPING, IMG: IMG
  };
})();
