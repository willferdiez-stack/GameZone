import { getDesarrollador } from "../../main.js";

const idDesarrollador = localStorage.getItem("IdDesarrollador");

// Recuperar favoritos
let favoritos = JSON.parse(localStorage.getItem("DevFavorito")) || [];

let desarrollador;

// Obtener información del desarrollador seleccionado
async function obtenerInfoDesarrollador() {
    try {
        desarrollador = await getDesarrollador(idDesarrollador);

        if (!desarrollador) {
            console.error("No se ha encontrado el desarrollador");
            return;
        }

        muestraDatos();

    } catch (error) {
        console.error("Error al cargar el desarrollador:", error);
    }
}

function muestraDatos() {

    const container = document.getElementById("container");

    if (!container) {
        console.error("No se encuentra el contenedor del desarrollador");
        return;
    }

    container.innerHTML = "";

    // =========================
    // CONTENEDOR SUPERIOR
    // =========================

    const parteSuperior = document.createElement("div");
    parteSuperior.className = "desarrollador-top";

    // Imagen
    if (desarrollador.imageBackground) {
        const imagen = document.createElement("img");
        imagen.src = desarrollador.imageBackground;
        imagen.alt = desarrollador.name;
        imagen.className = "desarrollador-image";

        parteSuperior.append(imagen);
    }

    // Información
    const info = document.createElement("section");
    info.className = "desarrollador-info";

    // Título
    const titulo = document.createElement("h1");
    titulo.textContent = desarrollador.name;

    // Botón de favoritos
    const botonFavorito = document.createElement("button");
    botonFavorito.className = "boton-favorito";
    botonFavorito.type = "button";

    const corazon = document.createElement("img");
    corazon.className = "corazon";
    corazon.alt = "Añadir a favoritos";

    function actualizarCorazon() {
        const esFavorito = favoritos.some(
            fav => fav.id === desarrollador.id
        );

        corazon.src = esFavorito
            ? "../img/HeartFull.png"
            : "../img/HeartEmpty.webp";
    }

    actualizarCorazon();

    botonFavorito.append(corazon);

    botonFavorito.addEventListener("click", function () {

        const esFavorito = favoritos.some(
            fav => fav.id === desarrollador.id
        );

        if (esFavorito) {
            favoritos = favoritos.filter(
                fav => fav.id !== desarrollador.id
            );
        } else {
            favoritos.push(desarrollador);
        }

        localStorage.setItem(
            "DevFavorito",
            JSON.stringify(favoritos)
        );

        actualizarCorazon();
    });

    const tituloContainer = document.createElement("div");
    tituloContainer.className = "titulo-container";

    tituloContainer.append(titulo, botonFavorito);

    // =========================
    // DATOS DEL DESARROLLADOR
    // =========================

    const datos = document.createElement("section");
    datos.className = "desarrollador-datos";

    // Número de juegos
    const juegos = document.createElement("p");
    juegos.className = "desarrollador-juegos";

    const iconoJuegos = document.createElement("img");
    iconoJuegos.src = "../img/Rating-Star.svg";
    iconoJuegos.alt = "";
    iconoJuegos.className = "rating-icon";

    const textoJuegos = document.createElement("span");
    textoJuegos.textContent = desarrollador.gamesCount;

    juegos.append(iconoJuegos, textoJuegos);

    datos.append(juegos);

    info.append(tituloContainer, datos);

    parteSuperior.append(info);

    // =========================
    // AÑADIR TODO AL CONTENEDOR
    // =========================

    container.append(parteSuperior);
}

// Iniciar
obtenerInfoDesarrollador();