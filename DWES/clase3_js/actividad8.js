//Practica método filtro
//Escribir una función 'validUsers' que acepte una matriz de nombres de usuario (cadenas)
//Debe devolver una nueva matriz que contenga solo los nombres de menos de 10 caracteres
//La función debe ser LAMBDA + la función filter

const validUsers = users => {
  return users.filter(user => user.length < 10)
}

console.log(
  validUsers([
    'Aitana',
    'unnombrerealmentelargo',
    'Alfonso',
    'Cristian',
    'Jero',
    'Jesus',
    'unnombredemasiadolargo',
    'Mike',
  ])
)
