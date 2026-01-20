const input = document.getElementById('input-tarea')
const botonAgregar = document.getElementById('boton-agregar')
const listaTareas = document.getElementById('lista-tareas')

function agregarTarea() {
  if (input.value !== '') {
    // Crear el contenedor de la tarea
    let nuevaTarea = document.createElement('div')
    nuevaTarea.classList.add('tarea-item')

    // Texto de la tarea
    let texto = document.createElement('p')
    texto.innerText = input.value
    nuevaTarea.appendChild(texto)

    // Contenedor de iconos
    let iconos = document.createElement('div')
    iconos.classList.add('iconos')

    // Icono de completar
    let completar = document.createElement('i')
    completar.classList.add('fas', 'fa-check-circle')
    completar.addEventListener('click', () => {
      texto.classList.toggle('completada')
    })

    // Icono de eliminar
    let eliminar = document.createElement('i')
    eliminar.classList.add('fas', 'fa-trash')
    eliminar.addEventListener('click', () => {
      nuevaTarea.remove()
    })

    iconos.append(completar, eliminar)
    nuevaTarea.appendChild(iconos)

    // Agregar a la lista y limpiar input
    listaTareas.appendChild(nuevaTarea)
    input.value = ''
  } else {
    alert('Por favor, escribe una tarea.')
  }
}

botonAgregar.addEventListener('click', agregarTarea)

// Permitir agregar tarea al presionar "Enter"
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    agregarTarea()
  }
})
