const canvas = document.getElementById('espacio')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let estrellas = []
for (let i = 0; i < 200; i++) {
  estrellas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
  })
}

function animar() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let estrella of estrellas) {
    estrella.z -= 2
    if (estrella.z <= 0) estrella.z = canvas.width

    const sx =
      (estrella.x - canvas.width / 2) * (canvas.width / estrella.z) +
      canvas.width / 2
    const sy =
      (estrella.y - canvas.height / 2) * (canvas.width / estrella.z) +
      canvas.height / 2

    const r = 1 - estrella.z / canvas.width
    ctx.beginPath()
    ctx.arc(sx, sy, r * 2, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
  }
  requestAnimationFrame(animar)
}
animar()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
