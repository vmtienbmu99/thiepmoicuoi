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
    const cardMove = 215 - currentProgress * 295;

    flap.style.transform = `rotateX(${flapRotate}deg)`;
    card.style.transform = `translateX(-50%) translateY(${cardMove}px)`;

    if (currentProgress < 0.15) {
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
    flap.style.transition = "transform .55s ease";
    card.style.transition = "transform .55s ease";
    render(1);
  }

  function closeFully() {
    opened = false;
    flap.style.transition = "transform .45s ease";
    card.style.transition = "transform .45s ease";
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
      // vuốt lên để mở
      progress = clamp((-deltaY) / 220, 0, 1);
    } else {
      // vuốt xuống để đóng
      progress = clamp(1 - deltaY / 220, 0, 1);
    }

    render(progress);
  }

  function pointerUp() {
    if (!dragging) return;
    dragging = false;

    if (!opened) {
      if (currentProgress > 0.35) {
        openFully();
      } else {
        closeFully();
      }
    } else {
      if (currentProgress < 0.65) {
        closeFully();
      } else {
        openFully();
      }
    }
  }

  // Touch events
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

  // Mouse events
  scene.addEventListener("mousedown", (e) => {
    pointerDown(e.clientY);
  });

  window.addEventListener("mousemove", (e) => {
    pointerMove(e.clientY);
  });

  window.addEventListener("mouseup", pointerUp);

  // Click to enter page after opened
  opening.addEventListener("click", (e) => {
    if (!opened) return;
    if (scene.contains(e.target)) {
      hideOpening();
    }
  });

  // Initial render
  render(0);
});
