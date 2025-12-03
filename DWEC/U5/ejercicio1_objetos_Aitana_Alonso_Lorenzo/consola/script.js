// Lista inicial de videojuegos
let productos = [
  {
    id: 1,
    nombre: "No I'm Not A Human",
    descripcion: 'Videojuego de terror psicologico y suspenso',
    categoria: 'Videojuegos',
    precio: 10,
    valoracion: 5,
  },
  {
    id: 2,
    nombre: 'The Last of Us',
    descripcion: 'Videojuego de acción y aventura',
    categoria: 'Videojuegos',
    precio: 35,
    valoracion: 4,
  },
  {
    id: 3,
    nombre: 'The Legend of Zelda: Breath of the Wild',
    descripcion: 'Videojuego de aventura y exploración',
    categoria: 'Videojuegos',
    precio: 59,
    valoracion: 3,
  },
  {
    id: 4,
    nombre: 'Fortnite',
    descripcion: 'Videojuego battle royale y videojuego de plataformas',
    categoria: 'Videojuegos',
    precio: 0,
    valoracion: 2,
  },
]

// JSON para guardar resultados filtrados
let resultadosFiltrados = []

// 1. Añadir videojuego
function añadirProducto(producto) {
  productos.push(producto)
}

// 2. Modificar videojuego por ID
function modificarProducto(id, nuevosDatos) {
  let index = productos.findIndex(p => p.id === id)
  if (index !== -1) {
    productos[index] = { ...productos[index], ...nuevosDatos }
  }
}

// 3. Buscar videojuego por nombre
function buscarProducto(nombre) {
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
  )
}

// 4. Eliminar videojuego por ID
function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id)
}

// 5. Ordenar videojuegos
function ordenarPorPrecio(asc = true) {
  return [...productos].sort((a, b) =>
    asc ? a.precio - b.precio : b.precio - a.precio
  )
}

function ordenarPorNombre(asc = true) {
  return [...productos].sort((a, b) =>
    asc ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
  )
}

function ordenarPorValoracion(asc = true) {
  return [...productos].sort((a, b) =>
    asc ? a.valoracion - b.valoracion : b.valoracion - a.valoracion
  )
}

// 6. Filtrar por categoría y ordenar dentro del resultado
function filtrarPorCategoria(categoria, criterio = 'precio', asc = true) {
  let filtrados = productos.filter(
    p => p.categoria.toLowerCase() === categoria.toLowerCase()
  )

  switch (criterio) {
    case 'precio':
      filtrados.sort((a, b) =>
        asc ? a.precio - b.precio : b.precio - a.precio
      )
      break
    case 'nombre':
      filtrados.sort((a, b) =>
        asc
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre)
      )
      break
    case 'valoracion':
      filtrados.sort((a, b) =>
        asc ? a.valoracion - b.valoracion : b.valoracion - a.valoracion
      )
      break
  }

  // Guardar en JSON de resultados filtrados
  resultadosFiltrados = filtrados
  return filtrados
}

// ------------------
// Ejemplos de uso
// ------------------
añadirProducto({
  id: 5,
  nombre: 'Hollow Knight',
  descripcion: 'Videojuego de exploración y plataformas',
  categoria: 'Videojuegos',
  precio: 20,
  valoracion: 5,
})

console.log("Buscar 'Zelda':", buscarProducto('Zelda'))
console.log('Ordenar por precio ascendente:', ordenarPorPrecio(true))
console.log('Ordenar por nombre descendente:', ordenarPorNombre(false))
console.log('Ordenar por valoración descendente:', ordenarPorValoracion(false))
console.log(
  "Filtrar categoría 'Videojuegos' por valoración ascendente:",
  filtrarPorCategoria('Videojuegos', 'valoracion', true)
)

console.log('JSON de videojuegos:', JSON.stringify(productos, null, 2))
console.log(
  'JSON de resultados filtrados:',
  JSON.stringify(resultadosFiltrados, null, 2)
)
