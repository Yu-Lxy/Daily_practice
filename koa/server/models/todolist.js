const Sequelize = require('sequelize')
const db = require('../config/db')
const todoModel = require('../schema/list.js') // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const Todolist = todoModel(TodolistDb, Sequelize) // 用sequelize实例化了User。

const getTodolistById = async function (id) {
  const todolist = await Todolist.findAll({ // 查找全部的todolist
    where: {user_id: id},
    attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
  })

  return todolist // 返回数据
}

const createTodolist = async function (data) {
  try {
   await Todolist.create({
      user_id: data.id,
      content: data.content,
      status: data.status
    })
    return true
  } catch (err) {
    console.log(err)
  }
}

const removeTodolist = async function (id, userId) {
  const result = await Todolist.destroy({
    where: {id, user_id: userId}
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const updateTodolist = async function (id, userId, status) {
  const result = await Todolist.update(
    {status},
    {where: {
      id,
      user_id: userId
    }}
  )
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
