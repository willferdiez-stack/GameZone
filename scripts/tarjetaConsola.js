export function crearTarjetaConsola(con, esFavoritos = false) {

    // Tarjeta principal
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("tarjeta");

    // Imagen del personaje
    const imgConsola = document.createElement("img");
    imgConsola.classList.add("imgConsola");
    imgConsola.src = con.image;
    imgConsola.alt = con.name;
    divTarjeta.appendChild(imgConsola);

    // Cuerpo de la tarjeta
    const divTarjetaBody = document.createElement("div");
    divTarjetaBody.classList.add("tarjetaBody");
    divTarjeta.appendChild(divTarjetaBody);

    // Contenedor de información
    const divInfo = document.createElement("div");
    divInfo.classList.add("info");
    divTarjetaBody.appendChild(divInfo);

    // Nombre
    const p = document.createElement("p");
    p.classList.add("nombre");
    p.textContent = con.name;
    divInfo.appendChild(p);

    // Información del personaje
    const ul = document.createElement("ul");
    divInfo.appendChild(ul);

    ul.appendChild(crearLista(con.games_count, "../img/Rating-Star.svg"));
    ul.appendChild(crearLista(con.year_start, "../img/Release-Date.png"));
    ul.appendChild(crearLista(con.year_end, "../img/Release-Date.png"));

    // Recuperar los favoritos guardados
    let favoritos = JSON.parse(
        localStorage.getItem("ConsolasFavorito")
    ) || [];

    // Corazón de favoritos
    const imgFavoritos = document.createElement("img");
    imgFavoritos.classList.add("favorito");

    // Comprobar si el personaje ya es favorito
    const existe = favoritos.find(consola => consola.id === con.id);

    if (existe) {
        imgFavoritos.src = "../img/Corazon_lleno.png";
        imgFavoritos.alt = "Quitar de favoritos";
    } else {
        imgFavoritos.src = "../img/Heart.png";
        imgFavoritos.alt = "Añadir a favoritos";
    }

    // Pulsar el corazón
    imgFavoritos.addEventListener("click", function () {

        favoritos = JSON.parse(
            localStorage.getItem("ConsolasFavorito")
        ) || [];

        const encontrado = favoritos.find(
            consola => consola.id === con.id
        );

        if (encontrado) {

            // Quitar de favoritos
            favoritos = favoritos.filter(
                consola => consola.id !== con.id
            );

            imgFavoritos.src = "../img/Heart.png";
            imgFavoritos.alt = "Añadir a favoritos";

            // Si estamos en Favoritos, retirar la tarjeta
            if (esFavoritos) {
                divTarjeta.remove();
            }

        } else {

            // Añadir a favoritos
            favoritos.push(con);

            imgFavoritos.src = "../img/Corazon_lleno.png";
            imgFavoritos.alt = "Quitar de favoritos";
        }

        // Guardar los cambios
        localStorage.setItem(
            "ConsolasFavorito",
            JSON.stringify(favoritos)
        );
    });

    divTarjetaBody.appendChild(imgFavoritos);

    // Botón Ver más
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("verMas");

    buttonVerMas.addEventListener("click", function () {
        localStorage.setItem("IdConsola", con.id);
        location.href = "infoConsola.html";
    });

    // const iconVerMas = document.createElement("img");
    // iconVerMas.src = "../img/Info.png";
    // iconVerMas.classList.add("iconVerMas");
    // iconVerMas.alt = "";

    // buttonVerMas.appendChild(iconVerMas);
    buttonVerMas.appendChild(document.createTextNode(" Ver más"));

    divTarjeta.appendChild(buttonVerMas);

    // Devolver la tarjeta completa
    return divTarjeta;
}

function crearLista(texto, rutaIcono) {
    // Crear el elemento de la lista
    const li = document.createElement("li");

    // Crear el icono
    const icono = document.createElement("img");
    icono.src = rutaIcono;
    icono.alt = "";
    icono.classList.add("iconoLista");

    // Crear el texto
    const span = document.createElement("span");
    span.textContent = texto;

    // Añadir el icono y el texto al li
    li.appendChild(icono);
    li.appendChild(span);

    // Devolver el elemento completo
    return li;
}