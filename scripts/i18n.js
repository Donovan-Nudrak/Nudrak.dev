(function () {
  const STORAGE_KEY = "nudrak-lang";

  const content = {
    en: {
      docTitle: "NUDRAK | Backend Engineer",
      metaDescription:
        "NUDRAK — Donovan Agustin Alvarez. Backend Engineer. Python, FastAPI, scalable APIs and modular architecture.",
      navMenu: "Open menu",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navContact: "Contact",
      heroRole: "Backend Engineer",
      heroCtaProjects: "View projects",
      heroCtaContact: "Contact",
      aboutTitle: "About",
      aboutMeta:
        "Junior · Advanced personal projects · Available for employment and projects · Spanish · Technical English (learning)",
      aboutP1:
        "Backend developer focused on designing and implementing scalable systems, APIs and modular architectures using Python. I specialize in building backend services from scratch, with an emphasis on separation of concerns, maintainability and clean software design.",
      aboutP2:
        "I enjoy designing robust APIs, authentication systems and service-oriented architectures. I structure my projects separating routes, business logic and persistence — seeking clean, scalable code even in small projects.",
      aboutP3:
        "My approach is not just writing functional code, but structuring systems that can grow in an orderly way.",
      snippetModular: "modular",
      skillsTitle: "Skills",
      skillsIntro:
        "Technical stack focused on backend, infrastructure, AI workflow and software architecture.",
      skillBackend: "Backend",
      skillDatabases: "Databases",
      skillDevops: "DevOps",
      skillSecurity: "Security",
      skillEnvironment: "Environment",
      skillAiWorkflow: "AI Workflow",
      skillArchitecture: "Architecture",
      skillsActive: "active",
      projectsTitle: "Projects",
      proj1Desc:
        "Event-driven backend that ingests Stripe webhooks, analyzes them with Google Gemini and a Rule Engine, and executes automated actions: PDF generation, S3 upload, and email delivery via Resend. Built with FastAPI, Celery, PostgreSQL, and Redis.",
      proj2Desc:
        "Production-oriented e-commerce REST API featuring JWT authentication, Redis caching, PostgreSQL, pgvector semantic search, and Gemini-powered RAG. A well-structured, fully tested API with semantic product search via Retrieval-Augmented Generation.",
      proj3Desc:
        "Full e-commerce backend ready for frontend integration. Product, user and order management with JWT authentication, cart, stock control and admin panel.",
      proj4Desc:
        "FinTrader Hub is a modular fintech backend built with FastAPI, PostgreSQL, Redis, Celery, and SQLAlchemy. It provides portfolio management, trade tracking, market data synchronization, risk analytics, automated alerts, JWT authentication, background workers, and Docker-based deployment.",
      proj5Desc:
        "Backend system for multi-team task management with roles and permissions (RBAC), soft delete, pagination, filters and CI with GitHub Actions.",
      proj6Desc:
        "Retrieval-Augmented Generation service with embeddings pipeline, LLM integration via OpenRouter and semantic retrieval of contextual information.",
      proj7Desc:
        "Notes API with session authentication, shared notes between users and basic permission system. Deployed to production.",
      contactTitle: "Contact",
      contactStatus: "Available for backend employment and projects",
      contactCopyLabel: "Copy email",
      contactCopyHint: "Click to copy",
      contactCopyDone: "Copied ✓",
      contactCurriculum: "Resume",
      contactDownloadCv: "Download PDF",
      footerNote: "# thanks for visiting",
    },
    es: {
      docTitle: "NUDRAK | Backend Engineer",
      metaDescription:
        "NUDRAK — Donovan Agustin Alvarez. Backend Engineer. Python, FastAPI, APIs escalables y arquitectura modular.",
      navMenu: "Abrir menú",
      navAbout: "Sobre mí",
      navSkills: "Tecnologías",
      navProjects: "Proyectos",
      navContact: "Contacto",
      heroRole: "Backend Engineer",
      heroCtaProjects: "Ver proyectos",
      heroCtaContact: "Contacto",
      aboutTitle: "Sobre mí",
      aboutMeta:
        "Junior · Proyectos personales avanzados · Disponible para empleo y proyectos · Español · Inglés técnico (en estudio)",
      aboutP1:
        "Backend developer enfocado en el diseño e implementación de sistemas escalables, APIs y arquitecturas modulares utilizando Python. Me especializo en construir servicios backend desde cero, con enfoque en separación de responsabilidades, mantenibilidad y diseño limpio de software.",
      aboutP2:
        "Disfruto diseñar APIs robustas, sistemas de autenticación y arquitecturas orientadas a servicios. Estructuro mis proyectos separando capa de rutas, lógica de negocio y persistencia — buscando código limpio y escalable incluso en proyectos pequeños.",
      aboutP3:
        "Mi enfoque no es solo escribir código funcional, sino estructurar sistemas que puedan crecer de forma ordenada.",
      snippetModular: "modular",
      skillsTitle: "Tecnologías",
      skillsIntro:
        "Stack técnico orientado a backend, infraestructura, flujo de trabajo con IA y arquitectura de software.",
      skillBackend: "Backend",
      skillDatabases: "Bases de datos",
      skillDevops: "DevOps",
      skillSecurity: "Seguridad",
      skillEnvironment: "Entorno",
      skillAiWorkflow: "Flujo con IA",
      skillArchitecture: "Arquitectura",
      skillsActive: "activo",
      projectsTitle: "Proyectos",
      proj1Desc:
        "Backend orientado a eventos que procesa webhooks de Stripe, los analiza con Google Gemini y un motor de reglas, y ejecuta acciones automatizadas: generación de PDF, subida a S3 y envío de email vía Resend. Construido con FastAPI, Celery, PostgreSQL y Redis.",
      proj2Desc:
        "API REST de e-commerce orientada a producción con autenticación JWT, caché Redis, PostgreSQL, búsqueda semántica con pgvector y RAG potenciado por Gemini. API bien estructurada y completamente testeada con búsqueda semántica de productos mediante Retrieval-Augmented Generation.",
      proj3Desc:
        "Backend completo de e-commerce listo para integración con frontend. Gestión de productos, usuarios y órdenes con autenticación JWT, carrito, control de stock y panel administrativo.",
      proj4Desc:
        "FinTrader Hub es un backend fintech modular construido con FastAPI, PostgreSQL, Redis, Celery y SQLAlchemy. Ofrece gestión de portafolios, seguimiento de operaciones, sincronización de datos de mercado, analítica de riesgo, alertas automatizadas, autenticación JWT, workers en segundo plano y despliegue con Docker.",
      proj5Desc:
        "Sistema backend para gestión de tareas multi-equipo con roles y permisos (RBAC), soft delete, paginación, filtros y CI con GitHub Actions.",
      proj6Desc:
        "Servicio de Retrieval-Augmented Generation con pipeline de embeddings, integración con LLMs vía OpenRouter y recuperación semántica de información contextual.",
      proj7Desc:
        "API de notas con autenticación por sesión, notas compartidas entre usuarios y sistema de permisos básico. Desplegada en producción.",
      contactTitle: "Contacto",
      contactStatus: "Disponible para empleo y proyectos backend",
      contactCopyLabel: "Copiar email",
      contactCopyHint: "Click para copiar",
      contactCopyDone: "Copiado ✓",
      contactCurriculum: "Curriculum",
      contactDownloadCv: "Descargar PDF",
      footerNote: "# gracias por visitar",
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
