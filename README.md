# Alexander Vásquez — Portafolio

Portafolio profesional en español, implementado con Vite, HTML semántico, CSS y JavaScript. Conserva la base ligera del proyecto original y sus dependencias de animación (GSAP, ScrollTrigger y Lenis), con animaciones progresivas que se desactivan cuando el sistema solicita reducir movimiento.

## Requisitos
- Node.js 18 o superior (se recomienda una versión LTS actual).
- npm.

## Desarrollo local
```bash
npm ci
npm run dev
```

Vite mostrará la URL local (normalmente `http://localhost:5173`).

## Compilar y previsualizar
```bash
npm run build
npm run preview
```

La compilación se genera en `dist/`.

## Publicar en Netlify
1. Sube el contenido de esta carpeta a un repositorio Git.
2. En Netlify, importa el repositorio.
3. Configuración: comando `npm run build`; directorio de publicación `dist`.
4. `netlify.toml` ya define estos valores. El formulario de contacto utiliza Netlify Forms y se activa al desplegar el sitio en Netlify.

## Publicar en GitHub Pages
El sitio utiliza rutas de recursos absolutas desde la raíz (`/images/...`). Para GitHub Pages en un subdirectorio de repositorio, configura `base` en `vite.config.js` con el nombre del repositorio y ajusta las rutas de recursos antes de desplegar. Para un dominio personalizado servido desde la raíz, la configuración actual es válida.

## Estructura
- `index.html`: contenido, navegación, metadatos SEO y formulario.
- `src/main.js`: menú móvil, progreso de lectura, animaciones y demo de listas dependientes.
- `src/style.css`: sistema visual, componentes y breakpoints responsive.
- `public/images/alexander-profile.webp (optimizada) y alexander-profile.png (original)`: fotografía proporcionada para el retrato. Se conserva la imagen original sin generar ni alterar rasgos faciales.
- `public/foto.jpg` y `public/foto.webp`: recursos heredados del proyecto original.

## Datos que conviene completar antes de publicar
- Revisar y aprobar la descripción pública de cada proyecto y la contribución personal que puede divulgarse.
- Añadir un correo profesional si se desea mostrarlo directamente.
- Confirmar si se quiere publicar un CV descargable y proporcionar el archivo definitivo.
- Confirmar el estado actual y tecnologías finales de Prezio.
- Si se desea, reemplazar la foto por una versión con fondo eliminado profesionalmente. Esta entrega usa la fotografía original enmarcada sobre el fondo del sitio; no se ha simulado una eliminación de fondo.

No se incluyen credenciales, variables de entorno, datos privados de clientes ni enlaces sociales inventados. Los enlaces de GitHub y LinkedIn se conservaron de la versión de origen.
