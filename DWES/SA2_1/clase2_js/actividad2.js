const productos = [
  {
    nombre: 'PC',
    precios: {
      sinIVA: 1000.99,
      conIVA: null,
    },
  },
  {
    nombre: 'MacBook Pro',
    precios: {
      sinIVA: 2000.99,
      conIVA: null,
    },
  },
]

// //pedir un incremento, que sea un numero
// let incremento = prompt('Ingrese un incremento')

// //sumar el incremento a cada sinIVA del JSON
// productos.forEach(producto => {
//   producto.precios.sinIVA += parseFloat(incremento)
// })

// //calcular conIVA y agregarlo a cada producto
// productos.forEach(producto => {
//   producto.precios.conIVA = producto.precios.sinIVA * 1.21
// })
// console.log(productos)
// console.log(
//   `Precios sin IVA: ${productos[0].nombre}: ${productos[0].precios.sinIVA}, ${productos[1].nombre}: ${productos[1].precios.sinIVA}`
// )
// console.log(
//   `Precios con IVA: ${productos[0].nombre}: ${productos[0].precios.conIVA}, ${productos[1].nombre}: ${productos[1].precios.conIVA}`
// )

let condition = false
do {
  let incremento = prompt('Ingrese un incremento')
  if (isNaN(parseInt(incremento))) {
    condition = false
    console.log('El incremento debe ser un numero')
  } else {
    condition = true
    //Solucion
    for (let producto of productos) {
      //Incrementar el precio sin IVA
      producto.precios.sinIVA += parseFloat(incremento)
      //Calcular el precio con IVA
      producto.precios.conIVA = parseFloat(
        (producto.precios.sinIVA * 1.21).toFixed(2)
      )
    }
  }
} while (condition == false)

console.log(productos)
