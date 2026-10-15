// Optional decoration for the ten catalogue cards. Inquiry actions stay in inquiry.js.
export function initServiceEffects() {
  const section = document.querySelector('.service-hub');
  if (!section || section.dataset.effectsReady || !window.IntersectionObserver || !window.ResizeObserver) return;
  const cards = [...section.querySelectorAll('.offer-card')];
  if (!cards.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  const settings = getComputedStyle(section);
  const number = (name, fallback) => {
    const value = parseFloat(settings.getPropertyValue(name));
    return Number.isFinite(value) ? value : fallback;
  };
  const milliseconds = (name, fallback) => {
    const value = settings.getPropertyValue(name).trim();
    return number(name, fallback) * (value.endsWith('s') && !value.endsWith('ms') ? 1000 : 1);
  };
  const config = {
    entry: milliseconds('--offer-entry-duration', 420),
    sweep: milliseconds('--offer-sweep-duration', 650),
    stagger: milliseconds('--offer-entry-stagger', 55),
    maxDelay: milliseconds('--offer-entry-max-delay', 110),
    pulse: milliseconds('--offer-pulse-duration', 420),
    radius: number('--offer-edge-radius', 210),
    follow: Math.max(1, milliseconds('--offer-follow-time', 75)),
    settle: number('--offer-follow-settle', .3),
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  const states = new Map();
  let frame = 0;
  let lastFrame = 0;

  function svgNode(name, attributes = {}) {
    const node = document.createElementNS(svgNS, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  }

  function setLight(state, x, y) {
    state.x = x;
    state.y = y;
    state.card.style.setProperty('--offer-light-x', `${x.toFixed(2)}px`);
    state.card.style.setProperty('--offer-light-y', `${y.toFixed(2)}px`);
    state.gradient.setAttribute('cx', x.toFixed(2));
    state.gradient.setAttribute('cy', y.toFixed(2));
  }

  function updateGeometry(state) {
    const style = getComputedStyle(state.card);
    const cut = corner => parseFloat(style.getPropertyValue(`--panel-${corner}`)) || 0;
    const width = state.card.offsetWidth;
    const height = state.card.offsetHeight;
    state.width = width;
    state.height = height;
    state.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    // Same pixel cuts as angular-surfaces.css; a half-pixel inset holds the stroke inside.
    const d = `M${cut('tl')} .5H${width - cut('tr')}L${width - .5} ${cut('tr')}V${height - cut('br')}L${width - cut('br')} ${height - .5}H${cut('bl')}L.5 ${height - cut('bl')}V${cut('tl')}Z`;
    state.paths.forEach(path => path.setAttribute('d', d));
    if (!state.tracking) setLight(state, width / 2, height / 2);
  }

  function canTrack(state) {
    return state.visible && state.tracking && mouse.matches && !reduce.matches && !document.hidden;
  }

  function followPointer(now) {
    frame = 0;
    const elapsed = lastFrame ? Math.min(now - lastFrame, 48) : 16;
    lastFrame = now;
    const blend = 1 - Math.exp(-elapsed / config.follow);
    let pending = false;
    for (const state of states.values()) {
      if (!canTrack(state)) continue;
      const dx = state.targetX - state.x;
      const dy = state.targetY - state.y;
      if (Math.abs(dx) + Math.abs(dy) <= config.settle) {
        setLight(state, state.targetX, state.targetY);
      } else {
        setLight(state, state.x + dx * blend, state.y + dy * blend);
        pending = true;
      }
    }
    if (pending) frame = requestAnimationFrame(followPointer);
    else lastFrame = 0;
  }

  function requestFollow() {
    if (!frame) frame = requestAnimationFrame(followPointer);
  }

  function finishEntry(state) {
    clearTimeout(state.entryTimer);
    state.card.classList.remove('is-entering');
  }

  function finishPulse(state) {
    clearTimeout(state.pulseTimer);
    state.button?.classList.remove('is-pulsing');
  }

  function stopTracking(state) {
    state.tracking = false;
    state.card.classList.remove('is-pointer-lit');
    if (state.card.contains(document.activeElement)) setLight(state, state.width / 2, state.height / 2);
    if (![...states.values()].some(canTrack)) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    }
  }

  function enter(state, delay) {
    if (state.seen || document.hidden) return;
    state.seen = true;
    if (reduce.matches || state.card.contains(document.activeElement)) return;
    state.card.style.setProperty('--offer-entry-delay', `${delay}ms`);
    state.card.classList.add('is-entering');
    state.entryTimer = setTimeout(() => finishEntry(state), Math.max(config.entry, config.sweep) + delay + 40);
  }

  const visibility = new IntersectionObserver(entries => {
    const entering = [];
    for (const entry of entries) {
      const state = states.get(entry.target);
      state.visible = entry.isIntersecting;
      if (state.visible) entering.push(state);
      else {
        finishEntry(state);
        finishPulse(state);
        stopTracking(state);
      }
    }
    entering.filter(state => !state.seen).sort((a, b) => a.index - b.index)
      .forEach((state, index) => enter(state, Math.min(index * config.stagger, config.maxDelay)));
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  const resize = new ResizeObserver(entries => {
    entries.forEach(entry => updateGeometry(states.get(entry.target)));
  });

  cards.forEach((card, index) => {
    const light = document.createElement('span');
    light.className = 'offer-light';
    light.setAttribute('aria-hidden', 'true');
    const svg = svgNode('svg', { class: 'offer-contour', 'aria-hidden': 'true', focusable: 'false' });
    const defs = svgNode('defs');
    const gradientId = `offer-neon-local-${index}`;
    const sweepId = `offer-neon-sweep-${index}`;
    const gradient = svgNode('radialGradient', { id: gradientId, gradientUnits: 'userSpaceOnUse', r: config.radius });
    gradient.append(svgNode('stop', { offset: 0, 'stop-color': '#f7fafc', 'stop-opacity': .92 }),
      svgNode('stop', { offset: .22, 'stop-color': '#00e5ff', 'stop-opacity': .85 }),
      svgNode('stop', { offset: 1, 'stop-color': '#00e5ff', 'stop-opacity': 0 }));
    const sweep = svgNode('linearGradient', { id: sweepId, x1: 0, y1: 0, x2: 1, y2: 1 });
    sweep.append(svgNode('stop', { offset: 0, 'stop-color': '#00e5ff' }),
      svgNode('stop', { offset: .5, 'stop-color': '#f7fafc' }),
      svgNode('stop', { offset: 1, 'stop-color': '#00e5ff' }));
    defs.append(gradient, sweep);
    const edge = svgNode('path', { class: 'offer-contour__edge', fill: 'none' });
    const local = svgNode('path', { class: 'offer-contour__local', fill: 'none', stroke: `url(#${gradientId})` });
    const scan = svgNode('path', { class: 'offer-contour__sweep', fill: 'none', stroke: `url(#${sweepId})`, pathLength: 1000 });
    svg.append(defs, edge, local, scan);
    card.append(light, svg);
    const button = card.querySelector('.offer-card__button');
    const state = { card, button, svg, gradient, paths: [edge, local, scan], index,
      visible: false, seen: reduce.matches, tracking: false, x: 0, y: 0, targetX: 0, targetY: 0, lastPress: -Infinity };
    states.set(card, state);
    card.classList.add('offer-card--effects');
    updateGeometry(state);
    visibility.observe(card);
    resize.observe(card);

    const pointer = event => {
      if (event.pointerType !== 'mouse' || !mouse.matches || reduce.matches || document.hidden || !state.visible) return;
      const rect = card.getBoundingClientRect();
      state.targetX = Math.max(0, Math.min(state.width, event.clientX - rect.left));
      state.targetY = Math.max(0, Math.min(state.height, event.clientY - rect.top));
      if (!state.tracking) setLight(state, state.targetX, state.targetY);
      state.tracking = true;
      card.classList.add('is-pointer-lit');
      requestFollow();
    };
    card.addEventListener('pointerenter', pointer, { passive: true });
    card.addEventListener('pointermove', pointer, { passive: true });
    card.addEventListener('pointerleave', () => stopTracking(state), { passive: true });
    card.addEventListener('pointercancel', () => stopTracking(state), { passive: true });
    card.addEventListener('focusin', () => {
      state.seen = true;
      finishEntry(state);
      if (!state.tracking) setLight(state, state.width / 2, state.height / 2);
    });

    if (button) {
      const pulseLight = document.createElement('span');
      pulseLight.className = 'offer-button-light';
      pulseLight.setAttribute('aria-hidden', 'true');
      button.append(pulseLight);
      button.classList.add('offer-card__button--effects');
      const pulse = event => {
        if (reduce.matches || document.hidden || !state.visible) return;
        const rect = button.getBoundingClientRect();
        const contact = event.type === 'pointerdown' || event.detail > 0;
        button.style.setProperty('--offer-pulse-x', `${contact ? event.clientX - rect.left : rect.width / 2}px`);
        button.style.setProperty('--offer-pulse-y', `${contact ? event.clientY - rect.top : rect.height / 2}px`);
        finishPulse(state);
        // Restart only on activation, never in the pointer-tracking loop.
        void pulseLight.offsetWidth;
        button.classList.add('is-pulsing');
        state.pulseTimer = setTimeout(() => finishPulse(state), config.pulse + 40);
      };
      button.addEventListener('pointerdown', event => {
        if (event.button !== 0 || !event.isPrimary || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        state.lastPress = performance.now();
        pulse(event);
      }, { passive: true });
      button.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (event.detail === 0 || performance.now() - state.lastPress > 700) pulse(event);
        // No preventDefault or delay: the existing inquiry listener acts immediately.
      });
    }
  });

  function suspend() {
    for (const state of states.values()) {
      stopTracking(state);
      if (reduce.matches || document.hidden) {
        finishEntry(state);
        finishPulse(state);
      }
      if (reduce.matches) state.seen = true;
    }
  }
  reduce.addEventListener('change', suspend);
  mouse.addEventListener('change', suspend);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) suspend();
    else for (const state of states.values()) if (state.visible) enter(state, 0);
  });
  section.dataset.effectsReady = 'true';
}
