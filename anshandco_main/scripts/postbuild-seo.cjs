const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const mainIndexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(mainIndexPath)) {
  console.log('[postbuild-seo] dist/index.html not found, skipping.');
  process.exit(0);
}

const mainHtml = fs.readFileSync(mainIndexPath, 'utf8');

// Extract compiled Vite stylesheet, modulepreload, and entry module script tags from dist/index.html
const assetTags = [];
const stylesheetRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi;
const modulePreloadRegex = /<link\s+[^>]*rel=["']modulepreload["'][^>]*>/gi;
const scriptRegex = /<script\s+[^>]*type=["']module["'][^>]*src=["']\/assets\/[^"']+["'][^>]*><\/script>/gi;

const stylesheets = mainHtml.match(stylesheetRegex) || [];
const preloads = mainHtml.match(modulePreloadRegex) || [];
const scripts = mainHtml.match(scriptRegex) || [];

assetTags.push(...stylesheets, ...preloads, ...scripts);
const injectedAssets = assetTags.join('\n    ');

const staticRoutes = [
  'what-we-are',
  'who-we-are',
  'what-we-provide',
  'who-trust-us',
  'services/ai-automation',
  'services/web-engineering',
  'services/brand-custodianship',
  'services/seo-growth',
  'digital-marketing-agency-dehradun',
  'web-development-agency-dehradun',
  'ai-automation-agency-dehradun'
];

let updatedCount = 0;
for (const route of staticRoutes) {
  const routeFile = path.join(distDir, route, 'index.html');
  if (fs.existsSync(routeFile) && injectedAssets) {
    let html = fs.readFileSync(routeFile, 'utf8');
    if (html.includes('<script type="module" src="/src/main.tsx"></script>')) {
      html = html.replace(
        '<script type="module" src="/src/main.tsx"></script>',
        injectedAssets
      );
      fs.writeFileSync(routeFile, html, 'utf8');
      updatedCount++;
    }
  }
}

console.log(`[postbuild-seo] Injected production Vite assets into ${updatedCount} pre-rendered SEO route(s).`);
