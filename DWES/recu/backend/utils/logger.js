//TO DO - 5 logs de acceso y error
require('dotenv').config()
const log4js = require('log4js')
const ruta = process.env.LOGS_FOLDER
const logsActivados = process.env.LOGS_ACTIVOS
const express = require('express')
const app = express()

if (logsActivados === 'true' && app.get('env') === 'development') {
  //Logs activos y en desarrollo
  log4js.configure({
    appenders: {
      //archivos txt de los logs
      access: {
        type: 'dateFile',
        filename: `${ruta}/access.log`,
        pattern: '-yyyy-MM-dd',
      },
      error: {
        type: 'dateFile',
        filename: `${ruta}/error.log`,
        pattern: '-yyyy-MM-dd',
      },
    },
    categories: {
      default: {
        appenders: ['access'],
        level: 'ALL',
      },
      access: {
        appenders: ['access'],
        level: 'ALL',
      },
      error: {
        appenders: ['access'],
        level: 'ALL',
      },
    },
  })
} else {
  //Logs desactivados o en producción
  log4js.configure({
    appenders: {
      //consola
      access: {
        type: 'console',
      },
      error: {
        type: 'console',
      },
    },
    categories: {
      default: {
        appenders: ['access'],
        level: 'ALL',
      },
      access: {
        appenders: ['access'],
        level: 'ALL',
      },
      error: {
        appenders: ['access'],
        level: 'ALL',
      },
    },
  })
}

// Exportar TODO
module.exports = {
  access: log4js.getLogger('access'),
  error: log4js.getLogger('error'),
  express: log4js.connectLogger(log4js.getLogger('access')),
}
