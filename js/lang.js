(function() {
  // Mapping: EN path → FR path and vice versa
  const path = window.location.pathname;
  const isFrPage = path.startsWith('/fr/') || path === '/fr';

  // Language switcher URLs
  function getAlternatePath() {
    if (isFrPage) {
      // FR → EN: remove /fr prefix
      return path.replace(/^\/fr/, '') || '/';
    } else {
      // EN → FR: add /fr prefix
      if (path === '/' || path === '') return '/fr/';
      return '/fr' + path;
    }
  }

  // Auto-detect on EN pages only
  if (!isFrPage) {
    const pref = localStorage.getItem('lang');
    if (!pref) {
      const browserLang = navigator.language || navigator.userLanguage || '';
      if (browserLang.toLowerCase().startsWith('fr')) {
        localStorage.setItem('lang', 'fr');
        window.location.href = getAlternatePath();
        return;
      }
    } else if (pref === 'fr') {
      window.location.href = getAlternatePath();
      return;
    }
  }

  // Set lang attribute on html element
  document.documentElement.lang = isFrPage ? 'fr' : 'en';

  // After DOM loaded, set up switcher buttons
  document.addEventListener('DOMContentLoaded', function() {
    const alternatePath = getAlternatePath();
    const currentLang = isFrPage ? 'fr' : 'en';

    document.querySelectorAll('[data-lang-switcher]').forEach(function(el) {
      const lang = el.getAttribute('data-lang');
      if (lang === currentLang) {
        el.classList.add('lang-active');
      }
      el.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('lang', lang);
        window.location.href = lang === currentLang ? window.location.href : alternatePath;
      });
    });
  });
})();
