// Main blog logic: list, pagination, search, tags, markdown render, simple highlight
(function() {
  const POSTS_INDEX_URL = 'posts/index.json';
  const POSTS_DIR = 'posts/';

  // Simple markdown to HTML renderer (subset): headings, bold/italic, code, lists, links, images, blockquote
  function renderMarkdown(md) {
    // Escape HTML
    md = md.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

    // Code blocks ```lang
    md = md.replace(/```(\w+)?\n([\s\S]*?)```/g, (m, lang, code) => {
      if (lang === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
      }
      return `<pre><code class="language-${lang || 'text'}">${code}</code></pre>`;
    });

    // Inline code
    md = md.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headings
    md = md.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
           .replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
           .replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
           .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
           .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
           .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

    // Blockquote
    md = md.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');

    // Bold/italic
    md = md.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
           .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Images ![alt](url)
    md = md.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img alt="$1" src="$2" />');
    // Links [text](url)
    md = md.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Lists
    md = md.replace(/^(?:-\s.*(?:\n|$))+?/gm, (block) => {
      const items = block.trim().split(/\n/).map(l => l.replace(/^-\s+/, '').trim()).filter(Boolean);
      return `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    });

    // Paragraphs (simple) - exclude mermaid divs
    md = md.replace(/^(?!<h\d|<ul>|<pre>|<blockquote|<img|<p>|<\/|<div class="mermaid">)(.+)$/gm, '<p>$1</p>');

    return md;
  }

  function addCopyButtons() {
    document.querySelectorAll('#postBody pre').forEach(pre => {
      if (pre.querySelector('.code-copy-btn')) return; // Already has button
      
      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.textContent = 'Copy';
      btn.onclick = () => {
        const code = pre.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        });
      };
      pre.appendChild(btn);
    });
  }

  async function fetchJSON(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load ' + url);
    return res.json();
  }

  async function fetchText(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load ' + url);
    return res.text();
  }

  function localizePostMeta(post) {
    const lang = (window.I18N && I18N.lang) || 'en';
    const title = (post.title && (post.title[lang] || post.title.en)) || post.title || '';
    const excerpt = (post.excerpt && (post.excerpt[lang] || post.excerpt.en)) || post.excerpt || '';
    const file = post.files ? (post.files[lang] || post.files.en) : post.file;
    return { title, excerpt, file };
  }

  function createPostCard(post) {
    const el = document.createElement('a');
    el.className = 'card post-card';
    el.href = `blog.html?post=${encodeURIComponent(post.slug)}`;
    const loc = localizePostMeta(post);
    el.innerHTML = `
      <h3>${loc.title}</h3>
      <div class="meta">${post.date} · ${post.tags.join(', ')}</div>
      <p class="excerpt">${loc.excerpt}</p>
    `;
    return el;
  }

  function paginate(items, pageSize, page) {
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(Math.max(1, page), pages);
    const start = (current - 1) * pageSize;
    return { items: items.slice(start, start + pageSize), current, pages, total };
  }

  async function initListPage() {
    const data = await fetchJSON(POSTS_INDEX_URL);
    const searchInput = document.getElementById('searchInput');
    const postList = document.getElementById('postList');
    const pagination = document.getElementById('pagination');
    const tagList = document.getElementById('tagList');

    let currentTag = new URLSearchParams(location.search).get('tag') || '';
    let query = '';
    const pageSize = 6;
    let page = parseInt(new URLSearchParams(location.search).get('page')) || 1;

    const allTags = Array.from(new Set(data.posts.flatMap(p => p.tags))).sort();

    function renderTags(container) {
      container.innerHTML = '';
      const all = document.createElement('span');
      all.className = 'tag' + (currentTag === '' ? ' active' : '');
      all.textContent = (window.I18N ? I18N.t('tags.all') : 'All');
      all.addEventListener('click', () => { currentTag = ''; page = 1; update(); });
      container.appendChild(all);
      allTags.forEach(t => {
        const el = document.createElement('span');
        el.className = 'tag' + (currentTag === t ? ' active' : '');
        el.textContent = t;
        el.addEventListener('click', () => { currentTag = t; page = 1; update(); });
        container.appendChild(el);
      });
    }

    function update() {
      let filtered = data.posts.slice();
      if (currentTag) filtered = filtered.filter(p => p.tags.includes(currentTag));
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(p => {
          const loc = localizePostMeta(p);
          return (
            loc.title.toLowerCase().includes(q) ||
            loc.excerpt.toLowerCase().includes(q) ||
            p.tags.some(tag => tag.toLowerCase().includes(q))
          );
        });
      }
      const { items, current, pages } = paginate(filtered, pageSize, page);
      page = current;

      postList.innerHTML = '';
      items.forEach(p => postList.appendChild(createPostCard(p)));

      pagination.innerHTML = '';
      const prev = document.createElement('button'); prev.textContent = 'Prev'; prev.disabled = page <= 1; prev.onclick = () => { page--; update(); };
      const next = document.createElement('button'); next.textContent = 'Next'; next.disabled = page >= pages; next.onclick = () => { page++; update(); };
      const info = document.createElement('span'); info.style.alignSelf = 'center'; info.textContent = `Page ${page}/${pages}`;
      pagination.append(prev, info, next);

      renderTags(tagList);
    }

    searchInput.addEventListener('input', (e) => { query = e.target.value.trim(); page = 1; update(); });
    update();

    // Re-render when language changes
    window.addEventListener('langchange', () => { update(); });
  }

  async function loadSinglePost(slug) {
    const idx = await fetchJSON(POSTS_INDEX_URL);
    const meta = idx.posts.find(p => p.slug === slug);
    if (!meta) { location.href = 'blog.html'; return; }
    const loc = localizePostMeta(meta);
    const md = await fetchText(POSTS_DIR + loc.file);
    const postView = document.getElementById('postView');
    const listView = document.getElementById('listView');
    listView.hidden = true; postView.hidden = false;
    document.getElementById('postTitle').textContent = loc.title;
    document.getElementById('postMeta').innerHTML = `
      <span>📅 ${meta.date}</span>
      <span>🏷️ ${meta.tags.join(', ')}</span>
    `;
    document.getElementById('postBody').innerHTML = renderMarkdown(md);
    // Apply highlight.js to code blocks
    if (window.hljs) {
      document.querySelectorAll('#postBody pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
    // Add copy buttons to code blocks
    addCopyButtons();
    // Render Mermaid diagrams
    if (window.Blog && window.Blog.renderMermaidDiagrams) {
      window.Blog.renderMermaidDiagrams();
    }

    // Re-render on language change (reload body and title)
    function onLangChange() {
      const l = localizePostMeta(meta);
      document.getElementById('postTitle').textContent = l.title;
      document.getElementById('postMeta').innerHTML = `
        <span>📅 ${meta.date}</span>
        <span>🏷️ ${meta.tags.join(', ')}</span>
      `;
      fetchText(POSTS_DIR + l.file).then(txt => {
        document.getElementById('postBody').innerHTML = renderMarkdown(txt);
        // Apply highlight.js to code blocks
        if (window.hljs) {
          document.querySelectorAll('#postBody pre code').forEach(block => {
            hljs.highlightElement(block);
          });
        }
        // Add copy buttons to code blocks
        addCopyButtons();
        // Render Mermaid diagrams
        if (window.Blog && window.Blog.renderMermaidDiagrams) {
          window.Blog.renderMermaidDiagrams();
        }
      });
    }
    window.addEventListener('langchange', onLangChange);
  }

  async function loadLatestPostsPreview(selector) {
    try {
      const data = await fetchJSON(POSTS_INDEX_URL);
      const container = document.querySelector(selector);
      container.innerHTML = '';
      const latest = data.posts.slice(0, 3);
      latest.forEach(p => container.appendChild(createPostCard(p)));
      window.addEventListener('langchange', () => {
        container.innerHTML = '';
        latest.forEach(p => container.appendChild(createPostCard(p)));
      });
    } catch (e) { /* ignore on homepage */ }
  }

  // Initialize Mermaid
  function initMermaid() {
    if (window.mermaid) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose'
      });
    }
  }

  // Re-render Mermaid diagrams after content changes
  function renderMermaidDiagrams() {
    if (window.mermaid) {
      const mermaidElements = document.querySelectorAll('.mermaid');
      mermaidElements.forEach(element => {
        // Clear any existing content and data attributes
        element.removeAttribute('data-processed');
        // Re-render the diagram
        mermaid.init(undefined, element);
      });
    }
  }

  window.Blog = {
    initListPage,
    loadSinglePost,
    loadLatestPostsPreview,
    initMermaid,
    renderMermaidDiagrams
  };

  // Initialize Mermaid when DOM is ready
  document.addEventListener('DOMContentLoaded', initMermaid);
})();


