(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Scroll reveal ── */
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (revealElements.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          showReveal(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    function showReveal(el) {
      const delay = el.getAttribute("data-reveal-delay") || "0";
      el.style.transitionDelay = delay + "ms";
      el.classList.add("is-visible");
    }

    revealElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        showReveal(el);
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ── Hero stack highlight cycle ── */
  const techItems = document.querySelectorAll(".hero__tech");

  if (techItems.length && !prefersReducedMotion) {
    let activeIndex = 0;
    techItems[activeIndex].classList.add("is-active");

    setInterval(function () {
      techItems[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % techItems.length;
      techItems[activeIndex].classList.add("is-active");
    }, 2200);
  }

  if (prefersReducedMotion) {
    setStaticTerminal("terminal-output", "$ pacman -Syu && uvicorn main:app --reload");
    setStaticTerminal("contact-terminal-output", "$ cat contact.txt");
    return;
  }

  let archLogo = "";

  fetch("scripts/arch.txt")
    .then(function (res) {
      return res.ok ? res.text() : Promise.reject();
    })
    .then(function (text) {
      archLogo = text
        .replace(/^\s*\n/, "")
        .split("\n")
        .map(function (line) {
          return line.replace(/\s+$/, "");
        })
        .join("\n");
    })
    .catch(function () {
      archLogo = "";
    });

  function getArchLogo() {
    if (archLogo) return archLogo;
    return "      /\\\n     /  \\\n    / arch \\\n   /________\\";
  }

  function setNeofetchMode(output, active) {
    const body = output.closest(".code-terminal__body");
    if (body) body.classList.toggle("is-neofetch-output", active);
  }

  initTypewriter("terminal-output", [
    "$ uvicorn main:app --reload",
    "$ docker compose up -d",
    "$ pacman -Syu",
    "$ neofetch",
    "$ cat /etc/os-release",
    "$ yay -Qs fastapi",
    "$ ls ~/projects/",
    "$ systemctl status nudrak-api",
    "$ git push origin main",
    "$ reflector --latest 5 --sort rate",
  ], {
    deleteSpeed: 22,
    typeSpeed: 45,
    pauseEnd: 1800,
    pauseStart: 500,
    onCompleteLine: function (line, el) {
      if (line === "$ neofetch") {
        el.textContent =
          line +
          "\n" +
          getArchLogo() +
          "\nOS: Arch Linux x86_64 · zsh · rolling";
        setNeofetchMode(el, true);
        return true;
      }
      if (line === "$ cat /etc/os-release") {
        el.textContent =
          line +
          '\nNAME="Arch Linux"\nID=arch\nPRETTY_NAME="Arch Linux"';
        return true;
      }
      return false;
    },
    multilinePause: function (line) {
      return line === "$ neofetch" ? 3200 : 1800;
    },
  });

  initTypewriter("contact-terminal-output", [
    "$ cat contact.txt",
    "$ echo $EMAIL",
    "$ cat /etc/hostname",
    "$ pacman -Qi python",
    "$ curl -I wiki.archlinux.org",
    "$ ssh-keygen -lf ~/.ssh/id_ed25519.pub",
    "$ curl -I github.com/Donovan-Nudrak",
  ], {
    deleteSpeed: 18,
    typeSpeed: 38,
    pauseEnd: 2200,
    pauseStart: 600,
    onCompleteLine: function (line, el) {
      if (line === "$ cat contact.txt") {
        el.textContent = line + "\nemail: Nudrak@protonmail.com\ngithub: Donovan-Nudrak";
        return true;
      }
      if (line === "$ echo $EMAIL") {
        el.textContent = line + "\nNudrak@protonmail.com";
        return true;
      }
      if (line === "$ cat /etc/hostname") {
        el.textContent = line + "\nnudrak-arch";
        return true;
      }
      if (line === "$ pacman -Qi python") {
        el.textContent = line + "\nName        : python\nVersion     : 3.12.x-1\nInstalled By: pacman";
        return true;
      }
      return false;
    },
  });

  animateLinuxBars();

  function setStaticTerminal(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function initTypewriter(elementId, commands, options) {
    const output = document.getElementById(elementId);
    if (!output || !commands.length) return;

    const deleteSpeed = options.deleteSpeed || 22;
    const typeSpeed = options.typeSpeed || 45;
    const pauseEnd = options.pauseEnd || 1800;
    const pauseStart = options.pauseStart || 500;

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseUntil = 0;
    let showingMultiline = false;

    function typeTick(now) {
      if (now < pauseUntil) {
        requestAnimationFrame(typeTick);
        return;
      }

      const current = commands[commandIndex];

      if (showingMultiline) {
        if (current === "$ neofetch") {
          setNeofetchMode(output, false);
        }
        showingMultiline = false;
        isDeleting = true;
        pauseUntil = now + pauseEnd;
        requestAnimationFrame(typeTick);
        return;
      }

      if (!isDeleting && charIndex <= current.length) {
        output.textContent = current.slice(0, charIndex);
        charIndex++;
        pauseUntil = now + (charIndex === 1 ? 400 : typeSpeed);
      } else if (!isDeleting && charIndex > current.length) {
        if (options.onCompleteLine && options.onCompleteLine(current, output)) {
          showingMultiline = true;
          const hold = options.multilinePause ? options.multilinePause(current) : pauseEnd;
          pauseUntil = now + hold;
        } else {
          isDeleting = true;
          pauseUntil = now + pauseEnd;
        }
      } else if (isDeleting && charIndex >= 0) {
        const lines = output.textContent.split("\n");
        output.textContent = lines[0].slice(0, charIndex);
        charIndex--;
        pauseUntil = now + deleteSpeed;
      } else {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        charIndex = 0;
        pauseUntil = now + pauseStart;
      }

      requestAnimationFrame(typeTick);
    }

    requestAnimationFrame(typeTick);
  }

  function animateLinuxBars() {
    const fills = document.querySelectorAll(".linux-bars__fill");
    if (!fills.length) return;

    setInterval(function () {
      fills.forEach(function (fill) {
        const load = 15 + Math.floor(Math.random() * 70);
        fill.style.setProperty("--load", load + "%");
      });
    }, 2800);
  }
})();
