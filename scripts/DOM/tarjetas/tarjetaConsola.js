export function crearTarjetaConsola(con, esFavoritos = false) {

    // Tarjeta principal
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("tarjeta");

    // Imagen de la consola
    const imgConsola = document.createElement("img");
    imgConsola.classList.add("imgConsola");
    // imgConsola.src = con.image_background;
    imgConsola.src = `../img/${con.name}.png`;
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

    // Información de la consola
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
    const botonFavorito = document.createElement("button");
    botonFavorito.classList.add("favorito");
    botonFavorito.type = "button";

    // Imagen del corazón
    const corazon = document.createElement("img");

    // Comprobar si la consola ya es favorita
    const existe = favoritos.find(consola => consola.id === con.id);

    if (existe) {
        corazon.src = "../img/HeartFull.png";
        corazon.alt = "Quitar de favoritos";
    } else {
        corazon.src = "../img/HeartEmpty.webp";
        corazon.alt = "Añadir a favoritos";
    }

    // Introducir la imagen dentro del botón
    botonFavorito.appendChild(corazon);

    // Pulsar el corazón
    botonFavorito.addEventListener("click", function () {

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

            corazon.src = "../img/HeartEmpty.webp";
            corazon.alt = "Añadir a favoritos";

            // Si estamos en Favoritos, retirar la tarjeta
            if (esFavoritos) {
                divTarjeta.remove();
            }

        } else {

            // Añadir a favoritos
            favoritos.push(con);

            corazon.src = "../img/HeartFull.png";
            corazon.alt = "Quitar de favoritos";
        }

        // Guardar los cambios
        localStorage.setItem(
            "ConsolasFavorito",
            JSON.stringify(favoritos)
        );
    });

    divTarjetaBody.appendChild(botonFavorito);

    // Botón Ver más
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("verMas");

    buttonVerMas.addEventListener("click", function () {
        localStorage.setItem("IdConsola", con.id);
        location.href = "infoConsola.html";
    });

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