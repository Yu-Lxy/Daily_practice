var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', (socket) => {
  console.log('a user connected')
  
  //响应某用户发送消息
  // socket.on('chat message', (msg) => {
  //   console.log('chat message:' + msg)
    // 广播给所有人
    io.emit('chat message', 'sssssssssss')
  // })  

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// 监听3000端口
http.listen(3000, () => {
  console.log('listening on *:3000')
})