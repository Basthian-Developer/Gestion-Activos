# Gestión de Activos - TecnoSur

Proyecto para administrar el inventario tecnológico de TecnoSur Ltda., una empresa ficticia utilizada en el [documento de requerimientos](documentacion/Documentacion_TecnoSur.pdf). La meta del sistema es conocer qué activos existen, dónde están, quién los tiene asignados y qué ocurrió con ellos durante su ciclo de vida.

**Estado actual:** el frontend permite consultar un inventario de demostración, buscar y filtrar activos, y abrir fichas de computadores, impresoras y periféricos. La gestión completa de asignaciones, reparaciones, traslados e historial todavía está en desarrollo. Los datos visibles no representan un inventario real.

## Cómo funciona hoy

- El frontend está desarrollado con React, TypeScript, Vite, Tailwind CSS, TanStack Query y TanStack Table.
- El inventario consulta los archivos de `frontend/public/data/` a través de servicios y repositorios. Los datos específicos de cada equipo se relacionan con su registro base mediante `activo_id`.
- El resumen y algunas vistas de gestión aún utilizan datos de demostración definidos en `frontend/src/pages/Home.tsx`; por eso sus cifras pueden diferir de las del inventario.
- El backend usa FastAPI y tiene un endpoint inicial para consultar activos en PostgreSQL (`GET /api/activos/get_all`). Todavía no está conectado al frontend ni cubre todos los procesos del documento.
- El alias de dependencias de Vite contempla modos `json` y `api`, pero ambos seleccionan actualmente repositorios JSON. El modo `api` prepara la estructura para la integración futura; aún no realiza solicitudes al backend.

La organización principal del repositorio es:

| Ruta | Contenido |
| --- | --- |
| `frontend/` | Interfaz, modelos, servicios, repositorios y datos JSON de demostración. |
| `api/` | API FastAPI y acceso inicial a PostgreSQL. |
| `documentacion/` | Requerimientos del proyecto y [correcciones pendientes](documentacion/correciones_pendientes.md). |
| `compose.yml` | Configuración preliminar de frontend, API y PostgreSQL. |

## Ejecutar el frontend

Se requiere Node.js 22 o superior y npm. Desde la raíz del repositorio:

```bash
cd frontend
npm ci
npm run dev:json
```

Vite sirve la aplicación en `http://localhost:3000`. Los repositorios JSON leen los archivos de `frontend/public/data/`, no los duplicados de `frontend/src/data/`.

Para comprobar el código y generar una compilación estática:

```bash
npm run lint
npm run build:json
```

También existen `npm run dev:api`, `npm run build:api` y `npm run build:github-pages`. Por ahora, estas variantes siguen utilizando datos JSON. La compilación para GitHub Pages se publica mediante el workflow de `.github/workflows/deploy.yml`.

## Backend y Docker

La API se encuentra en una etapa inicial. Su endpoint de activos consulta una tabla `activo` en PostgreSQL; requiere una base de datos configurada con ese esquema. `compose.yml` define servicios para Nginx, FastAPI y PostgreSQL, pero no prepara las tablas ni sustituye la integración pendiente entre frontend y API. El servicio `development` instala y compila el frontend; no inicia un servidor Vite.

## Reglas y trabajo pendiente

La regla acordada para asignaciones vigentes es **un activo por trabajador y un trabajador por activo**. Las asignaciones anteriores deben conservarse en el historial. Esta decisión coincide con RF-27 y RN-10 del documento; RN-11 debe corregirse porque dice lo contrario.

Las diferencias conocidas entre la interfaz actual y los requerimientos, incluida la información de adquisición y garantía, el historial real y la unificación del estado de baja, están registradas en [correciones_pendientes.md](documentacion/correciones_pendientes.md). Las variantes descargables JSON, API y Docker siguen siendo objetivos del proyecto, no artefactos completos en esta etapa.
