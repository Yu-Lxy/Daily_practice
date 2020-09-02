
const Koa = require("koa");
const json = require("koa-json");
const logger = require('koa-logger')
const path = require('path')
const static = require('koa-static')
const auth = require('./server/routes/auth.js')
const fs = require('fs')
const jwt = require('koa-jwt')
const api = require('./server/routes/api.js')
const Router = require("koa-router");
const koaBodyparser = require('koa-bodyparser')
const historyApiFallback = require('koa-history-api-fallback');

const app = new Koa()
const router = new Router()

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date;
  try{
    await next();   // 执行后代的代码
  }catch(e){
    // 如果后面的代码报错 返回500
    ctx.body = 'error'
  }
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms); // 显示执行的时间
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

router.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes())

app.use(router.routes()) // 将路由规则挂载到Koa上。 
app.use(historyApiFallback()); // 将这两个中间件挂载在api的路由之后
app.use(static(path.join(__dirname, 'dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录
// app.get('*', function(req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
//     res.send(html)
// })

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;



