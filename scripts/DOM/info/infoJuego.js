import { getJuegos, getElementByURL } from "../../main.js";
import { crearTarjetaEpisodioFav } from "./tarjetaEpisodio.js";
import { crearTarjetaLugar } from "./tarjetaLugar.js";


const idJuego = localStorage.getItem("IdJuego");
let favoritos = JSON.parse(localStorage.getItem("JuegosFavoritos")) || [];
console.log("favs", favoritos, idJuego);

let juego;

async function obtenerInfoJuego() {
    juego = await getJuego(idJuego);
    console.log(juego);

    await muestraDatos();
}

async function muestraDatos() {
    const container = document.getElementById("container");

    // Limpiar el contenedor
    container.innerHTML = "";

    // =========================
    // CONTENEDOR SUPERIOR
    // =========================

    const parteSuperior = document.createElement("div");
    parteSuperior.className = "juego-top";

    // Crear imagen
    const imagen = document.createElement("img");
    imagen.src = juego.background_image;
    imagen.alt = juego.name;
    imagen.className = "juego-image";

    // Crear sección de información
    const info = document.createElement("section");
    info.className = "juego-info";

    const titulo = document.createElement("h1");
    titulo.textContent = juego.name;

    const botonFavorito = document.createElement("button");
    botonFavorito.className = "boton-favorito";
    botonFavorito.type = "button";

    const corazon = document.createElement("img");
    corazon.src = favoritos.some(juego => juego.id === Number(idJuego)) ? "../img/Corazon_lleno.png" : "../img/Heart.png";
    corazon.alt = "Añadir a favoritos";
    corazon.className = "corazon";

    botonFavorito.append(corazon);

    botonFavorito.addEventListener("click", function () {
        const inFavourites = favoritos.some(juego => juego.id === Number(idJuego));
        console.log(inFavourites);


        if (inFavourites) {
            favoritos = favoritos.filter(fav => fav.id !== Number(idJuego));
            corazon.src = "../img/Heart.png";
            corazon.alt = "quitar de favoritos";
        } else {
            favoritos.push(juego);
            corazon.src = "../img/Corazon_lleno.png";
            corazon.alt = "Añadir a favoritos";
        }
        localStorage.setItem("JuegosFavoritos", JSON.stringify(favoritos))
    });

    const tituloContainer = document.createElement("div");
    tituloContainer.className = "titulo-container";
    tituloContainer.append(titulo, botonFavorito);

    // =========================
    // DATOS DEL JUEGO
    // =========================

    const datos = document.createElement("section");
    datos.className = "juego-datos";

    // rating
    const rating = document.createElement("p");
    rating.className = "juego-rating";

    const icono = document.createElement("img");
    icono.src = "../../../img/Rating-Star.svg";
    icono.alt = "";
    icono.className = "rating-icon";

    const texto = document.createElement("span");
    texto.textContent = juego.rating;

    rating.append(icono, texto);

    // Fecha de lanzamiento
    const released = document.createElement("p");
    released.className = "juego-released";

    const iconoReleased = document.createElement("img");
    iconoReleased.src = "../img/Release-Date.png";
    iconoReleased.alt = "";
    iconoReleased.className = "released-icon";

    const textoReleased = document.createElement("span");
    textoReleased.textContent = juego.released;

    released.append(iconoReleased, textoReleased);

    // Añadir los datos
    datos.append(rating, released);

    
    // Añadir información a la sección
    info.append(tituloContainer, caps, datos, localizacion);
    // Imagen e información arriba
    parteSuperior.append(imagen, info);

    // =========================
    // CONTENEDOR DE CONSOLAS
    // =========================

    const consolasContainer = document.createElement("section");
    consolasContainer.className = "consolas-container";

    const tituloConsolas = document.createElement("h2");
    tituloConsolas.textContent = "Consolas";
    tituloConsolas.className = "consolas-titulo";

    consolasContainer.append(tituloConsolas);

    // Recorrer las consolas disponibles (máximo 11)
    const totalConsolas = Math.min(11, personaje.consolas.length);

    for (let i = 0; i < totalConsolas; i++) {
        const urlConsola = personaje.consolas[i];

        const consolaIndividual = await getElementByURL(
            urlConsola,
            "consola"
        );

        const tarjeta = crearTarjetaConsolaFav(consolaIndividual);

        if (tarjeta) {
            consolasContainer.append(tarjeta);
        }
    }
    if (personaje.consolas.length > 11) {
        const masConsolas = document.createElement("span");
        masConsolas.textContent = `...${personaje.consolas.length - 11} consolas más`;
        consolasContainer.append(masConsolas);
    }

    // =========================
    // AÑADIR TODO AL CONTENEDOR
    // =========================

    container.append(parteSuperior, consolasContainer);
}

obtenerInfoJuego();