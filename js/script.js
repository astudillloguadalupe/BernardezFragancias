const WA = "543515597015"


const TITULOS = {
    masculinos: "Hombre",
    femeninos: "Mujer",
    unisex: "Unisex"
}


const catalogo = document.getElementById("catalogo")

const botonesFiltro = document.querySelectorAll(".filtro")

const inputBuscar = document.getElementById("buscar")


let filtroActual = "todos"

let busqueda = ""


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


function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()

}


function mostrarCategoria(categoria) {

    const q = normalizar(busqueda)

    const lista = PRODUCTS[categoria].filter(function (producto) {

        return normalizar(
            producto.name + " " + producto.brand
        ).includes(q)

    })

    if (lista.length === 0) return 0


    const titulo = document.createElement("h2")

    titulo.textContent = TITULOS[categoria]

    catalogo.appendChild(titulo)


    lista.forEach(function (producto) {

        catalogo.appendChild(
            crearProducto(producto)
        )

    })

    return lista.length

}


function mostrarSinResultados() {

    const texto = busqueda.trim()

    const mensaje = encodeURIComponent(
        `Hola! Estoy buscando "${texto}" y no lo vi en el catálogo. ¿Lo tienen o pueden conseguirlo?`
        
    )


    const aviso = document.createElement("div")

    aviso.className = "vacio"


    const titulo = document.createElement("h3")

    titulo.textContent = "No encontramos “" + texto + "”"


    const detalle = document.createElement("p")

    detalle.textContent =
        "Puede que no esté en el catálogo, pero consultanos: " +
        "lo buscamos o te recomendamos uno parecido."


    const enlace = document.createElement("a")

    enlace.href = `https://wa.me/${WA}?text=${mensaje}`
    enlace.target = "_blank"
    enlace.rel = "noopener"
    enlace.textContent = "Consultar por WhatsApp →"


    aviso.append(titulo, detalle, enlace)

    catalogo.appendChild(aviso)

}


function mostrarCatalogo(filtro) {

    filtroActual = filtro

    catalogo.innerHTML = ""


    const categorias =
        filtro === "todos"
            ? ["masculinos", "femeninos", "unisex"]
            : PRODUCTS[filtro] ? [filtro] : []


    let total = 0

    categorias.forEach(function (categoria) {

        total += mostrarCategoria(categoria)

    })


    if (total === 0) mostrarSinResultados()

}


inputBuscar.addEventListener("input", function () {

    busqueda = inputBuscar.value

    mostrarCatalogo(filtroActual)

})


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