/* Interações do protótipo. Nada aqui fala com servidor: sacola e favoritos ficam
   só no navegador de quem está vendo, para a apresentação fluir entre as páginas. */
(function () {
  'use strict';

  var L = window.Lomode;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var mqMobile = window.matchMedia('(max-width: 960px)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var page = document.body.getAttribute('data-page');

  /* ---------- toast ---------- */
  var toastEl = $('[data-toast]'), toastT;
  function toast(msg, ico) {
    if (!toastEl) return;
    toastEl.innerHTML = L.icon(ico || 'check') + '<span>' + L.esc(msg) + '</span>';
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }
  L.toast = toast;

  /* ---------- cabeçalho fixo ---------- */
  var header = $('#site-header');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 40);
    document.body.classList.toggle('show-wa', window.scrollY > 500 || page !== 'home');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- barra de avisos ---------- */
  var ann = $$('.announce__track p'), annI = 0, annT;
  function annGo(d) {
    ann[annI].classList.remove('is-active');
    annI = (annI + d + ann.length) % ann.length;
    ann[annI].classList.add('is-active');
  }
  function annStart() { clearInterval(annT); annT = setInterval(function () { annGo(1); }, 4200); }
  $$('[data-announce]').forEach(function (b) {
    b.addEventListener('click', function () { annGo(+b.getAttribute('data-announce')); annStart(); });
  });
  if (ann.length) annStart();

  /* ---------- gavetas ---------- */
  var scrim = $('.scrim'), openEl = null, lastFocus = null;
  var panels = { menu: '#drawer-menu', search: '#drawer-search', cart: '#drawer-cart' };
  function open(name) {
    var el = typeof name === 'string' ? $(panels[name] || name) : name;
    if (!el) return;
    if (openEl && openEl !== el) close(true);
    lastFocus = document.activeElement;
    openEl = el;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    scrim.classList.add('is-on');
    document.body.classList.add('is-locked');
    setTimeout(function () {
      var f = $('[data-search-input]', el) || $('button, a, input', el);
      if (f) f.focus({ preventScroll: true });
    }, 60);
  }
  function close(silent) {
    if (!openEl) return;
    openEl.classList.remove('is-open');
    openEl.setAttribute('aria-hidden', 'true');
    openEl = null;
    if (!silent) {
      scrim.classList.remove('is-on');
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
  }
  L.open = open; L.close = close;
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.getAttribute('data-open')); return; }
    if (e.target.closest('[data-close]')) { e.preventDefault(); close(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); closeModal(); } });

  /* menu mobile: grupos */
  $$('.mnav__group > button').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.parentNode, on = !li.classList.contains('is-open');
      li.classList.toggle('is-open', on);
      b.setAttribute('aria-expanded', on);
    });
  });

  /* links demonstrativos */
  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-demo]');
    if (!d) return;
    e.preventDefault();
    toast(d.getAttribute('data-demo') + ': disponível na versão completa', 'arrow');
  });

  /* ---------- favoritos ---------- */
  var wish = L.store('wish') || [];
  function paintWish() {
    var c = $('[data-wish-count]');
    if (c) { c.textContent = wish.length; c.hidden = !wish.length; }
    $$('[data-wish]').forEach(function (b) {
      b.setAttribute('aria-pressed', wish.indexOf(b.getAttribute('data-wish')) > -1);
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-wish]');
    if (!b) return;
    e.preventDefault();
    var id = b.getAttribute('data-wish'), i = wish.indexOf(id);
    if (i > -1) { wish.splice(i, 1); toast('Removido dos favoritos', 'heart'); }
    else { wish.push(id); toast('Salvo nos favoritos', 'heart-fill'); bump('[data-wish-count]'); }
    L.store('wish', wish);
    paintWish();
  });
  function bump(sel) {
    var el = $(sel); if (!el) return;
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }

  /* ---------- sacola ---------- */
  var cart = L.store('cart') || [];
  function cartQty() { return cart.reduce(function (s, i) { return s + i.q; }, 0); }
  function cartTotal() { return cart.reduce(function (s, i) { var p = L.byId(i.id); return s + (p ? p.price * i.q : 0); }, 0); }
  function saveCart() { L.store('cart', cart); renderCart(); }
  function addToCart(id, size, color, q, silent) {
    var p = L.byId(id); if (!p) return;
    color = color || p.colors[0].n;
    var key = id + '|' + size + '|' + color;
    var item = cart.filter(function (i) { return i.k === key; })[0];
    if (item) item.q += q || 1; else cart.push({ k: key, id: id, s: size, c: color, q: q || 1 });
    saveCart();
    bump('[data-cart-count]');
    if (!silent) {
      toast(p.name + (size && size !== 'Único' ? ' · ' + size : '') + ' na sacola', 'bag');
      setTimeout(function () { open('cart'); }, 380);
    }
  }
  L.addToCart = addToCart;
  function renderCart() {
    var qty = cartQty(), total = cartTotal();
    var c = $('[data-cart-count]');
    if (c) { c.textContent = qty; c.hidden = !qty; }
    var qEl = $('[data-cart-qty]'); if (qEl) qEl.textContent = '(' + qty + ')';
    var ship = $('[data-cart-ship]'), items = $('[data-cart-items]'), foot = $('[data-cart-foot]');
    if (!items) return;
    var left = L.FREE_SHIPPING - total;
    ship.innerHTML = qty
      ? '<p>' + (left > 0 ? 'Faltam <b>' + L.fmt(left) + '</b> para o frete grátis' : '<b>Você ganhou frete grátis</b>') + '</p><div class="bar"><span style="transform:scaleX(' + Math.min(1, total / L.FREE_SHIPPING).toFixed(3) + ')"></span></div>'
      : '<p>Frete grátis nas compras acima de <b>' + L.fmt(L.FREE_SHIPPING) + '</b></p><div class="bar"><span style="transform:scaleX(0)"></span></div>';
    if (!qty) {
      items.innerHTML = '<div class="cart__empty">' + L.icon('bag') + '<p>Sua sacola está vazia</p><a class="btn btn--ghost" href="colecao.html?c=novidades">Ver lançamentos</a></div>';
      foot.innerHTML = '';
      return;
    }
    items.innerHTML = cart.map(function (i) {
      var p = L.byId(i.id); if (!p) return '';
      return '<div class="citem">' +
        '<a class="citem__img" href="produto.html?id=' + p.id + '"><img src="' + L.IMG + p.img + '.webp" alt="" width="900" height="1200" loading="lazy"></a>' +
        '<div><div class="citem__top"><div><p class="citem__name">' + L.esc(p.name) + '</p>' +
        '<p class="citem__meta">' + L.esc(i.c) + (i.s && i.s !== 'Único' ? ' · Tam. ' + L.esc(i.s) : '') + '</p></div>' +
        '<button class="citem__rm" type="button" data-rm="' + i.k + '" aria-label="Remover">' + L.icon('trash') + '</button></div>' +
        '<div class="citem__row"><div class="qty"><button type="button" data-qty="-1" data-k="' + i.k + '" aria-label="Diminuir">' + L.icon('minus') + '</button><span>' + i.q + '</span>' +
        '<button type="button" data-qty="1" data-k="' + i.k + '" aria-label="Aumentar">' + L.icon('plus') + '</button></div>' +
        '<p class="citem__price">' + L.fmt(p.price * i.q) + '</p></div></div></div>';
    }).join('');
    foot.innerHTML = '<div class="cart__sum"><span>Subtotal</span><b>' + L.fmt(total) + '</b></div>' +
      '<p class="cart__note">ou 6x de ' + L.fmt(total / 6) + ' sem juros · ' + L.fmt(L.pix(total)) + ' no Pix</p>' +
      '<button class="btn btn--block" type="button" data-checkout>Finalizar compra ' + L.icon('lock') + '</button>' +
      '<button class="btn btn--ghost btn--block" type="button" data-close>Continuar comprando</button>';
  }
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-rm]'))) {
      cart = cart.filter(function (i) { return i.k !== t.getAttribute('data-rm'); }); saveCart();
    } else if ((t = e.target.closest('[data-qty]'))) {
      var it = cart.filter(function (i) { return i.k === t.getAttribute('data-k'); })[0];
      if (it) { it.q += +t.getAttribute('data-qty'); if (it.q < 1) cart.splice(cart.indexOf(it), 1); saveCart(); }
    } else if (e.target.closest('[data-checkout]')) {
      toast('Checkout desativado neste protótipo', 'lock');
    } else if ((t = e.target.closest('[data-add]'))) {
      e.preventDefault();
      addToCart(t.getAttribute('data-add'), t.getAttribute('data-size'));
    }
  });

  /* ---------- busca ---------- */
  var sInput = $('[data-search-input]'), sRes = $('[data-search-results]');
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function runSearch() {
    var q = norm(sInput.value.trim());
    var list = q ? L.products.filter(function (p) { return norm(p.name + ' ' + p.sub + ' ' + p.colors.map(function (c) { return c.n; }).join(' ')).indexOf(q) > -1; })
      : L.products.filter(function (p) { return p.badge; });
    var title = q ? (list.length ? list.length + (list.length > 1 ? ' resultados' : ' resultado') : '') : 'Novidades em alta';
    sRes.innerHTML = (title ? '<p class="search__title">' + title + '</p>' : '') +
      (list.length ? list.slice(0, 5).map(function (p) { return L.card(p); }).join('') : '<p class="search__empty">Nada encontrado para “' + L.esc(sInput.value) + '”. Tente “blazer” ou “bolsa”.</p>');
  }
  if (sInput) {
    sInput.addEventListener('input', runSearch);
    $$('[data-q]').forEach(function (b) { b.addEventListener('click', function () { sInput.value = b.getAttribute('data-q'); runSearch(); sInput.focus(); }); });
    runSearch();
  }

  /* ---------- rodapé: colunas recolhidas no celular ---------- */
  if (mqMobile.matches) $$('.footer__col').forEach(function (d) { d.removeAttribute('open'); });
  $$('.footer__col summary').forEach(function (s) {
    s.addEventListener('click', function (e) { if (!mqMobile.matches) e.preventDefault(); });
  });

  /* ---------- vitrines ---------- */
  $$('[data-shelf]').forEach(function (el) {
    el.innerHTML = el.getAttribute('data-shelf').split(',').map(function (id) { var p = L.byId(id.trim()); return p ? L.card(p) : ''; }).join('');
  });
  $$('[data-rail]').forEach(function (rail) {
    var track = $('.rail__track', rail), bar = $('.rail__progress span', rail), name = rail.getAttribute('data-rail');
    var prev = $('[data-rail-prev="' + name + '"]'), next = $('[data-rail-next="' + name + '"]');
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var vis = track.clientWidth / track.scrollWidth;
      if (bar) { bar.style.width = (vis * 100) + '%'; bar.style.left = (max > 0 ? track.scrollLeft / max * (1 - vis) * 100 : 0) + '%'; }
      if (prev) prev.disabled = track.scrollLeft < 4;
      if (next) next.disabled = track.scrollLeft > max - 4;
    }
    function step(d) {
      var card = track.firstElementChild; if (!card) return;
      var w = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 20);
      var per = Math.max(1, Math.round(track.clientWidth / w) - 1);
      track.scrollBy({ left: d * w * per, behavior: reduced ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- abas ---------- */
  $$('[data-tabs]').forEach(function (tabs) {
    var grid = $('[data-tab-grid="' + tabs.getAttribute('data-tabs') + '"]');
    function show(sub) {
      var list = L.products.filter(function (p) { return p.cat === 'acessorios' && (!sub || p.sub === sub || (sub === 'Joias' && p.sub === 'Óculos')); });
      grid.innerHTML = list.slice(0, 8).map(function (p) { return L.card(p); }).join('');
      paintWish();
    }
    $$('[data-tab]', tabs).forEach(function (t) {
      t.addEventListener('click', function () {
        $$('[data-tab]', tabs).forEach(function (x) { x.setAttribute('aria-selected', x === t); });
        show(t.getAttribute('data-tab'));
      });
    });
    show('');
  });

  /* ---------- banner principal ---------- */
  var hero = $('.hero');
  if (hero) {
    var slides = $$('.hero__slide', hero), dots = $$('.hero__dot', hero), count = $('[data-hero-count]', hero);
    var cur = 0, timer, DUR = 6500;
    hero.style.setProperty('--dur', DUR + 'ms');
    function go(n) {
      slides[cur].classList.remove('is-active');
      dots.forEach(function (d, i) { d.classList.remove('is-active'); d.classList.toggle('is-done', false); });
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('is-active');
      void dots[cur].offsetWidth;
      dots[cur].classList.add('is-active');
      for (var i = 0; i < cur; i++) dots[i].classList.add('is-done');
      hero.setAttribute('data-theme', slides[cur].getAttribute('data-theme'));
      if (count) count.textContent = '0' + (cur + 1) + ' / 0' + slides.length;
      restart();
    }
    function restart() { clearTimeout(timer); if (!reduced) timer = setTimeout(function () { go(cur + 1); }, DUR); }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    $$('[data-hero]', hero).forEach(function (b) { b.addEventListener('click', function () { go(cur + +b.getAttribute('data-hero')); }); });
    hero.addEventListener('mouseenter', function () { if (!mqMobile.matches) { hero.classList.add('is-paused'); clearTimeout(timer); } });
    hero.addEventListener('mouseleave', function () { if (hero.classList.contains('is-paused')) { hero.classList.remove('is-paused'); go(cur); } });
    var sx = null;
    hero.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 45) go(cur + (dx < 0 ? 1 : -1));
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(timer); else restart(); });
    hero.setAttribute('data-theme', slides[0].getAttribute('data-theme'));
    restart();
  }

  /* ---------- guarda-roupa inteligente ---------- */
  var guide = $('[data-guide]');
  if (guide) {
    var gItems = $$('.guide__item', guide), gImgs = $$('[data-guide-stage] img'), gTag = $('[data-guide-tag]');
    function gShow(i) {
      gItems.forEach(function (x, k) { x.classList.toggle('is-active', k === i); });
      gImgs.forEach(function (x, k) { x.classList.toggle('is-active', k === i); });
      if (gTag) gTag.textContent = '0' + (i + 1) + ' · ' + $('.guide__name', gItems[i]).textContent;
    }
    gItems.forEach(function (it, i) {
      it.addEventListener('mouseenter', function () { gShow(i); });
      it.addEventListener('focusin', function () { gShow(i); });
      it.querySelector('a').addEventListener('click', function (e) {
        if (mqMobile.matches && !it.classList.contains('is-active')) { e.preventDefault(); gShow(i); }
      });
    });
  }

  /* ---------- compre o look ---------- */
  var look = $('[data-look]');
  if (look) {
    var lWrap = $('[data-look-items]', look);
    var ids = lWrap.getAttribute('data-look-items').split(',');
    var prods = ids.map(L.byId);
    lWrap.innerHTML = prods.map(function (p) {
      var size = p.sizes[0] === 'Único' ? 'Único' : (p.sizes[2] || p.sizes[0]);
      return '<div class="litem" data-litem="' + p.id + '"><a class="litem__img" href="produto.html?id=' + p.id + '"><img src="' + L.IMG + p.img + '.webp" alt="" loading="lazy" width="900" height="1200"></a>' +
        '<div><p class="litem__name"><a href="produto.html?id=' + p.id + '">' + L.esc(p.name) + '</a></p><p class="litem__price">' + L.fmt(p.price) + '<small>' + (size === 'Único' ? 'Tamanho único' : 'Tam. ' + size) + '</small></p></div>' +
        '<button class="litem__add" type="button" data-look-add="' + p.id + '" data-size="' + size + '">' + L.icon('plus') + '<span>Adicionar</span></button></div>';
    }).join('');
    var tot = prods.reduce(function (s, p) { return s + p.price; }, 0);
    $('[data-look-total]', look).textContent = L.fmt(tot);
    look.addEventListener('click', function (e) {
      var h = e.target.closest('[data-hot]'), a = e.target.closest('[data-look-add]'), all = e.target.closest('[data-look-all]');
      if (h) {
        var id = h.getAttribute('data-hot');
        $$('.hotspot', look).forEach(function (x) { x.classList.toggle('is-active', x === h); });
        $$('.litem', look).forEach(function (x) { x.classList.toggle('is-active', x.getAttribute('data-litem') === id); });
        var row = $('[data-litem="' + id + '"]', look);
        if (row && mqMobile.matches) row.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      }
      if (a) {
        addToCart(a.getAttribute('data-look-add'), a.getAttribute('data-size'), null, 1, true);
        a.classList.add('is-done'); a.innerHTML = L.icon('check') + '<span>Na sacola</span>';
        toast(L.byId(a.getAttribute('data-look-add')).name + ' na sacola', 'bag');
      }
      if (all) {
        $$('[data-look-add]', look).forEach(function (b) {
          if (!b.classList.contains('is-done')) { addToCart(b.getAttribute('data-look-add'), b.getAttribute('data-size'), null, 1, true); b.classList.add('is-done'); b.innerHTML = L.icon('check') + '<span>Na sacola</span>'; }
        });
        toast('Look completo na sacola', 'bag');
        setTimeout(function () { open('cart'); }, 380);
      }
    });
  }

  /* ---------- newsletter ---------- */
  $$('[data-news]').forEach(function (box) {
    var f = $('form', box);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = $('input', f).value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { toast('Digite um e-mail válido', 'mail'); $('input', f).focus(); return; }
      f.outerHTML = '<p class="news__ok">' + L.icon('check') + 'Pronto! Seu cupom BEMVINDA10 chegou no e-mail.</p>';
    });
  });

  /* ---------- página de produto ---------- */
  if (page === 'product') renderProduct();
  function renderProduct() {
    var id = new URLSearchParams(location.search).get('id');
    var p = L.byId(id) || L.products[0];
    document.title = p.name + ' · Lomode';
    var off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    var cat = p.cat === 'roupas' ? ['Roupas', 'roupas'] : ['Acessórios', 'acessorios'];
    var subSlug = slug(p.sub);
    $('[data-crumbs]').innerHTML = '<a href="index.html">Início</a><span><a href="colecao.html?c=' + cat[1] + '">' + cat[0] + '</a></span><span><a href="colecao.html?c=' + subSlug + '">' + p.sub + '</a></span><span>' + L.esc(p.name) + '</span>';

    var related = L.products.filter(function (x) { return x.id !== p.id && x.cat !== p.cat; }).slice(0, 3);
    /* a terceira foto é um detalhe ampliado da própria peça */
    var gal = [p.img, p.img2, p.img];
    var galEl = $('[data-gallery]');
    galEl.innerHTML = gal.map(function (src, i) {
      return '<div class="gallery__item' + (i === 2 ? ' gallery__item--wide gallery__item--detail' : '') + '"><img src="' + L.IMG + src + '.webp" alt="' + (i === 0 ? L.esc(p.name) : i === 1 ? 'Outra vista' : 'Detalhe') + '" width="900" height="1200"' + (i ? ' loading="lazy"' : ' fetchpriority="high"') + '></div>';
    }).join('');
    $('[data-gallery-dots]').innerHTML = gal.map(function (_, i) { return '<span' + (i ? '' : ' class="is-active"') + '></span>'; }).join('');
    galEl.addEventListener('scroll', function () {
      var i = Math.round(galEl.scrollLeft / galEl.clientWidth);
      $$('[data-gallery-dots] span').forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
    }, { passive: true });
    $$('.gallery__item', galEl).forEach(function (it) {
      it.addEventListener('click', function () { if (!mqMobile.matches) it.classList.toggle('is-zoom'); });
      it.addEventListener('mousemove', function (e) {
        var r = it.getBoundingClientRect();
        it.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100) + '%');
        it.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100) + '%');
      });
      it.addEventListener('mouseleave', function () { it.classList.remove('is-zoom'); });
    });

    var info = $('[data-info]');
    var color = p.colors[0].n, size = null;
    var single = p.sizes.length === 1;
    if (single) size = p.sizes[0];
    info.innerHTML =
      '<p class="info__sub">' + p.sub + '</p>' +
      '<h1 class="info__name">' + L.esc(p.name) + '</h1>' +
      '<p class="info__ref">Ref. LM' + (1000 + L.products.indexOf(p) * 37) + '<span class="info__rating"><span class="stars" aria-hidden="true">★★★★★</span>4,9 · 38 avaliações</span></p>' +
      '<p class="info__price">' + (p.old ? '<s>' + L.fmt(p.old) + '</s>' : '') + '<span>' + L.fmt(p.price) + '</span>' + (off ? '<span class="badge badge--sale">-' + off + '%</span>' : '') + '</p>' +
      '<p class="info__pay">' + L.inst(p.price) + ' · <b>' + L.fmt(L.pix(p.price)) + ' no Pix</b> (5% off)</p>' +
      '<div class="opt"><div class="opt__head"><p class="opt__label">Cor<span data-color-name>' + color + '</span></p></div><div class="colors">' +
        p.colors.map(function (c, i) { return '<button class="color" type="button" style="--c:' + c.h + '" data-color="' + L.esc(c.n) + '" aria-pressed="' + (i === 0) + '" aria-label="' + L.esc(c.n) + '"></button>'; }).join('') +
      '</div></div>' +
      (single ? '' :
      '<div class="opt" data-size-opt><div class="opt__head"><p class="opt__label">Tamanho<span data-size-name>Selecione</span></p>' +
        '<button class="opt__link" type="button" data-modal-open>' + L.icon('ruler') + 'Guia de medidas</button></div><div class="sizes">' +
        p.sizes.map(function (s) { var out = (p.soldOut || []).indexOf(s) > -1; return '<button class="size" type="button" data-size-btn="' + s + '" aria-pressed="false"' + (out ? ' disabled aria-label="' + s + ' esgotado"' : '') + '>' + s + '</button>'; }).join('') +
      '</div><p class="opt__err">Escolha um tamanho para continuar.</p></div>') +
      '<div class="buy"><button class="btn" type="button" data-buy>Adicionar à sacola ' + L.icon('bag') + '</button>' +
        '<button class="buy__wish" type="button" data-wish="' + p.id + '" aria-pressed="false" aria-label="Favoritar">' + L.icon('heart') + L.icon('heart-fill', 'i--on') + '</button></div>' +
      '<div class="ship"><p class="ship__label">' + L.icon('truck') + 'Calcule o frete</p>' +
        '<form class="ship__form" data-ship><input inputmode="numeric" maxlength="9" placeholder="00000-000" aria-label="CEP"><button type="submit">Calcular</button></form><ul class="ship__res" data-ship-res></ul></div>' +
      '<ul class="trust"><li>' + L.icon('swap') + 'Primeira troca grátis</li><li>' + L.icon('card') + '6x sem juros</li><li>' + L.icon('lock') + 'Compra segura</li></ul>' +
      '<div class="acc">' +
        '<details open><summary>Descrição' + L.icon('plus') + '</summary><div class="acc__body"><p>' + L.esc(p.desc) + '</p></div></details>' +
        '<details><summary>Composição e cuidados' + L.icon('plus') + '</summary><div class="acc__body"><p>' + L.esc(p.comp) + '</p><ul style="margin-top:10px"><li>Lavar à mão ou a seco</li><li>Não usar alvejante</li><li>Secar à sombra, na horizontal</li></ul></div></details>' +
        '<details><summary>Trocas e devoluções' + L.icon('plus') + '</summary><div class="acc__body"><p>A primeira troca é grátis em até 30 dias após o recebimento. A peça deve estar sem uso e com a etiqueta.</p></div></details>' +
      '</div>';

    info.addEventListener('click', function (e) {
      var c = e.target.closest('[data-color]'), s = e.target.closest('[data-size-btn]'), b = e.target.closest('[data-buy]');
      if (c) {
        color = c.getAttribute('data-color');
        $$('[data-color]', info).forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
        $('[data-color-name]', info).textContent = color;
      }
      if (s && !s.disabled) {
        size = s.getAttribute('data-size-btn');
        $$('[data-size-btn]', info).forEach(function (x) { x.setAttribute('aria-pressed', x === s); });
        $('[data-size-name]', info).textContent = size;
        $('[data-size-opt]', info).classList.remove('is-error');
      }
      if (b) buy();
    });
    function buy() {
      if (!size) {
        var o = $('[data-size-opt]', info); o.classList.add('is-error');
        o.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        return;
      }
      addToCart(p.id, size, color);
    }
    var sb = $('[data-sticky-buy]');
    if (sb) {
      sb.innerHTML = '<p class="sticky-buy__price">' + L.fmt(p.price) + '<small>' + L.fmt(L.pix(p.price)) + ' no Pix</small></p><button class="btn" type="button">Adicionar à sacola</button>';
      $('button', sb).addEventListener('click', buy);
      var buyBtn = $('[data-buy]', info);
      new IntersectionObserver(function (en) {
        var show = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
        sb.classList.toggle('is-on', show);
        document.body.classList.toggle('has-sticky', show);
      }).observe(buyBtn);
    }

    var shipF = $('[data-ship]', info);
    var cepIn = $('input', shipF);
    cepIn.addEventListener('input', function () {
      var v = cepIn.value.replace(/\D/g, '').slice(0, 8);
      cepIn.value = v.length > 5 ? v.slice(0, 5) + '-' + v.slice(5) : v;
    });
    shipF.addEventListener('submit', function (e) {
      e.preventDefault();
      if (cepIn.value.replace(/\D/g, '').length !== 8) { toast('Digite um CEP com 8 números', 'truck'); return; }
      var free = p.price >= L.FREE_SHIPPING;
      $('[data-ship-res]', info).innerHTML =
        '<li><span>Econômico · 6 a 9 dias úteis</span><b>' + (free ? 'Grátis' : L.fmt(19.9)) + '</b></li>' +
        '<li><span>Expresso · 2 a 4 dias úteis</span><b>' + L.fmt(free ? 24.9 : 34.9) + '</b></li>' +
        '<li><span>Retirar na loja · amanhã</span><b>Grátis</b></li>';
    });

    $('[data-complete]').innerHTML = related.concat(L.products.filter(function (x) { return x.id !== p.id && x.cat === p.cat; }).slice(0, 1)).slice(0, 4).map(function (x) { return L.card(x); }).join('');
    $('[data-similar]').innerHTML = L.products.filter(function (x) { return x.id !== p.id && x.cat === p.cat; }).concat(L.products.filter(function (x) { return x.cat !== p.cat; })).slice(0, 8).map(function (x) { return L.card(x); }).join('');
  }

  /* modal de medidas */
  var modal = $('[data-modal]');
  function closeModal() { if (modal && modal.classList.contains('is-open')) { modal.classList.remove('is-open'); scrim.classList.remove('is-on'); document.body.classList.remove('is-locked'); } }
  if (modal) {
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-modal-open]')) { modal.classList.add('is-open'); scrim.classList.add('is-on'); document.body.classList.add('is-locked'); $('.modal__close', modal).focus(); }
      else if (e.target.closest('[data-modal-close]') || (modal.classList.contains('is-open') && e.target === modal)) closeModal();
    });
    scrim.addEventListener('click', closeModal);
  }

  /* ---------- página de coleção ---------- */
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, '-'); }
  if (page === 'collection') renderCollection();
  function renderCollection() {
    var C = {
      novidades: { t: 'Novidades', e: 'Inverno 26', d: 'As peças que acabaram de chegar: alfaiataria fluida, tricôs e acessórios em tons de areia.', f: function (p) { return p.badge === 'Novo'; }, img: 'look-1' },
      roupas: { t: 'Roupas', e: 'Coleção', d: 'Peças-chave que conversam entre si para montar um guarda-roupa inteligente.', f: function (p) { return p.cat === 'roupas'; }, img: 'look-2' },
      acessorios: { t: 'Acessórios', e: 'Finalize o look', d: 'Bolsas, sapatos e dourados delicados para assinar cada produção.', f: function (p) { return p.cat === 'acessorios'; }, img: 'cat-bolsas' },
      sale: { t: 'Sale', e: 'Por tempo limitado', d: 'Peças selecionadas com até 20% off. Enquanto durar o estoque.', f: function (p) { return !!p.old; }, img: 'ed-cabana' }
    };
    var subs = {};
    L.products.forEach(function (p) { subs[slug(p.sub)] = p.sub; });
    var key = new URLSearchParams(location.search).get('c') || 'roupas';
    var conf = C[key];
    if (!conf && subs[key]) {
      var sub = subs[key];
      var any = L.products.filter(function (p) { return p.sub === sub; })[0];
      conf = { t: sub === 'Inverno' ? 'Gorros e cachecóis' : sub, e: any.cat === 'roupas' ? 'Roupas' : 'Acessórios', d: 'Uma seleção de ' + sub.toLowerCase() + ' pensada para durar e combinar com todo o resto.', f: function (p) { return p.sub === sub || (sub === 'Joias' && p.sub === 'Óculos'); }, img: any.img };
    }
    if (!conf) { key = 'roupas'; conf = C.roupas; }
    document.title = conf.t + ' · Lomode';
    $('[data-plp-title]').textContent = conf.t;
    $('[data-plp-desc]').textContent = conf.d;
    $('[data-plp-crumb]').textContent = conf.t;
    var hi = $('[data-plp-img]'); hi.src = L.IMG + conf.img + '.webp';
    var chipKeys = [['novidades', 'Novidades'], ['roupas', 'Roupas'], ['alfaiataria', 'Alfaiataria'], ['tricos', 'Tricôs'], ['camisaria', 'Camisaria'], ['calcas', 'Calças'], ['casacos', 'Casacos'], ['acessorios', 'Acessórios'], ['bolsas', 'Bolsas'], ['sapatos', 'Sapatos'], ['joias', 'Joias'], ['sale', 'Sale']];
    $('[data-plp-chips]').innerHTML = chipKeys.map(function (c) { return '<a href="colecao.html?c=' + c[0] + '"' + (c[0] === key ? ' class="is-active" aria-current="page"' : '') + '>' + c[1] + '</a>'; }).join('');

    var base = L.products.filter(conf.f);
    var state = { subs: [], sizes: [], colors: [], sort: 'rel' };
    var grid = $('[data-plp-grid]'), countEl = $('[data-plp-count]');

    var subList = {}, sizeList = [], colorList = {};
    base.forEach(function (p) {
      subList[p.sub] = (subList[p.sub] || 0) + 1;
      p.sizes.forEach(function (s) { if (sizeList.indexOf(s) < 0) sizeList.push(s); });
      p.colors.forEach(function (c) { colorList[c.n] = c.h; });
    });
    var f = $('[data-filters-body]');
    f.innerHTML =
      '<div class="fgroup"><p class="fgroup__title">Categoria</p>' + Object.keys(subList).map(function (s) { return '<label class="fcheck"><input type="checkbox" value="' + s + '" data-f-sub>' + s + '<small>' + subList[s] + '</small></label>'; }).join('') + '</div>' +
      '<div class="fgroup"><p class="fgroup__title">Tamanho</p><div class="fsizes">' + sizeList.map(function (s) { return '<button class="fsize" type="button" aria-pressed="false" data-f-size="' + s + '">' + s + '</button>'; }).join('') + '</div></div>' +
      '<div class="fgroup"><p class="fgroup__title">Cor</p><div class="fcolors">' + Object.keys(colorList).map(function (c) { return '<button class="fcolor" type="button" style="--c:' + colorList[c] + '" title="' + c + '" aria-label="' + c + '" aria-pressed="false" data-f-color="' + c + '"></button>'; }).join('') + '</div></div>' +
      '<button class="filters__clear" type="button" data-f-clear>Limpar filtros</button>';

    function apply() {
      var list = base.filter(function (p) {
        if (state.subs.length && state.subs.indexOf(p.sub) < 0) return false;
        if (state.sizes.length && !p.sizes.some(function (s) { return state.sizes.indexOf(s) > -1; })) return false;
        if (state.colors.length && !p.colors.some(function (c) { return state.colors.indexOf(c.n) > -1; })) return false;
        return true;
      });
      if (state.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === 'new') list.sort(function (a, b) { return (b.badge ? 1 : 0) - (a.badge ? 1 : 0); });
      countEl.textContent = list.length + (list.length === 1 ? ' produto' : ' produtos');
      grid.innerHTML = list.length ? list.map(function (p) { return L.card(p); }).join('') :
        '<div class="empty"><p>Nenhuma peça com esses filtros</p><button class="btn btn--ghost" type="button" data-f-clear>Limpar filtros</button></div>';
      paintWish();
    }
    document.addEventListener('change', function (e) {
      if (e.target.matches('[data-f-sub]')) { state.subs = $$('[data-f-sub]:checked').map(function (x) { return x.value; }); apply(); }
      if (e.target.matches('[data-sort]')) { state.sort = e.target.value; apply(); }
    });
    document.addEventListener('click', function (e) {
      var t;
      if ((t = e.target.closest('[data-f-size]'))) toggle(t, state.sizes, t.getAttribute('data-f-size'));
      else if ((t = e.target.closest('[data-f-color]'))) toggle(t, state.colors, t.getAttribute('data-f-color'));
      else if (e.target.closest('[data-f-clear]')) {
        state.subs = []; state.sizes = []; state.colors = [];
        $$('[data-f-sub]').forEach(function (x) { x.checked = false; });
        $$('[data-f-size],[data-f-color]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        apply();
      } else if (e.target.closest('[data-filters-toggle]')) {
        if (mqMobile.matches) open($('.filters'));
        else { var plp = $('.plp'); plp.classList.toggle('is-collapsed'); e.target.closest('[data-filters-toggle]').querySelector('span').textContent = plp.classList.contains('is-collapsed') ? 'Mostrar filtros' : 'Ocultar filtros'; }
      }
    });
    function toggle(btn, arr, v) {
      var i = arr.indexOf(v); if (i > -1) arr.splice(i, 1); else arr.push(v);
      btn.setAttribute('aria-pressed', i < 0); apply();
    }
    apply();
  }

  /* ---------- revelação ao rolar ---------- */
  var rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('is-in'); });
  /* garantia: nada fica invisível se o observador falhar */
  setTimeout(function () { rv.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); }); }, 1500);

  renderCart();
  paintWish();
})();
