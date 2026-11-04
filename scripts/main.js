import { cargarHeaderFooter } from "../componentes/componentes.js";
import { Juego } from "./clases/claseJuego.js";
import { Desarrollador } from "./clases/claseDesarrollador.js";
import { Consola } from "./clases/claseConsola.js";

// const API_KEY = "6f95e993ea6647dda5027fabce1c5ca4";
const API_KEY = "3b3f0719bb1eb93e1e9a8c39eedebf6ea8ea58a609222f287f17ebcf0a3ef05c";

export async function getJuegos(numberPage = 1) {
    const API_URL = "https://api.rawg.io/api/games";

    const params = new URLSearchParams({
        key: API_KEY,
        page: String(numberPage)
    });

    const response = await fetch(`${API_URL}?${params}`);

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

export async function getDesarrolladores(numberPage = 1) {
    const API_URL = "https://api.rawg.io/api/developers";

    const params = new URLSearchParams({
        key: API_KEY,
        page: String(numberPage)
    });

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
        throw new Error(
            `Error al obtener los desarrolladores: ${response.status}`
        );
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

export async function getConsolas(numberPage = 1) {
    const API_URL = "https://api.rawg.io/api/platforms";

    const params = new URLSearchParams({
        key: API_KEY,
        page: String(numberPage)
    });

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
        throw new Error(`Error al obtener las consolas: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay consolas disponibles");
    }

    const consolas = data.results.map(c => new Consola(c));

    return {
        consolas,
        info: {
            count: data.count,
            next: data.next,
            previous: data.previous
        }
    };
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