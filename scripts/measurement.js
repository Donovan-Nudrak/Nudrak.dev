(function () {
  const form = document.getElementById('inquiry');
  if (!form) return;

  // Only catalogue identifiers may leave the page. Never serialize the form or a URL.
  const services = new Set(['guidance', 'web', 'portfolio', 'campaign', 'catalog', 'content',
    'store', 'booking', 'management', 'automation', 'improvements', 'design', 'frontend',
    'backend', 'fullstack', 'feature', 'integration', 'existing', 'collaboration']);
  const audiences = new Set(['direct', 'agency', 'collaboration', 'other']);
  const categories = new Set(['network', 'timeout', 'rate_limit', 'provider', 'verification']);
  let source = 'direct';
  let started = false;

  function context(service, audience, origin = source) {
    const data = { source: origin, language: document.documentElement.lang === 'es' ? 'es' : 'en' };
    if (services.has(service)) data.service = service;
    if (audiences.has(audience)) data.audience = audience;
    return data;
  }

  function snapshot() {
    return context(document.getElementById('inquiry-service').value,
      document.getElementById('inquiry-audience').value);
  }

  function track(name, data) {
    try {
      // Dropping unavailable telemetry is intentional; no retries or navigation delays.
      const result = window.umami?.track(name, data);
      Promise.resolve(result).catch(() => {});
    } catch (_) {
      // Measurement must never affect navigation, validation or submission.
    }
  }

  function originFor(trigger) {
    if (trigger.closest('#hero')) return 'hero';
    if (trigger.closest('#contact')) return 'contact';
    if (trigger.closest('#inquiry')) return 'inquiry';
    if (trigger.closest('#services-modes')) return 'mode';
    if (trigger.dataset.inquiryAudience === 'collaboration') return 'collaboration';
    return 'service';
  }

  // A single native click path covers pointer and keyboard activation, including SVG children.
  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('a[href="#inquiry"], a[href^="mailto:"]');
    if (!trigger || event.button > 0) return;
    const origin = originFor(trigger);
    if (trigger.matches('a[href="#inquiry"]') && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      source = origin;
    }
    track('cta_click', context(trigger.dataset.inquiryService, trigger.dataset.inquiryAudience, origin));
  }, true);

  function start(event) {
    if (started || !event.isTrusted || !event.target.matches('#inquiry-name, #inquiry-email, #inquiry-audience, #inquiry-service, #inquiry-message')) return;
    started = true;
    track('inquiry_start', snapshot());
  }
  form.addEventListener('input', start);
  form.addEventListener('change', start);

  window.InquiryMeasurement = {
    attempt() {
      // Capture before disabling/resetting controls or changing the UI language in flight.
      const data = snapshot();
      let finished = false;
      return function (category) {
        if (finished || (category !== undefined && !categories.has(category))) return;
        finished = true;
        track(category ? 'inquiry_error' : 'inquiry_success', category ? { ...data, category } : data);
      };
    },
  };
})();
