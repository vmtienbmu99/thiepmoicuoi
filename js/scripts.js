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

 /* =========================
   LUXURY ENVELOPE OPENING
========================= */
body.mail-lock {
  overflow: hidden;
}

.mail-opening {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity .5s ease, visibility .5s ease;
}

.mail-opening.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.mail-opening__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top, rgba(255,255,255,.96), transparent 30%),
    linear-gradient(180deg, #f7f2f0 0%, #f6f0ee 45%, #f1e8e5 100%);
}

.invite-scene {
  position: relative;
  width: min(560px, calc(100vw - 32px));
  height: 720px;
  z-index: 2;
  touch-action: none;
  user-select: none;
}

.mail-hint {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 22px;
  border-radius: 999px;
  background: rgba(255,255,255,.75);
  border: 1px solid rgba(120, 92, 96, .08);
  color: #a5797d;
  font-size: 14px;
  letter-spacing: .05em;
  white-space: nowrap;
  box-shadow: 0 12px 28px rgba(0,0,0,.05);
  backdrop-filter: blur(8px);
}

/* KHUNG PHONG BÌ */
.lux-envelope {
  position: absolute;
  left: 50%;
  bottom: 48px;
  width: 420px;
  height: 280px;
  transform: translateX(-50%);
}

/* MẶT SAU */
.lux-envelope__back {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 0 0 22px 22px;
  background: linear-gradient(180deg, #e6d7bb 0%, #d9c8a7 100%);
  box-shadow: 0 26px 50px rgba(88, 60, 45, .14);
}

/* THIỆP */
.lux-card {
  position: absolute;
  left: 50%;
  bottom: 38px;
  width: 330px;
  height: 450px;
  transform: translateX(-50%) translateY(290px);
  z-index: 2;
  transition: transform .18s linear;
}

.lux-card__inner {
  position: relative;
  height: 100%;
  border-radius: 22px;
  background: linear-gradient(180deg, #fffefe 0%, #f8f3f1 100%);
  border: 1px solid rgba(199, 172, 138, .26);
  box-shadow:
    0 22px 44px rgba(79, 54, 59, .14),
    inset 0 0 0 1px rgba(255,255,255,.72);
  padding: 38px 28px;
  text-align: center;
  overflow: hidden;
}

.lux-card__inner::before {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: 16px;
  border: 1px solid rgba(210, 185, 149, .34);
  pointer-events: none;
}

.lux-kicker {
  margin: 0;
  font-size: 13px;
  letter-spacing: .32em;
  color: #b17c83;
}

.lux-title {
  margin: 20px 0 0;
  font-family: "Cormorant Garamond", serif;
  font-size: 68px;
  line-height: .9;
  color: #6b5257;
  font-weight: 700;
}

.lux-names {
  margin: 22px 0 0;
  font-family: "Cormorant Garamond", serif;
  font-size: 36px;
  line-height: 1.2;
  color: #94646b;
}

.lux-desc {
  margin: 18px 0 0;
  font-size: 16px;
  line-height: 1.85;
  color: #7f7274;
}

/* MẶT TRƯỚC PHONG BÌ: CHE PHẦN DƯỚI CỦA THIỆP */
.lux-envelope__front {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 190px;
  z-index: 3;
  border-radius: 0 0 22px 22px;
  overflow: hidden;
  background:
    linear-gradient(135deg, transparent 49.5%, #d8c8a8 50%),
    linear-gradient(225deg, transparent 49.5%, #dfd0b3 50%),
    linear-gradient(315deg, transparent 49.5%, #d1c09f 50%);
}

.lux-envelope__front::before {
  content: "";
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 18px;
  height: 42px;
  background: rgba(255,255,255,.08);
  border-radius: 12px;
}

.lux-envelope__front::after {
  content: "";
  position: absolute;
  inset: 18px 22px 0;
  background: linear-gradient(180deg, #e7d9be 0%, #dbcbae 100%);
  clip-path: polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%);
  border-radius: 0 0 16px 16px;
}

/* NẮP PHONG BÌ */
.lux-envelope__flap {
  position: absolute;
  inset: 0;
  z-index: 4;
  transform-origin: top center;
  transition: transform .18s linear;
  pointer-events: none;
}

.lux-envelope__flap::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 175px;
  background: linear-gradient(180deg, #ece0c4 0%, #e0d0af 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  box-shadow: 0 10px 18px rgba(0,0,0,.05);
}

/* RESPONSIVE */
@media (max-width: 640px) {
  .invite-scene {
    width: min(420px, calc(100vw - 20px));
    height: 620px;
  }

  .lux-envelope {
    width: 330px;
    height: 230px;
    bottom: 34px;
  }

  .lux-card {
    width: 270px;
    height: 380px;
    transform: translateX(-50%) translateY(245px);
  }

  .lux-envelope__front {
    height: 155px;
  }

  .lux-envelope__flap::before {
    height: 145px;
  }

  .lux-title {
    font-size: 54px;
  }

  .lux-names {
    font-size: 28px;
  }

  .lux-desc {
    font-size: 14px;
  }

  .mail-hint {
    font-size: 13px;
    padding: 12px 18px;
  }
}

  // Initial render
  render(0);
});
