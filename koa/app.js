
const Koa = require("koa");
const json = require("koa-json");
const logger = require('koa-logger')
const auth = require('./server/routes/auth.js')
const api = require('./server/routes/api.js')
const Router = require("koa-router");
const koaBodyparser = require('koa-bodyparser')

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
router.use('/api', api.routes())

app.use(router.routes()) // 将路由规则挂载到Koa上。

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;