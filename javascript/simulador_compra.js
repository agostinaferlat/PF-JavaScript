
class Producto {

    constructor (nombre, precio, stock){

        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;

    }


    getDatos(){
        console.log("Nombre:", this.nombre);
        console.log("Precio:", this.precio);
        console.log("Stock:", this.stock);
        console.log("");
    }

    getStock(){
        if( this.stock > 0){
            return true
        }
        else if( this.stock <= 0){
            console.log("Disculpe, no poseemos unidades en stock de este producto.");
            return false
        }
    
    }

    updateStock(cantidad){

        if (this.stock >= cantidad){
            this.stock = this.stock - cantidad
            return true
        }

        else {
            console.log("Lo sentimos, no poseemos suficientes unidades en stock. Cantidad de unidades disponibles:", this.stock);
            console.log("");
            return false
        }

    }

    calcularPrecio(cantidad){

        let precioTotal = this.precio * cantidad
        console.log("El precio total es $", precioTotal);
        console.log("");
    }

}


let listaProductos = [];

listaProductos.push( new Producto ("LICKIMAT", 8500, 7) );
listaProductos.push( new Producto ("ALFOMBRA OLFATIVA", 6500, 10) );
listaProductos.push( new Producto ("RASCADOR", 9000, 5) );
listaProductos.push( new Producto ("FUENTE DE AGUA", 18500, 3) );
listaProductos.push( new Producto ("JUGUETE DE SOGA CON NUDOS", 4500, 4) );
listaProductos.push( new Producto ("PELOTA", 2100, 8) );



alert("Huellas en Manada, la mejor opción en artículos para tus mascotas.");
console.log("Bienvenido/a a nuestra tienda Huellas en Manada, la mejor opción en artículos para tus mascotas. ");
console.log("");
console.log("");
console.log("-----Nuestros productos-----");
console.log("");


for(let producto of listaProductos){

    producto.getDatos();
}


let respuesta = "";

while (respuesta != "FIN"){

    respuesta = prompt("Si desea realizar una compra, ingrese SEGUIR; para salir, ingrese FIN.")
    respuesta = respuesta.toUpperCase();

    if (respuesta == "SEGUIR"){
        function buscarProducto(producto){

            return producto.nombre == compraProducto
        }
        
        let compraProducto = prompt("Ingrese el nombre del producto que desea comprar")
        compraProducto = compraProducto.toUpperCase();
        
        let resultado_busqueda = listaProductos.find(buscarProducto)
        
        if (resultado_busqueda != undefined){
            
            if (resultado_busqueda.getStock() ){
                
                console.log("Usted ha seleccionado: ", compraProducto);
                console.log("");
                
                let cantidad = parseInt( prompt("Cuántas unidades del producto desea adquirir?") )

                if (resultado_busqueda.updateStock(cantidad) ){

                    resultado_busqueda.calcularPrecio(cantidad);
                    alert("Su compra se ha realizado con éxito!");
                    console.log("Muchas gracias por elegirnos para las necesidades de su mascota.");
                    console.log("");
                    console.log("");
                    for(let producto of listaProductos){

                        producto.getDatos();
                    }

                }
                
            }
            
        }
        
        else {
            console.log("Lo sentimos, no encontramos el producto ingresado.");
            console.log("");
        }


    }
    else if (respuesta == "FIN"){
        console.log("Muchas gracias por visitar nuestro sitio.");
    }
}



