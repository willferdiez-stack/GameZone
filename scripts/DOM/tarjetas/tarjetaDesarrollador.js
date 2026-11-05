export function crearTarjetaDesarrollador(dev, esFavoritos = false) {

    // Tarjeta principal
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("tarjeta");

    // Imagen del desarrollador
    const imgDev = document.createElement("img");
    imgDev.classList.add("imgDev");
    // imgDev.src = dev.imageBackground;
    imgDev.src = `../img/${dev.name}.png`;
    imgDev.alt = dev.name;
    divTarjeta.appendChild(imgDev);

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
    p.textContent = dev.name;
    divInfo.appendChild(p);

    // Información del desarrollador
    const ul = document.createElement("ul");
    divInfo.appendChild(ul);

    ul.appendChild(crearLista(dev.gamesCount, "../img/mando-blanco.png"));

    // Recuperar los favoritos guardados
    let favoritos = JSON.parse(
        localStorage.getItem("DevFavorito")
    ) || [];

    // Corazón de favoritos
    const botonFavorito = document.createElement("button");
    botonFavorito.classList.add("favorito");
    botonFavorito.type = "button";

    // Imagen del corazón
    const corazon = document.createElement("img");

    // Comprobar si el desarrollador ya es favorito
    const existe = favoritos.find(developer => developer.id === dev.id);

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
            localStorage.getItem("DevFavorito")
        ) || [];

        const encontrado = favoritos.find(
            developer => developer.id === dev.id
        );

        if (encontrado) {

            // Quitar de favoritos
            favoritos = favoritos.filter(
                developer => developer.id !== dev.id
            );

            corazon.src = "../img/HeartEmpty.webp";
            corazon.alt = "Añadir a favoritos";

            // Si estamos en Favoritos, retirar la tarjeta
            if (esFavoritos) {
                divTarjeta.remove();
            }

        } else {

            // Añadir a favoritos
            favoritos.push(dev);

            corazon.src = "../img/HeartFull.png";
            corazon.alt = "Quitar de favoritos";
        }

        // Guardar los cambios
        localStorage.setItem(
            "DevFavorito",
            JSON.stringify(favoritos)
        );
    });

    divTarjetaBody.appendChild(botonFavorito);

    // Botón Ver más
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("verMas");

    buttonVerMas.addEventListener("click", function () {
        localStorage.setItem("IdDesarrollador", dev.id);
        location.href = "infoDesarrollador.html";
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