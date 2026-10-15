export function initHeroMotion() {
  const scene = document.querySelector('.stage-backdrop__image');
  const intro = document.querySelector('.intro');
  if (!scene || !intro) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  function sync() {
    scene.classList.toggle('is-drifting', !reduce.matches);
    // Freeze the existing frame offscreen instead of snapping the global image back.
    scene.classList.toggle('is-paused', !visible || document.hidden);
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(intro);
  reduce.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}
