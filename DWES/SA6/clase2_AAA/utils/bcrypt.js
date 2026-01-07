const bcrypt = require('bcrypt') //npm i bcrypt

exports.hashPassword = async cadenaTextoPlano => {
  return await bcrypt.hash(cadenaTextoPlano, 12) //buen numero
}

exports.compareLogin = async (cadenaTextoPlano, cadenaCodificada) => {
  //clara referencia al xokas
  const result = await bcrypt.compare(cadenaTextoPlano, cadenaCodificada) //compara textoplano con codificada
  if (result) {
    return true
  } else {
    return false
  }
}
