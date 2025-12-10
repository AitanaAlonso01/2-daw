// documentación de la api
require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc') //npm i swagger-jsdoc

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Comments API',
      version: '1.0.0',
      description: 'Api for managing comments',
      contact: {
        name: 'Aitana Alonso',
      },
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PUERTO,
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const specs = swaggerJsdoc(options)
module.exports = specs
