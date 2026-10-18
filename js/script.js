const WA = "543515597015"


const TITULOS = {
    masculinos: "Hombre",
    femeninos: "Mujer",
    unisex: "Unisex"
}


const catalogo = document.getElementById("catalogo")

const botonesFiltro = document.querySelectorAll(".filtro")


function crearProducto(producto) {

    const mensaje = encodeURIComponent(
        `Hola! Quiero consultar por ${producto.name} ${producto.brand} ${producto.ml}`
    )


    const articulo = document.createElement("article")

    articulo.className = "row"


    articulo.innerHTML = `

        <div class="ph">

            <img
                src="${producto.image}"
                alt="${producto.name}"
                loading="lazy"
            >

        </div>


        <div class="in">

            <h3>
                ${producto.name}
            </h3>

            <p>
                ${producto.brand} · ${producto.ml}
            </p>

            <div class="pr">

                <span>
                    ${producto.price}
                </span>

                <a
                    href="https://wa.me/${WA}?text=${mensaje}"
                    target="_blank"
                    rel="noopener"
                >
                    Pedir por WhatsApp →
                </a>

            </div>

        </div>

    `


    return articulo

}


function mostrarCategoria(categoria) {

    const titulo = document.createElement("h2")

    titulo.textContent = TITULOS[categoria]

    catalogo.appendChild(titulo)


    PRODUCTS[categoria].forEach(function (producto) {

        catalogo.appendChild(
            crearProducto(producto)
        )

    })

}


function mostrarCatalogo(filtro) {

    catalogo.innerHTML = ""


    if (filtro === "todos") {

        mostrarCategoria("masculinos")

        mostrarCategoria("femeninos")

        mostrarCategoria("unisex")

        return
    }


    if (PRODUCTS[filtro]) {

        mostrarCategoria(filtro)

    }

}


botonesFiltro.forEach(function (boton) {

    boton.addEventListener(
        "click",
        function () {

            const filtro = boton.dataset.filtro


            botonesFiltro.forEach(
                function (otroBoton) {

                    otroBoton.classList.remove(
                        "activo"
                    )

                }
            )


            boton.classList.add(
                "activo"
            )


            mostrarCatalogo(
                filtro
            )

        }
    )

})


mostrarCatalogo("todos")