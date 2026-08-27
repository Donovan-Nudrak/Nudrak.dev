# NUDRAK.dev

Portafolio personal de **Donovan Agustin Alvarez** — Backend Engineer.

Sitio estático con estética cyberbrutalista y terminal, orientado a presentar perfil técnico, stack y proyectos backend.

**Live:** [https://nudrak.dev](https://nudrak.dev)

---

## Características

- **Single page** con secciones: Hero, About, Skills, Projects, Contact
- **Bilingüe (EN / ES)** con persistencia en `localStorage`
- **Terminal interactiva** en el hero con efecto typewriter y salida `neofetch` (logo Arch ASCII)
- **Diseño cyberbrutalista**: formas shard angulares, paleta cian / rojo / amarillo / verde, tipografías Orbitron y Rajdhani
- **Animaciones** con respeto a `prefers-reduced-motion`
- **Efecto TV static** al presionar botones
- **Responsive** con navegación móvil
- **CV descargable** en PDF (EN / ES)

---

## Stack

| Capa | Tecnología |
|------|------------|
| Markup | HTML5 |
| Estilos | CSS3 (variables, clip-path, grid/flex) |
| Scripts | JavaScript vanilla (sin build step) |
| Fuentes | Inter, JetBrains Mono, Orbitron, Rajdhani (Google Fonts) |
| Deploy | GitHub Pages |

No hay dependencias npm ni proceso de compilación.

---

## Estructura del proyecto

```
Nudrak.dev/
├── index.html              # Página principal
├── CNAME                   # Dominio custom (nudrak.dev)
├── assets/
│   ├── CV-EN-Donovan-Agustin-Alvarez.pdf   # CV en inglés
│   └── CV-ES-Donovan-Agustin-Alvarez.pdf   # CV en español
├── scripts/
│   ├── i18n.js             # Traducciones EN/ES
│   ├── main.js             # Nav, scroll, copiar email, efecto botones
│   ├── animations.js       # Reveal, typewriter, barras Linux
│   ├── title-effects.js    # Glitch del título al hover
│   └── arch.txt            # Logo ASCII para neofetch
└── styles/
    ├── main.css            # Design system y layout
    └── i18n.css            # Selector de idioma
```

---

## Desarrollo local

Clona el repositorio y sirve la carpeta con cualquier servidor estático:

```bash
git clone git@github.com:Donovan-Nudrak/Nudrak.dev.git
cd Nudrak.dev

# Python
python -m http.server 8080

# Node (npx, sin instalar dependencias en el repo)
npx serve .
```

Abre [http://localhost:8080](http://localhost:8080).

---

## Despliegue

El sitio se publica en **GitHub Pages** desde la rama `main`. El archivo `CNAME` apunta el dominio custom `nudrak.dev`.

Tras un push a `main`, los cambios suelen reflejarse en producción en unos minutos.

---

## Personalización rápida

| Qué cambiar | Dónde |
|-------------|--------|
| Textos EN/ES | `scripts/i18n.js` |
| Proyectos y enlaces | `index.html` → sección `#projects` |
| Colores y estilos | `styles/main.css` → variables en `:root` |
| Comandos de terminal | `scripts/animations.js` |
| CV (EN) | Reemplazar `assets/CV-EN-Donovan-Agustin-Alvarez.pdf` |
| CV (ES) | Reemplazar `assets/CV-ES-Donovan-Agustin-Alvarez.pdf` |

---

## Licencia

[MIT](LICENSE) — Copyright (c) 2026 Nudrak

---

## Contacto

- **Web:** [nudrak.dev](https://nudrak.dev)
- **Email:** Nudrak@protonmail.com
- **GitHub:** [@Donovan-Nudrak](https://github.com/Donovan-Nudrak)
