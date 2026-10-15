(function () {
  const REQUEST_TIMEOUT_MS = 20000;
  const ENDPOINT = "https://formspree.io/f/mwlvplva";
  const PRIMARY_EMAIL = "donovannud@gmail.com";
  const TURNSTILE_SITEKEY = "0x4AAAAAAFPNaRTHlkJV0ajS";
  const form = document.getElementById("inquiry");
  if (!form) return;

  const nameInput = document.getElementById("inquiry-name");
  const emailInput = document.getElementById("inquiry-email");
  const audienceSelect = document.getElementById("inquiry-audience");
  const serviceSelect = document.getElementById("inquiry-service");
  const messageInput = document.getElementById("inquiry-message");
  const statusEl = document.getElementById("inquiry-status");
  const submitBtn = document.getElementById("inquiry-submit");
  const mailFallback = document.getElementById("inquiry-mail-fallback");
  const languageInput = document.getElementById("inquiry-language");
  const serviceLabelInput = document.getElementById("inquiry-service-label");
  const audienceLabelInput = document.getElementById("inquiry-audience-label");
  const subjectInput = document.getElementById("inquiry-subject");
  const turnstileHost = document.getElementById("inquiry-turnstile");
  const turnstileErrorEl = document.getElementById("inquiry-turnstile-error");
  const turnstileRetry = document.getElementById("inquiry-turnstile-retry");
  // The static, translated catalogue is the single source for valid selections.
  const serviceOptions = Array.from(serviceSelect.options);
  const SERVICE_KEYS = Object.fromEntries(serviceOptions.filter(option => option.value)
    .map(option => [option.value, option.dataset.i18n]));
  const AUDIENCE_KEYS = Object.fromEntries(Array.from(audienceSelect.options)
    .filter(option => option.value).map(option => [option.value, option.dataset.i18n]));

  const fields = {
    name: nameInput,
    email: emailInput,
    audience: audienceSelect,
    service: serviceSelect,
    message: messageInput,
  };
  const fieldErrors = {
    name: document.getElementById("inquiry-name-error"),
    email: document.getElementById("inquiry-email-error"),
    audience: document.getElementById("inquiry-audience-error"),
    service: document.getElementById("inquiry-service-error"),
    message: document.getElementById("inquiry-message-error"),
  };

  let submitting = false;
  let statusKind = "";
  let widgetId = null;
  let widgetLanguage = "";
  let turnstileToken = "";
  let turnstileState = "idle";
  let turnstileErrorKey = "";
  let turnstileLoadTimer = 0;
  let resettingTurnstile = false;
  const fieldErrorKeys = { name: "", email: "", audience: "", service: "", message: "" };
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
    const audienceLabel = t(AUDIENCE_KEYS[audienceSelect.value]);
    if (serviceLabelInput) serviceLabelInput.value = label;
    if (audienceLabelInput) audienceLabelInput.value = audienceLabel;
    if (subjectInput) {
      subjectInput.value = [t("inquirySubjectPrefix"), audienceLabel, label].filter(Boolean).join(" · ");
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

  function setTurnstileError(key) {
    turnstileErrorKey = key || "";
    if (turnstileRetry) turnstileRetry.hidden = !key || key === "inquiryTurnstilePending";
    if (!turnstileErrorEl || !turnstileHost) return;
    if (key) {
      turnstileErrorEl.hidden = false;
      turnstileErrorEl.textContent = t(key);
      turnstileHost.setAttribute("aria-invalid", "true");
    } else {
      turnstileErrorEl.hidden = true;
      turnstileErrorEl.textContent = "";
      turnstileHost.removeAttribute("aria-invalid");
    }
  }

  function clearFieldErrors() {
    Object.keys(fields).forEach(function (name) {
      setFieldError(name, "");
    });
    setTurnstileError("");
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

    if (!AUDIENCE_KEYS[audienceSelect.value]) {
      setFieldError("audience", "inquiryRequired");
      ok = false;
      firstInvalid = firstInvalid || audienceSelect;
    } else {
      setFieldError("audience", "");
    }

    if (!service || !SERVICE_KEYS[service] || serviceSelect.selectedOptions[0]?.disabled) {
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
    return (
      kind === "error" ||
      kind === "error-network" ||
      kind === "error-timeout" ||
      kind === "error-limit" ||
      kind === "error-turnstile"
    );
  }

  function setStatus(kind, message) {
    statusKind = kind || "";
    statusEl.textContent = message || "";
    statusEl.classList.toggle("is-success", kind === "success");
    statusEl.classList.toggle("is-error", isErrorKind(kind));
    statusEl.classList.toggle("is-info", kind === "info" || kind === "info-audience");
    if (mailFallback) mailFallback.hidden = !isErrorKind(kind);
  }

  function refreshTranslatedUi() {
    if (statusKind === "success") setStatus("success", t("inquirySuccess"));
    else if (statusKind === "error-network") setStatus("error-network", t("inquiryErrorNetwork"));
    else if (statusKind === "error-timeout") setStatus("error-timeout", t("inquiryErrorTimeout"));
    else if (statusKind === "error-limit") setStatus("error-limit", t("inquiryErrorLimit"));
    else if (statusKind === "error-turnstile") setStatus("error-turnstile", t("inquiryTurnstileLoadError"));
    else if (statusKind === "error") setStatus("error", t("inquiryErrorGeneric"));
    else if (statusKind === "info") setStatus("info", t("inquiryAnnounceService"));
    else if (statusKind === "info-audience") setStatus("info-audience", t("inquiryAudienceChanged"));

    Object.keys(fieldErrorKeys).forEach(function (name) {
      if (fieldErrorKeys[name]) setFieldError(name, fieldErrorKeys[name]);
    });
    if (turnstileErrorKey) setTurnstileError(turnstileErrorKey);

    if (submitting) submitBtn.textContent = t("inquirySending");
  }

  function mailtoHref() {
    const subject = subjectInput.value || t("inquirySubjectPrefix");
    const body = [
      t("inquiryName") + ": " + nameInput.value.trim(),
      t("inquiryEmail") + ": " + emailInput.value.trim(),
      t("inquiryAudience") + ": " + audienceLabelInput.value,
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
    Object.values(fields).forEach(input => { input.disabled = active; });
    submitBtn.textContent = active ? t("inquirySending") : t("inquirySubmit");
  }

  function readTurnstileToken() {
    if (window.turnstile && widgetId !== null) {
      if (typeof window.turnstile.isExpired === "function" && window.turnstile.isExpired(widgetId)) {
        turnstileToken = "";
        turnstileState = "expired";
        return "";
      }
      if (typeof window.turnstile.getResponse === "function") {
        const live = window.turnstile.getResponse(widgetId);
        turnstileToken = live || "";
        if (turnstileToken) {
          turnstileState = "ready";
          return live;
        }
      }
    }
    return turnstileToken;
  }

  function renderTurnstile() {
    if (!window.turnstile || !turnstileHost || typeof window.turnstile.render !== "function") return;

    if (widgetId !== null && typeof window.turnstile.remove === "function") {
      try {
        window.turnstile.remove(widgetId);
      } catch (e) {
        /* widget already gone */
      }
      widgetId = null;
    }

    turnstileToken = "";
    turnstileState = "pending";
    turnstileHost.innerHTML = "";

    widgetLanguage = currentLang();
    try {
      widgetId = window.turnstile.render(turnstileHost, {
        sitekey: TURNSTILE_SITEKEY,
        theme: "dark",
        size: "flexible",
        language: currentLang() === "es" ? "es" : "en",
        appearance: "always",
        "refresh-expired": "manual",
        callback: function (token) {
          turnstileToken = token || "";
          turnstileState = turnstileToken ? "ready" : "pending";
          if (turnstileToken) {
            setTurnstileError("");
            if (statusKind === "error-turnstile") setStatus("", "");
          }
        },
        "error-callback": function () {
          turnstileToken = "";
          turnstileState = "error";
          setTurnstileError("inquiryTurnstileError");
          return true;
        },
        "expired-callback": function () {
          turnstileToken = "";
          turnstileState = "expired";
          setTurnstileError("inquiryTurnstileExpired");
          resetTurnstile();
        },
        "timeout-callback": function () {
          turnstileToken = "";
          turnstileState = "error";
          setTurnstileError("inquiryTurnstileError");
          resetTurnstile();
        },
      });
    } catch (error) {
      widgetId = null;
      markTurnstileLoadFailure();
    }

    if (turnstileLoadTimer) window.clearTimeout(turnstileLoadTimer);
  }

  function resetTurnstile() {
    if (resettingTurnstile) return;
    resettingTurnstile = true;
    turnstileToken = "";
    turnstileState = "pending";
    try {
      if (window.turnstile && widgetId !== null && typeof window.turnstile.reset === "function") {
        window.turnstile.reset(widgetId);
      } else {
        renderTurnstile();
      }
    } catch (e) {
      renderTurnstile();
    }
    resettingTurnstile = false;
  }

  function bootTurnstile() {
    if (turnstileLoadTimer) window.clearTimeout(turnstileLoadTimer);
    renderTurnstile();
  }

  function markTurnstileLoadFailure() {
    if (widgetId !== null || turnstileState === "ready") return;
    turnstileState = "error";
    setTurnstileError("inquiryTurnstileLoadError");
    setStatus("error-turnstile", t("inquiryTurnstileLoadError"));
    updateMailFallback();
  }

  window.onNudrakTurnstileLoad = bootTurnstile;
  if (window.turnstile) bootTurnstile();
  turnstileLoadTimer = window.setTimeout(markTurnstileLoadFailure, 10000);

  function validateTurnstile() {
    const token = readTurnstileToken();
    if (token) {
      setTurnstileError("");
      return { ok: true, token: token };
    }

    if (turnstileState === "pending" || turnstileState === "idle") {
      setTurnstileError("inquiryTurnstilePending");
    } else if (turnstileState === "expired") {
      setTurnstileError("inquiryTurnstileExpired");
      resetTurnstile();
    } else if (turnstileState === "error") {
      setTurnstileError(turnstileErrorKey || "inquiryTurnstileError");
      if (widgetId !== null) resetTurnstile();
    } else {
      setTurnstileError("inquiryTurnstileMissing");
    }

    return { ok: false, token: "" };
  }

  function filterServices() {
    const audience = audienceSelect.value;
    const selected = serviceSelect.value;
    serviceOptions.forEach(option => {
      const allowed = !audience || !option.dataset.audience || option.dataset.audience === audience;
      option.hidden = !allowed;
      option.disabled = !allowed;
    });
    serviceSelect.querySelectorAll("optgroup").forEach(group => {
      group.hidden = Array.from(group.children).every(option => option.hidden);
    });
    if (serviceOptions.some(option => option.value === selected && option.disabled)) {
      serviceSelect.value = "";
      return true;
    }
    return false;
  }

  function preselectService(value, audience) {
    if (submitting) return;
    if (AUDIENCE_KEYS[audience]) audienceSelect.value = audience;
    filterServices();
    if (SERVICE_KEYS[value]) serviceSelect.value = value;
    else if (!serviceSelect.value) serviceSelect.value = "guidance";
    setFieldError("audience", "");
    setFieldError("service", "");
    syncHiddenMeta();
    updateMailFallback();
    setStatus("info", t("inquiryAnnounceService"));
    if (location.hash !== "#inquiry") history.pushState(null, "", "#inquiry");
    form.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    nameInput.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-inquiry-service], [data-inquiry-audience]").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      preselectService(btn.getAttribute("data-inquiry-service"), btn.getAttribute("data-inquiry-audience"));
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

    const challenge = validateTurnstile();
    if (!challenge.ok) {
      if (turnstileHost) turnstileHost.focus();
      return;
    }

    syncHiddenMeta();
    updateMailFallback();
    const formData = new FormData(form);
    formData.set("cf-turnstile-response", challenge.token);
    // Snapshot data before disabling controls so repeated submits cannot lose fields.
    setSubmitting(true);
    setStatus("", "");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    fetch(ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          filterServices();
          clearFieldErrors();
          syncHiddenMeta();
          updateMailFallback();
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
        if (controller.signal.aborted) {
          setStatus("error-timeout", t("inquiryErrorTimeout"));
        } else {
          setStatus("error-network", t("inquiryErrorNetwork"));
        }
        updateMailFallback();
      })
      .finally(function () {
        window.clearTimeout(timeoutId);
        setSubmitting(false);
        if (widgetLanguage !== currentLang()) renderTurnstile();
        else resetTurnstile();
      });
  });

  document.addEventListener("languagechange", function () {
    syncHiddenMeta();
    refreshTranslatedUi();
    updateMailFallback();
    if (!submitting) renderTurnstile();
  });

  serviceSelect.addEventListener("change", function () {
    const audience = serviceSelect.selectedOptions[0]?.dataset.audience;
    if (!audienceSelect.value && audience) {
      audienceSelect.value = audience;
      filterServices();
      setFieldError("audience", "");
    }
    setFieldError("service", "");
    syncHiddenMeta();
    updateMailFallback();
  });

  audienceSelect.addEventListener("change", function () {
    if (filterServices()) setStatus("info-audience", t("inquiryAudienceChanged"));
    setFieldError("audience", "");
    setFieldError("service", "");
    syncHiddenMeta();
    updateMailFallback();
  });

  turnstileRetry?.addEventListener("click", function () {
    if (submitting) return;
    setTurnstileError("");
    if (statusKind === "error-turnstile") setStatus("", "");
    resetTurnstile();
    if (!window.turnstile) markTurnstileLoadFailure();
  });

  form.addEventListener("input", updateMailFallback);

  // Enable submission only once its handler exists; noscript offers email instead.
  setSubmitting(false);
  filterServices();
  syncHiddenMeta();
  updateMailFallback();
})();
