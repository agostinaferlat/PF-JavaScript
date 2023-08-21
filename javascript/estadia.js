let simple = 2000

let triple = 3500

let familiar = 4500



function calcular_estadia( habitacion , noches ){

    habitacion;
    noches = parseInt(noches);


    if( (habitacion == "simple" || habitacion == "Simple")  && (noches > 0 )){
        let precio = simple * noches;
        return precio
    }
    else if( (habitacion == "triple" || habitacion == "Triple") && (noches > 0 )){
        let precio = triple * noches;
        return precio
    }
    else if( (habitacion == "familiar" || habitacion == "Familiar") && (noches > 0 )){
        let precio = familiar * noches;
        return precio
    }  

}   

console.log("Bienvenido/a a Hotel Plenilunio.")
console.log("")
console.log("Nuestro hotel cuenta con tres tipos de habitaciones para elegir: simple (posee una cama queen size), triple (posee una cama queen size y una single) y familiar (posee una cama queen size y dos singles).")
console.log("")

let respuesta = 0;

while (respuesta != "FIN" && respuesta != "fin"){

    respuesta = prompt("Si desea calcular el precio de su estadía, ingrese SEGUIR; o ingrese FIN para salir")
    if (respuesta == "SEGUIR" || respuesta == "Seguir" || respuesta == "seguir"){
        habitacion = prompt("Elija el tipo de habitación: simple, triple o familiar.")
        noches = prompt("Ingrese la cantidad de noches de su estadía.")
        let precio_final = calcular_estadia( habitacion , noches)

        console.log("Usted ha elegido la habitación", habitacion, "por", noches, "noches.")
        console.log("")
        console.log("El precio total de su estadía es de $" , precio_final, ".")
        console.log("")
    }
    else{
        console.log("Muchas gracias por utilizar nuestros servicios.");
    }
}



