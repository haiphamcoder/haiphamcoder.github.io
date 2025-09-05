(function(){
  const STORAGE_KEY = 'lang-preference';
  const SUPPORTED = ['vi','en'];

  const translations = {
    vi: {
      'brand': 'Hải Phạm',
      'nav.home': 'Trang chủ',
      'nav.blog': 'Blog',
      'nav.about': 'Về tôi ',
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
      'footer.source': 'Source',
      'cv.contact': 'Liên hệ',
      'cv.location': 'Hà Nội, Việt Nam',
      'cv.skills': 'Kỹ năng',
      'cv.skills.programming': 'Ngôn ngữ lập trình',
      'cv.skills.frameworks': 'Framework & Tools',
      'cv.skills.knowledge': 'Kiến thức',
      'cv.title': 'Junior Backend Engineer | Java | Spring Boot',
      'cv.intro': 'Tôi là một Junior Backend Engineer đam mê phát triển các hệ thống backend mạnh mẽ và hiệu quả. Với nền tảng vững chắc về Java và Spring Boot, tôi luôn tìm hiểu và áp dụng các công nghệ mới để xây dựng những giải pháp phần mềm chất lượng cao.',
      'cv.education.title': '🎓 Học vấn',
      'cv.education.school': 'Trường Công nghệ Thông tin và Truyền Thông - Đại học Bách khoa Hà Nội',
      'cv.education.degree': 'Kỹ sư Công nghệ Thông tin',
      'cv.projects.title': '🚀 Dự án cá nhân',
      'cv.projects.crypto.title': 'Crypto Utils - Java Cryptography Library',
      'cv.projects.crypto.desc': 'Thư viện Java toàn diện cho cryptography, hashing, encoding và xử lý dữ liệu. Hỗ trợ CRC algorithms, hash functions (MD, SHA, Keccak, RIPEMD, BLAKE), encryption (AES, DES, RC4), digital signatures (ECDSA, RSA) và text processing utilities.',
      'cv.projects.kafka.title': 'Kafka KRaft with SCRAM Authentication',
      'cv.projects.kafka.desc': 'Thiết kế và triển khai cluster Kafka sử dụng KRaft consensus protocol thay thế ZooKeeper, tích hợp SASL/SCRAM authentication. Hệ thống containerized với Docker Compose, hỗ trợ 3 brokers cho high availability và development/testing environments.',
      'cv.projects.elasticsearch.title': 'Elasticsearch Kibana Basic Authentication',
      'cv.projects.elasticsearch.desc': 'Thiết kế và triển khai cluster Elasticsearch 3-node với Kibana dashboard, tích hợp Basic Authentication cho bảo mật. Hệ thống containerized với Docker Compose, hỗ trợ high availability, data visualization và development/testing environments.',
      'cv.projects.github': 'GitHub Repository',
      'cv.goals.title': '🎯 Định hướng nghề nghiệp',
      'cv.goals.short.title': 'Ngắn hạn (6-12 tháng)',
      'cv.goals.short.item1': 'Nâng cao kỹ năng Spring Boot và Spring Security',
      'cv.goals.short.item2': 'Học thêm về microservices architecture',
      'cv.goals.short.item3': 'Thực hành với Docker và containerization',
      'cv.goals.long.title': 'Dài hạn (1-3 năm)',
      'cv.goals.long.item1': 'Trở thành Senior Backend Engineer',
      'cv.goals.long.item2': 'Chuyên sâu về distributed systems',
      'cv.goals.long.item3': 'Khám phá big data và cloud technologies',
      'cv.interests.title': '💡 Sở thích & Quan tâm',
      'cv.interests.desc': 'Tôi đặc biệt quan tâm đến hệ thống phân tán, big data, và kiến trúc phần mềm. Luôn tìm hiểu các best practices trong phát triển backend, tối ưu hóa hiệu năng và đảm bảo tính bảo mật của hệ thống.'
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
      'footer.source': 'Source',
      'cv.contact': 'Contact',
      'cv.location': 'Hanoi, Vietnam',
      'cv.skills': 'Skills',
      'cv.skills.programming': 'Programming Languages',
      'cv.skills.frameworks': 'Frameworks & Tools',
      'cv.skills.knowledge': 'Knowledge',
      'cv.title': 'Junior Backend Engineer | Java | Spring Boot',
      'cv.intro': 'I am a Junior Backend Engineer passionate about developing robust and efficient backend systems. With a solid foundation in Java and Spring Boot, I constantly explore and apply new technologies to build high-quality software solutions.',
      'cv.education.title': '🎓 Education',
      'cv.education.school': 'School of Information and Communication Technology - Hanoi University of Science and Technology',
      'cv.education.degree': 'Bachelor of Information Technology Engineering',
      'cv.projects.title': '🚀 Personal Projects',
      'cv.projects.crypto.title': 'Crypto Utils - Java Cryptography Library',
      'cv.projects.crypto.desc': 'A comprehensive Java utility library for cryptography, hashing, encoding and data processing. Supports CRC algorithms, hash functions (MD, SHA, Keccak, RIPEMD, BLAKE), encryption (AES, DES, RC4), digital signatures (ECDSA, RSA) and text processing utilities.',
      'cv.projects.kafka.title': 'Kafka KRaft with SCRAM Authentication',
      'cv.projects.kafka.desc': 'Designed and implemented Kafka cluster using KRaft consensus protocol replacing ZooKeeper, integrated SASL/SCRAM authentication. Containerized system with Docker Compose, supporting 3 brokers for high availability and development/testing environments.',
      'cv.projects.elasticsearch.title': 'Elasticsearch Kibana Basic Authentication',
      'cv.projects.elasticsearch.desc': 'Designed and implemented 3-node Elasticsearch cluster with Kibana dashboard, integrated with Basic Authentication for security. Containerized system with Docker Compose, supporting high availability, data visualization and development/testing environments.',
      'cv.projects.github': 'GitHub Repository',
      'cv.goals.title': '🎯 Career Goals',
      'cv.goals.short.title': 'Short-term (6-12 months)',
      'cv.goals.short.item1': 'Enhance Spring Boot and Spring Security skills',
      'cv.goals.short.item2': 'Learn microservices architecture',
      'cv.goals.short.item3': 'Practice with Docker and containerization',
      'cv.goals.long.title': 'Long-term (1-3 years)',
      'cv.goals.long.item1': 'Become a Senior Backend Engineer',
      'cv.goals.long.item2': 'Specialize in distributed systems',
      'cv.goals.long.item3': 'Explore big data and cloud technologies',
      'cv.interests.title': '💡 Interests & Focus',
      'cv.interests.desc': 'I am particularly interested in distributed systems, big data, and software architecture. Always exploring best practices in backend development, performance optimization and system security.'
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
      el.innerHTML = t(key);
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


