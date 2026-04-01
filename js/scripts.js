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
// Sealed envelope intro
// =========================
(function () {
  const opening = document.getElementById("mailOpening");
  const envelope = document.getElementById("sealedEnvelope");
  const seal = document.getElementById("sealedSeal");
  const hint = document.getElementById("sealedHint");

  if (!opening || !envelope || !seal || !hint) return;

  document.body.classList.add("mail-lock");

  let isOpening = false;

  function hideOpening() {
    opening.classList.add("hidden");
    document.body.classList.remove("mail-lock");
  }

  function openEnvelope() {
    if (isOpening) return;
    isOpening = true;

    hint.textContent = "Đang mở thiệp...";
    envelope.classList.add("is-opening");

    setTimeout(() => {
      hideOpening();
    }, 900);
  }

  seal.addEventListener("click", openEnvelope);
  seal.addEventListener("touchend", function (e) {
    e.preventDefault();
    openEnvelope();
  }, { passive: false });
})();
