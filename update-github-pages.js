#!/usr/bin/env node

// Script to update version for GitHub Pages deployment
const fs = require('fs');
const path = require('path');

// Get current timestamp
const now = new Date();
const buildTime = now.getTime();
const version = process.argv[2] || `v${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

console.log(`🚀 Updating version for GitHub Pages: ${version}`);

// Update version.json
const versionData = {
  version: version,
  buildTime: buildTime,
  lastModified: now.toISOString(),
  changelog: [
    "GitHub Pages optimized cache busting",
    "Enhanced version management",
    "Improved Service Worker support"
  ]
};

fs.writeFileSync('version.json', JSON.stringify(versionData, null, 2));
console.log('✅ Updated version.json');

// Update version.js
const versionJsPath = 'js/version.js';
let versionJs = fs.readFileSync(versionJsPath, 'utf8');

// Update VERSION constant
versionJs = versionJs.replace(/const VERSION = '[^']*';/, `const VERSION = '${version}';`);

// Update BUILD_TIME constant
versionJs = versionJs.replace(/const BUILD_TIME = \d+;/, `const BUILD_TIME = ${buildTime};`);

fs.writeFileSync(versionJsPath, versionJs);
console.log('✅ Updated version.js');

// Update HTML files with new build time and cache busting
const htmlFiles = ['index.html', 'about.html', 'blog.html', 'contact.html'];
const timestamp = Date.now();

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update version meta tag
    content = content.replace(/<meta name="version" content="[^"]*" \/>/, `<meta name="version" content="${version}" />`);
    
    // Update build time meta tag
    content = content.replace(/<meta name="build-time" content="[^"]*" \/>/, `<meta name="build-time" content="${buildTime}" />`);
    
    // Add cache busting to local CSS and JS files
    content = content.replace(/href="css\/style\.css"/g, `href="css/style.css?v=${timestamp}"`);
    content = content.replace(/src="js\/([^"]*\.js)"/g, (match, filename) => {
      // Don't add cache busting to CDN files
      if (filename.includes('cdnjs') || filename.includes('cdn.jsdelivr')) {
        return match;
      }
      return `src="js/${filename}?v=${timestamp}"`;
    });
    
    fs.writeFileSync(file, content);
    console.log(`✅ Updated ${file}`);
  }
});

// Update service worker cache name
const swPath = 'sw.js';
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  swContent = swContent.replace(/const CACHE_NAME = '[^']*';/, `const CACHE_NAME = 'haiphamcoder-${version}';`);
  fs.writeFileSync(swPath, swContent);
  console.log('✅ Updated service worker');
}

// Create .nojekyll file for GitHub Pages
fs.writeFileSync('.nojekyll', '');
console.log('✅ Created .nojekyll file');

// Create sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://haiphamcoder.github.io/</loc>
    <lastmod>${now.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://haiphamcoder.github.io/about.html</loc>
    <lastmod>${now.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://haiphamcoder.github.io/blog.html</loc>
    <lastmod>${now.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://haiphamcoder.github.io/contact.html</loc>
    <lastmod>${now.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ Created sitemap.xml');

console.log(`\n🎉 GitHub Pages deployment ready!`);
console.log(`📅 Version: ${version}`);
console.log(`🕒 Build time: ${now.toLocaleString()}`);
console.log(`🔄 Cache busting: Enabled`);
console.log(`\n📝 Next steps:`);
console.log(`1. git add .`);
console.log(`2. git commit -m "Update version ${version}"`);
console.log(`3. git push origin main`);
console.log(`\n🌐 Your site will be available at: https://haiphamcoder.github.io`);
