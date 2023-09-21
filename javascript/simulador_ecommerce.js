let carrito = [];

function agregarCarrito(e){


    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    let nombreProducto = padre.querySelector("h5").innerText;
    let precioProducto = padre.querySelector("span").innerText;
    let imagenProducto = abuelo.querySelector("img").src;
    
    let Producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenProducto,
        cantidad: 1
    }

    carrito.push(Producto);

    Toastify({

        text: `Se añadió ${nombreProducto} al carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        
    }).showToast();

    let carritoLocalS = JSON.stringify(carrito);
    localStorage.setItem ("Carrito", carritoLocalS);


    mostrarCarrito();


    

}

function mostrarCarrito(){

    let tabla = document.getElementById("tbody");

    tabla.innerHTML = "";

    for (let Producto of carrito){

        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img class="img_size"src="${Producto.imagen}"></td>
                          <td><p>${Producto.nombre}</p></td>
                          <td>${Producto.cantidad}</td>
                          <td>${Producto.precio}</td>
                          <td><button class="btn btn-danger btnBorrarProducto">Borrar</button></td>`;
        tabla.append(fila);

    }

    let buttonBorrarProducto = document.querySelectorAll(".btnBorrarProducto");

    for (let button of buttonBorrarProducto){

        button.addEventListener("click", borrarProducto);

    }



}


function borrarProducto(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let productoEliminado = abuelo.querySelector("p").innerText;

    abuelo.remove();

    Toastify({

        text: `Se eliminó ${productoEliminado} del carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #e38e20, #f55683)",
        },

    }).showToast();


    function eliminarProducto(Producto){
        
        return Producto.nombre != productoEliminado
    }

    let resultadoFilter = carrito.filter(eliminarProducto);
    carrito = resultadoFilter


    function eliminarProductoLS(Producto){
        
        return Producto.nombre != productoEliminado
    }

    
    let carritoParseado = JSON.parse(localStorage.getItem("Carrito"));
    console.log(carritoParseado);

    let resultadoFilterLS = carritoParseado.filter(eliminarProductoLS)

    console.log(resultadoFilterLS);

    let nuevoCarritoLS = JSON.stringify(resultadoFilterLS);
    localStorage.setItem ("Carrito", nuevoCarritoLS);

}


function finalizarCompra(){

    
    function totalCompra (acu, Producto){
        acu = acu + parseInt(Producto.precio);
        return acu;
    }
    
    
    
    let compraFinal = carrito.reduce (totalCompra, 0);
       
    
    let tabla = document.getElementById("tbodyResultado");

    tabla.innerHTML = "";


    let fila = document.createElement("tr");
    fila.innerHTML = `<td><p class="row totalEstilo">Total</p></td>
                      <td><p class="totalEstilo">$${compraFinal}</p></td>`;
    tabla.append(fila);

    
}


function vaciarCarrito (){
    
    let vaciar_carrito = document.getElementById ("carrito")
    
    vaciar_carrito.innerHTML = `<p class="carritoVacioStyle">Carrito vacío!</p> 
                                <a href = "index.html">Volver a cargar productos</a>`;
    
    localStorage.clear ();
}



//Eventos


let buttonComprar = document.getElementsByClassName("btnComprar");

console.log(buttonComprar);


for (let button of buttonComprar){

    button.addEventListener("click", agregarCarrito)
}

let btnFinalizarCompra = document.getElementById ("boton_finalizar");

btnFinalizarCompra.addEventListener ("click", finalizarCompra);


let btnVaciarCarrito = document.getElementById ("boton_vaciar");

btnVaciarCarrito.addEventListener ("click", vaciarCarrito);