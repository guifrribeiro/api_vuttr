const jwt = require('jsonwebtoken')

function verifyJWT (request, response, next) {
  const token = request.headers['x-access-token']

  if (!token) {
    return response.status(401).json({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, process.env.SECRET, function (error, decoded) {
    if (error) {
      return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
    }

    request.userId = decoded.id
    next()
  })
}

module.exports = { verifyJWT }