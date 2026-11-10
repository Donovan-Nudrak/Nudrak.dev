import { initHeroMotion } from './hero-motion.js';
import { initProjects } from './projects.js';
import { initSections } from './sections.js';

// Each section shares the existing language and inquiry controllers.
initProjects();
initSections();
initHeroMotion();
document.documentElement.classList.add('stage-ready');

// A failed optional effects module must not prevent navigation or reading the catalogue.
import('./service-effects.js').then(({ initServiceEffects }) => initServiceEffects()).catch(() => {});
