let div = 0/0;
console.log(div);

// NaN = Not a Number
if(isNaN(div)){
  console.log("Error al dividir por cero");
}else{
  console.log("OK");
}

// null vs undefined
let user
console.log(user); // valor por defecto es undefined

if(user===undefined){
  console.log("Variable no definida");
}else{
  console.log("OK");
}

let userLogueado = null;
if(userLogueado===null){
  console.log("Abrir pantalla de LOGIN");
  //Simulamos el proceso de Login
  userLogueado = "Manolito";
}else{
  console.log(`Bienvenido ${userLogueado}`);
}

if(!userLogueado){ //(userLogueado===null) o (userLogueado===undefined)
  console.log("Abrir pantalla de LOGIN");
  //Simulamos el proceso de Login
  userLogueado = "Manolito";
}else{
  console.log(`Bienvenido ${userLogueado}`);
}

if(userLogueado){ //(userLogueado != null) o (userLogueado != undefined)
  console.log(`Bienvenido ${userLogueado}`);
}else{
  console.log("Abrir pantalla de LOGIN");
  //Simulamos el proceso de Login
  userLogueado = "Manolito";
}

/*
let num = prompt("Ingrese un numero");
console.log(num);
console.log(parseInt(num)); //parseInt devuelve un numero entero
console.log(parseFloat(num)); //parseFloat devuelve un numero decimal */

/*
let condition = false;

do{
  let num = prompt("Ingrese un numero");
  if(isNaN(parseInt(num))){
    condition = false;
    console.log("El numero ingresado no es un numero");
  }else{
    console.log(`El numero ingresado es: ${parseInt(num)}`);
    condition = true;
  }
}while(condition===false); */

let aa = 2;
let bb = "2";

if(aa==bb){ //!=
  console.log("Iguales");
}else{
  console.log("Distintos");
}

if(aa===bb){
  console.log("Iguales");
}else{
  console.log("Distintos");
}

let cc = 3; //!==
// aa = cc;
if(aa=cc){ //Típico error (utilizar la asignación como comparación)
  console.log("Iguales");
}else{
  console.log("Distintos");
}
console.log(aa);

let puntuacion = 6;
if(puntuacion<=5){
  console.log("Insuficiente");
}else if (puntuacion>=5 && puntuacion<=8){
  console.log("Notable");
}else{
  console.log("Excelente");
}

//condicion AND (aa == bb && aa == cc)
//condicion OR (aa == bb || aa == cc)
//condicion NOR (!=)

switch(puntuacion){
  case 0:
  case 1:
  case 2:
  case 3:
  case 4:
    console.log("Insuficiente");
    break;
  case 5:
    console.log("Suficiente");
    break;
  case 6:
    console.log("Bien");
    break;
  case 7:
  case 8:
    console.log("Notable");
    break;
  default:
    console.log("Sobresaliente");
}

// ARRAYS...
let array1 = [];
console.log(array1);

let colores = ["Rojo", "Verde", "Azul", "Amarillo"];
console.log(colores);
console.log(colores[0]);

let numeros = [1, 2, 3, 4, 5];
console.log(numeros);
console.log(numeros[3]);

let varios = ["Hola", 2, true, null, undefined, "Adios"];
console.log(varios);

varios.push("Manolito"); //Añadir un elemento al final del array
console.log(varios);

varios.pop(); //Eliminar el último elemento del array
console.log(varios);

varios.unshift("Inicio"); //Agregar un elemento al principio del array
console.log(varios);

varios.shift(); //Eliminar el primer elemento del array
console.log(varios);

console.log(numeros.sort()); //Ordenar un array
console.log(varios.sort()); 