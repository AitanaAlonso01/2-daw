//TO DO - 4 Morgan MW
const fs = require('fs')
const path = require('path')

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)
