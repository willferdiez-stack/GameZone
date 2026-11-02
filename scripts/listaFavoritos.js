import { crearTarjetaJuego } from "./tarjetaJuego.js";
import { crearTarjetaDesarrollador } from "./tarjetaDesarrollador.js";
import { crearTarjetaConsola } from "./tarjetaConsola.js";

function leerJuegosFavoritos() {
    const guardados = localStorage.getItem("JuegosFavorito");

    if (guardados === null) {
        return [];
    }

    return JSON.parse(guardados);
}

function leerDesarrolladoresFavoritos() {
    const guardados = localStorage.getItem("DesarrolladoresFavorito");

    if (guardados === null) {
        return [];
    }

    return JSON.parse(guardados);
}

function leerConsolasFavoritos() {
    const guardados = localStorage.getItem("ConsolasFavorito");

    if (guardados === null) {
        return [];
    }

    return JSON.parse(guardados);
}

// Comprobación temporal de la lectura.
const juegosFavoritos = leerJuegosFavoritos();
const desarrolladoresFavoritos = leerDesarrolladoresFavoritos();
const consolasFavoritas = leerConsolasFavoritos();
console.log(juegosFavoritos);
console.log(desarrolladoresFavoritos);
console.log(consolasFavoritas);

const contenedorJuegos = document.getElementById("favoritos-juegos");
const contenedorDesarrolladores = document.getElementById("favoritos-desarrolladores");
const contenedorConsolas = document.getElementById("favoritos-consolas");

juegosFavoritos.forEach(function (juego) {
    const tarjeta = crearTarjetaJuego(juego, true);
    contenedorJuegos.appendChild(tarjeta);
});

desarrolladoresFavoritos.forEach(function (desarrollador) {
    const tarjeta = crearTarjetaDesarrollador(desarrollador, true);
    contenedorDesarrolladores.appendChild(tarjeta);
});

consolasFavoritas.forEach(function (consola) {
    const tarjeta = crearTarjetaConsola(consola, true);
    contenedorConsolas.appendChild(tarjeta);
});

// Comprueba si una sección tiene tarjetas
function actualizarSeccion(idContenedor, idTitulo, idMensaje) {

    const contenedor = document.getElementById(idContenedor);
    const titulo = document.getElementById(idTitulo);
    const mensaje = document.getElementById(idMensaje);

    // Compruebo si el contenedor está vacío
    const estaVacio = contenedor.children.length === 0;

    // Si está vacío, oculto el título
    titulo.hidden = estaVacio;

    // Si está vacío, muestro el mensaje
    mensaje.hidden = !estaVacio;
}

// Actualizo las tres secciones
function actualizarSecciones() {

    actualizarSeccion(
        "favoritos-juegos",
        "titulo-juegos",
        "sin-juegos"
    );

    actualizarSeccion(
        "favoritos-desarrolladores",
        "titulo-desarrolladores",
        "sin-desarrolladores"
    );

    actualizarSeccion(
        "favoritos-consolas",
        "titulo-consolas",
        "sin-consolas"
    );
}

// Compruebo las secciones al cargar la página
actualizarSecciones();


// Actualizo los mensajes cuando se pulsa una tarjeta
const contenedores = [
    "favoritos-juegos",
    "favoritos-desarrolladores",
    "favoritos-consolas"
];

contenedores.forEach(function (id) {

    const contenedor = document.getElementById(id);

    contenedor.addEventListener("click", actualizarSecciones);

});