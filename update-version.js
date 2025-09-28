#!/usr/bin/env node

// Script to update version and build time
const fs = require('fs');
const path = require('path');

// Get current timestamp
const now = new Date();
const buildTime = now.getTime();
const version = process.argv[2] || '1.0.0';

// Update version.json
const versionData = {
  version: version,
  buildTime: buildTime,
  lastModified: now.toISOString(),
  changelog: [
    "Initial release with enhanced UI/UX",
    "Added smooth scrolling and animations", 
    "Improved responsive design",
    "Enhanced footer with social links",
    "Added cache busting system"
  ]
};

fs.writeFileSync('version.json', JSON.stringify(versionData, null, 2));

// Update version.js
const versionJsPath = 'js/version.js';
let versionJs = fs.readFileSync(versionJsPath, 'utf8');

// Update VERSION constant
versionJs = versionJs.replace(/const VERSION = '[^']*';/, `const VERSION = '${version}';`);

// Update BUILD_TIME constant
versionJs = versionJs.replace(/const BUILD_TIME = \d+;/, `const BUILD_TIME = ${buildTime};`);

fs.writeFileSync(versionJsPath, versionJs);

// Update HTML files with new build time
const htmlFiles = ['index.html', 'about.html', 'blog.html', 'contact.html'];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update version meta tag
    content = content.replace(/<meta name="version" content="[^"]*" \/>/, `<meta name="version" content="${version}" />`);
    
    // Update build time meta tag
    content = content.replace(/<meta name="build-time" content="[^"]*" \/>/, `<meta name="build-time" content="${buildTime}" />`);
    
    fs.writeFileSync(file, content);
  }
});

// Update service worker cache name
const swPath = 'sw.js';
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  swContent = swContent.replace(/const CACHE_NAME = '[^']*';/, `const CACHE_NAME = 'haiphamcoder-v${version}';`);
  fs.writeFileSync(swPath, swContent);
}

console.log(`✅ Version updated to ${version}`);
console.log(`📅 Build time: ${now.toLocaleString()}`);
console.log(`🔄 Cache busting enabled`);
console.log(`📁 Files updated: version.json, version.js, HTML files, service worker`);
