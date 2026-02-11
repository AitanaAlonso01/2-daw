// EJERCICIOS CLASES 2
// Ejercicio 1 _ Crea una clase Persona con las propiedades nombre y edad.
// • Usa getters y setters para ambas propiedades.
// • Crea un objeto e imprime su información.
console.log(
  'Ejercicio 1--------------------------------------------------------------------------------'
)
class Persona1 {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
  }

  get nombre() {
    return this._nombre
  }

  set nombre(nombre) {
    this._nombre = nombre
  }

  get edad() {
    return this._edad
  }

  set edad(edad) {
    this._edad = edad
  }
}

const aitana = new Persona1('Aitana', 19)
console.log(aitana)

// Ejercicio 2 _Crea una clase Rectangulo que reciba ancho y alto, usando getters y
// setters. Agrega un método area().
console.log(
  'Ejercicio 2--------------------------------------------------------------------------------'
)
class Rectangulo {
  constructor(ancho, alto) {
    this.ancho = ancho
    this.alto = alto
  }

  get ancho() {
    return this._ancho
  }

  set ancho(ancho) {
    this._ancho = ancho
  }

  get alto() {
    return this._alto
  }

  set alto(alto) {
    this._alto = alto
  }

  area() {
    return this.ancho * this.alto
  }
}

const rect = new Rectangulo(10, 5)
console.log(rect)

// Ejercicio 3_ Crea una clase Coche con propiedad velocidad. El setter debe impedir
// valores negativos.
console.log(
  'Ejercicio 3--------------------------------------------------------------------------------'
)
class Coche {
  constructor(velocidad) {
    this.velocidad = velocidad
  }

  get velocidad() {
    return this._velocidad
  }

  set velocidad(velocidad) {
    if (velocidad >= 0) {
      this._velocidad = velocidad
    }
  }
}
const coche = new Coche(100)
coche.velocidad = -10
console.log(coche)

// Ejercicio 4_ Crea una clase Persona y una subclase Estudiante que añada grado.
// Usa super en el constructor e implementa un método info().
console.log(
  'Ejercicio 4--------------------------------------------------------------------------------'
)
class Persona4 {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
  }

  info() {
    return `Nombre: ${this.nombre}, Edad: ${this.edad}`
  }
}

class Estudiante extends Persona4 {
  constructor(nombre, edad, grado) {
    super(nombre, edad)
    this.grado = grado
  }

  info() {
    return `${super.info()}, Grado: ${this.grado}`
  }
}

const estudiante = new Estudiante('Ainhoa', 25, 2)
console.log(estudiante.info())

// Ejercicio 5_ Crea una clase Animal con propiedad nombre.
// La clase Perro debe extender Animal, agregar propiedad raza, y tener un getter
// descripcion.
console.log(
  'Ejercicio 5--------------------------------------------------------------------------------'
)
class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }

  get descripcion() {
    return `El animal es ${this.nombre}`
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre)
    this.raza = raza
  }

  get descripcion() {
    return `${super.descripcion}, es un perro de raza ${this.raza}`
  }
}

const perro = new Perro('Max', 'Cocker Spaniel')
console.log(perro.descripcion)

// Ejercicio 6_Crea una clase Producto con precio y nombre.
// Crea una subclase Libro que agregue autor y valide que el precio no sea menor a 1.
console.log(
  'Ejercicio 6--------------------------------------------------------------------------------'
)
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
  }
}

class Libro extends Producto {
  constructor(nombre, precio, autor) {
    super(nombre, precio)
    this.autor = autor
  }

  validar() {
    if (this.precio < 1) {
      return 'El precio debe ser mayor a 1'
    } else {
      return 'El libro es válido'
    }
  }
}

const libro = new Libro(
  'Harry Potter y la piedra filosofal',
  16.1,
  'J. K. Rowling'
)
console.log(libro.validar())

// Ejercicio 7_ Crea una clase Empleado con un método saludo().
// Crea Gerente que sobrescriba saludo() pero use super.saludo() dentro
console.log(
  'Ejercicio 7--------------------------------------------------------------------------------'
)
class Empleado {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
  }

  saludo() {
    return `Hola, soy ${this.nombre}, tengo ${this.edad} años`
  }
}

class Gerente extends Empleado {
  constructor(nombre, edad) {
    super(nombre, edad)
  }

  saludo() {
    return `${super.saludo()} y soy un gerente`
  }
}

const gerente = new Gerente('Roberto', 55)
console.log(gerente.saludo())

// Ejercicio 8_Crea una clase abstracta Figura con método area() (solo devuelve un
// mensaje).
// Crea Circulo y Cuadrado que implementen el método correctamente.
console.log(
  'Ejercicio 8--------------------------------------------------------------------------------'
)
class Figura {
  area() {
    return 'El área es un método abstracto'
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super()
    this.radio = radio
  }

  area() {
    return Math.PI * this.radio * this.radio
  }
}

class Cuadrado extends Figura {
  constructor(lado) {
    super()
    this.lado = lado
  }

  area() {
    return this.lado * this.lado
  }
}

const circulo = new Circulo(5)
console.log(`El area del circulo es: ${circulo.area()}`)

const cuadrado = new Cuadrado(5)
console.log(`El area del cuadrado es: ${cuadrado.area()}`)
