// Ejercicio 1
// Crea una clase llamada Persona que tenga un constructor con dos parámetros: nombre y
// edad.

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
    this.saludar = () => {
      console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`)
    }
  }
}

const juan = new Persona('Juan', 30)
juan.saludar()

// Ejercicio 2
// Crea una clase llamada Coche con propiedades: marca y modelo.
// Agrega un método llamado info() que imprima una frase con esos datos.
// Luego crea un objeto de tipo Coche y llama al método

class Coche {
  constructor(marca, modelo) {
    this.marca = marca
    this.modelo = modelo
  }

  info() {
    console.log(`Este coche es un ${this.marca} ${this.modelo}`)
  }
}

const coche = new Coche('Toyota', 'Camry')
coche.info()

// Ejercicio 3
// Crea una clase Producto con las propiedades: nombre, precio.
// Crea un objeto que represente un producto real (ej. "Camisa", 20)

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
  }
}

const camisa = new Producto('Camisa', 20)
console.log(camisa.nombre)
console.log(camisa.precio)

// Ejercicio 4
// Crea una clase Libro con:
// • titulo
// • autor
// • un método descripcion()
// Este método debe mostrar algo como:
// "Título: X, Autor: Y"
// Luego crea dos libros.

class Libro {
  constructor(titulo, autor) {
    this.titulo = titulo
    this.autor = autor
  }

  descripcion() {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}`)
  }
}

const libro1 = new Libro('El Hobbit', 'J.R.R. Tolkien')
libro1.descripcion()

const libro2 = new Libro('El Señor de los Anillos', 'J.R.R. Tolkien')
libro2.descripcion()

// Ejercicio 5
// Crea una clase Usuario que reciba nombre y rol, pero si el rol no se especifica, debe ser
// "invitado".
// Crea un usuario sin rol y otro con rol.

class Usuario {
  constructor(nombre, rol) {
    this.nombre = nombre
    this.rol = rol || 'invitado'
  }
}

const usuario1 = new Usuario('Juan')
console.log(usuario1.nombre)
console.log(usuario1.rol)

const usuario2 = new Usuario('Pedro', 'administrador')
console.log(usuario2.nombre)
console.log(usuario2.rol)

// Ejercicio 6
// Crea una clase Animal con una propiedad nombre y un método hacerSonido() que
// imprima un sonido genérico.
// Crea un objeto y llama al método.

class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }

  hacerSonido() {
    console.log(`¡${this.nombre}! ¡Miau!, ¡Miau!, ¡Miau!, ¡Miau!, ¡Miau!`)
  }
}

const gato = new Animal('Gato')
gato.hacerSonido()

// Ejercicio 7
// Crea una clase Rectangulo que reciba ancho y alto.
// Añade un método area() que devuelva ancho * alto.
// Crea un objeto y calcula su área.

class Rectangulo {
  constructor(ancho, alto) {
    this.ancho = ancho
    this.alto = alto
  }

  area() {
    return this.ancho * this.alto
  }
}

const rect1 = new Rectangulo(10, 20)
console.log(rect1.area())

// Ejercicio 8
// Crea una clase Cuenta cuya propiedad saldo comience siempre en 0, sin importar qué
// reciba el constructor.
// Crea un método verSaldo() para devolver el saldo actual.
// Crea una cuenta y verifica que el saldo sea 0

class Cuenta {
  constructor() {
    this.saldo = 0
  }

  verSaldo() {
    return this.saldo
  }
}

const cuenta1 = new Cuenta(200)
comsole.log(cuenta1.verSaldo())

// Ejercicio 9
// Crea una clase Cliente con las propiedades:
// nombre, email, telefono.
// Crea 3 clientes distintos

class Cliente {
  constructor(nombre, email, telefono) {
    this.nombre = nombre
    this.email = email
    this.telefono = telefono
  }
}

const cliente1 = new Cliente('Juan', 'juan@gmail.com', '123456789')
const cliente2 = new Cliente('Pedro', 'pedro@gmail.com', '987654321')
const cliente3 = new Cliente('Maria', 'maria@gmail.com', '555555555')

console.log(cliente1.nombre)
console.log(cliente1.email)
console.log(cliente1.telefono)

console.log(cliente2.nombre)
console.log(cliente2.email)
console.log(cliente2.telefono)

console.log(cliente3.nombre)
console.log(cliente3.email)
console.log(cliente3.telefono)

// Ejercicio 10
// Crea una clase Ciudad con:
// • nombre
// • poblacion
// • método presentar() que imprima un mensaje del estilo:
// “La ciudad de X tiene Y habitantes”.
// Crea al menos dos instancias.

class Ciudad {
  constructor(nombre, poblacion) {
    this.nombre = nombre
    this.poblacion = poblacion
  }

  presentar() {
    console.log(
      `La ciudad de ${this.nombre} tiene ${this.poblacion} habitantes`
    )
  }
}

const ciudad1 = new Ciudad('Madrid', 1000000)
ciudad1.presentar()

const ciudad2 = new Ciudad('Barcelona', 500000)
ciudad2.presentar()
