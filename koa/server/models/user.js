const Sequelize = require('sequelize')
const db = require('../config/db')
const userModel = require('../schema/user.js') // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const User = userModel(TodolistDb, Sequelize) // 用sequelize实例化了User。

const getUserById = async function (id) {
  const userInfo = await User.findOne({where: {id: id}})
  return userInfo // 返回数据
}

const getUserByName = async function (name) {
  const userInfo = await User.findOne({where: {user_name: name}})
  return userInfo
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName
}



