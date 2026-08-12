# Presupuestos — Herrería

App para armar presupuestos de trabajos de herrería (portones, puertas, rejas) desde el celular.

Un solo archivo, sin dependencias: no usa librerías externas ni servidor. El PDF se genera
en el propio navegador con un escritor de PDF incluido en el código.

## Cómo funciona

1. **Presupuesto** — cliente, descripción del trabajo y los materiales con sus cantidades.
   Abajo se ve el total de materiales en vivo.
2. **Continuar** — muestra el total de materiales y pregunta cuánto agregarle,
   en porcentaje o en monto fijo. Ese es el adicional de mano de obra y ganancia.
3. **Crear presupuesto en PDF** — genera el archivo y lo deja listo para descargar,
   compartir por WhatsApp o imprimir.

En el PDF el cliente ve el trabajo, la lista de materiales **solo con los nombres**
y el total final. No ve las cantidades ni los precios de cada material.

Las otras pestañas son la lista de materiales (alta, edición y borrado de precios y
unidades), el historial de presupuestos hechos y los ajustes del taller.

## Dónde se guardan los datos

Todo queda en el `localStorage` del navegador del teléfono: la lista de materiales,
los ajustes y el historial. **No se sube nada a ningún lado.** Los precios que hay en
este repositorio son de ejemplo; los reales viven solo en el dispositivo.

Como se guarda en el navegador, conviene bajar un respaldo cada tanto desde
**Ajustes → Descargar respaldo**, y restaurarlo si se cambia de teléfono.

## Publicar

Es un sitio estático: alcanza con servir `index.html` desde la raíz.
Con GitHub Pages, en Settings → Pages elegir la rama `main` y la carpeta `/ (root)`.

## Archivos

| Archivo                | Qué es                                        |
|------------------------|-----------------------------------------------|
| `index.html`           | La app entera: interfaz, lógica y generador de PDF |
| `manifest.webmanifest` | Datos para instalarla como app en el teléfono |
| `icono.svg`            | Ícono                                          |
