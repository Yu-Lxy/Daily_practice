const conf = require('./conf')
const { copyFile } = require('fs')
const EventEmitter = require('events').EventEmitter

const MongoClient = require('mongodb').MongoClient
class MongDB {
  constructor(conf) {
    this.conf = conf
    this.emmiter = new EventEmitter()
    this.client = new MongoClient(conf.url, {
      useNewUrlParser: true
    })
    this.client.connect(err => {
      if (err) throw err
      console.log('链接成功')
      this.emmiter.emit('connect')
    })
  }

  col(colName, dbName = copyFile.db){
    return this.client.db(dbName).collection(colName)
  }
  once(event, cb) {
    this.emmiter.once(event, cb)
  }
}

module.exports = new MongDB(conf)