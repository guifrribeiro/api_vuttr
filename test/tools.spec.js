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
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDdjZWI0NjBjOTI3ZDMxNjg3NWJiZCIsImlhdCI6MTYxMTEyNDQ0OSwiZXhwIjoxNjExMjEwODQ5fQ.Uo3-yBYMv5g_JuXob_x5d5-H4y4TXS8_rzJEVGThCJQ')
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
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDdjZWI0NjBjOTI3ZDMxNjg3NWJiZCIsImlhdCI6MTYxMTEyNDQ0OSwiZXhwIjoxNjExMjEwODQ5fQ.Uo3-yBYMv5g_JuXob_x5d5-H4y4TXS8_rzJEVGThCJQ')
      .end((error, response) => {
        chai.expect(error).to.be.null
        chai.expect(response).to.have.status(200)
        chai.expect(response.body).to.containSubset([ToolSchema])
      })
  })
})