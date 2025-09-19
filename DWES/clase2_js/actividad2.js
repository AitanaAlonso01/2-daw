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

//pedir un incremento, que sea un numero
let incremento = prompt('Ingrese un incremento')

//sumar el incremento a cada sinIVA del JSON
productos.forEach(producto => {
  producto.precios.sinIVA += parseFloat(incremento)
})

//calcular conIVA y agregarlo a cada producto
productos.forEach(producto => {
  producto.precios.conIVA = producto.precios.sinIVA * 1.21
})
console.log(productos)
console.log(
  `Precios sin IVA: ${productos[0].nombre}: ${productos[0].precios.sinIVA}, ${productos[1].nombre}: ${productos[1].precios.sinIVA}`
)
console.log(
  `Precios con IVA: ${productos[0].nombre}: ${productos[0].precios.conIVA}, ${productos[1].nombre}: ${productos[1].precios.conIVA}`
)
