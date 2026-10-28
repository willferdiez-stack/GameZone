async function cargarComponente(selector, ruta) {
    const contenedor = document.querySelector(selector);

    if (!contenedor) {
        console.warn(`No se encontró el elemento: ${selector}`);
        return;
    }

    try {
        const respuesta = await fetch(ruta);

        if (!respuesta.ok) {
            throw new Error(
                `Error al cargar ${ruta}: ${respuesta.status}`
            );
        }

        const html = await respuesta.text();
        contenedor.innerHTML = html;

    } catch (error) {
        console.error("Error al cargar el componente:", error);
    }
}

export async function cargarHeaderFooter() {
    await Promise.all([
        cargarComponente(
            "#header-container",
            "../componentes/header.html"
        ),
        cargarComponente(
            "#footer-container",
            "../componentes/footer.html"
        )
    ]);
}