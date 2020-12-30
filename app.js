const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://vuttr:u3aioO9CjVXplHe3@cluster0.zjs7e.mongodb.net/vuttr0001?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3000)