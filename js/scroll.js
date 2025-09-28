// Enhanced scroll effects and smooth scrolling
(function() {
  'use strict';

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.card, .post-item, .cv-item, .section-header, .hero-text');
    
    elementsToAnimate.forEach(el => {
      el.classList.add('scroll-animate');
      observer.observe(el);
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = 90; // Account for sticky header
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Parallax effect for hero section
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      hero.style.transform = `translateY(${rate}px)`;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);
  }

  // Back to top button
  function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--brand);
      color: var(--brand-contrast);
      border: none;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
    `;

    document.body.appendChild(backToTop);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });

    // Smooth scroll to top
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Enhanced scroll performance
  function initScrollPerformance() {
    let ticking = false;

    function updateScrollEffects() {
      // Add any scroll-based effects here
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Initialize all scroll effects
  function init() {
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initBackToTop();
    initScrollPerformance();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for global access
  window.ScrollEffects = {
    init,
    initScrollAnimations,
    initSmoothScroll,
    initParallax,
    initBackToTop
  };
})();
