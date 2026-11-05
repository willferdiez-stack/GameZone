import { getConsolas } from "../../main.js";
import { crearTarjetaConsola } from "../tarjetas/tarjetaConsola.js";

let pagina = 1;
let listaConsolas = [];
let maxPaginas;

async function mostrarConsolas(number) {
    listaConsolas = await getConsolas(number);

    console.log(listaConsolas);

    maxPaginas = listaConsolas.info.pages;
    console.log(maxPaginas);

    montarLista(listaConsolas.consolas);
}

function montarLista(listaConsolas) {

    const lista = document.getElementById("listaConsolas");

    lista.innerHTML = "";

    console.log(listaConsolas);

    listaConsolas.forEach(cn => {

        const tarjeta = crearTarjetaConsola(cn);

        lista.appendChild(tarjeta);

    });
}

await mostrarConsolas();