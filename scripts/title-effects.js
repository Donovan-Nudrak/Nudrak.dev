(function () {
  const title = document.getElementById("hero-title");
  const wrap = title && title.querySelector(".hero__title-wrap");

  if (!title || !wrap) return;

  function setCyberpunk(active) {
    title.classList.toggle("is-cyberpunk", active);
  }

  wrap.addEventListener("mouseenter", function () {
    setCyberpunk(true);
  });

  wrap.addEventListener("mouseleave", function () {
    setCyberpunk(false);
  });

  wrap.addEventListener("focusin", function () {
    setCyberpunk(true);
  });

  wrap.addEventListener("focusout", function () {
    setCyberpunk(false);
  });
})();
