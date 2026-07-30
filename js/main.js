// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

function setHamburger(open) {
  const lines = mobileMenuBtn.querySelectorAll('span');
  if (open) {
    lines[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    lines[1].style.opacity = '0';
    lines[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    lines[2].style.width = '1.5rem';
  } else {
    lines[0].style.transform = '';
    lines[1].style.opacity = '1';
    lines[2].style.transform = '';
    lines[2].style.width = '1rem';
  }
}

function closeMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.addEventListener('transitionend', () => {
    if (!menuOpen) mobileMenu.classList.add('hidden');
  }, { once: true });
  setHamburger(false);
}

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    menuOpen = true;
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('hidden');
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    setHamburger(true);
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const item = toggle.parentElement;
    const content = toggle.nextElementSibling;
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem === item) return;
      otherItem.classList.remove('active');
      const otherToggle = otherItem.querySelector('.faq-toggle');
      const otherContent = otherItem.querySelector('.faq-content');
      if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
      otherContent.style.maxHeight = null;
      otherContent.classList.remove('show');
      otherContent.classList.add('hidden');
    });

    // Toggle current item
    if (isActive) {
      item.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = null;
      content.classList.remove('show');
      setTimeout(() => content.classList.add('hidden'), 300);
    } else {
      item.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      content.classList.remove('hidden');
      content.classList.add('show');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
// `href="#"` is excluded on purpose: querySelector('#') throws a SyntaxError,
// which used to kill the click on the logo and on the language switcher.
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;   // unknown anchor: leave the default behaviour alone
    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  });
});
