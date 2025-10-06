//EMAScript 6 (ES6)

let a = 7;
let nombre = "Aitana";
let apellido = "Alonso";

console.log(a);
console.log(nombre);
console.log(apellido);

nombre = "Roberto";
console.log(nombre);
console.log(apellido);

const TAMANYO = 200;
console.log(TAMANYO);

//TAMANYO = 300; //Error

//linea de comentario

/*
  comentario
  multilinea
*/

let esVacio = true;
console.log(esVacio);
esVacio = false;
console.log(esVacio);

console.log(nombre+apellido)
console.log(nombre+" "+apellido);
let nombreEntero = `${nombre} ${apellido}`;
console.log(nombreEntero);

console.log(`Hola, mi nombre es ${nombre} ${apellido}`);

let saludo = "Hola";
console.log(saludo.length);
console.log("Hola".length);
console.log(`La longitud de la cadena "Hola como estas?" es de ${"Hola como estas?".length}`);

console.log("Hola".charAt(2));
console.log("Hola".concat(" Mundo"));
console.log("Hola".startsWith("ho"));
console.log("Aitana Alonso Lorenzo".split(" "));
let nombreCompleto = "Aitana Alonso Lorenzo";
let n = nombreCompleto.split(" ")[0];
let a1 = nombreCompleto.split(" ")[1];
let a2 = nombreCompleto.split(" ")[2];
console.log(n);
console.log(a1);
console.log(a2);

console.log(`El número de palabras de ${nombreCompleto} es de ${nombreCompleto.split(" ").length}`);

console.log("   Hola Mundo   ".trim());
console.log("   Hola Mundo   ".length);
console.log("   Hola Mundo   ".trim().length);

console.log("    Hola Mundo   ".trimStart());
console.log("    Hola Mundo   ".trimEnd());

console.log("Hola Mundo".toUpperCase());
console.log("Hola Mundo".toLowerCase());

console.log("Hola Mundo".replace("Mundo","Aitana"));
console.log("Hola Mundo Mundo".replace("Mundo","Aitana"));
console.log("Hola Mundo Mundo".replaceAll("Mundo","Aitana"));

console.log("Hola a todos".indexOf("a"));
console.log("     Como mola JavaScript    ".trimStart().toUpperCase().replace("MOLA","NO MOLA").concat("!!!"));

console.log("Hola a todos \n y a todas");
console.log("Hola a \'todos\'");

let producto = "PS5";
let precio = 799.99598;
let cantidad = 5

//Has comprado 5 ps5 y ek total es 799.99€

console.log(`Has comprado ${cantidad} ${producto} y el total es ${(precio*cantidad).toFixed(2)}€`);