const conf = require('./conf')
const EventEmitter = require('events').EventEmitter
const MongoClient = require('mongodb').MongoClient

class MongDB {
  constructor(conf) {
    this.conf = conf
    this.emmiter = new EventEmitter()
    this.client = new MongoClient(conf.url, {
      useNewUrlParser: true
    })
    // 连库
    this.client.connect(err => {
      if (err) throw err
      console.log('链接成功')
      this.emmiter.emit('connect')
    })
  }
  // 返回表
  col(colName){
    return this.client.db(this.conf.dbName).collection(colName)
  }
  // 单次监听器
  once(event, cb) {
    this.emmiter.once(event, cb)
  }
}

module.exports = new MongDB(conf)