//Ejercicio 1: Control de salida
const botonSalir = document.getElementById('btnSalir')
botonSalir.onclick = () => {
  if (confirm('¿Deseas abandonar la página?')) {
    window.location.href = 'salir.html'
  }
}

//Ejercicio 2: Redirección automática
function activarRedireccion() {
  alert('Vale, en 5 segundos te vas a login.html')
  setTimeout(() => {
    window.location.href = 'login.html'
  }, 5000)
}

//Ejercicio 3: Botón "Volver atrás"
const btnVolver = document.getElementById('btnVolver')
btnVolver.onclick = () => {
  window.history.back()
}

//Ejercicio 4: Detección de conexión
window.onload = () => {
  const estado = navigator.onLine ? 'Tienes conexión' : 'No tienes conexión'
  alert(estado)
}

//Ejercicio 5: Temporizador repetido
setInterval(() => {
  console.log('La aplicación sigue activa...')
}, 3000)

//Ejercicio 6: Navegación forzada
if (!confirm('¿Deseas permanecer en el sitio?')) {
  window.location.reload()
}

//Ejercicio 7: Información del navegador
console.log('Información del navegador:', navigator.userAgent)

//Ejercicio 8: Simulación de cierre de sesión
const btnLogout = document.getElementById('btnLogout')
btnLogout.onclick = () => {
  if (confirm('¿Seguro que quieres cerrar sesión?')) {
    window.location.href = 'index.html'
  }
}

//Ejercicio 9: Control de acceso simple
window.onload = () => {
  const nombre = prompt('Introduce tu nombre:')
  if (!nombre || nombre.trim() === '') {
    window.location.href = 'error.html'
  }
}

//Ejercicio 10: Integrador
window.onload = () => {
  const continuar = confirm('¿Deseas continuar?')

  if (continuar) {
    console.log('Iniciando redirección...')
    alert('Serás redirigido en 4 segundos.')

    setTimeout(() => {
      window.location.href = 'home.html'
    }, 4000)
  } else {
    window.history.back()
  }
}
