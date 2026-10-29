export function crearTarjetaJuego(vg, esFavoritos = false) {

    // Tarjeta principal
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("tarjeta");

    // Imagen del personaje
    const imgJuego = document.createElement("img");
    imgJuego.classList.add("imgJuego");
    imgJuego.src = vg.background_image;
    imgJuego.alt = vg.name;
    divTarjeta.appendChild(imgJuego);

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
    p.textContent = vg.name;
    divInfo.appendChild(p);

    // Información del personaje
    const ul = document.createElement("ul");
    divInfo.appendChild(ul);

    ul.appendChild(crearLista(vg.released, "../img/Release-Date.png"));
    ul.appendChild(crearLista(vg.rating, "../img/Rating-Star.svg"));

    // Recuperar los favoritos guardados
    let favoritos = JSON.parse(
        localStorage.getItem("JuegosFavorito")
    ) || [];

    // Corazón de favoritos
    const imgFavoritos = document.createElement("img");
    imgFavoritos.classList.add("favorito");

    // Comprobar si el personaje ya es favorito
    const existe = favoritos.find(juego => juego.id === vg.id);

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
            localStorage.getItem("JuegosFavorito")
        ) || [];

        const encontrado = favoritos.find(
            juego => juego.id === vg.id
        );

        if (encontrado) {

            // Quitar de favoritos
            favoritos = favoritos.filter(
                juego => juego.id !== vg.id
            );

            imgFavoritos.src = "../img/Heart.png";
            imgFavoritos.alt = "Añadir a favoritos";

            // Si estamos en Favoritos, retirar la tarjeta
            if (esFavoritos) {
                divTarjeta.remove();
            }

        } else {

            // Añadir a favoritos
            favoritos.push(vg);

            imgFavoritos.src = "../img/Corazon_lleno.png";
            imgFavoritos.alt = "Quitar de favoritos";
        }

        // Guardar los cambios
        localStorage.setItem(
            "JuegosFavorito",
            JSON.stringify(favoritos)
        );
    });

    divTarjetaBody.appendChild(imgFavoritos);

    // Botón Ver más
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("verMas");

    buttonVerMas.addEventListener("click", function () {
        localStorage.setItem("IdPersonaje", vg.id);
        location.href = "infoJuego.html";
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