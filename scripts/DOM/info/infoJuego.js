import { getJuego } from "../../main.js";

const idJuego = localStorage.getItem("IdJuego");

// Recuperar favoritos
let favoritos = JSON.parse(localStorage.getItem("JuegosFavorito")) || [];

let juego;

// Obtener información del juego seleccionado
async function obtenerInfoJuego() {
    try {
        juego = await getJuego(idJuego);

        if (!juego) {
            console.error("No se ha encontrado el juego");
            return;
        }

        muestraDatos();

    } catch (error) {
        console.error("Error al cargar el juego:", error);
    }
}


function muestraDatos() {

    const container = document.getElementById("container");

    if (!container) {
        console.error("No se encuentra el contenedor del juego");
        return;
    }

    container.innerHTML = "";

    // =========================
    // CONTENEDOR SUPERIOR
    // =========================

    const parteSuperior = document.createElement("div");
    parteSuperior.className = "juego-top";

    // Imagen
    if (juego.background_image) {
        const imagen = document.createElement("img");
        imagen.src = juego.background_image;
        imagen.alt = juego.name;
        imagen.className = "juego-image";

        parteSuperior.append(imagen);
    }

    // Información
    const info = document.createElement("section");
    info.className = "juego-info";

    // Título
    const titulo = document.createElement("h1");
    titulo.textContent = juego.name;

    // Botón de favoritos
    const botonFavorito = document.createElement("button");
    botonFavorito.className = "boton-favorito";
    botonFavorito.type = "button";

    const corazon = document.createElement("img");
    corazon.className = "corazon";
    corazon.alt = "Añadir a favoritos";

    function actualizarCorazon() {
        const esFavorito = favoritos.some(
            fav => fav.id === juego.id
        );

        corazon.src = esFavorito
            ? "../img/HeartFull.png"
            : "../img/HeartEmpty.webp";
    }

    actualizarCorazon();

    botonFavorito.append(corazon);

    botonFavorito.addEventListener("click", function () {

        const esFavorito = favoritos.some(
            fav => fav.id === juego.id
        );

        if (esFavorito) {
            favoritos = favoritos.filter(
                fav => fav.id !== juego.id
            );
        } else {
            favoritos.push(juego);
        }

        localStorage.setItem(
            "JuegosFavorito",
            JSON.stringify(favoritos)
        );

        actualizarCorazon();
    });

    const tituloContainer = document.createElement("div");
    tituloContainer.className = "titulo-container";

    tituloContainer.append(titulo, botonFavorito);

    // =========================
    // DATOS DEL JUEGO
    // =========================

    const datos = document.createElement("section");
    datos.className = "juego-datos";

    // Valoración
    const rating = document.createElement("p");
    rating.className = "juego-rating";

    const iconoRating = document.createElement("img");
    iconoRating.src = "../img/Rating-Star.svg";
    iconoRating.alt = "";
    iconoRating.className = "rating-icon";

    const textoRating = document.createElement("span");
    textoRating.textContent = juego.rating;

    rating.append(iconoRating, textoRating);

    // Fecha de lanzamiento
    const released = document.createElement("p");
    released.className = "juego-released";

    const textoReleased = document.createElement("span");

    textoReleased.textContent = juego.released
        ? juego.released
        : "Fecha de lanzamiento desconocida";

    released.append(textoReleased);

    datos.append(rating, released);

    info.append(tituloContainer, datos);

    parteSuperior.append(info);

    // =========================
    // PLATAFORMAS
    // =========================

    const plataformasContainer = document.createElement("section");
    plataformasContainer.className = "consolas-container";

    const tituloPlataformas = document.createElement("h2");
    tituloPlataformas.textContent = "Disponible en";

    const listaPlataformas = document.createElement("div");
    listaPlataformas.className = "listaTarjetas";

    plataformasContainer.append(tituloPlataformas, listaPlataformas);

    if (juego.platforms && juego.platforms.length > 0) {

        juego.platforms.forEach(function (elemento) {

            const plataforma = document.createElement("p");

            plataforma.className = "tarjeta plataforma";
            plataforma.textContent = elemento.platform.name;

            listaPlataformas.append(plataforma);
        });

    } else {

        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay información sobre las plataformas.";

        listaPlataformas.append(mensaje);
    }

    // =========================
    // AÑADIR TODO AL CONTENEDOR
    // =========================

    container.append(parteSuperior, plataformasContainer);
}


// Iniciar
obtenerInfoJuego();