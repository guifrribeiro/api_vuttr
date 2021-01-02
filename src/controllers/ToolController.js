const Tool = require('../models/Tool')

module.exports = {
  async index (request, response) {
    const tag = request.query.tag

    let tools = null

    if (tag) {
      tools = await Tool.find({ tags: tag })
    }
    else {
      tools = await Tool.find({})
    }

    return response.json(tools)
  },

  async store (request, response) {
    const { title, link, description, tags } = request.body

    const tool = await Tool.create({
      title,
      link,
      description,
      tags,
    })

    return response.status(201).json(tool)
  },

  async delete (request, response) {
    const { tool_id } = request.params
    const tool = await Tool.findById(tool_id)

    if (!tool) {
      return response.status(400).json({ error: 'Tool does not exists '})
    }

    const delTool = await Tool.findByIdAndDelete(tool_id)

    return response.status(204).json({ message: 'Tool was deleted successfully' })
  }
}