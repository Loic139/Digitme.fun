// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', false);

  if (menuOpen) {
    requestAnimationFrame(() => {
      mobileMenu.classList.add('open');
    });
  } else {
    mobileMenu.classList.remove('open');
    mobileMenu.addEventListener('transitionend', () => {
      if (!menuOpen) mobileMenu.classList.add('hidden');
    }, { once: true });
  }

  // Animate hamburger
  const lines = mobileMenuBtn.querySelectorAll('span');
  if (menuOpen) {
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
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.addEventListener('transitionend', () => {
      mobileMenu.classList.add('hidden');
    }, { once: true });

    const lines = mobileMenuBtn.querySelectorAll('span');
    lines[0].style.transform = '';
    lines[1].style.opacity = '1';
    lines[2].style.transform = '';
    lines[2].style.width = '1rem';
  });
});

// ============================================
// COUNTER ANIMATION
// ============================================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const start = performance.now();

      function updateCounter(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        counter.textContent = current + (target === 99 ? '%' : '+');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    }
  });
}

window.addEventListener('scroll', animateCounters);
animateCounters();

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
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        otherContent.style.maxHeight = null;
        otherContent.classList.remove('show');
        otherContent.classList.add('hidden');
      }
    });

    // Toggle current item
    if (isActive) {
      item.classList.remove('active');
      content.style.maxHeight = null;
      content.classList.remove('show');
      setTimeout(() => content.classList.add('hidden'), 300);
    } else {
      item.classList.add('active');
      content.classList.remove('hidden');
      content.classList.add('show');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
