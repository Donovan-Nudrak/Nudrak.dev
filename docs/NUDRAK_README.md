# NUDRAK.dev — Estructura de contenido aprobada

## Objetivo

Actualizar `nudrak.dev` para mejorar su posicionamiento profesional, orientándolo tanto a oportunidades laborales como a proyectos freelance.

La prioridad inicial será:

1. Optimizar contenido.
2. Mejorar posicionamiento SEO.
3. Después trabajar UI/UX.

El posicionamiento profesional será:

**Full-Stack Developer con enfoque en Backend.**

No se utilizarán etiquetas de seniority como:

* Junior
* Mid
* Senior
* Expert

El nivel simplemente se omitirá.

---

# 1. Presentación / Hero

Se conservará la identidad principal:

```text
{ NUDRAK }
```

El rol cambiará a una presentación Full-Stack con énfasis en backend.

Conceptualmente:

```text
{ NUDRAK }

Full-Stack Developer
Backend-focused
```

La presentación deberá comunicar rápidamente:

* Desarrollo Full-Stack.
* Especialización/preferencia por Backend.
* Tecnologías principales.
* Capacidad para construir aplicaciones completas.

El stack principal que puede utilizarse como referencia visual o textual:

```text
Python · FastAPI · PostgreSQL · React · TypeScript · Docker
```

No se mostrará ningún nivel de seniority.

---

# 2. Sobre mí / About Me

La sección `Sobre mí` tendrá cinco bloques conceptuales.

## 2.1 Qué soy

Definición profesional principal:

```text
Full-Stack Developer con enfoque en Backend.
```

No utilizar:

```text
Junior Full-Stack Developer
Senior Developer
Expert Developer
```

El seniority se omite completamente.

---

## 2.2 Qué hago

Describir las clases de sistemas y funcionalidades que puedo construir.

Ejemplos:

* Aplicaciones web.
* APIs REST.
* Bases de datos.
* Sistemas de autenticación.
* Autorización y control de acceso.
* Integraciones con servicios externos.
* Sistemas de pagos.
* Webhooks.
* Automatizaciones.
* Sistemas administrativos.
* Servicios relacionados con IA/RAG.
* Frontend conectado con servicios backend.

El objetivo no será enumerar tecnologías, sino explicar capacidades.

---

## 2.3 Cómo se construyen — Ingeniería

Explicar los principios técnicos utilizados al desarrollar sistemas.

Ideas principales:

* Arquitecturas modulares.
* Separación de responsabilidades.
* Separación entre:

  * transporte / HTTP
  * lógica de negocio
  * acceso a datos
* Mantenibilidad.
* Validación explícita.
* Seguridad.
* Trazabilidad de operaciones.
* Manejo predecible de errores.
* Manejo controlado de fallos en servicios externos.
* Diseño preparado para extenderse y evolucionar.

Principio general:

```text
routes → HTTP / transporte
services → lógica de negocio
repositories → acceso a datos
```

El mensaje principal será que el objetivo no es solamente escribir código funcional, sino construir sistemas que puedan evolucionar de forma ordenada.

---

## 2.4 Cómo trabajo — Metodología

Separar la metodología de trabajo de la arquitectura del software.

Conceptualmente:

```text
Análisis
    ↓
Planificación
    ↓
Implementación
    ↓
Validación
    ↓
Pruebas
    ↓
Revisión
```

Esta sección explicará el proceso utilizado antes, durante y después de implementar una solución.

La metodología exacta se definirá posteriormente con mayor detalle.

---

## 2.5 Aprendizaje

Presentar el aprendizaje como una característica profesional, no como una limitación.

Conceptos principales:

* Aprendizaje autodidacta estructurado.
* Formación continua.
* Análisis de sistemas existentes.
* Ingeniería inversa para comprender:

  * patrones
  * arquitectura
  * decisiones de diseño
* Experimentación mediante proyectos.

Formación relevante:

```text
Full Stack Open
University of Helsinki
5 ECTS
Julio 2026
```

El certificado refuerza especialmente el posicionamiento como Full-Stack Developer.

---

## Orientación profesional

No indicar:

```text
Busco mi primer empleo.
No tengo experiencia profesional.
Busco una oportunidad Junior.
```

La disponibilidad profesional se comunicará principalmente en `Contacto`.

Por ejemplo:

```text
Disponible para oportunidades profesionales y proyectos freelance.
```

Esto comunica disponibilidad sin introducir innecesariamente una discusión sobre años de experiencia.

---

# 3. Stack / Skills

La sección tendrá una estructura por categorías.

No será una colección indiscriminada de logos.

## Core Stack

Las tecnologías principales que representan el perfil:

```text
Python
FastAPI
PostgreSQL
React
TypeScript
Docker
```

Estas tecnologías pueden recibir mayor peso visual.

---

## Backend

```text
Python
FastAPI
Flask
Pydantic
SQLAlchemy
Alembic
```

---

## Frontend

```text
React
TypeScript
Vite
React Router
TanStack Query
Zustand
```

---

## Databases & Cache

```text
PostgreSQL
SQLite
Redis
```

---

## Infrastructure / DevOps

```text
Docker
Docker Compose
GitHub Actions
Linux
Git
```

---

## Auth & Security

```text
JWT
HTTP-only Cookies
bcrypt
RBAC
Rate Limiting
```

---

## Integrations

```text
Stripe
AWS S3
Resend
Gemini
OpenRouter API
```

---

## Elementos que NO estarán en Stack

Eliminar la categoría actual:

```text
AI Workflow
```

Por tanto no utilizar como tecnologías principales:

```text
Cursor
ChatGPT
Claude
```

Son herramientas de trabajo, no parte del stack tecnológico que se desea vender profesionalmente.

---

También retirar de `Stack`:

```text
Clean Architecture
Layered Architecture
Repository Pattern
REST API
```

Estos conceptos pasarán a `Sobre mí → Cómo se construyen`, porque describen arquitectura y criterios de ingeniería, no herramientas.

---

## Tecnologías secundarias

Tecnologías como:

```text
Celery
pgvector
SlowAPI
OpenAPI
CORS
```

no necesitan aparecer necesariamente en el Stack principal.

Pueden mostrarse dentro de los proyectos específicos donde fueron utilizadas.

---

# 4. Proyectos

Los proyectos no tendrán todos el mismo peso.

La estructura será:

```text
PROYECTOS DESTACADOS

01 — CyberWare
02 — Business Automation Agent
03 — Task Manager API

OTROS PROYECTOS

E-Commerce API RAG
FinTrader Hub
RAG Core Service
E-Commerce API
Notes API
```

---

# 4.1 CyberWare

Proyecto principal del portafolio.

Su función será demostrar capacidad Full-Stack y construcción de sistemas relativamente complejos.

## Stack principal

```text
React
TypeScript
FastAPI
PostgreSQL
Redis
Docker Compose
```

## Capacidades demostradas

* Aplicación e-commerce completa.
* Catálogo.
* Búsqueda.
* Carrito.
* Órdenes.
* Inventario.
* Consola administrativa independiente.
* Autenticación JWT mediante cookies.
* Access tokens.
* Refresh tokens.
* RBAC.
* Usuarios, moderadores y administradores.
* Integración con Stripe.
* Pagos.
* Webhooks firmados.
* Reembolsos.
* Restock.
* Emails transaccionales.
* AWS S3.
* Redis.
* Gemini.
* Búsqueda semántica.
* Chatbot.
* Docker Compose.
* Alembic.
* Auditoría administrativa.
* Manejo controlado de servicios opcionales.

## Objetivo dentro del portfolio

Demostrar:

```text
Full-Stack
+
Backend complejo
+
Integraciones
+
Infraestructura
```

---

# 4.2 Business Automation Agent

Proyecto orientado a automatización e integraciones empresariales.

## Stack

```text
FastAPI
PostgreSQL
Redis
Celery
Gemini
Stripe
```

## Flujo principal

```text
Stripe Webhook
      ↓
Backend
      ↓
Rule Engine / Gemini
      ↓
Automated Actions
```

Acciones posibles:

* Generación de PDF.
* Subida a AWS S3.
* Envío de emails mediante Resend.

## Objetivo dentro del portfolio

Demostrar:

```text
Automatización
+
Event-driven systems
+
Integraciones
+
Procesamiento backend
```

Tiene especial valor para posicionamiento freelance porque representa automatización de procesos de negocio.

---

# 4.3 Task Manager API

Proyecto orientado a demostrar ingeniería backend.

## Stack

```text
FastAPI
PostgreSQL
SQLAlchemy
Alembic
Docker
GitHub Actions
```

## Capacidades

* Autenticación JWT.
* RBAC jerárquico.
* Roles desde viewer hasta owner.
* Arquitectura por capas.
* Routers.
* Services.
* Repositories.
* Soft delete.
* Auditoría.
* Paginación.
* Filtros.
* Health checks.
* Readiness probes.
* CI.
* Docker.

## Objetivo dentro del portfolio

Demostrar:

```text
Arquitectura
+
Backend
+
Seguridad
+
CI
+
Mantenibilidad
```

---

# 4.4 Otros proyectos

Estos proyectos seguirán siendo visibles, pero con menor peso.

## E-Commerce API RAG

```text
FastAPI
PostgreSQL
Redis
pgvector
Gemini
RAG
```

---

## FinTrader Hub

```text
FastAPI
PostgreSQL
Redis
Celery
Docker
SQLAlchemy
```

---

## RAG Core Service

```text
FastAPI
OpenRouter API
SQLite
Pydantic
```

---

## E-Commerce API

```text
FastAPI
PostgreSQL
Redis
SQLAlchemy
Docker
```

---

## Notes API

```text
Flask
SQLite
SQLAlchemy
```

Además cuenta con despliegue funcional en producción.

---

## Jobs API

Por ahora no será incluido dentro de la selección principal del portafolio.

La información disponible actualmente es demasiado limitada frente a los demás proyectos.

---

# 5. Contacto

La sección será deliberadamente simple.

Canales principales:

```text
Email
GitHub
LinkedIn
CV
```

También deberá comunicar disponibilidad.

Conceptualmente:

```text
Disponible para oportunidades profesionales
y proyectos freelance.
```

No mencionar seniority ni falta de experiencia.

---

# Arquitectura general del sitio

La estructura aprobada queda:

```text
{ NUDRAK }
Full-Stack Developer · Backend Focus

↓

Sobre mí
    ├── Qué soy
    ├── Qué hago
    ├── Cómo se construyen
    ├── Cómo trabajo
    └── Aprendizaje

↓

Stack / Skills
    ├── Core Stack
    ├── Backend
    ├── Frontend
    ├── Databases & Cache
    ├── Infrastructure / DevOps
    ├── Auth & Security
    └── Integrations

↓

Proyectos
    ├── Featured
    │   ├── CyberWare
    │   ├── Business Automation Agent
    │   └── Task Manager API
    │
    └── Other Projects

↓

Contacto
```

---

# Principio general de posicionamiento

El portafolio debe comunicar:

```text
Full-Stack Developer
        +
Backend-focused
        +
Arquitectura
        +
Aplicaciones reales
        +
Integraciones
        +
Automatización
```

No debe depender de una etiqueta de seniority para transmitir capacidad.

La evidencia principal serán:

* Proyectos.
* Arquitectura utilizada.
* Tecnologías.
* Integraciones.
* Metodología de trabajo.
* Formación.
* Capacidad para construir sistemas completos.

