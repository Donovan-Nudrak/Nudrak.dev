(function () {
  const ENDPOINT = "https://formspree.io/f/mwlvplva";
  const PRIMARY_EMAIL = "donovannud@gmail.com";
  const SERVICE_KEYS = {
    web: "inquiryServiceWeb",
    frontend: "inquiryServiceFrontend",
    backend: "inquiryServiceBackend",
    fullstack: "inquiryServiceFullstack",
    guidance: "inquiryServiceGuidance",
  };

  const form = document.getElementById("inquiry");
  if (!form) return;

  const nameInput = document.getElementById("inquiry-name");
  const emailInput = document.getElementById("inquiry-email");
  const serviceSelect = document.getElementById("inquiry-service");
  const messageInput = document.getElementById("inquiry-message");
  const statusEl = document.getElementById("inquiry-status");
  const submitBtn = document.getElementById("inquiry-submit");
  const mailFallback = document.getElementById("inquiry-mail-fallback");
  const languageInput = document.getElementById("inquiry-language");
  const serviceLabelInput = document.getElementById("inquiry-service-label");
  const subjectInput = document.getElementById("inquiry-subject");

  const fields = {
    name: nameInput,
    email: emailInput,
    service: serviceSelect,
    message: messageInput,
  };
  const fieldErrors = {
    name: document.getElementById("inquiry-name-error"),
    email: document.getElementById("inquiry-email-error"),
    service: document.getElementById("inquiry-service-error"),
    message: document.getElementById("inquiry-message-error"),
  };

  let submitting = false;
  let statusKind = "";
  const fieldErrorKeys = { name: "", email: "", service: "", message: "" };
  const copyTimers = new WeakMap();

  statusEl.setAttribute("tabindex", "-1");

  function t(key) {
    return window.I18n && window.I18n.t ? window.I18n.t(key) : key;
  }

  function currentLang() {
    return window.I18n && window.I18n.getLang ? window.I18n.getLang() : "en";
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function emailLooksValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function syncHiddenMeta() {
    const lang = currentLang();
    if (languageInput) languageInput.value = lang;
    const service = serviceSelect.value;
    const labelKey = SERVICE_KEYS[service];
    const label = labelKey ? t(labelKey) : "";
    if (serviceLabelInput) serviceLabelInput.value = label;
    if (subjectInput) {
      subjectInput.value = label
        ? t("inquirySubjectPrefix") + ": " + label
        : t("inquirySubjectPrefix");
    }
  }

  function setFieldError(name, key) {
    const input = fields[name];
    const errorEl = fieldErrors[name];
    fieldErrorKeys[name] = key || "";
    if (!input || !errorEl) return;
    if (key) {
      errorEl.hidden = false;
      errorEl.textContent = t(key);
      input.setAttribute("aria-invalid", "true");
    } else {
      errorEl.hidden = true;
      errorEl.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  }

  function clearFieldErrors() {
    Object.keys(fields).forEach(function (name) {
      setFieldError(name, "");
    });
  }

  function validate() {
    let ok = true;
    let firstInvalid = null;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const service = serviceSelect.value;
    const message = messageInput.value.trim();

    if (!name) {
      setFieldError("name", "inquiryRequired");
      ok = false;
      firstInvalid = firstInvalid || nameInput;
    } else {
      setFieldError("name", "");
    }

    if (!email) {
      setFieldError("email", "inquiryRequired");
      ok = false;
      firstInvalid = firstInvalid || emailInput;
    } else if (!emailLooksValid(email)) {
      setFieldError("email", "inquiryEmailInvalid");
      ok = false;
      firstInvalid = firstInvalid || emailInput;
    } else {
      setFieldError("email", "");
    }

    if (!service || !SERVICE_KEYS[service]) {
      setFieldError("service", "inquiryRequired");
      ok = false;
      firstInvalid = firstInvalid || serviceSelect;
    } else {
      setFieldError("service", "");
    }

    if (!message) {
      setFieldError("message", "inquiryRequired");
      ok = false;
      firstInvalid = firstInvalid || messageInput;
    } else {
      setFieldError("message", "");
    }

    return { ok: ok, firstInvalid: firstInvalid };
  }

  function isErrorKind(kind) {
    return kind === "error" || kind === "error-network" || kind === "error-limit";
  }

  function setStatus(kind, message) {
    statusKind = kind || "";
    statusEl.textContent = message || "";
    statusEl.classList.toggle("is-success", kind === "success");
    statusEl.classList.toggle("is-error", isErrorKind(kind));
    statusEl.classList.toggle("is-info", kind === "info");
    if (mailFallback) mailFallback.hidden = !isErrorKind(kind);
  }

  function refreshTranslatedUi() {
    if (statusKind === "success") setStatus("success", t("inquirySuccess"));
    else if (statusKind === "error-network") setStatus("error-network", t("inquiryErrorNetwork"));
    else if (statusKind === "error-limit") setStatus("error-limit", t("inquiryErrorLimit"));
    else if (statusKind === "error") setStatus("error", t("inquiryErrorGeneric"));
    else if (statusKind === "info") setStatus("info", t("inquiryAnnounceService"));

    Object.keys(fieldErrorKeys).forEach(function (name) {
      if (fieldErrorKeys[name]) setFieldError(name, fieldErrorKeys[name]);
    });

    if (submitting) submitBtn.textContent = t("inquirySending");
  }

  function mailtoHref() {
    const subject = subjectInput.value || t("inquirySubjectPrefix");
    const body = [
      t("inquiryName") + ": " + nameInput.value.trim(),
      t("inquiryEmail") + ": " + emailInput.value.trim(),
      t("inquiryService") + ": " + (serviceLabelInput.value || serviceSelect.value),
      "",
      messageInput.value.trim(),
    ].join("\n");
    return (
      "mailto:" +
      PRIMARY_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function updateMailFallback() {
    if (mailFallback) mailFallback.href = mailtoHref();
  }

  function setSubmitting(active) {
    submitting = active;
    form.setAttribute("aria-busy", String(active));
    submitBtn.disabled = active;
    submitBtn.textContent = active ? t("inquirySending") : t("inquirySubmit");
  }

  function preselectService(value) {
    if (!SERVICE_KEYS[value]) return;
    serviceSelect.value = value;
    setFieldError("service", "");
    syncHiddenMeta();
    updateMailFallback();
    setStatus("info", t("inquiryAnnounceService"));
    form.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    serviceSelect.focus();
  }

  document.querySelectorAll("[data-inquiry-service]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      preselectService(btn.getAttribute("data-inquiry-service"));
    });
  });

  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const email = btn.getAttribute("data-copy-email");
      if (!email) return;

      function showResult(ok) {
        const prev = copyTimers.get(btn);
        if (prev) window.clearTimeout(prev);
        btn.textContent = t(ok ? "inquiryCopied" : "inquiryCopyFail");
        copyTimers.set(
          btn,
          window.setTimeout(function () {
            btn.textContent = t("inquiryCopy");
          }, 1600)
        );
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          function () {
            showResult(true);
          },
          function () {
            showResult(false);
          }
        );
      } else {
        showResult(false);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submitting) return;

    const result = validate();
    if (!result.ok) {
      if (result.firstInvalid) result.firstInvalid.focus();
      return;
    }

    syncHiddenMeta();
    updateMailFallback();
    setSubmitting(true);
    setStatus("", "");

    fetch(ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          clearFieldErrors();
          syncHiddenMeta();
          setStatus("success", t("inquirySuccess"));
          statusEl.focus();
          return;
        }
        if (response.status === 429) {
          setStatus("error-limit", t("inquiryErrorLimit"));
        } else {
          setStatus("error", t("inquiryErrorGeneric"));
        }
        updateMailFallback();
      })
      .catch(function () {
        setStatus("error-network", t("inquiryErrorNetwork"));
        updateMailFallback();
      })
      .then(function () {
        setSubmitting(false);
      });
  });

  document.addEventListener("languagechange", function () {
    syncHiddenMeta();
    refreshTranslatedUi();
    updateMailFallback();
  });

  serviceSelect.addEventListener("change", function () {
    syncHiddenMeta();
    updateMailFallback();
  });

  form.addEventListener("input", updateMailFallback);

  syncHiddenMeta();
})();
