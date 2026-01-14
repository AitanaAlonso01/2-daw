// --- BLOQUE 1: EVENTOS RATÓN ---

// 1. Mensaje al hacer clic [cite: 2]
document.getElementById('btn1').onclick = () => alert('¡Mensaje en pantalla!')

// 2. Rojo al entrar, negro al salir [cite: 3]
const p2 = document.getElementById('p2')
p2.onmouseover = () => (p2.style.color = 'red')
p2.onmouseout = () => (p2.style.color = 'black')

// 3. Botón suma 1 [cite: 4]
let c3 = 0
document.getElementById('btn3').onclick = () => {
  c3++
  document.getElementById('resultado3').innerText = c3
}

// 4. Mostrar nombre de tecla pulsada [cite: 5]
window.addEventListener('keydown', e => {
  console.log('Tecla pulsada: ' + e.key) // Se muestra en consola para no interferir
  //Mostrar en pantalla
  document.getElementById('p4').innerText = e.key
})

// 5. Input refleja en párrafo [cite: 6, 7]
const input5 = document.getElementById('input5')
input5.oninput = () => (document.getElementById('p5').innerText = input5.value)

// --- BLOQUE 2: ACTIVIDADES RATÓN Y TECLADO ---

// 1. Fondo de colores [cite: 9, 10]
document.getElementById('btnRojo').onclick = () =>
  (document.body.style.backgroundColor = 'red')
document.getElementById('btnVerde').onclick = () =>
  (document.body.style.backgroundColor = 'green')
document.getElementById('btnAzul').onclick = () =>
  (document.body.style.backgroundColor = 'blue')

// 2. classList.toggle [cite: 11]
document.getElementById('btnToggle').onclick = () => {
  document.getElementById('txtToggle').classList.toggle('oculto')
}

// 3. Suma y Resta [cite: 12, 13, 14]
let total = 0
const totalTxt = document.getElementById('total3')
document.getElementById('btnMas').onclick = () => {
  total++
  totalTxt.innerText = total
}
document.getElementById('btnMenos').onclick = () => {
  total--
  totalTxt.innerText = total
}

// 4. Doble clic negrita [cite: 15, 16, 17]
const pDoble = document.getElementById('pDoble')
pDoble.ondblclick = () => pDoble.classList.toggle('negrita')

// 5. Validación longitud con style.color [cite: 18, 19, 20, 21, 22]
const inputV = document.getElementById('inputValida')
inputV.oninput = () => {
  inputV.style.color = inputV.value.length > 5 ? 'green' : 'red'
}

// 6. Contador de teclas total [cite: 23]
let tCount = 0
window.addEventListener('keydown', () => {
  tCount++
  document.getElementById('contTeclas').innerText = tCount
})

// 7. Mensaje solo con ENTER [cite: 24, 25]
document.getElementById('inputEnter').onkeydown = e => {
  if (e.key === 'Enter') alert('Has pulsado ENTER')
}

// 8. Submit preventDefault [cite: 26, 27, 28]
document.getElementById('miForm').onsubmit = e => {
  e.preventDefault()
  alert('Formulario recibido')
}

// 9. Mover cuadrado con flechas [cite: 29, 30, 31]
const cuadrado = document.getElementById('cuadrado')
let posX = 0,
  posY = 0
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') posY -= 10
  if (e.key === 'ArrowDown') posY += 10
  if (e.key === 'ArrowLeft') posX -= 10
  if (e.key === 'ArrowRight') posX += 10
  cuadrado.style.top = posY + 'px'
  cuadrado.style.left = posX + 'px'
})

// 10. Botón posición aleatoria y cronómetro [cite: 32]
let puntos = 0
const btnL = document.getElementById('btnAleatorio')
btnL.onclick = () => {
  puntos++
  btnL.style.top = Math.random() * 150 + 'px'
  btnL.style.left = Math.random() * 80 + '%'
}
setTimeout(() => {
  btnL.disabled = true
  alert('¡Tiempo fuera! Clics realizados: ' + puntos)
}, 10000)
