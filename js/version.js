// Version management and cache busting
(function() {
  'use strict';

  // Current version - update this when you make changes
  const VERSION = '1.0.0';
  const BUILD_TIME = new Date().getTime();

  // Cache busting parameters
  const CACHE_BUST = `?v=${VERSION}&t=${BUILD_TIME}`;

  // Function to add cache busting to URLs
  function addCacheBust(url) {
    if (url.includes('?')) {
      return url + '&' + CACHE_BUST.split('?')[1];
    }
    return url + CACHE_BUST;
  }

  // Function to reload CSS files with cache busting
  function reloadCSS() {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      if (link.href && !link.href.includes('cdnjs') && !link.href.includes('fonts.googleapis')) {
        const newHref = addCacheBust(link.href);
        if (newHref !== link.href) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = newHref;
          newLink.onload = () => link.remove();
          document.head.appendChild(newLink);
        }
      }
    });
  }

  // Function to reload JS files with cache busting
  function reloadJS() {
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (script.src && !script.src.includes('cdnjs') && !script.src.includes('cdn.jsdelivr')) {
        const newSrc = addCacheBust(script.src);
        if (newSrc !== script.src) {
          const newScript = document.createElement('script');
          newScript.src = newSrc;
          newScript.onload = () => script.remove();
          document.head.appendChild(newScript);
        }
      }
    });
  }

  // Check for updates
  function checkForUpdates() {
    // Check if there's a new version available
    fetch(`version.json?t=${Date.now()}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.version !== VERSION) {
          console.log('New version available:', data.version);
          showUpdateNotification();
        }
      })
      .catch(error => {
        console.log('Version check failed:', error);
        // Fallback: check every 10 minutes if version check fails
        setTimeout(checkForUpdates, 10 * 60 * 1000);
      });
  }

  // Show update notification
  function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--brand);
        color: var(--brand-contrast);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 300px;
        font-size: 14px;
        line-height: 1.5;
      ">
        <div style="font-weight: 600; margin-bottom: 8px;">🔄 Có phiên bản mới!</div>
        <div style="margin-bottom: 12px;">Website đã được cập nhật. Tải lại để xem thay đổi mới nhất.</div>
        <div style="display: flex; gap: 8px;">
          <button onclick="location.reload()" style="
            background: var(--brand-contrast);
            color: var(--brand);
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
          ">Tải lại</button>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
            background: transparent;
            color: var(--brand-contrast);
            border: 1px solid var(--brand-contrast);
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
          ">Đóng</button>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
  }

  // Force reload all assets
  function forceReload() {
    reloadCSS();
    reloadJS();
  }

  // Add cache busting to all asset URLs
  function addCacheBustingToAssets() {
    // Add to CSS links
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
      if (link.href && !link.href.includes('cdnjs') && !link.href.includes('fonts.googleapis')) {
        link.href = addCacheBust(link.href);
      }
    });

    // Add to JS scripts
    const jsScripts = document.querySelectorAll('script[src]');
    jsScripts.forEach(script => {
      if (script.src && !script.src.includes('cdnjs') && !script.src.includes('cdn.jsdelivr')) {
        script.src = addCacheBust(script.src);
      }
    });
  }

  // Initialize cache busting
  function init() {
    // Add cache busting to existing assets
    addCacheBustingToAssets();

    // Check for updates every 5 minutes
    setInterval(checkForUpdates, 5 * 60 * 1000);

    // Check for updates on page focus
    window.addEventListener('focus', checkForUpdates);

    // Add version info to console
    console.log(`Website version: ${VERSION} (${new Date(BUILD_TIME).toLocaleString()})`);
  }

  // Export functions
  window.CacheBuster = {
    VERSION,
    BUILD_TIME,
    addCacheBust,
    reloadCSS,
    reloadJS,
    forceReload,
    checkForUpdates,
    init
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
