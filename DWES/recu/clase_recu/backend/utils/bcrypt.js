const bcrypt = require('bcrypt')
const AppError = require('./AppError')

//TO DO 1 Encriptación / Desencriptación
exports.compareLogin = async (passTextoPlano, passCodificadaBD) => {
  const result = await bcrypt.compare(passTextoPlano, passCodificadaBD)
  if (result) {
    return true
  } else {
    return false
  }
}
