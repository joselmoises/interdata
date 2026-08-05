/* =========================================================
   INTERDATA — main.js
   Sem dependências externas. Vanilla JS.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Menu móvel ---------- */
  var burger  = document.querySelector('.burger');
  var mobile  = document.querySelector('.mobile-nav');
  var overlay = document.querySelector('.overlay');
  var closeBt = document.querySelector('.mobile-nav__close');

  function setMenu(open) {
    if (!mobile) return;
    mobile.classList.toggle('is-open', open);
    if (overlay) overlay.classList.toggle('is-open', open);
    if (burger) burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = mobile.querySelector('a, button');
      if (first) first.focus();
    } else if (burger) {
      burger.focus();
    }
  }

  if (burger) burger.addEventListener('click', function () {
    setMenu(!mobile.classList.contains('is-open'));
  });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  if (closeBt) closeBt.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobile && mobile.classList.contains('is-open')) setMenu(false);
  });
  if (mobile) {
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  /* ---------- Sombra do cabeçalho ao rolar ---------- */
  var header = document.querySelector('.header');
  var toTop  = document.querySelector('.to-top');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop)  toTop.classList.toggle('is-visible', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Animação de entrada ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(function () { el.classList.add('is-in'); }, delay);
          io.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- Contadores ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        cIo.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cIo.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
  }

  function animate(el) {
    var target   = parseFloat(el.dataset.count) || 0;
    var suffix   = el.dataset.suffix || '';
    var duration = 1600;
    var start    = null;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Carrossel de testemunhos ---------- */
  var track = document.querySelector('[data-carousel]');
  if (track) {
    var prev = document.querySelector('[data-carousel-prev]');
    var next = document.querySelector('[data-carousel-next]');
    var step = function () {
      var card = track.querySelector(':scope > *');
      return card ? card.getBoundingClientRect().width + 24 : 340;
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left:  step(), behavior: 'smooth' }); });
  }

  /* ---------- Formulário de contacto → WhatsApp ---------- */
  var form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var linhas = [
        'Novo pedido via site interdata.co.mz',
        '',
        'Nome: '     + (data.get('nome')     || '-'),
        'Empresa: '  + (data.get('empresa')  || '-'),
        'Email: '    + (data.get('email')    || '-'),
        'Telefone: ' + (data.get('telefone') || '-'),
        'Serviço: '  + (data.get('servico')  || '-'),
        '',
        'Mensagem:',
        (data.get('mensagem') || '-')
      ];
      var url = 'https://wa.me/258866610649?text=' + encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');

      var ok = form.querySelector('[data-form-status]');
      if (ok) {
        ok.hidden = false;
        ok.textContent = 'Obrigado! Vamos abrir o WhatsApp com a sua mensagem pronta a enviar.';
      }
      form.reset();
    });
  }

  /* ---------- Ano corrente no rodapé ---------- */
  var yearEls = document.querySelectorAll('[data-year]');
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });
})();
