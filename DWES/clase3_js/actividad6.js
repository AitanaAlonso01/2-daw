// Define una variable llamada 'firstanmes' y asígnala al resultado de la asignación sobre la matriz existente, 'fullnames', de modo que 'firstnames' constenga solo los nombres de pila de los personajes de Harry Potter de la matriz 'fullnames'.

const fullnames = [
  { first: 'Albus', last: 'Dumbledore' },
  { first: 'Harry', last: 'Potter' },
  { first: 'Hermione', last: 'Granger' },
  { first: 'Ron', last: 'Weasley' },
  { first: 'Rubeus', last: 'Hagrid' },
  { first: 'Minerva', last: 'McGonagall' },
  { first: 'Severus', last: 'Snape' },
]

let firstnames = fullnames.map(item => item.first)
console.log(firstnames)

//Forma sin variable y mas sencilla
console.log(fullnames.map(item => item.first))
