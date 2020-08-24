// 等待下一事件队列
(new Promise(resolve => {
  console.log('resolve')
  resolve()
}))
.then(() => console.log('promise then ...'))

async function fun(){
  console.log("fun start")
  const aa = await 1 // 到这里挂起，后面先不执行
  console.log("fun end")
}
fun()

// setTimeout 放入event table中 1秒后将回调函数放入宏任务的event queue中
setTimeout(() => {
  console.log('setTimeout ...')
}, 0)

process.nextTick(() => {
  console.log('nextTick ...')
})

console.log('console ...')