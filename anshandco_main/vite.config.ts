import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

const agentReadinessPlugin = (): Plugin => ({
  name: 'anshandco-agent-readiness',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      res.setHeader(
        'Link',
        '<https://anshandco.com/llms.txt>; rel="llms-txt"; type="text/plain", <https://anshandco.com/llms-full.txt>; rel="alternate"; type="text/plain"; title="ANSH&CO Full Knowledge Base", <https://anshandco.com/index.md>; rel="alternate"; type="text/markdown"; title="ANSH&CO Markdown Representation", <https://anshandco.com/.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json", <https://anshandco.com/sitemap.xml>; rel="sitemap"; type="application/xml"'
      );
      res.setHeader('Vary', 'Accept');
      res.setHeader('X-Content-Signal', 'search=yes, ai-input=yes, ai-train=no');

      const accept = String(req.headers['accept'] || '').toLowerCase();
      const urlPath = (req.url || '/').split('?')[0];

      if ((urlPath === '/' || urlPath === '/index.html') && accept.includes('text/markdown')) {
        const mdPath = path.resolve(__dirname, 'public/index.md');
        if (fs.existsSync(mdPath)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.end(fs.readFileSync(mdPath, 'utf-8'));
          return;
        }
      }

      if (urlPath === '/index.md') {
        const mdPath = path.resolve(__dirname, 'public/index.md');
        if (fs.existsSync(mdPath)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.end(fs.readFileSync(mdPath, 'utf-8'));
          return;
        }
      }

      if (urlPath === '/.well-known/mcp/server-card.json') {
        const cardPath = path.resolve(__dirname, 'public/.well-known/mcp/server-card.json');
        if (fs.existsSync(cardPath)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(fs.readFileSync(cardPath, 'utf-8'));
          return;
        }
      }

      next();
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [agentReadinessPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
