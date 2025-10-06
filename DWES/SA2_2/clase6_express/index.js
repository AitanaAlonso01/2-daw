//npm init (para crear un package.json CON un cuestionario)
//npm init -y (para crear un package.json CON un cuestionario)
const express = require('express') //npm i express
const app = express()
const port = 3000

//Levantar el servidor
app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`)
})
