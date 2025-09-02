(function(){
  function initHeaderMenu() {
    const toggle = document.getElementById('navToggle');
    const nav = document.querySelector('.site-header .nav');
    if (!toggle || !nav) return;
    function close() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && e.target !== toggle) close();
    });
    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640) close();
    });
  }
  window.addEventListener('DOMContentLoaded', () => {
    initHeaderMenu();
    if (window.I18N) {
      // Ensure nav updates immediately on language change
      window.addEventListener('langchange', () => I18N.render());
    }
  });
})();


