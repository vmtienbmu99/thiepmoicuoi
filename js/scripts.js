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
(function () {
  const opening = document.getElementById("mailOpening");
  const scene = document.getElementById("inviteScene");
  const flap = document.getElementById("luxFlap");
  const card = document.getElementById("luxCard");
  const hint = document.getElementById("mailHint");

  if (!opening || !scene || !flap || !card || !hint) return;

  document.body.classList.add("mail-lock");

  let startY = 0;
  let currentProgress = 0;
  let dragging = false;
  let opened = false;

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function render(progress) {
    currentProgress = clamp(progress, 0, 1);

    const flapRotate = currentProgress * -180;

    // bản to hơn, che đúng hơn
    const cardMove = 290 - currentProgress * 345;

    flap.style.transform = `rotateX(${flapRotate}deg)`;
    card.style.transform = `translateX(-50%) translateY(${cardMove}px)`;

    if (currentProgress < 0.12) {
      hint.textContent = "Vuốt lên để mở thiệp";
    } else if (currentProgress < 0.95) {
      hint.textContent = "Thả tay để mở tiếp";
    } else {
      hint.textContent = "Vuốt xuống để đóng • chạm để vào thiệp";
    }
  }

  function hideOpening() {
    opening.classList.add("hidden");
    document.body.classList.remove("mail-lock");
  }

  function openFully() {
    opened = true;
    flap.style.transition = "transform .45s ease";
    card.style.transition = "transform .45s ease";
    render(1);
  }

  function closeFully() {
    opened = false;
    flap.style.transition = "transform .35s ease";
    card.style.transition = "transform .35s ease";
    render(0);
  }

  function pointerDown(clientY) {
    dragging = true;
    startY = clientY;
    flap.style.transition = "none";
    card.style.transition = "none";
  }

  function pointerMove(clientY) {
    if (!dragging) return;

    const deltaY = clientY - startY;
    let progress;

    if (!opened) {
      progress = clamp((-deltaY) / 260, 0, 1);
    } else {
      progress = clamp(1 - deltaY / 260, 0, 1);
    }

    render(progress);
  }

  function pointerUp() {
    if (!dragging) return;
    dragging = false;

    if (!opened) {
      if (currentProgress > 0.32) {
        openFully();
      } else {
        closeFully();
      }
    } else {
      if (currentProgress < 0.68) {
        closeFully();
      } else {
        openFully();
      }
    }
  }

  scene.addEventListener(
    "touchstart",
    (e) => {
      if (!e.touches.length) return;
      pointerDown(e.touches[0].clientY);
    },
    { passive: true }
  );

  scene.addEventListener(
    "touchmove",
    (e) => {
      if (!e.touches.length) return;
      pointerMove(e.touches[0].clientY);
    },
    { passive: true }
  );

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
    if (scene.contains(e.target)) {
      hideOpening();
    }
  });

  render(0);
})();
