import { cargarHeaderFooter } from "../componentes/componentes.js";
import { Juego } from "./clases/claseJuego.js";
import { Desarrollador } from "./clases/claseDesarrollador.js";
import { Consola } from "./clases/claseConsola.js";

const API_KEY = "6f95e993ea6647dda5027fabce1c5ca4";

// Función para obtener los juegos desde el JSON local
export async function getJuegos(numberPage = 1) {

    const url = new URL("../data/juegos.json", import.meta.url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al obtener los juegos: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay juegos disponibles");
    }

    const juegos = data.results.map(j => new Juego(j));

    return {
        juegos,
        info: {
            count: data.count,
            next: data.next,
            previous: data.previous
        }
    };
}

// Función para obtener los desarrolladores desde el JSON local
export async function getDesarrolladores(numberPage = 1) {

    const url = new URL("../data/desarrolladores.json", import.meta.url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al obtener los desarrolladores: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay desarrolladores disponibles");
    }

    const desarrolladores = data.results.map(
        d => new Desarrollador(d)
    );

    return {
        desarrolladores,
        info: {
            count: data.count,
            next: data.next,
            previous: data.previous
        }
    };
}

// Función para obtener las consolas desde el JSON local
export async function getConsolas(numberPage = 1) {

    const url = new URL("../data/consolas.json", import.meta.url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al obtener las consolas: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay consolas disponibles");
    }

    const consolas = data.results.map(
        c => new Consola(c)
    );

    return {
        consolas,
        info: {
            count: data.count,
            next: data.next,
            previous: data.previous
        }
    };
}

// Función para obtener los juegos desde la API
// export async function getJuegos(numberPage = 1) {
//     const API_URL = "https://api.rawg.io/api/games";

//     const params = new URLSearchParams({
//         key: API_KEY,
//         page: String(numberPage)
//     });

//     const response = await fetch(`${API_URL}?${params}`);

//     if (!response.ok) {
//         throw new Error(`Error al obtener los juegos: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data.results || data.results.length === 0) {
//         throw new Error("No hay juegos disponibles");
//     }

//     const juegos = data.results.map(j => new Juego(j));

//     return {
//         juegos,
//         info: {
//             count: data.count,
//             next: data.next,
//             previous: data.previous
//         }
//     };
// }

// Función para obtener los desarrolladores desde la API
// export async function getDesarrolladores(numberPage = 1) {
//     const API_URL = "https://api.rawg.io/api/developers";

//     const params = new URLSearchParams({
//         key: API_KEY,
//         page: String(numberPage)
//     });

//     const response = await fetch(`${API_URL}?${params}`);

//     if (!response.ok) {
//         throw new Error(
//             `Error al obtener los desarrolladores: ${response.status}`
//         );
//     }

//     const data = await response.json();

//     if (!data.results || data.results.length === 0) {
//         throw new Error("No hay desarrolladores disponibles");
//     }

//     const desarrolladores = data.results.map(
//         d => new Desarrollador(d)
//     );

//     return {
//         desarrolladores,
//         info: {
//             count: data.count,
//             next: data.next,
//             previous: data.previous
//         }
//     };
// }



// Función para obtener las consolas desde la API
// export async function getConsolas(numberPage = 1) {
//     const API_URL = "https://api.rawg.io/api/platforms";

//     const params = new URLSearchParams({
//         key: API_KEY,
//         page: String(numberPage)
//     });

//     const response = await fetch(`${API_URL}?${params}`);

//     if (!response.ok) {
//         throw new Error(`Error al obtener las consolas: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data.results || data.results.length === 0) {
//         throw new Error("No hay consolas disponibles");
//     }

//     const consolas = data.results.map(c => new Consola(c));

//     return {
//         consolas,
//         info: {
//             count: data.count,
//             next: data.next,
//             previous: data.previous
//         }
//     };
// }

/**
 * @param {number} id id del juego
 * @returns información del juego individual
 */
export async function getJuego(id) {
    const url = new URL("../data/juegos.json", import.meta.url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error al obtener los datos del juego");
    }

    const data = await response.json();

    console.log("ID recibido:", id);
    console.log("ID guardado en localStorage:", localStorage.getItem("IdJuego"));
    console.log("IDs disponibles en el JSON:", data.results.map(j => j.id));

    const juegoData = data.results.find(j => j.id === Number(id));

    if (!juegoData) {
        throw new Error("No se ha encontrado el juego");
    }

    const juego = new Juego(juegoData);
    return juego;
}

/**
 * @param {number} id id del desarrollador
 * @returns información del desarrollador individual
 */
export async function getDesarrollador(id) {
    const url = new URL("../data/desarrolladores.json", import.meta.url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error al obtener los datos del desarrollador");
    }

    const data = await response.json();

    const desarrolladorData = data.results.find(d => d.id === Number(id));

    if (!desarrolladorData) {
        throw new Error("No se ha encontrado el desarrollador");
    }

    const desarrollador = new Desarrollador(desarrolladorData);
    return desarrollador;
}

/**
 * @param {number} id id de la consola
 * @returns información de la consola individual
 */
export async function getConsola(id) {
    const url = new URL("../data/consolas.json", import.meta.url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error al obtener los datos de la consola");
    }

    const data = await response.json();

    const consolaData = data.results.find(c => c.id === Number(id));

    if (!consolaData) {
        throw new Error("No se ha encontrado la consola");
    }

    const consola = new Consola(consolaData);
    return consola;
}

export async function getElementByURL(url, type = "juego" || "desarrollador" || "consola") {
    const API_URL = url;

    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del juego');
    }
    const data = await response.json();
    let element;
    switch (type) {
        case "juego":
            element = new Juego(data);
            break;
        case "desarrollador":
            element = new Desarrollador(data);
            break;
        case "consola":
            element = new Consola(data);
            break;
    }

    return element;
}

cargarHeaderFooter();