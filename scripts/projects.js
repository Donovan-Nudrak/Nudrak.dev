import { projectTranslations } from './projects-content.js';

// Project cards are static HTML. JavaScript adds filtering and native modal dialogs.
export function initProjects() {
  const section = document.querySelector('.work-showcase');
  if (!section || section.dataset.projectsReady) return;
  section.dataset.projectsReady = 'true';
  window.I18n?.register(projectTranslations);

  const cards = [...section.querySelectorAll('[data-project-category]')];
  const filters = [...section.querySelectorAll('[data-project-filter]')];
  const counter = section.querySelector('[data-project-count]');
  const dialogs = [...section.querySelectorAll('[data-project-dialog]')];
  const dialogById = new Map(dialogs.map(dialog => [dialog.dataset.projectDialog, dialog]));
  const openers = new WeakMap();

  function updateCount() {
    const count = cards.filter(card => !card.hidden).length;
    const template = window.I18n?.t('pjCount') || '{count} projects';
    counter.textContent = template.replace('{count}', count);
  }

  function applyFilter(value) {
    cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.projectCategory !== value; });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.projectFilter === value)));
    updateCount();
  }

  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.projectFilter)));
  document.addEventListener('languagechange', updateCount);

  function openProject(id, opener) {
    const dialog = dialogById.get(id);
    if (!dialog || dialog.open) return;
    dialogs.forEach(other => { if (other.open) other.close(); });
    openers.set(dialog, opener || document.activeElement);
    dialog.showModal();
    document.body.classList.add('project-dialog-open');
    dialog.scrollTop = 0;
    dialog.querySelector('[data-project-close]').focus({ preventScroll:true });
  }

  dialogs.forEach(dialog => {
    dialog.querySelector('[data-project-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter(element => !element.closest('[inert]') && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    // Keep Escape native; the boundary-only Tab loop also avoids focus moving to browser chrome.
    dialog.addEventListener('close', () => {
      if (!dialogs.some(item => item.open)) document.body.classList.remove('project-dialog-open');
      const opener = openers.get(dialog);
      if (opener?.isConnected) opener.focus({ preventScroll:true });
    });
  });

  // Technical-profile links share the same detail views instead of duplicating their content.
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project-open], a[href^="#project-"]');
    if (!trigger || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
    const id = trigger.dataset.projectOpen || trigger.getAttribute('href')?.slice('#project-'.length);
    if (!dialogById.has(id)) return;
    event.preventDefault();
    openProject(id, trigger);
  });

  function openHash() {
    if (!location.hash.startsWith('#project-')) return;
    const id = location.hash.slice('#project-'.length);
    const card = document.getElementById(`project-${id}`);
    if (!card || !dialogById.has(id)) return;
    if (card.hidden) applyFilter('all');
    openProject(id, card.querySelector('[data-project-open]'));
  }

  window.addEventListener('hashchange', openHash);
  updateCount();
  openHash();
}
