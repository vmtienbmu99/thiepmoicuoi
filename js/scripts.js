/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
(function () {
  const opening = document.getElementById("inviteOpening");
  const book = document.getElementById("inviteBook");
  const btn = document.getElementById("inviteOpenBtn");

  if (!opening || !book || !btn) return;

  document.body.classList.add("invite-lock");

  let closed = false;

  const closeInvitation = () => {
    if (closed) return;
    closed = true;

    book.classList.add("is-open");

    setTimeout(() => {
      opening.classList.add("is-hidden");
      document.body.classList.remove("invite-lock");
    }, 1650);
  };

  btn.addEventListener("click", closeInvitation);

  let startX = null;
  let moved = false;

  opening.addEventListener("touchstart", (e) => {
    if (!e.touches || !e.touches.length) return;
    startX = e.touches[0].clientX;
    moved = false;
  }, { passive: true });

  opening.addEventListener("touchmove", (e) => {
    if (startX === null || !e.touches || !e.touches.length) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 70) moved = true;
  }, { passive: true });

  opening.addEventListener("touchend", () => {
    if (moved) closeInvitation();
    startX = null;
    moved = false;
  });

  let mouseDownX = null;

  opening.addEventListener("mousedown", (e) => {
    mouseDownX = e.clientX;
  });

  opening.addEventListener("mouseup", (e) => {
    if (mouseDownX === null) return;
    const deltaX = e.clientX - mouseDownX;
    if (Math.abs(deltaX) > 90) closeInvitation();
    mouseDownX = null;
  });
})();
(function () {
  const opening = document.getElementById("mailOpening");
  const scene = document.getElementById("envelopeScene");
  const flap = document.getElementById("envelopeFlap");
  const letter = document.getElementById("envelopeLetter");
  const hint = document.getElementById("mailHint");

  if (!opening || !scene || !flap || !letter) return;

  document.body.classList.add("mail-lock");

  let startY = 0;
  let currentProgress = 0; // 0 -> đóng, 1 -> mở
  let dragging = false;
  let opened = false;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  function render(progress) {
    currentProgress = clamp(progress, 0, 1);

    // nắp thư mở lên
    const flapRotate = currentProgress * -180;
    flap.style.transform = `rotateX(${flapRotate}deg)`;

    // thư trượt lên
    const letterMove = currentProgress * -190;
    letter.style.transform = `translateX(-50%) translateY(${letterMove}px)`;

    if (currentProgress < 0.15) {
      hint.textContent = "Vuốt lên để mở thư";
    } else if (currentProgress < 0.95) {
      hint.textContent = "Thả tay để mở tiếp";
    } else {
      hint.textContent = "Vuốt xuống để đóng / chạm để vào thiệp";
    }
  }

  function openFully() {
    opened = true;
    opening.classList.add("is-opened");
    flap.style.transition = "transform .55s ease";
    letter.style.transition = "transform .55s ease";
    render(1);

    setTimeout(() => {
      hint.textContent = "Chạm để vào thiệp";
    }, 550);
  }

  function closeFully() {
    opened = false;
    opening.classList.remove("is-opened");
    flap.style.transition = "transform .45s ease";
    letter.style.transition = "transform .45s ease";
    render(0);

    setTimeout(() => {
      hint.textContent = "Vuốt lên để mở thư";
    }, 450);
  }

  function hideOpening() {
    opening.classList.add("hidden");
    document.body.classList.remove("mail-lock");
  }

  function pointerDown(clientY) {
    dragging = true;
    startY = clientY;
    flap.style.transition = "none";
    letter.style.transition = "none";
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
      progress = clamp(1 - (deltaY / 220), 0, 1);
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

  // Khi đã mở hoàn toàn thì chạm lần nữa để vào web chính
  opening.addEventListener("click", (e) => {
    if (!opened) return;

    const clickedInsideScene = scene.contains(e.target);
    if (clickedInsideScene) {
      hideOpening();
    }
  });

  render(0);
})();
