import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Sirve /proyectos como /proyectos.html en dev y preview (Netlify lo resuelve en netlify.toml).
const cleanProjectsUrl = () => {
  const rewrite = (req, _res, next) => {
    if (req.url === '/proyectos' || req.url.startsWith('/proyectos?')) req.url = req.url.replace('/proyectos', '/proyectos.html');
    next();
  };
  return {
    name: 'clean-projects-url',
    configureServer: (server) => server.middlewares.use(rewrite),
    configurePreviewServer: (server) => server.middlewares.use(rewrite),
  };
};

export default defineConfig({
  plugins: [cleanProjectsUrl()],
  build: {
    target: 'es2019',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
      },
    },
  },
});
