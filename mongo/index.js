const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongo = require('./models/db')
const ObjectId = require('mongodb').ObjectID
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// 载入一个index.html页面
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
  const page = + req.query.page // 转类型
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
  await col.deleteOne({_id: ObjectId(req.body._id)})
  res.json({ ok: 1, data: {} })
})

app.listen(3000)
