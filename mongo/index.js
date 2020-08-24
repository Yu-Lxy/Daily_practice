const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongo = require('./models/db')
// const testData = require('./models/testData')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
  const page = + req.query.page
  const col = mongo.col('fruits')
  const total = await col.find().count()
  const fruits = await col
    .find()
    .skip((page - 1) * 5)
    .limit(5)
    .toArray()
  res.json({ ok: 1, data: { fruits, pagination: {total, page} } })
})

app.post('/api/add', async (req, res) => {
  const col = mongo.col('fruits')
  col.insertOne({name: req.body.name, price: req.body.price})
  res.json({ ok: 1, data: {} })
})

app.post('/api/dele', async (req, res) => {
  const col = mongo.col('fruits')
  col.deleteOne({name: req.body.name})
  res.json({ ok: 1, data: {} })
})

app.listen(3000)
