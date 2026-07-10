(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".header__link, .header__logo, .hero__cta");

  const PRESSABLE_SELECTOR = ".lang-switch__btn, .header__toggle, a.hero__cta, button[data-copy]";
  const TV_STATIC_MS = 320;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeNav() {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      closeNav();
    });
  });

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    const feedback = button.querySelector("[data-copy-feedback]");

    button.addEventListener("click", function () {
      const value = button.getAttribute("data-copy");
      if (!value) return;

      function onCopied() {
        button.classList.add("is-copied");
        if (feedback) {
          feedback.textContent = window.I18n ? window.I18n.t("contactCopyDone") : "Copied ✓";
        }
        setTimeout(function () {
          button.classList.remove("is-copied");
          if (feedback) {
            feedback.textContent = window.I18n ? window.I18n.t("contactCopyHint") : "Click to copy";
          }
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(onCopied).catch(function () {
          fallbackCopy(value, onCopied);
        });
      } else {
        fallbackCopy(value, onCopied);
      }
    });
  });

  function fallbackCopy(text, callback) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    callback();
  }

  function triggerTvStatic(button) {
    if (prefersReducedMotion) return;

    button.classList.remove("is-tv-static");
    button.querySelectorAll(".tv-static-burst").forEach(function (layer) {
      layer.remove();
    });

    void button.offsetWidth;

    button.classList.add("is-tv-static");

    const layer = document.createElement("span");
    layer.className = "tv-static-burst";
    layer.setAttribute("aria-hidden", "true");
    button.appendChild(layer);

    function cleanup() {
      layer.remove();
      button.classList.remove("is-tv-static");
    }

    layer.addEventListener("animationend", cleanup, { once: true });
    setTimeout(cleanup, TV_STATIC_MS);
  }

  if (!prefersReducedMotion) {
    document.querySelectorAll(PRESSABLE_SELECTOR).forEach(function (button) {
      button.classList.add("btn-pressable");
      button.addEventListener("pointerdown", function () {
        triggerTvStatic(button);
      });
    });
  }
})();
