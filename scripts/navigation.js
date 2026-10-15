export function initNavigation() {
  const header = document.querySelector('.masthead');
  const toggle = header?.querySelector('[aria-controls="nav"]');
  const nav = document.getElementById('nav');
  if (!header || !toggle || !nav) return;
  const mobile = window.matchMedia('(max-width: 900px)');
  const links = [...nav.querySelectorAll('a')];
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  function setOpen(open, returnFocus = false) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('data-i18n-aria', open ? 'navClose' : 'navMenu');
    toggle.setAttribute('aria-label', window.I18n.t(open ? 'navClose' : 'navMenu'));
    nav.inert = mobile.matches && !open;
    if (open && mobile.matches) links[0]?.focus();
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && isOpen()) setOpen(false, true);
  });
  document.addEventListener('pointerdown', event => {
    if (mobile.matches && isOpen() && !header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('focusin', event => {
    if (mobile.matches && isOpen() && !header.contains(event.target)) setOpen(false);
  });
  links.forEach(link => link.addEventListener('click', () => {
    if (mobile.matches) setOpen(false, true);
  }));
  mobile.addEventListener('change', () => setOpen(false));
  setOpen(false);
  const sections = links.map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean).sort((a, b) => a.offsetTop - b.offsetTop);
  const updateCurrent = () => {
    const threshold = header.getBoundingClientRect().height + 100;
    const current = sections.filter(section => section.getBoundingClientRect().top <= threshold).at(-1);
    links.forEach(link => {
      if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { updateCurrent(); queued = false; });
  }, { passive: true });
  updateCurrent();
}
