let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

function agregarCarrito(e){


    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    let nombreProducto = padre.querySelector("h5").innerText;
    let precioProducto = padre.querySelector("span").innerText;
    let imagenProducto = abuelo.querySelector("img").src;

    let productoExistente = carrito.find (item => item.nombre === nombreProducto);

    if(productoExistente){
        productoExistente.cantidad += 1;
    } else{

        let Producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            imagen: imagenProducto,
            cantidad: 1
        }
    
        carrito.push(Producto);

    }
    
    

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

    if (carrito.length > 0){
        let total = calcularTotalCompra();
        let totalElemento = document.getElementById ("tbodyResultado");
        totalElemento.textContent = `Total $${total}`;
    }    

}

function calcularTotalCompra(){
    let total = 0;

    for(let Producto of carrito){
        total += parseInt(Producto.precio) * Producto.cantidad;
    }
    return total;

    
}


function borrarProducto(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let productoEliminado = abuelo.querySelector("p").innerText;

    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].nombre === productoEliminado){
            if(carrito[i].cantidad > 1){
               carrito[i].cantidad -= 1;
               abuelo.querySelector("td:nth-child(3)").textContent = carrito[i].cantidad;
            } else{
                carrito.splice(i,1);
                abuelo.remove();
            }
            break
        }
    }


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



    let total = calcularTotalCompra();
        
    let totalElemento = document.getElementById("tbodyResultado");
    
    if(carrito.length > 0){
        totalElemento.textContent = `Total $${total}`;
    } else {
        totalElemento.textContent = ``;
    }

    
    localStorage.setItem("Carrito",JSON.stringify(carrito));

    if(carrito.length == 0){
        localStorage.clear();
    }

}


function finalizarCompra(){

    let total = calcularTotalCompra();
    carrito.splice(0,carrito.length);
    mostrarCarrito();

    if(total > 0){
        Swal.fire({
        icon: 'success',
        title: `Compra realizada! Total $${total}`,
        showConfirmButton: true,
        })

        let totalElemento = document.getElementById("tbodyResultado");
        totalElemento.textContent = ``;
        localStorage.clear();
    } else{
        Swal.fire({
        icon: 'error',
        title: `No hay productos añadidos al carrito`,
        showConfirmButton: true,
        })
    }
    
    
}


function vaciarCarrito (){
   
    if( localStorage.length >= 1){
        let vaciar_carrito = document.getElementById ("carrito")

        carrito = [];
        localStorage.clear();
        let total = calcularTotalCompra();
        let totalElemento = document.getElementById("tbodyResultado");
        totalElemento.textContent = "";
        mostrarCarrito();

        Toastify({

            text: `Carrito vaciado!`,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #e38e20, #f55683)",
            },
    
        }).showToast();

    }else{
        Swal.fire({
        icon: 'error',
        title: `No hay productos añadidos al carrito`,
        showConfirmButton: true,
        })
    }    
}




let buttonComprar = document.getElementsByClassName("btnComprar");



for (let button of buttonComprar){

    button.addEventListener("click", agregarCarrito)
}

let btnFinalizarCompra = document.getElementById ("boton_finalizar");

btnFinalizarCompra.addEventListener ("click", finalizarCompra);


let btnVaciarCarrito = document.getElementById ("boton_vaciar");

btnVaciarCarrito.addEventListener ("click", vaciarCarrito);


mostrarCarrito();
 

function verClima(posicion){

    let latitude = posicion.coords.latitude;
    let longitude = posicion.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b4390fb235b80d94dba55e0d80225f3c&units=metric&lang=es`)
    .then((response) => response.json())
    .then(data => {

        let climaUbicacion = document.getElementById("barraNav");

        let climaUbi = document.createElement("div");

        climaUbi.innerHTML = `<span>Usted nos visita desde: ${data.name}</span>
                              <img class="icon_weather" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon weather">
                              <span class="style_weather">${data.main.temp.toFixed(1)}°C</span>`

        climaUbicacion.append(climaUbi);

    })


}

navigator.geolocation.getCurrentPosition(verClima);