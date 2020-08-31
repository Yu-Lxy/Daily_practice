const Sequelize = require('sequelize')

// 连接
const Todolist = new Sequelize("todolist", "root", "123456", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: false,
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = {
  Todolist
}