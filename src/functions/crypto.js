var crypto = require('crypto')

function generateSalt (length) {
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0, 32)
}

function sha512 (pass, salt) {
  var hash = crypto.createHmac('sha512', salt)
  hash.update(pass)
  hash = hash.digest('hex')

  return { salt, hash }
}

function generatePass (pass) {
  var salt = generateSalt(32)
  
  return sha512(pass, salt)
}

module.exports = { generatePass, sha512 }