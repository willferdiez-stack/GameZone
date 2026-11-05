# GameZone

GameZone es una aplicación web para explorar videojuegos, desarrolladores y consolas. Permite consultar sus fichas, buscar y ordenar juegos, y guardar elementos favoritos en el navegador.

## Funcionalidades

- Catálogos de videojuegos, desarrolladores y consolas.
- Fichas con información detallada de cada elemento.
- Búsqueda de juegos por nombre y puntuación mínima, con opciones para ordenar por nombre, puntuación o fecha.
- Gestión de favoritos de juegos, desarrolladores y consolas. Se guardan en `localStorage` y permanecen en el mismo navegador.
- Interfaz construida con HTML, CSS y JavaScript, sin proceso de compilación.

## Cómo ejecutar el proyecto

El proyecto utiliza la extensión **Live Server** de Visual Studio Code. Abre `html/index.html` y selecciona **Open with Live Server** para iniciar la aplicación en el navegador.

## Estructura

```text
componentes/  Cabecera, pie de página y lógica para cargarlos
data/         Datos locales en formato JSON
html/         Portada, catálogos, favoritos y páginas de detalle
img/          Imágenes e iconos
scripts/      Lógica JavaScript, clases y creación de elementos del DOM
styles/       Hojas de estilo
```

## Datos

Los archivos JSON del directorio `data/` contienen datos locales de apoyo. La aplicación estaba pensada para obtener los catálogos desde una API, pero esta no respondía durante el desarrollo y no hubo tiempo de buscar una alternativa. Por eso, los datos JSON permiten probar la aplicación sin depender de la API. En `scripts/main.js` se conserva, comentado, el código que muestra cómo se habría realizado esa conexión.

Los favoritos se almacenan localmente en el navegador y no se sincronizan entre dispositivos.
