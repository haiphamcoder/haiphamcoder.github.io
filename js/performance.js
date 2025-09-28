// Performance optimization script
(function() {
  'use strict';
  
  // Optimize font loading
  function optimizeFonts() {
    // Check if fonts are loaded
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
    
    // Fallback for older browsers
    setTimeout(() => {
      document.documentElement.classList.add('fonts-loaded');
    }, 3000);
  }
  
  // Optimize image loading
  function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
      });
    }
  }
  
  // Preload critical resources
  function preloadCriticalResources() {
    const criticalResources = [
      'css/style.css',
      'js/main.js',
      'js/i18n.js',
      'assets/avatar.jpg'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
        link.onload = function() {
          this.rel = 'stylesheet';
        };
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.endsWith('.jpg') || resource.endsWith('.png')) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  }
  
  // Optimize scroll performance
  function optimizeScroll() {
    let ticking = false;
    
    function updateScroll() {
      // Add scroll-based classes
      const scrolled = window.scrollY > 100;
      document.documentElement.classList.toggle('scrolled', scrolled);
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }
  
  // Optimize animations
  function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.documentElement.classList.add('paused');
      } else {
        document.documentElement.classList.remove('paused');
      }
    });
  }
  
  // Initialize performance optimizations
  function init() {
    optimizeFonts();
    optimizeImages();
    preloadCriticalResources();
    optimizeScroll();
    optimizeAnimations();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose for external use
  window.Performance = {
    optimizeFonts,
    optimizeImages,
    preloadCriticalResources,
    optimizeScroll,
    optimizeAnimations
  };
})();
