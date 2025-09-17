/*
El caracol en el pozo

Un caracol sube 7 pies cada dia y se desliza hacia atrás 2 pies cada noche.

¿Cuántos días tardará el caracol en salir de un pozo con una profundidad dada?

Calcular la cantidad de días que tardará el caracol en salir de un pozo con esa profundidad
Imprimir el resultado

Se desplaza 7 pies de dia y retrocede 2 pies cada noche
*/

let profundidad = null;
let condition = false
do{
  profundidad = prompt("Ingrese la profundidad del pozo");
  if(isNaN(parseInt(profundidad))){
    condition = false;
    console.log("El numero ingresado no es un numero");
  }else{
    condition = true;
    //continuamos con el juego
    const DIST_DIA = 7;
    const DIST_NOCHE = 2;
    let dias = 0;
    let distanciaAcumulada = 0;
    for(let i=0; distanciaAcumulada<profundidad; i++){
      dias++;
      distanciaAcumulada+=DIST_DIA;
      if(distanciaAcumulada>=profundidad){
        break;
      }else{
        distanciaAcumulada-=DIST_NOCHE;
      }
    }
    console.log(`El caracol tardará ${dias} días en salir de un pozo con esa profundidad`);
  }
}while(condition===false);