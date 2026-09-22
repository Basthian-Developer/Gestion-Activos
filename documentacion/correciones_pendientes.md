# Correcciones pendientes del frontend

Este listado recoge la revision del modulo de visualizacion frente a `Documentacion_TecnoSur.pdf`. El frontend esta en proceso de migracion desde datos de demostracion hacia repositorios que puedan trabajar con JSON y API.

1. **Unificar las fuentes de datos de las vistas.** El inventario ya consulta JSON mediante repositorios, pero el resumen, los indicadores y otras vistas de `Home.tsx` aun usan datos definidos en el componente. Adaptar esas vistas para que consulten la misma fuente cuando avance la migracion.
2. **Corregir datos fijos en las fichas.** Mostrar el estado real en los detalles de computadores y perifericos. Mostrar la marca y el modelo reales en el encabezado de impresoras.
3. **Completar los datos del activo.** Incorporar fecha de adquisicion, garantia y los demas antecedentes necesarios en el modelo, la fuente de datos y la ficha de detalle. Esta ampliacion esta prevista, pero aun no implementada.
4. **Implementar el historial real.** Sustituir el historial comentado en las fichas y los movimientos de demostracion por registros vinculados a cada activo: asignaciones, devoluciones, traslados, reparaciones y cambios de estado. El modulo esta pendiente de diseno e implementacion.
5. **Sustituir los datos de demostracion.** Los JSON actuales, las alertas y los movimientos son datos mockup para desarrollar la interfaz y los adaptadores JSON/API. Al conectar la API real, evitar que estos datos se presenten como hechos operativos.
6. **Unificar el nombre del estado de baja.** El frontend usa `Baja` y el documento usa `Dado de baja`; ambos representan el mismo estado por ahora. Elegir un valor canonico y aplicarlo en datos, filtros, modelos y API.

## Decision sobre asignaciones vigentes

La relacion entre trabajadores y activos asignados sera uno a uno mientras la asignacion este vigente:

- Un activo solo puede estar asignado a un trabajador a la vez.
- Un trabajador solo puede tener un activo asignado a la vez.
- Las asignaciones anteriores se conservan en el historial despues de una devolucion o reasignacion.

Esta decision coincide con RF-27 y RN-10 del documento. Queda pendiente corregir RN-11, que actualmente permite varias asignaciones vigentes para un activo. Al implementar el modulo, validar ambas restricciones en la logica de negocio y en la persistencia de datos.
