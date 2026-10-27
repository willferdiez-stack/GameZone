import { getJuegos } from "./main.js";
import { crearTarjetaJuego } from "./tarjetaJuego.js";

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

await mostrarJuegos();