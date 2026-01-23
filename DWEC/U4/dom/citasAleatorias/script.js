// Array con mínimo 15 citas
const citas = [
  {
    texto: '"Mi billetera es como una cebolla: abrirla me hace llorar."',
    autor: 'Anónimo',
  },
  {
    texto: '"El trabajo no es malo, lo malo es tener que trabajar."',
    autor: 'Don Ramón',
  },
  {
    texto: '"Tengo que ir al oculista, pero nunca veo el momento."',
    autor: 'Anónimo',
  },
  {
    texto: '"No soy vago, estoy en modo ahorro de energía."',
    autor: 'Tu sofá',
  },
  {
    texto: '"Si el amor es ciego... ¿por qué la lencería es tan popular?"',
    autor: 'Anónimo',
  },
  {
    texto: '"Previsión del tiempo para esta noche: Estará oscuro."',
    autor: 'Un tipo listo',
  },
  { texto: '"Las mejores cosas de la vida te despeinan."', autor: 'Anónimo' },
  {
    texto: '"Yo no sufro de locura, la disfruto cada minuto."',
    autor: 'Anónimo',
  },
  {
    texto: '"Mi cama tiene una fuerza de atracción mágica por las mañanas."',
    autor: 'Dormilón profesional',
  },
  {
    texto: '"Correr es de cobardes, a menos que te persiga un zombie."',
    autor: 'Superviviente',
  },
  {
    texto: '"Si no puedes convencerlos, confúndelos."',
    autor: 'Harry S. Truman',
  },
  {
    texto:
      '"El dinero no da la felicidad, pero prefiero llorar en un Ferrari."',
    autor: 'Anónimo',
  },
  {
    texto: '"La inteligencia me persigue, pero yo soy más rápido."',
    autor: 'Anónimo',
  },
  { texto: '"Estado civil: Cansado."', autor: 'Cualquier estudiante' },
  {
    texto: '"No poseo talentos especiales, solo tengo hambre constantemente."',
    autor: 'Parodia de Einstein',
  },
]

const boton = document.getElementById('next-quote')
const textoCita = document.getElementById('quote')
const autorCita = document.getElementById('author')

// Función para cambiar la cita aleatoriamente
boton.addEventListener('click', () => {
  const indiceAleatorio = Math.floor(Math.random() * citas.length)
  const citaSeleccionada = citas[indiceAleatorio]

  textoCita.textContent = citaSeleccionada.texto
  autorCita.textContent = citaSeleccionada.autor
})
