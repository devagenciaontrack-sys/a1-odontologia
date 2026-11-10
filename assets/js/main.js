(() => {
  const root = document.documentElement;
  const body = document.body;

  // Header com sombra ao rolar
  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const burger = document.querySelector('.burger');
  const backdrop = document.querySelector('.nav-backdrop');
  const closeNav = () => { body.classList.remove('nav-open'); burger && burger.setAttribute('aria-expanded', 'false'); };
  burger && burger.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  backdrop && backdrop.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });

  // Dropdown de tratamentos (clique / toque)
  document.querySelectorAll('.nav__item > button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav__item.is-open').forEach((item) => {
      if (!item.contains(e.target) && window.innerWidth > 980) {
        item.classList.remove('is-open');
        item.querySelector('button').setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Animações de entrada
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // Formulário de agendamento -> WhatsApp
  const form = document.querySelector('[data-whatsapp-form]');
  if (form) {
    const params = new URLSearchParams(location.search);
    const pre = params.get('tratamento');
    if (pre) {
      const sel = form.querySelector('select[name="tratamento"]');
      if (sel && [...sel.options].some((o) => o.value === pre)) sel.value = pre;
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [
        'Olá! Gostaria de agendar uma consulta na A1 Odontologia.',
        '',
        `*Nome:* ${data.get('nome') || '-'}`,
        `*Telefone:* ${data.get('telefone') || '-'}`,
        `*Tratamento de interesse:* ${data.get('tratamento') || '-'}`,
        `*Melhor período:* ${data.get('periodo') || '-'}`,
      ];
      const msg = (data.get('mensagem') || '').trim();
      if (msg) lines.push(`*Mensagem:* ${msg}`);
      const url = `https://wa.me/${form.dataset.whatsappForm}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });

    // Máscara simples de telefone
    const tel = form.querySelector('input[name="telefone"]');
    tel && tel.addEventListener('input', () => {
      const d = tel.value.replace(/\D/g, '').slice(0, 11);
      let out = d;
      if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
      tel.value = out;
    });
  }

  // Ano no rodapé
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  root.classList.add('js');
})();
