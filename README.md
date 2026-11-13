# EducaLabCR — sitio web

Versión actual del sitio de EducaLabCR: Sigma Docente, Luma, Relay, productos, recursos y Maletín de profe. Incluye el logo original y el video de Sigma en el inicio.

## Publicación

`dist/` contiene el sitio estático completo, listo para servir desde la raíz de un dominio. No necesita base de datos ni claves de API. Configure su hosting para servir los archivos `index.html` de cada directorio y el respaldo `dist/index.html` para rutas del cliente.

### Dokploy con Dockerfile

El repositorio incluye un `Dockerfile` que sirve `dist/` con Nginx en el puerto `80`; en Dokploy, seleccione el método **Dockerfile** y configure el puerto del contenedor como `80`. El `.dockerignore` limita el contexto de construcción al sitio compilado y a la configuración de Nginx.

Los metadatos canónicos del sitio se generan con `SITE_URL`, cuyo valor predeterminado es `https://www.educalabcr.com`. Si el dominio público es distinto, establezca `SITE_URL` al ejecutar `npm run build` y publique el `dist/` resultante.

## Desarrollo

Requisitos: Node.js 20 o superior y Python 3.10 o superior.

```sh
npm install
python3 -m pip install -r requirements.txt
npm run build
python3 -m http.server 8000 --directory dist
```

`npm run build` reconstruye la adaptación y comprueba módulos, rutas y recursos locales. `npm run check` ejecuta únicamente las comprobaciones.

- `scripts/educalab-docentes.js`: página Sigma Docente basada en el manual, con Registrar, Planear y Crear.
- `scripts/educalab-pages.js`: páginas interiores y Maletín de profe.
- `scripts/educalab-relay.css` y `scripts/educalab-relay-card.svg`: diseño y visual ilustrativo de la ficha de Relay en `/relay/`.
- `scripts/educalab-brand.css`: estilos de la marca y adaptación a móvil.
- `scripts/educalab-runtime.js`: ajustes dinámicos y fondo ASCII con cambios cada segundo.
- `scripts/educalab-original-logo.py`: composición de los originales de `design/original-logos/`.
- `dist/brand/educalab-home.mp4`: video optimizado del inicio, con audio y controles.
- `reference/`: base de los módulos y documentos de referencia utilizada por la reconstrucción; no depende de commits de otro repositorio.
- `.openai/hosting.json`: configuración del sitio existente en ChatGPT Sites.

Los recursos finales están incluidos. Los scripts `mirror.py`, `complete-assets.py` y `educalab-media.py` documentan la preparación inicial; no es necesario ejecutarlos para construir esta versión.

## Alcance

Este proyecto es la presentación web de EducaLabCR. Los enlaces a productos y servicios llevan a sus destinos oficiales. El sitio no implementa los servicios de IA ni la gestión académica de Sigma.

La base visual y sus demostraciones originales proceden de Causal Software Limited. Se conservan los archivos de referencia como procedencia técnica. La adaptación es un proyecto independiente de EducaLabCR.
