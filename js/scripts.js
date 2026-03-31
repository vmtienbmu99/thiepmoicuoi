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
