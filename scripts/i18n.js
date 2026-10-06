(function () {
  const STORAGE_KEY = "nudrak-lang";

  const content = {
    en: {
      docTitle: "NUDRAK | Full-Stack Developer",
      metaDescription:
        "NUDRAK — Donovan Agustín Alvarez. Full-Stack Developer with a backend focus. Python, FastAPI, PostgreSQL, React, TypeScript, Docker.",
      navMenu: "Open menu",
      navAbout: "About",
      navServices: "Services",
      navSkills: "Skills",
      navProjects: "Projects",
      navContact: "Contact",
      heroRole: "Full-Stack Developer",
      heroFocus: "Backend-focused",
      heroCtaServices: "View services",
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
        "Structured learning: I analyze existing systems and reverse-engineer their patterns, architecture and design decisions, then validate them through my own projects.",
      aboutCertMeta: "University of Helsinki · 5 ECTS · July 2026",
      snippetModular: "modular",
      servicesTitle: "What I can build for you",
      servicesIntro:
        "Available for new projects and for existing applications — websites, frontend, backend, or a complete product.",
      servicesExamplesLabel: "Examples of work you can hire",
      servicesConsult: "Ask about this service",
      servicesRefDemo: "Conceptual demo",
      servicesRefRepo: "Repository",
      serviceWebTitle: "Websites",
      serviceWebDesc:
        "Landing pages, portfolios and sites for businesses, services or products. Content presentation, mobile-ready layouts and contact paths.",
      serviceWebEx1: "A product or service landing",
      serviceWebEx2: "A personal or studio portfolio",
      serviceWebEx3: "A small business site with contact",
      serviceFrontendTitle: "Frontend development",
      serviceFrontendDesc:
        "Design implementation, responsive interfaces, interactive components and connection to APIs.",
      serviceFrontendEx1: "Implementing an existing design",
      serviceFrontendEx2: "Interactive components and client-side flows",
      serviceFrontendEx3: "Connecting a frontend to an API",
      serviceBackendTitle: "Backend development",
      serviceBackendDesc:
        "APIs, databases, authentication, permissions, integrations and automations.",
      serviceBackendEx1: "REST APIs and data models",
      serviceBackendEx2: "Authentication, roles and access control",
      serviceBackendEx3: "Webhooks, email and third-party integrations",
      serviceFullstackTitle: "Full-stack applications",
      serviceFullstackDesc:
        "Integrated frontend and backend for applications with users, data and their own processes.",
      serviceFullstackEx1: "An application with accounts, data and workflows",
      serviceFullstackEx2: "An admin console connected to an API",
      serviceFullstackEx3: "End-to-end features across client and server",
      servicesQuote:
        "Each project is quoted according to its scope and complexity. I am also available for hourly collaborations.",
      servicesProcessTitle: "How we work",
      servicesProcess1: "You tell me your idea or need.",
      servicesProcess2: "We define scope, deliverables, price and timeline.",
      servicesProcess3: "I develop with agreed reviews.",
      servicesProcess4: "Delivery as specified in the proposal.",
      servicesFaqTitle: "Questions",
      servicesFaq1Q: "Can you improve an existing site or application?",
      servicesFaq1A:
        "Yes. I can review the project and propose improvements, new features or integrations according to its current state and your needs.",
      servicesFaq2Q: "How are price and timeline determined?",
      servicesFaq2A:
        "They depend on scope, complexity and the material available. They are agreed before work begins.",
      servicesFaq3Q: "What does delivery include?",
      servicesFaq3A:
        "The proposal will specify code, publishing, documentation and support when they apply. External costs such as domain, hosting or third-party services will be listed separately.",
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
      projImpactFrameDesc:
        "Interactive bilingual landing for a conceptual mechanical keyboard. Industrial aesthetic, layered product imagery, scroll-tied GSAP motion and visual customization to present architecture, materials and how it works.",
      projLowHoursDesc:
        "Bilingual landing for a fictional late-night café with editorial identity and a lo-fi mood. Rainy-night photography, smooth motion, menu, gallery and a music player built around the line «Stay a little longer».",
      projKairoDesc:
        "Conceptual landing for a fictional watch brand: a single-product promotional page with editorial dark aesthetics, built in React 19, TypeScript and Vite with no router, global store or backend. Custom CSS and Framer Motion handle staggered reveals, hero orbits and finish selection; accessible keyboard modal, reduced-motion support, and GitHub Pages deploy.",
      projFintraderDesc:
        "FinTrader Hub is a modular fintech backend built with FastAPI, PostgreSQL, Redis, Celery, and SQLAlchemy. It provides portfolio management, trade tracking, market data synchronization, risk analytics, automated alerts, JWT authentication, background workers, and Docker-based deployment.",
      projMomoRamenDesc:
        "Frontend demo of a fictional Japanese restaurant: identity, dishes and house story as a warm pastel kawaii SPA with React, Vite, Tailwind and HashRouter. Browse the menu and a client-only reservation flow; no real orders, bookings or payments. Ready to extend with a backend, database and notifications later.",
      projRagCoreDesc:
        "Retrieval-Augmented Generation service with embeddings pipeline, LLM integration via OpenRouter and semantic retrieval of contextual information.",
      projEcomDesc:
        "Full e-commerce backend ready for frontend integration. Product, user and order management with JWT authentication, cart, stock control and admin panel.",
      projNotesDesc:
        "Notes API with session authentication, shared notes between users and basic permission system. Deployed to production.",
      contactTitle: "Contact",
      contactStatus: "Available for professional opportunities and freelance projects",
      contactEmailPrimary: "Email · primary",
      contactEmailSecondary: "Email · secondary",
      contactDownloadCv: "Download PDF",
      inquiryTitle: "Project inquiry",
      inquiryIntro: "Send a short description of what you need. I reply to the email you provide.",
      inquiryName: "Name",
      inquiryEmail: "Email",
      inquiryService: "Service of interest",
      inquiryServicePlaceholder: "Select an option",
      inquiryServiceWeb: "Websites",
      inquiryServiceFrontend: "Frontend development",
      inquiryServiceBackend: "Backend development",
      inquiryServiceFullstack: "Full-stack applications",
      inquiryServiceGuidance: "I need guidance",
      inquiryMessage: "What do you need built?",
      inquirySubmit: "Send inquiry",
      inquirySending: "Sending…",
      inquiryCopy: "Copy",
      inquiryCopied: "Copied",
      inquiryCopyFail: "Could not copy",
      inquiryEmailFallback: "Email instead",
      inquiryAnnounceService: "Service selected. Continue in the inquiry form.",
      inquiryRequired: "This field is required.",
      inquiryEmailInvalid: "Enter a valid email address.",
      inquiryTurnstileLabel: "Verification",
      inquiryTurnstilePending: "Wait until verification finishes.",
      inquiryTurnstileMissing: "Complete the verification before sending.",
      inquiryTurnstileError: "Verification failed. Try again.",
      inquiryTurnstileExpired: "Verification expired. Complete it again.",
      inquiryTurnstileLoadError: "Could not load verification. Use the email link.",
      inquirySuccess: "Inquiry sent. I will reply to the email you provided.",
      inquiryErrorGeneric:
        "The inquiry could not be sent. Try again later or use the email link.",
      inquiryErrorNetwork:
        "Could not reach the form service. Check your connection or use the email link.",
      inquiryErrorLimit:
        "The form service is temporarily limiting submissions. Use the email link instead.",
      inquirySubjectPrefix: "Inquiry",
      footerNote: "# rolling release · pacman -Syu ok",
    },
    es: {
      docTitle: "NUDRAK | Full-Stack Developer",
      metaDescription:
        "NUDRAK — Donovan Agustín Alvarez. Full-Stack Developer con enfoque en backend. Python, FastAPI, PostgreSQL, React, TypeScript, Docker.",
      navMenu: "Abrir menú",
      navAbout: "Sobre mí",
      navServices: "Servicios",
      navSkills: "Tecnologías",
      navProjects: "Proyectos",
      navContact: "Contacto",
      heroRole: "Full-Stack Developer",
      heroFocus: "Enfoque en backend",
      heroCtaServices: "Ver servicios",
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
        "Aprendizaje estructurado: analizo sistemas existentes y aplico ingeniería inversa a sus patrones, arquitectura y decisiones de diseño, validándolos después en mis propios proyectos.",
      aboutCertMeta: "University of Helsinki · 5 ECTS · Julio 2026",
      snippetModular: "modular",
      servicesTitle: "Qué puedo desarrollar para ti",
      servicesIntro:
        "Disponible para proyectos nuevos y para aplicaciones existentes: páginas web, frontend, backend o un producto completo.",
      servicesExamplesLabel: "Ejemplos de trabajo que puedes contratar",
      servicesConsult: "Consultar este servicio",
      servicesRefDemo: "Demo conceptual",
      servicesRefRepo: "Repositorio",
      serviceWebTitle: "Páginas web",
      serviceWebDesc:
        "Landing pages, portafolios y sitios para negocios, servicios o productos. Presentación de contenido, adaptación a móvil y vías de contacto.",
      serviceWebEx1: "Una landing de producto o servicio",
      serviceWebEx2: "Un portafolio personal o de estudio",
      serviceWebEx3: "Un sitio de negocio con contacto",
      serviceFrontendTitle: "Desarrollo frontend",
      serviceFrontendDesc:
        "Implementación de diseños, interfaces responsive, componentes interactivos y conexión con APIs.",
      serviceFrontendEx1: "Implementar un diseño existente",
      serviceFrontendEx2: "Componentes interactivos y flujos en el cliente",
      serviceFrontendEx3: "Conectar un frontend a una API",
      serviceBackendTitle: "Desarrollo backend",
      serviceBackendDesc:
        "APIs, bases de datos, autenticación, permisos, integraciones y automatizaciones.",
      serviceBackendEx1: "APIs REST y modelos de datos",
      serviceBackendEx2: "Autenticación, roles y control de acceso",
      serviceBackendEx3: "Webhooks, email e integraciones con terceros",
      serviceFullstackTitle: "Aplicaciones full stack",
      serviceFullstackDesc:
        "Desarrollo integrado de frontend y backend para aplicaciones con usuarios, datos y procesos propios.",
      serviceFullstackEx1: "Una aplicación con cuentas, datos y flujos de trabajo",
      serviceFullstackEx2: "Una consola administrativa conectada a una API",
      serviceFullstackEx3: "Funcionalidades de extremo a extremo entre cliente y servidor",
      servicesQuote:
        "Cada proyecto se cotiza según su alcance y complejidad. También estoy disponible para colaboraciones por horas.",
      servicesProcessTitle: "Cómo trabajamos",
      servicesProcess1: "Me cuentas tu idea o necesidad.",
      servicesProcess2: "Definimos alcance, entregables, precio y plazo.",
      servicesProcess3: "Desarrollo con revisiones acordadas.",
      servicesProcess4: "Entrega según lo establecido en la propuesta.",
      servicesFaqTitle: "Preguntas frecuentes",
      servicesFaq1Q: "¿Puedes mejorar una web o aplicación existente?",
      servicesFaq1A:
        "Sí. Puedo revisar el proyecto y proponer mejoras, nuevas funcionalidades o integraciones según su estado y necesidades.",
      servicesFaq2Q: "¿Cómo se determina el precio y el plazo?",
      servicesFaq2A:
        "Dependen del alcance, la complejidad y el material disponible; se acuerdan antes de comenzar.",
      servicesFaq3Q: "¿Qué incluye la entrega?",
      servicesFaq3A:
        "La propuesta especificará código, publicación, documentación y soporte cuando correspondan. Los gastos externos, como dominio, alojamiento o servicios de terceros, se detallarán por separado.",
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
      projImpactFrameDesc:
        "Landing interactiva y bilingüe para un teclado mecánico conceptual. Estética industrial, imágenes por capas, animaciones ligadas al scroll y controles de personalización visual para presentar arquitectura, materiales y funcionamiento.",
      projLowHoursDesc:
        "Landing bilingüe para una cafetería nocturna ficticia, con identidad editorial y ambiente lo-fi. Fotografía de noches lluviosas, animaciones suaves, menú, galería y un reproductor musical alrededor de «Stay a little longer».",
      projKairoDesc:
        "Landing conceptual para una marca ficticia de relojería: experiencia promocional de un solo producto, estética editorial oscura, en React 19, TypeScript y Vite, sin router, store ni backend. CSS propio y Framer Motion controlan revelados, órbitas del hero y el selector de acabados; modal accesible por teclado, movimiento reducido y despliegue en GitHub Pages.",
      projFintraderDesc:
        "FinTrader Hub es un backend fintech modular construido con FastAPI, PostgreSQL, Redis, Celery y SQLAlchemy. Ofrece gestión de portafolios, seguimiento de operaciones, sincronización de datos de mercado, analítica de riesgo, alertas automatizadas, autenticación JWT, workers en segundo plano y despliegue con Docker.",
      projMomoRamenDesc:
        "Demo frontend de un restaurante japonés ficticio: identidad, platos e historia de la casa en una SPA visual cálida, pastel y kawaii, con React, Vite, Tailwind y HashRouter. Permite recorrer el menú y un flujo de reservas solo en cliente; no procesa pedidos, reservas ni pagos reales. La estructura puede ampliarse con backend, base de datos y notificaciones.",
      projRagCoreDesc:
        "Servicio de Retrieval-Augmented Generation con pipeline de embeddings, integración con LLMs vía OpenRouter y recuperación semántica de información contextual.",
      projEcomDesc:
        "Backend completo de e-commerce listo para integración con frontend. Gestión de productos, usuarios y órdenes con autenticación JWT, carrito, control de stock y panel administrativo.",
      projNotesDesc:
        "API de notas con autenticación por sesión, notas compartidas entre usuarios y sistema de permisos básico. Desplegada en producción.",
      contactTitle: "Contacto",
      contactStatus: "Disponible para oportunidades profesionales y proyectos freelance",
      contactEmailPrimary: "Email · principal",
      contactEmailSecondary: "Email · secundario",
      contactDownloadCv: "Descargar PDF",
      inquiryTitle: "Consulta de proyecto",
      inquiryIntro: "Envía una descripción breve de lo que necesitas. Respondo al correo que indiques.",
      inquiryName: "Nombre",
      inquiryEmail: "Correo",
      inquiryService: "Servicio de interés",
      inquiryServicePlaceholder: "Elige una opción",
      inquiryServiceWeb: "Páginas web",
      inquiryServiceFrontend: "Desarrollo frontend",
      inquiryServiceBackend: "Desarrollo backend",
      inquiryServiceFullstack: "Aplicaciones full stack",
      inquiryServiceGuidance: "Necesito orientación",
      inquiryMessage: "¿Qué necesitas desarrollar?",
      inquirySubmit: "Enviar consulta",
      inquirySending: "Enviando…",
      inquiryCopy: "Copiar",
      inquiryCopied: "Copiado",
      inquiryCopyFail: "No se pudo copiar",
      inquiryEmailFallback: "Enviar por correo",
      inquiryAnnounceService: "Servicio seleccionado. Continúa en el formulario de consulta.",
      inquiryRequired: "Este campo es obligatorio.",
      inquiryEmailInvalid: "Introduce un correo válido.",
      inquiryTurnstileLabel: "Verificación",
      inquiryTurnstilePending: "Espera a que termine la verificación.",
      inquiryTurnstileMissing: "Completa la verificación antes de enviar.",
      inquiryTurnstileError: "La verificación falló. Inténtalo de nuevo.",
      inquiryTurnstileExpired: "La verificación caducó. Complétala de nuevo.",
      inquiryTurnstileLoadError: "No se pudo cargar la verificación. Usa el enlace de correo.",
      inquirySuccess: "Consulta enviada. Responderé al correo que indicaste.",
      inquiryErrorGeneric:
        "No se pudo enviar la consulta. Inténtalo más tarde o usa el enlace de correo.",
      inquiryErrorNetwork:
        "No se pudo alcanzar el servicio del formulario. Revisa tu conexión o usa el enlace de correo.",
      inquiryErrorLimit:
        "El servicio del formulario está limitando envíos por ahora. Usa el enlace de correo.",
      inquirySubjectPrefix: "Consulta",
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
