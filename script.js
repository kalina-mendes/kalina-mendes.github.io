/* k4l1.com | interações (Vanilla JS, sem dependências) */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMenu();
    initReveal();
    initActiveLinks();
    initCopy();
    initWhoami();
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  });

  /* Cabeçalho ganha fundo ao rolar */
  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-solid', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* Menu do celular */
  function initMenu() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    const header = document.querySelector('[data-header]');
    const label = document.querySelector('[data-nav-label]');
    if (!toggle || !nav || !header) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !header.contains(e.target)) setOpen(false);
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', (mq) => { if (mq.matches) setOpen(false); });
  }

  /* Revelação discreta ao rolar */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach((el) => io.observe(el));
  }

  /* Destaca no menu a seção visível */
  function initActiveLinks() {
    const links = document.querySelectorAll('.nav-list a[href^="#"]');
    if (!('IntersectionObserver' in window) || !links.length) return;
    const map = new Map();
    links.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) map.set(section, link);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
        const link = map.get(entry.target);
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, section) => io.observe(section));
  }

  /* whoami: digita "Hello, World!", apaga e responde k4l1 */
  function initWhoami() {
    const el = document.querySelector('[data-typed]');
    if (!el || reduceMotion.matches) return;
    const hello = 'Hello, World!';
    const answer = el.textContent;
    const steps = [];
    let t = 500;
    for (let i = 1; i <= hello.length; i++) { steps.push([t, hello.slice(0, i)]); t += 75; }
    t += 900;
    for (let i = hello.length - 1; i >= 0; i--) { steps.push([t, hello.slice(0, i)]); t += 35; }
    t += 250;
    for (let i = 1; i <= answer.length; i++) { steps.push([t, answer.slice(0, i)]); t += 120; }
    el.textContent = '';
    steps.forEach(([delay, text]) => setTimeout(() => { el.textContent = text; }, delay));
  }

  /* Copiar e-mail, com retorno anunciado para leitores de tela */
  function initCopy() {
    const button = document.querySelector('[data-copy]');
    const feedback = document.querySelector('[data-copy-feedback]');
    if (!button || !feedback) return;
    const value = button.dataset.copy;
    let timer;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(value);
        feedback.textContent = 'E-mail copiado.';
      } catch {
        feedback.textContent = 'Não foi possível copiar. O endereço é ' + value;
      }
      clearTimeout(timer);
      timer = setTimeout(() => { feedback.textContent = ''; }, 4000);
    });
  }
})();
