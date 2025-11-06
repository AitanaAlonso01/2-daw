const display = document.querySelector('.display')
const btns = document.querySelectorAll('.btn')

let valorOrigen = '0'
let operador = null
let valorPrevio = null

function updateDisplay() {
  display.textContent = valorOrigen
}

btns.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent

    if (!isNaN(value)) {
      if (valorOrigen === '0') {
        valorOrigen = value
      } else {
        valorOrigen += value
      }
    } else if (value === '.') {
      if (!valorOrigen.includes('.')) {
        valorOrigen += '.'
      }
    } else if (value === 'AC') {
      valorOrigen = '0'
      operador = null
      valorPrevio = null
    } else if (value === '+/-') {
      valorOrigen = (parseFloat(valorOrigen) * -1).toString()
    } else if (value === '%') {
      valorOrigen = (parseFloat(valorOrigen) / 100).toString()
    } else if (['+', '−', '×', '÷'].includes(value)) {
      operador = value
      valorPrevio = valorOrigen
      valorOrigen = '0'
    } else if (value === '=') {
      if (operador && valorPrevio !== null) {
        const prev = parseFloat(valorPrevio)
        const curr = parseFloat(valorOrigen)

        switch (operador) {
          case '+':
            valorOrigen = (prev + curr).toString()
            break
          case '−':
            valorOrigen = (prev - curr).toString()
            break
          case '×':
            valorOrigen = (prev * curr).toString()
            break
          case '÷':
            valorOrigen = curr !== 0 ? (prev / curr).toString() : 'Error'
            break
        }
        operador = null
        valorPrevio = null
      }
    }

    updateDisplay()
  })
})

updateDisplay()
