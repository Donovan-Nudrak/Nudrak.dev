function initNavigation() {
  const header = document.querySelector('.masthead');
  const toggle = header?.querySelector('[aria-controls="nav"]');
  const nav = document.getElementById('nav');
  if (!header || !toggle || !nav) return;
  const mobile = window.matchMedia('(max-width: 900px)');
  const links = [...nav.querySelectorAll('a')];
  const isOpen = () => nav.matches(':popover-open');
  function syncLabel() {
    const open = isOpen();
    toggle.setAttribute('data-i18n-aria', open ? 'navClose' : 'navMenu');
    if (window.I18n?.t) toggle.setAttribute('aria-label', window.I18n.t(open ? 'navClose' : 'navMenu'));
  }
  function close(returnFocus = false) {
    if (isOpen()) nav.hidePopover();
    if (returnFocus) toggle.focus({ preventScroll: true });
  }
  // HTML owns disclosure, Escape and light dismiss, including before this module loads.
  // Do not duplicate the browser's expanded state with aria-expanded or another flag.
  nav.addEventListener('toggle', () => {
    syncLabel();
    if (isOpen() && mobile.matches) links[0]?.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && isOpen()) close(true);
  });
  document.addEventListener('focusin', event => {
    if (mobile.matches && isOpen() && !header.contains(event.target)) close();
  });
  links.forEach(link => link.addEventListener('click', () => {
    if (mobile.matches) close(true);
  }));
  mobile.addEventListener('change', () => {
    const focusInNav = nav.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    close();
    if (mobile.matches && focusInNav) toggle.focus({ preventScroll: true });
    if (!mobile.matches && (focusOnToggle || document.activeElement === toggle)) links[0]?.focus({ preventScroll: true });
  });
  syncLabel();
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

initNavigation();
