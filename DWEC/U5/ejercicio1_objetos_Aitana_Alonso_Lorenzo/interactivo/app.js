let productos = [
  {
    id: 1,
    nombre: "No I'm Not A Human",
    descripcion: 'Terror psicológico',
    categoria: 'Videojuegos',
    precio: 10,
    valoracion: 5,
  },
  {
    id: 2,
    nombre: 'The Last of Us',
    descripcion: 'Acción y aventura',
    categoria: 'Videojuegos',
    precio: 35,
    valoracion: 4,
  },
  {
    id: 3,
    nombre: 'Zelda: Breath of the Wild',
    descripcion: 'Aventura y exploración',
    categoria: 'Videojuegos',
    precio: 59,
    valoracion: 3,
  },
  {
    id: 4,
    nombre: 'Fortnite',
    descripcion: 'Battle Royale',
    categoria: 'Videojuegos',
    precio: 0,
    valoracion: 2,
  },
]

let resultadosFiltrados = []

// Renderizar productos
function mostrarProductos(lista = productos) {
  const contenedor = document.getElementById('contenedor')
  contenedor.innerHTML = ''
  lista.forEach(p => {
    const div = document.createElement('div')
    div.className = 'producto'
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><strong>Categoría:</strong> ${p.categoria}</p>
      <p><strong>Precio:</strong> €${p.precio}</p>
      <p><strong>Valoración:</strong> ${p.valoracion} ✮</p>
    `
    contenedor.appendChild(div)
  })
}

// Añadir producto desde formulario
document.getElementById('formProducto').addEventListener('submit', e => {
  e.preventDefault()

  // Generar ID automático: el máximo ID + 1
  const nuevoId =
    productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1

  const nuevo = {
    id: nuevoId,
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    categoria: document.getElementById('categoria').value,
    precio: parseFloat(document.getElementById('precio').value),
    valoracion: parseInt(document.getElementById('valoracion').value),
  }

  productos.push(nuevo)
  mostrarProductos()
  e.target.reset()
})

// Funciones de ordenación
function ordenarPorPrecio(asc) {
  const lista = [...productos].sort((a, b) =>
    asc ? a.precio - b.precio : b.precio - a.precio
  )
  mostrarProductos(lista)
}

function ordenarPorNombre(asc) {
  const lista = [...productos].sort((a, b) =>
    asc ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
  )
  mostrarProductos(lista)
}

function ordenarPorValoracion(asc) {
  const lista = [...productos].sort((a, b) =>
    asc ? a.valoracion - b.valoracion : b.valoracion - a.valoracion
  )
  mostrarProductos(lista)
}

// Mostrar inicial
mostrarProductos()
