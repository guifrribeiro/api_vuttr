const chai = require('chai')
const http = require('chai-http')
const subSet = require('chai-subset')

const app = require('../app')

chai.use(http)
chai.use(subSet)

const ToolSchema = {
  title: title => title,
  link: link => link,
  description: description => description,
  tags: tags => tags
}

const AuthSchema = {
  auth: auth => auth,
  token: token => token
}

describe('Tools tests', () => {
  it('Store tool', () => {
    chai.request(app.app)
    .post('/auth')
    .send({
      username: 'guifrribeiro',
      password: '12345678'
    })
    .end((error, response) => {
      let token = response.body.token
      chai.expect(error).to.be.null
      chai.expect(response).to.have.status(200)
      chai.expect(response.body).to.containSubset([AuthSchema])
      chai.request(app.app)
        .post('/tools')
        .set('x-access-token', token)
        .send({
          title: 'Guilherme GitHub Page',
          link: 'https://github.com/guifrribeiro',
          description: 'Guilherme Ferreira GitHub Page',
          tags: ["organization", "planning", "collaboration", "writing", "calendar"]
        })
        .end((error, response) => {
          chai.expect(error).to.be.null
          chai.expect(response).to.have.status(201)
          chai.expect(response.body).to.containSubset(ToolSchema)
        })
    })
  })

  it('Get tools', () => {
    chai.request(app.app)
    .post('/auth')
    .send({
      username: 'guifrribeiro',
      password: '12345678'
    })
    .end((error, response) => {
      let token = response.body.token
      chai.expect(error).to.be.null
      chai.expect(response).to.have.status(200)
      chai.expect(response.body).to.containSubset([AuthSchema])
      chai.request(app.app)
        .get('/tools')
        .set('x-access-token', token)
        .end((error, response) => {
          chai.expect(error).to.be.null
          chai.expect(response).to.have.status(200)
          chai.expect(response.body).to.containSubset([ToolSchema])
          done()
        })
    })
  })
})