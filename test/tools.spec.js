const chai = require('chai')
const http = require('chai-http')
const subSet = require('chai-subset')

const app = require('../app')
const ToolController = require('../src/controllers/ToolController')

chai.use(http)
chai.use(subSet)

const ToolSchema = {
  title: title => title,
  link: link => link,
  description: description => description,
  tags: tags => tags
}

describe('Tools tests', () => {
  it('Store tool', () => {
    chai.request(app.app)
      .post('/tools')
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

  it('Get tools', () => {
    chai.request(app.app)
      .get('/tools')
      .end((error, response) => {
        chai.expect(error).to.be.null
        chai.expect(response).to.have.status(200)
        chai.expect(response.body.length).to.be.equal(4);
        chai.expect(response.body).to.containSubset([ToolSchema]);
      })
  })
})