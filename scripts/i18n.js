(function () {
  const STORAGE_KEY = "nudrak-lang";

  const content = {
    en: {
      docTitle: "NUDRAK | Full-Stack Developer",
      metaDescription:
        "NUDRAK — Donovan Agustín Alvarez. Full-Stack Developer with a backend focus. Python, FastAPI, PostgreSQL, React, TypeScript, Docker.",
      navMenu: "Open menu",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navContact: "Contact",
      heroRole: "Full-Stack Developer",
      heroFocus: "Backend-focused",
      heroCtaProjects: "Projects",
      heroCtaContact: "Contact",
      aboutTitle: "About",
      aboutMeta:
        "Full-Stack · Backend-focused · Arch Linux (rolling release) · Spanish · Technical English",
      aboutWhoTitle: "What I am",
      aboutWhoBody:
        "Full-Stack Developer with a backend focus. I build complete applications — from the API and the data layer to the frontend that consumes them.",
      aboutDoTitle: "What I build",
      aboutDoBody:
        "Web applications and REST APIs: authentication and access control (RBAC), payments and webhooks, integrations with external services, business automation, administrative systems, AI/RAG services, and frontends connected to those backends.",
      aboutEngTitle: "How they are engineered",
      aboutEngBody:
        "Modular architectures with clear separation between transport, business logic and data access. I prioritize maintainability, explicit validation, traceability, predictable error handling and controlled behavior when external services fail — systems designed to grow in an orderly way.",
      aboutWorkTitle: "How I work",
      aboutWorkBody:
        "Every solution goes through the same cycle before, during and after implementation.",
      processAnalysis: "Analysis",
      processPlanning: "Planning",
      processImplementation: "Implementation",
      processValidation: "Validation",
      processTesting: "Testing",
      processReview: "Review",
      aboutLearnTitle: "Learning",
      aboutLearnBody:
        "Structured self-taught learning: I analyze existing systems and reverse-engineer their patterns, architecture and design decisions, then validate them through my own projects.",
      aboutCertMeta: "University of Helsinki · 5 ECTS · July 2026",
      snippetModular: "modular",
      skillsTitle: "Skills",
      skillsIntro:
        "Technical stack focused on backend engineering, frontend integration and infrastructure.",
      skillCore: "Core Stack",
      skillBackend: "Backend",
      skillFrontend: "Frontend",
      skillDatabases: "Databases & Cache",
      skillInfra: "Infrastructure / DevOps",
      skillSecurity: "Auth & Security",
      skillIntegrations: "Integrations",
      skillsActive: "active",
      skillsDiagramAria:
        "Stack architecture: core, frontend, backend, auth, data, integrations and infrastructure",
      projectsTitle: "Projects",
      projectsFeatured: "Featured",
      projectsOther: "Other projects",
      projCyberwareDesc:
        "Full-stack e-commerce platform: catalog, search, cart, orders, inventory and a separate admin console. Cookie-based JWT auth with refresh tokens and RBAC, Stripe payments with signed webhooks and refunds, AWS S3, transactional emails via Resend, and Gemini-powered semantic search and chatbot. Reproducible local environment with Docker Compose and Alembic.",
      projAgentDesc:
        "Event-driven backend that ingests Stripe webhooks, analyzes them with Google Gemini and a Rule Engine, and executes automated actions: PDF generation, S3 upload, and email delivery via Resend. Built with FastAPI, Celery, PostgreSQL, and Redis.",
      projTasksDesc:
        "Backend system for multi-team task management with JWT authentication and a hierarchical RBAC from viewer to owner. Layered architecture (routers, services, repositories), soft delete, entity auditing, pagination, filters, health checks, readiness probes and CI with GitHub Actions.",
      projEcomRagDesc:
        "Production-oriented e-commerce REST API featuring JWT authentication, Redis caching, PostgreSQL, pgvector semantic search, and Gemini-powered RAG. A well-structured, fully tested API with semantic product search via Retrieval-Augmented Generation.",
      projFintraderDesc:
        "FinTrader Hub is a modular fintech backend built with FastAPI, PostgreSQL, Redis, Celery, and SQLAlchemy. It provides portfolio management, trade tracking, market data synchronization, risk analytics, automated alerts, JWT authentication, background workers, and Docker-based deployment.",
      projRagCoreDesc:
        "Retrieval-Augmented Generation service with embeddings pipeline, LLM integration via OpenRouter and semantic retrieval of contextual information.",
      projEcomDesc:
        "Full e-commerce backend ready for frontend integration. Product, user and order management with JWT authentication, cart, stock control and admin panel.",
      projNotesDesc:
        "Notes API with session authentication, shared notes between users and basic permission system. Deployed to production.",
      contactTitle: "Contact",
      contactStatus: "Available for professional opportunities and freelance projects",
      contactCopyLabel: "Copy email",
      contactCopyHint: "Click to copy",
      contactCopyDone: "Copied ✓",
      contactDownloadCv: "Download PDF",
      footerNote: "# rolling release · pacman -Syu ok",
    },
    es: {
      docTitle: "NUDRAK | Full-Stack Developer",
      metaDescription:
        "NUDRAK — Donovan Agustín Alvarez. Full-Stack Developer con enfoque en backend. Python, FastAPI, PostgreSQL, React, TypeScript, Docker.",
      navMenu: "Abrir menú",
      navAbout: "Sobre mí",
      navSkills: "Tecnologías",
      navProjects: "Proyectos",
      navContact: "Contacto",
      heroRole: "Full-Stack Developer",
      heroFocus: "Enfoque en backend",
      heroCtaProjects: "Proyectos",
      heroCtaContact: "Contacto",
      aboutTitle: "Sobre mí",
      aboutMeta:
        "Full-Stack · Enfoque en backend · Arch Linux (rolling release) · Español · Inglés técnico",
      aboutWhoTitle: "Qué soy",
      aboutWhoBody:
        "Full-Stack Developer con enfoque en backend. Construyo aplicaciones completas — desde la API y la capa de datos hasta el frontend que las consume.",
      aboutDoTitle: "Qué construyo",
      aboutDoBody:
        "Aplicaciones web y APIs REST: autenticación y control de acceso (RBAC), pagos y webhooks, integraciones con servicios externos, automatización de procesos, sistemas administrativos, servicios de IA/RAG y frontends conectados a esos backends.",
      aboutEngTitle: "Cómo se construyen",
      aboutEngBody:
        "Arquitecturas modulares con separación clara entre transporte, lógica de negocio y acceso a datos. Priorizo mantenibilidad, validación explícita, trazabilidad, manejo predecible de errores y comportamiento controlado ante fallos de servicios externos — sistemas diseñados para crecer de forma ordenada.",
      aboutWorkTitle: "Cómo trabajo",
      aboutWorkBody:
        "Cada solución pasa por el mismo ciclo antes, durante y después de la implementación.",
      processAnalysis: "Análisis",
      processPlanning: "Planificación",
      processImplementation: "Implementación",
      processValidation: "Validación",
      processTesting: "Pruebas",
      processReview: "Revisión",
      aboutLearnTitle: "Aprendizaje",
      aboutLearnBody:
        "Aprendizaje autodidacta estructurado: analizo sistemas existentes y aplico ingeniería inversa a sus patrones, arquitectura y decisiones de diseño, validándolos después en mis propios proyectos.",
      aboutCertMeta: "University of Helsinki · 5 ECTS · Julio 2026",
      snippetModular: "modular",
      skillsTitle: "Tecnologías",
      skillsIntro:
        "Stack técnico orientado a ingeniería backend, integración frontend e infraestructura.",
      skillCore: "Stack principal",
      skillBackend: "Backend",
      skillFrontend: "Frontend",
      skillDatabases: "Bases de datos y caché",
      skillInfra: "Infraestructura / DevOps",
      skillSecurity: "Autenticación y seguridad",
      skillIntegrations: "Integraciones",
      skillsActive: "activo",
      skillsDiagramAria:
        "Arquitectura del stack: core, frontend, backend, autenticación, datos, integraciones e infraestructura",
      projectsTitle: "Proyectos",
      projectsFeatured: "Destacados",
      projectsOther: "Otros proyectos",
      projCyberwareDesc:
        "Plataforma e-commerce full-stack: catálogo, búsqueda, carrito, órdenes, inventario y consola administrativa independiente. Autenticación JWT por cookies con refresh tokens y RBAC, pagos con Stripe con webhooks firmados y reembolsos, AWS S3, emails transaccionales vía Resend, y búsqueda semántica y chatbot con Gemini. Entorno local reproducible con Docker Compose y Alembic.",
      projAgentDesc:
        "Backend orientado a eventos que procesa webhooks de Stripe, los analiza con Google Gemini y un motor de reglas, y ejecuta acciones automatizadas: generación de PDF, subida a S3 y envío de email vía Resend. Construido con FastAPI, Celery, PostgreSQL y Redis.",
      projTasksDesc:
        "Sistema backend para gestión de tareas multi-equipo con autenticación JWT y RBAC jerárquico de viewer a owner. Arquitectura por capas (routers, servicios, repositorios), soft delete, auditoría de entidades, paginación, filtros, health checks, readiness probes y CI con GitHub Actions.",
      projEcomRagDesc:
        "API REST de e-commerce orientada a producción con autenticación JWT, caché Redis, PostgreSQL, búsqueda semántica con pgvector y RAG potenciado por Gemini. API bien estructurada y completamente testeada con búsqueda semántica de productos mediante Retrieval-Augmented Generation.",
      projFintraderDesc:
        "FinTrader Hub es un backend fintech modular construido con FastAPI, PostgreSQL, Redis, Celery y SQLAlchemy. Ofrece gestión de portafolios, seguimiento de operaciones, sincronización de datos de mercado, analítica de riesgo, alertas automatizadas, autenticación JWT, workers en segundo plano y despliegue con Docker.",
      projRagCoreDesc:
        "Servicio de Retrieval-Augmented Generation con pipeline de embeddings, integración con LLMs vía OpenRouter y recuperación semántica de información contextual.",
      projEcomDesc:
        "Backend completo de e-commerce listo para integración con frontend. Gestión de productos, usuarios y órdenes con autenticación JWT, carrito, control de stock y panel administrativo.",
      projNotesDesc:
        "API de notas con autenticación por sesión, notas compartidas entre usuarios y sistema de permisos básico. Desplegada en producción.",
      contactTitle: "Contacto",
      contactStatus: "Disponible para oportunidades profesionales y proyectos freelance",
      contactCopyLabel: "Copiar email",
      contactCopyHint: "Click para copiar",
      contactCopyDone: "Copiado ✓",
      contactDownloadCv: "Descargar PDF",
      footerNote: "# rolling release · pacman -Syu ok",
    },
  };

  let currentLang = "en";

  function t(key) {
    return content[currentLang][key] ?? content.en[key] ?? "";
  }

  function updateLangButtons() {
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      const isActive = btn.getAttribute("data-set-lang") === currentLang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setLanguage(lang) {
    if (!content[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "es" ? "es" : "en";

    document.title = t("docTitle");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("metaDescription"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (key && content[currentLang][key] !== undefined) {
        el.textContent = content[currentLang][key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (key && content[currentLang][key] !== undefined) {
        el.setAttribute("aria-label", content[currentLang][key]);
      }
    });

    updateLangButtons();
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: currentLang } }));
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-set-lang"));
    });
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  setLanguage(content[saved] ? saved : "en");

  window.I18n = { setLanguage: setLanguage, t: t, getLang: function () { return currentLang; } };
})();
