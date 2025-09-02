(function(){
  const STORAGE_KEY = 'lang-preference';
  const SUPPORTED = ['vi','en'];

  const translations = {
    vi: {
      'brand': 'Hải Phạm',
      'nav.home': 'Trang chủ',
      'nav.blog': 'Blog',
      'nav.about': 'Về tôi',
      'nav.contact': 'Liên hệ',
      'hero.title': 'Xin chào, mình là Hải Phạm',
      'hero.subtitle': 'Backend Engineer • Java & Spring Boot • Quan tâm hệ thống phân tán, Big Data, hiệu năng và kiến trúc.',
      'hero.readBlog': 'Đọc blog',
      'hero.learnMore': 'Tìm hiểu thêm',
      'socials.github': 'GitHub',
      'socials.linkedin': 'LinkedIn',
      'section.latest': 'Bài viết mới',
      'viewAll': 'Xem tất cả →',
      'blog.title': 'Blog',
      'filters.search': 'Tìm bài viết...',
      'sidebar.intro.title': 'Giới thiệu',
      'sidebar.intro.body': 'Chia sẻ về backend, hệ thống phân tán, hiệu năng và thực chiến Java/Spring Boot.',
      'sidebar.tags.title': 'Danh mục',
      'tags.all': 'All',
      'back': '← Quay lại danh sách',
      'about.title': 'Về tôi',
      'about.p1': 'Tôi là Hải Phạm, Backend Engineer tập trung vào Java và Spring Boot. Tôi yêu thích kiến trúc hệ thống, hiệu năng, tối ưu hóa cơ sở dữ liệu và các hệ phân tán.',
      'about.p2': 'Blog này là nơi tôi tổng hợp kiến thức, kinh nghiệm thực chiến, và ghi chú kỹ thuật khi làm việc với microservices, big data, message queue, và các bài toán hiệu năng.',
      'about.skills': 'Kỹ năng chính',
      'about.skills.items': 'Java, Spring Boot, Spring Cloud; Kafka, Redis, Elasticsearch; MySQL/PostgreSQL; Thiết kế API, bảo mật, observability',
      'about.contact': 'Liên hệ',
      'contact.title': 'Liên hệ',
      'contact.p1': 'Cảm ơn bạn đã ghé thăm! Nếu bạn muốn kết nối, hãy liên hệ qua:',
      'footer.source': 'Source'
    },
    en: {
      'brand': 'Hai Pham',
      'nav.home': 'Home',
      'nav.blog': 'Blog',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.title': 'Hi, I am Hai Pham',
      'hero.subtitle': 'Backend Engineer • Java & Spring Boot • Interested in distributed systems, Big Data, performance and architecture.',
      'hero.readBlog': 'Read blog',
      'hero.learnMore': 'Learn more',
      'socials.github': 'GitHub',
      'socials.linkedin': 'LinkedIn',
      'section.latest': 'Latest posts',
      'viewAll': 'View all →',
      'blog.title': 'Blog',
      'filters.search': 'Search posts...',
      'sidebar.intro.title': 'Intro',
      'sidebar.intro.body': 'Sharing about backend, distributed systems, performance and hands-on Java/Spring Boot.',
      'sidebar.tags.title': 'Tags',
      'tags.all': 'All',
      'back': '← Back to list',
      'about.title': 'About me',
      'about.p1': 'I am Hai Pham, a Backend Engineer focusing on Java and Spring Boot. I love system architecture, performance, database optimization and distributed systems.',
      'about.p2': 'This blog collects my knowledge, hands-on experience, and technical notes with microservices, big data, message queues, and performance topics.',
      'about.skills': 'Core skills',
      'about.skills.items': 'Java, Spring Boot, Spring Cloud; Kafka, Redis, Elasticsearch; MySQL/PostgreSQL; API design, security, observability',
      'about.contact': 'Contact',
      'contact.title': 'Contact',
      'contact.p1': 'Thanks for visiting! If you want to connect, reach me via:',
      'footer.source': 'Source'
    }
  };

  function getInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = navigator.language || navigator.userLanguage || 'en';
    return nav.startsWith('vi') ? 'vi' : 'en';
  }

  let current = getInitialLang();

  function t(key) {
    return (translations[current] && translations[current][key]) || translations.en[key] || key;
  }

  function render() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });
    const toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = current === 'vi' ? '🇻🇳' : '🇬🇧';
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    if (current === lang) return;
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    render();
    // Notify listeners (e.g., blog listing/single post) to re-render
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', () => setLang(current === 'vi' ? 'en' : 'vi'));
      render();
    }
    // Also render immediately in case DOM is already ready
    render();
  });

  window.I18N = { t, setLang, render, get lang(){ return current; } };
})();


