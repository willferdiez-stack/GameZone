import { getJuegos, getJuegosFiltrados } from "../../main.js";
import { crearTarjetaJuego } from "../tarjetas/tarjetaJuego.js";

let pagina = 1;
let listaJuegos = [];
let maxPaginas;

async function mostrarJuegos(number) {
    listaJuegos = await getJuegos(number);

    console.log(listaJuegos);

    maxPaginas = listaJuegos.info.pages;
    console.log(maxPaginas);

    montarLista(listaJuegos.juegos);
}

function montarLista(listaJuegos) {

    const lista = document.getElementById("listaJuegos");

    lista.innerHTML = "";

    console.log(listaJuegos);

    listaJuegos.forEach(vg => {

        const tarjeta = crearTarjetaJuego(vg);

        lista.appendChild(tarjeta);

    });

    // actualizarBotones(pagina, maxPaginas);

    // const pagActual = document.getElementById("numPagina");

    // if (listaJuegos.length === 0) {
    //     pagActual.textContent = "No hay resultados";
    // } else {
    //     pagActual.textContent = `Página ${pagina} de ${maxPaginas}`;
    // }

}

const slider = document.getElementById("valoracion");
const valorActual = document.getElementById("valor-actual");

slider.addEventListener("input", () => {
    valorActual.textContent = Number(slider.value).toFixed(2);
});

const formulario = document.getElementById("formulario-busqueda");

let filtro = {
    nombre: "",
    rating: 0,
    orden: "nombre-asc"
};

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("busqueda").value
        .trim()
        .toLowerCase();

    const rating = Number(valorActual.textContent);

    const orden = document.getElementById("ordenar").value;

    filtro = {
        nombre: name,
        rating: rating,
        orden: orden
    };

    // Obtener los juegos filtrados y ordenados
    const juegosFiltrados = await getJuegosFiltrados(filtro);

    console.log(juegosFiltrados);

    montarLista(juegosFiltrados.juegos);
});

await mostrarJuegos();