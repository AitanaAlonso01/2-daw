const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('header nav ul')
const navLinks = document.querySelectorAll('header nav ul li a')

// Toggle al pulsar el botón hamburguesa
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active')
})

// Cerrar menú al pulsar cualquier enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active')
  })
})
