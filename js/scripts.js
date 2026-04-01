window.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Navbar shrink
  // =========================
  const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) return;

    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  navbarShrink();
  document.addEventListener("scroll", navbarShrink);

  // =========================
  // Close responsive menu on nav link click
  // =========================
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = Array.from(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );

  responsiveNavItems.forEach((responsiveNavItem) => {
    responsiveNavItem.addEventListener("click", () => {
      const navbarResponsive = document.querySelector("#navbarResponsive");
      if (
        navbarToggler &&
        navbarResponsive &&
        window.getComputedStyle(navbarToggler).display !== "none" &&
        navbarResponsive.classList.contains("show")
      ) {
        navbarToggler.click();
      }
    });
  });

// =========================
// Luxury invitation opening
// =========================
// =========================
// Sealed envelope intro
// =========================
(function () {
  const opening = document.getElementById("mailOpening");
  const scene = document.getElementById("sealedScene");
  const envelope = document.getElementById("sealedEnvelope");
  const flap = document.getElementById("sealedFlap");
  const paper = envelope ? envelope.querySelector(".sealed-envelope__paper") : null;
  const seal = document.getElementById("sealedSeal");
  const hint = document.getElementById("sealedHint");

  if (!opening || !scene || !envelope || !flap || !paper || !seal || !hint) return;

  document.body.classList.add("mail-lock");

  let progress = 0;
  let dragging = false;
  let startY = 0;
  let opened = false;

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function render(p) {
    progress = clamp(p, 0, 1);

    const flapRotate = -180 * progress;
    const paperMove = window.innerWidth <= 640
      ? 232 - progress * 250
      : 285 - progress * 320;

    flap.style.transform = `rotateX(${flapRotate}deg)`;
    paper.style.transform = `translateX(-50%) translateY(${paperMove}px)`;

    if (progress < 0.12) {
      hint.textContent = "Chạm vào dấu niêm để mở";
    } else if (progress < 0.95) {
      hint.textContent = "Vuốt lên để mở tiếp";
    } else {
      hint.textContent = "Chạm để vào thiệp";
    }

    if (progress > 0.02) {
      envelope.classList.add("is-opening");
    } else {
      envelope.classList.remove("is-opening");
    }
  }

  function hideOpening() {
    opening.classList.add("hidden");
    document.body.classList.remove("mail-lock");
  }

  function openFully() {
    opened = true;
    flap.style.transition = "transform .48s ease";
    paper.style.transition = "transform .48s ease";
    render(1);
  }

  function closeFully() {
    opened = false;
    flap.style.transition = "transform .36s ease";
    paper.style.transition = "transform .36s ease";
    render(0);
  }

  seal.addEventListener("click", () => {
    if (opened) return;
    openFully();
  });

  function pointerDown(clientY) {
    if (!opened) {
      dragging = true;
      startY = clientY;
      flap.style.transition = "none";
      paper.style.transition = "none";
    }
  }

  function pointerMove(clientY) {
    if (!dragging) return;
    const deltaY = clientY - startY;
    const p = clamp((-deltaY) / 240, 0, 1);
    render(Math.max(progress, p));
  }

  function pointerUp() {
    if (!dragging) return;
    dragging = false;
    if (progress > 0.28) {
      openFully();
    } else {
      closeFully();
    }
  }

  scene.addEventListener("touchstart", (e) => {
    if (!e.touches.length) return;
    pointerDown(e.touches[0].clientY);
  }, { passive: true });

  scene.addEventListener("touchmove", (e) => {
    if (!e.touches.length) return;
    pointerMove(e.touches[0].clientY);
  }, { passive: true });

  scene.addEventListener("touchend", pointerUp);

  scene.addEventListener("mousedown", (e) => {
    pointerDown(e.clientY);
  });

  window.addEventListener("mousemove", (e) => {
    pointerMove(e.clientY);
  });

  window.addEventListener("mouseup", pointerUp);

  opening.addEventListener("click", (e) => {
    if (!opened) return;
    if (scene.contains(e.target) && e.target !== seal) {
      hideOpening();
    }
  });

  render(0);
})();
