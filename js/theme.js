(function() {
  // Apply theme based on saved preference or system setting
  const root = document.documentElement;
  const STORAGE_KEY = 'theme-preference';

  function getSystemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getPreference() {
    return localStorage.getItem(STORAGE_KEY) || getSystemPref();
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  function reflectPreference() {
    setTheme(getPreference());
  }

  reflectPreference();

  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    // Initialize button label/icon
    function updateButton() {
      const mode = getPreference();
      // Invert icon: show sun when dark, moon when light
      toggle.textContent = mode === 'dark' ? '☼' : '☾';
      toggle.setAttribute('aria-pressed', mode === 'dark');
      setTheme(mode);
    }
    updateButton();

    toggle.addEventListener('click', () => {
      const next = getPreference() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      updateButton();
    });

    // Listen to system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        updateButton();
      }
    });
  });
})();


