# Gestión de Activos — TecnoSur

Aplicación para centralizar la gestión del inventario tecnológico de TecnoSur. Su objetivo es mantener organizada y disponible la información de computadores, notebooks, impresoras y periféricos, facilitando su consulta, clasificación y trazabilidad durante el ciclo de vida de cada activo.

El proyecto toma como base los requerimientos descritos en [`documentacion/Documentacion_TecnoSur.pdf`](documentacion/Documentacion_TecnoSur.pdf) y actualmente incluye una interfaz de inventario que permite buscar y filtrar activos por tipo y estado.

## Estado actual

La solución se está construyendo con una arquitectura desacoplada, de modo que la interfaz pueda utilizar distintas fuentes de datos sin modificar la lógica de presentación:

- **Frontend:** React, TypeScript, Vite, Tailwind CSS y TanStack Query.
- **Fuentes locales:** repositorios que consultan archivos JSON estáticos.
- **Backend:** API REST desarrollada con FastAPI y una capa de repositorios.
- **Persistencia:** integración en desarrollo con PostgreSQL y servicios externos como Supabase.
- **Despliegue:** GitHub Actions para GitHub Pages y una configuración Docker Compose con frontend, backend y base de datos.

Entre los últimos avances se encuentran la incorporación de computadores, impresoras y periféricos al inventario, la separación de servicios y repositorios, el manejo de estados de carga y error, y la configuración de compilaciones independientes para los modos JSON, API y GitHub Pages.

## Próximos artefactos descargables

Próximamente se publicarán **tres artefactos descargables**, pensados para diferentes escenarios de uso:

1. **Versión JSON:** aplicación autocontenida que trabaja directamente con archivos JSON locales. Podrá ejecutarse como una demostración estática, sin requerir backend ni base de datos.
2. **Versión API:** frontend preparado para trabajar mediante una API y consumir servicios externos. Esta variante permitirá integrar los datos del inventario con fuentes remotas.
3. **Versión Docker:** paquete listo para desplegar la solución completa mediante Docker, incluyendo los servicios necesarios para ejecutar el frontend, la API y la base de datos.

La selección de repositorios mediante dependencias permite generar estas variantes desde una misma base de código y adaptar la aplicación al entorno donde será utilizada.

## Ejecución del frontend

Requisitos: Node.js 22 o superior y npm.

```bash
cd frontend
npm install
```

Para iniciar el modo que utiliza archivos JSON locales:

```bash
npm run dev:json
```

Para iniciar el modo preparado para la integración con API:

```bash
npm run dev:api
```

Las compilaciones equivalentes se generan con:

```bash
npm run build:json
npm run build:api
npm run build:github-pages
```

> La variante API y la generación/publicación de los tres paquetes descargables continúan en desarrollo.

## Ejecución con Docker

El repositorio ya contiene una configuración preliminar de Docker Compose con servicios para el frontend, la API y PostgreSQL. Esta modalidad continúa en desarrollo y se ajustará antes de publicar el artefacto Docker listo para despliegue mencionado anteriormente.
