//TO DO 1 Encriptación / Desencriptación
const bcrypt = require('bcrypt')
const AppError = require('./AppError')

exports.compareLogin = async (passTextoPlano, passCodificadaBD) => {
  //Comparar desencriptando
  const result = await bcrypt.compare(passTextoPlano, passCodificadaBD)

  if (result) {
    return true
  } else {
    return false
  }
}

//Encriptar
exports.hashPassword = async cadenaTextoPlano => {
  return await bcrypt.hash(cadenaTextoPlano, 12)
}
