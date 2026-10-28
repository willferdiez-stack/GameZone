import { cargarHeaderFooter } from "../componentes/componentes.js";
import { Juego } from "../clases/claseJuego.js";
import { Desarrollador } from "../clases/claseDesarrollador.js";

const API_KEY  = "6f95e993ea6647dda5027fabce1c5ca4";

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

cargarHeaderFooter();