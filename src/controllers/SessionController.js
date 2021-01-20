const User = require('../models/User')
const pass = require('../functions/crypto')
const jwt = require('jsonwebtoken')

module.exports = {
  async store (request, response) {
    const { 
      name,
      username,
      email,
      password } = request.body

    try {
      let cryPass = pass.generatePass(password)
      let user = await User.findOne({ email })

      if (!user) {
        user = await User.create({
          name,
          username,
          email,
          password: cryPass.hash,
          salt: cryPass.salt
        })
      }
      else {
        return response.status(400).json({ message: 'The user already exists.' })
      }

      return response.json(user)
    } catch (error) {
      return response.json({ 'Several error ': error})
    }
  },

  async authentication (request, response) {
    const { username, password } = request.body

    try {
      let user = await User.findOne({ username })

      if (!user) {
        return response.status(404).json({ message: 'The user does not exists.' })
      }

      let passAndSalt = pass.sha512(password, user.salt)
      
      if (user.password === passAndSalt.hash) {
        let id = user._id
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 86400
        })
        return response.status(200).json({ auth: true, token: token })
      } else {
        return response.status(401).json({ auth: false, token: null })
      }
    } catch (error) {
      return response.json({ 'Several error ': error })
    }
  }
}