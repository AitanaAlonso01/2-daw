//TO DO - 5 logs de acceso y error
require('dotenv').config()
const log4js = require('log4js')
const ruta = process.env.LOGS_FOLDER
const logsActivos = process.env.LOGS_ACTIVOS
const express = require('express')
const app = express()

if (logsActivos === 'true' && app.get('env') === 'development') {
  //Logs Activos y en entorno de DESAROLLO (locahost)
  log4js.configure({
    appenders: {
      //Escribimos en archivos de texto (.logs)
      access: {
        type: 'dateFile',
        filename: ruta + 'access.log',
        pattern: '-yyyy-MM-dd',
      },
      error: {
        type: 'dateFile',
        filename: ruta + 'error.log',
        pattern: '-yyyy-MM-dd',
      },
    },
    categories: {
      default: { appenders: ['access'], level: 'ALL' },
      access: { appenders: ['access'], level: 'ALL' },
      error: { appenders: ['error'], level: 'ALL' },
    },
  })
} else {
  //Producción (o con los logs desactivados)
  log4js.configure({
    appenders: {
      //Escribimos en Consola
      access: { type: 'console' },
      error: { type: 'console' },
    },
    categories: {
      default: { appenders: ['access'], level: 'ALL' },
      access: { appenders: ['access'], level: 'ALL' },
      error: { appenders: ['error'], level: 'ALL' },
    },
  })
}

//EXPORTAR LOGS
module.exports = {
  access: log4js.getLogger('access'),
  error: log4js.getLogger('error'),
  express: log4js.connectLogger(log4js.getLogger('access')),
}
