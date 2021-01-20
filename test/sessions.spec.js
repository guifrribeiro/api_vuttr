const chai = require('chai')
const http = require('chai-http')
const subSet = require('chai-subset')

const app = require('../app')
const SessionController = require('../src/controllers/SessionController')

chai.use(http)
chai.use(subSet)

const UserSchema = {
  name: name => name,
  username: username => username,
  email: email => email,
  password: password => password,
  salt: salt => salt,
  availability: availability => availability
}

const AuthSchema = {
  auth: auth => auth,
  token: token => token
}

describe('Sessions tests', () => {
  it('Store user', () => {
    chai.request(app.app)
      .post('/sessions')
      .send({
        name: 'Guilherme Ferreira',
        username: 'guifrribeiro',
        password: '12345678',
	      email: 'guiferreira@hotmail.com'
      })
      .end((error, response) => {
        chai.expect(error).to.be.null
        chai.expect(response).to.have.status(201)
        chai.expect(response.body).to.containSubset(UserSchema)
      })
  })

  it('Authentication', () => {
    chai.request(app.app)
      .post('/auth')
      .send({
        username: 'guifrribeiro',
        password: '12345678'
      })
      .end((error, response) => {
        chai.expect(error).to.be.null
        chai.expect(response).to.have.status(200)
        chai.expect(response.body).to.containSubset([AuthSchema])
      })
  })
})