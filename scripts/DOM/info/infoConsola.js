import { getConsola } from "../../main.js";

const idConsola = localStorage.getItem("IdConsola");

// Recuperar favoritos
let favoritos = JSON.parse(localStorage.getItem("ConsolasFavorito")) || [];

let consola;

// Obtener información de la consola seleccionada
async function obtenerInfoConsola() {
    try {
        consola = await getConsola(idConsola);

        if (!consola) {
            console.error("No se ha encontrado la consola");
            return;
        }

        muestraDatos();

    } catch (error) {
        console.error("Error al cargar la consola:", error);
    }
}

function muestraDatos() {

    const container = document.getElementById("container");

    if (!container) {
        console.error("No se encuentra el contenedor de la consola");
        return;
    }

    container.innerHTML = "";

    // =========================
    // CONTENEDOR SUPERIOR
    // =========================

    const parteSuperior = document.createElement("div");
    parteSuperior.className = "consola-top";

    // Imagen
    const imagen = document.createElement("img");
    imagen.src = `../img/${consola.name}.png`;
    imagen.alt = consola.name;
    imagen.className = "consola-image";

    parteSuperior.append(imagen);

    // Información
    const info = document.createElement("section");
    info.className = "consola-info";

    // Título
    const titulo = document.createElement("h1");
    titulo.textContent = consola.name;

    // Botón de favoritos
    const botonFavorito = document.createElement("button");
    botonFavorito.className = "boton-favorito";
    botonFavorito.type = "button";

    const corazon = document.createElement("img");
    corazon.className = "corazon";
    corazon.alt = "Añadir a favoritos";

    function actualizarCorazon() {
        const esFavorito = favoritos.some(
            fav => fav.id === consola.id
        );

        corazon.src = esFavorito
            ? "../img/HeartFull.png"
            : "../img/HeartEmpty.webp";
    }

    actualizarCorazon();

    botonFavorito.append(corazon);

    botonFavorito.addEventListener("click", function () {

        const esFavorito = favoritos.some(
            fav => fav.id === consola.id
        );

        if (esFavorito) {
            favoritos = favoritos.filter(
                fav => fav.id !== consola.id
            );
        } else {
            favoritos.push(consola);
        }

        localStorage.setItem(
            "ConsolasFavorito",
            JSON.stringify(favoritos)
        );

        actualizarCorazon();
    });

    const tituloContainer = document.createElement("div");
    tituloContainer.className = "titulo-container";

    tituloContainer.append(titulo, botonFavorito);

    // =========================
    // DATOS DE LA CONSOLA
    // =========================

    const datos = document.createElement("section");
    datos.className = "consola-datos";

    // Número de juegos
    const juegos = document.createElement("p");
    juegos.className = "consola-juegos";

    const iconoJuegos = document.createElement("img");
    iconoJuegos.src = "../img/mando-blanco.png";
    iconoJuegos.alt = "";
    iconoJuegos.className = "rating-icon";

    const textoJuegos = document.createElement("span");
    textoJuegos.textContent = consola.games_count;

    juegos.append(iconoJuegos, textoJuegos);
    datos.append(juegos);

    // =========================
    // AÑO DE INICIO
    // =========================

    const inicio = document.createElement("p");
    inicio.className = "consola-inicio";

    const iconoInicio = document.createElement("img");
    iconoInicio.src = "../img/Release-Date.png";
    iconoInicio.alt = "";
    iconoInicio.className = "rating-icon";

    const textoInicio = document.createElement("span");
    textoInicio.textContent = consola.year_start
        ? `Fecha de lanzamiento: ${consola.year_start}`
        : "Fecha de lanzamiento desconocida";

    inicio.append(iconoInicio, textoInicio);
    datos.append(inicio);

    // =========================
    // AÑO DE FINALIZACIÓN
    // =========================

    const fin = document.createElement("p");
    fin.className = "consola-fin";

    const iconoFin = document.createElement("img");
    iconoFin.src = "../img/Release-Date.png";
    iconoFin.alt = "";
    iconoFin.className = "rating-icon";

    const textoFin = document.createElement("span");

    if (consola.year_end === "En activo") {
        textoFin.textContent = "Actualmente en activo";
    } else if (consola.year_end) {
        textoFin.textContent = `Año de finalización: ${consola.year_end}`;
    } else {
        textoFin.textContent = "Fecha de finalización desconocida";
    }

    fin.append(iconoFin, textoFin);
    datos.append(fin);

    // =========================
    // UNIR ELEMENTOS
    // =========================

    info.append(tituloContainer, datos);
    parteSuperior.append(info);

    // =========================
    // AÑADIR TODO AL CONTENEDOR
    // =========================

    container.append(parteSuperior);
}

// Iniciar
obtenerInfoConsola();