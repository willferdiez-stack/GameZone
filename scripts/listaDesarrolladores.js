import { getDesarrolladores } from "./main.js";
import { crearTarjetaDesarrollador } from "./tarjetaDesarrollador.js";

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

    // actualizarBotones(pagina, maxPaginas);

    // const pagActual = document.getElementById("numPagina");

    // if (listaJuegos.length === 0) {
    //     pagActual.textContent = "No hay resultados";
    // } else {
    //     pagActual.textContent = `Página ${pagina} de ${maxPaginas}`;
    // }

}

await mostrarDesarrolladores();