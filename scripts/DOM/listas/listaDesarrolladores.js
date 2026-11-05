import { getDesarrolladores } from "../../main.js";
import { crearTarjetaDesarrollador } from "../tarjetas/tarjetaDesarrollador.js";

let pagina = 1;
let listaDesarrolladores = [];
let maxPaginas;

async function mostrarDesarrolladores(number) {
    listaDesarrolladores = await getDesarrolladores(number);

    console.log(listaDesarrolladores);

    maxPaginas = listaDesarrolladores.info.pages;
    console.log(maxPaginas);

    montarLista(listaDesarrolladores.desarrolladores);
}

function montarLista(listaDesarrolladores) {

    const lista = document.getElementById("listaDesarrolladores");

    lista.innerHTML = "";

    console.log(listaDesarrolladores);

    listaDesarrolladores.forEach(dev => {

        const tarjeta = crearTarjetaDesarrollador(dev);

        lista.appendChild(tarjeta);

    });
}

await mostrarDesarrolladores();