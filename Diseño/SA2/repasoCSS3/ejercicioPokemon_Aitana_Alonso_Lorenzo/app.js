const rayquaza = document.querySelector('.rayquaza')
const sonido = document.getElementById('rayquazaSound')
sonido.volume = 0.2
sonido.loop = false

let audioPermitido = false // desbloqueo de audio
let sonidoTocado = false // para disparar sonido solo una vez por ciclo

// Primera interacción para desbloquear audio
document.addEventListener(
  'click',
  () => {
    audioPermitido = true
    // reproducimos y pausamos para activar el permiso
    sonido
      .play()
      .then(() => {
        sonido.pause()
        sonido.currentTime = 0
      })
      .catch(err => console.warn('Error al desbloquear audio:', err))
  },
  { once: true }
)

// Loop que comprueba la animación
function checkAnimation() {
  const style = getComputedStyle(rayquaza)
  const matrix = new DOMMatrixReadOnly(style.transform)
  const y = matrix.m42 // posición vertical

  // Solo reproducir si el audio está desbloqueado
  if (audioPermitido && !sonidoTocado && y >= 75 && y <= 85) {
    sonido.currentTime = 0
    sonido.play().catch(err => console.warn('Error al reproducir audio:', err))
    sonidoTocado = true
  }

  // Reset para el siguiente ciclo
  if (y < -100) {
    sonidoTocado = false
  }

  requestAnimationFrame(checkAnimation)
}

requestAnimationFrame(checkAnimation)

// Alternancia entre fondo de día y noche
const body = document.body

setInterval(() => {
  body.classList.toggle('night-background')
  body.classList.toggle('day-background')
}, 30000)
