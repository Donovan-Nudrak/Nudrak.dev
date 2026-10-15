import { sectionTranslations } from './sections-content.js';

export function initSections() {
  window.I18n?.register(sectionTranslations);

  const flow = document.querySelector('[data-method-flow]');
  if (!flow || flow.dataset.initialized === 'true') return;
  flow.dataset.initialized = 'true';
  const steps = [...flow.querySelectorAll('[data-method-step]')];

  function setExpanded(step, expanded) {
    step.setAttribute('aria-expanded', String(expanded));
    const panel = document.getElementById(step.getAttribute('aria-controls'));
    if (panel) panel.hidden = !expanded;
    const hint = step.querySelector('[data-method-hint]');
    if (hint) {
      const key = expanded ? 'methodClose' : 'methodOpen';
      hint.dataset.i18n = key;
      hint.textContent = window.I18n?.t(key) || (expanded ? 'Close stage' : 'View stage');
    }
  }

  steps.forEach((step) => {
    setExpanded(step, false);
    step.addEventListener('click', () => {
      const shouldOpen = step.getAttribute('aria-expanded') !== 'true';
      steps.forEach((other) => setExpanded(other, other === step && shouldOpen));
      // Closing an earlier mobile panel can move this step above the sticky header.
      if (shouldOpen) {
        const top = (document.querySelector('.masthead')?.getBoundingClientRect().height || 0) + 32;
        const bounds = step.getBoundingClientRect();
        if (bounds.top < top || bounds.bottom > innerHeight - 20) {
          window.scrollBy({
            top:bounds.top - top,
            behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
          });
        }
      }
    });
  });
}
