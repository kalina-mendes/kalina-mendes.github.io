/* k4l1.com | interações (Vanilla JS, sem dependências) */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Recado para quem abre o console (F12) */
  const mono = 'font-family: monospace; font-size: 13px; color: #B69CFF;';
  console.log(
    '%c> acesso concedido.\n> usuário detectado: curioso(a)\n> nível de permissão: somente leitura\n%cSe você chegou até aqui, a gente tem muito em comum.\nk4l1x@proton.me\n\npista: a senha começa onde tudo começa. 3 = e, 0 = o.',
    mono,
    'font-family: monospace; font-size: 13px; color: inherit;'
  );

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMenu();
    initReveal();
    initActiveLinks();
    initCopy();
    initWhoami();
    initTerminal();
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

  /* Mini terminal: comandos, arquivo oculto, flag protegida por senha e sudo */
  function initTerminal() {
    const dialog = document.getElementById('terminal');
    const opener = document.querySelector('[data-terminal-open]');
    if (!dialog || !opener || typeof dialog.showModal !== 'function') {
      if (opener) opener.disabled = true;
      return;
    }
    const output = document.getElementById('terminal-saida');
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-entrada');
    const promptLabel = document.getElementById('terminal-prompt');
    const closeBtn = document.getElementById('terminal-fechar');

    const PROMPT = 'k4l1@site:~$';
    const SENHA = 'h3ll0w0rld';
    let mode = 'cmd';            // 'cmd', 'senha-flag' ou 'senha-sudo'
    let sudoAvisado = false;
    const historico = [];
    let posHistorico = 0;

    // Sempre textContent: o que o visitante digita nunca vira HTML
    const print = (text, cls = 't-muted') => {
      const line = document.createElement('p');
      line.className = cls;
      line.textContent = text || '\u00a0';
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    };

    const setMode = (novo, rotulo) => {
      mode = novo;
      promptLabel.textContent = rotulo;
      input.classList.toggle('is-secret', novo !== 'cmd');
    };

    const boasVindas = () => {
      print('Conexão estabelecida com k4l1.com.');
      print('Nem tudo aqui está à vista. Investigue -a fundo.');
      print('Digite help para começar.');
      print('');
    };

    const abrir = () => {
      if (!output.childElementCount) boasVindas();
      dialog.showModal();
      input.focus();
    };

    const fechar = () => {
      dialog.close();
    };

    dialog.addEventListener('close', () => {
      output.textContent = '';
      input.value = '';
      setMode('cmd', PROMPT);
      opener.focus();
    });

    const dataAtual = () => {
      const d = new Date();
      const p = (o) => new Intl.DateTimeFormat('pt-BR', o).format(d).replace('.', '');
      return [p({ weekday: 'short' }), p({ day: '2-digit' }), p({ month: 'short' }), p({ year: 'numeric' }),
        new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d)].join(' ');
    };

    const comandos = {
      help: () => {
        print('Comandos disponíveis:');
        [
          ['ls', 'lista os arquivos'],
          ['cat', 'mostra o conteúdo de um arquivo'],
          ['date', 'mostra a data e a hora'],
          ['sudo', 'executa um comando como administrador'],
          ['clear', 'limpa a tela'],
          ['exit', 'fecha o terminal'],
          ['help', 'mostra esta ajuda (que você já está vendo)']
        ].forEach(([c, d]) => print('  ' + c.padEnd(9) + d));
      },
      ls: (args) => {
        const ocultos = args.some((a) => /^-[a-z]*a[a-z]*$/.test(a));
        print(ocultos ? '.dica   flag.txt' : 'flag.txt', 't-cmd');
      },
      cat: (args) => {
        const arquivo = args[0];
        if (!arquivo) return print('cat: falta o nome do arquivo');
        if (arquivo === '.dica') return print('Os curiosos sempre inspecionam. Experimente o F12.', 't-cmd');
        if (arquivo === 'flag.txt') return setMode('senha-flag', 'Arquivo protegido. Senha:');
        print('cat: ' + arquivo + ': arquivo ou diretório não encontrado');
      },
      date: () => print(dataAtual(), 't-cmd'),
      whoami: () => print('visitante', 't-cmd'),
      sudo: () => {
        if (!sudoAvisado) {
          sudoAvisado = true;
          print('');
          print('Acreditamos que você recebeu o sermão habitual do administrador do sistema.');
          print('Normalmente, ele se resume a estas três coisas:');
          print('');
          print('  #1) Respeite a privacidade dos outros.');
          print('  #2) Pense antes de digitar.');
          print('  #3) Com grande poder vem grande responsabilidade.');
          print('');
        }
        setMode('senha-sudo', '[sudo] senha para visitante:');
      },
      clear: () => { output.textContent = ''; },
      exit: () => {
        print('logout');
        input.disabled = true;
        setTimeout(() => { input.disabled = false; fechar(); }, 450);
      }
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valor = input.value;
      input.value = '';

      if (mode === 'senha-flag') {
        print(promptLabel.textContent, 't-accent');
        setMode('cmd', PROMPT);
        if (valor === SENHA) {
          print('flag{k4l1_curiosidade_desbloqueada}', 't-accent');
          print('Parabéns! Você encontrou a flag.', 't-cmd');
          print('Me manda um print em k4l1x@proton.me que eu quero saber quem chegou até aqui.', 't-cmd');
        } else {
          print('Acesso negado. Tente olhar onde os curiosos olham.');
        }
        return;
      }

      if (mode === 'senha-sudo') {
        print(promptLabel.textContent, 't-accent');
        setMode('cmd', PROMPT);
        print('visitante não está no arquivo sudoers. Este incidente será relatado.');
        return;
      }

      print(PROMPT + ' ' + valor, 't-cmd');
      const partes = valor.trim().split(/\s+/).filter(Boolean);
      if (!partes.length) return;
      historico.push(valor.trim());
      posHistorico = historico.length;

      const [nome, ...args] = partes;
      const acao = Object.prototype.hasOwnProperty.call(comandos, nome) ? comandos[nome] : null;
      if (acao) {
        acao(args);
      } else {
        print('bash: ' + nome + ': comando não encontrado. Ainda não aprendi esse.');
        print('Digite help para ver os comandos disponíveis.');
      }
    });

    // Setas para cima e para baixo navegam pelos comandos já digitados
    input.addEventListener('keydown', (e) => {
      if (mode !== 'cmd' || !historico.length) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        posHistorico = Math.max(0, posHistorico - 1);
        input.value = historico[posHistorico];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        posHistorico = Math.min(historico.length, posHistorico + 1);
        input.value = historico[posHistorico] || '';
      }
    });

    opener.addEventListener('click', abrir);
    closeBtn.addEventListener('click', fechar);
    output.addEventListener('click', () => input.focus());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) fechar(); });
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
