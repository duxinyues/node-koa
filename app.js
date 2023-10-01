const Koa = require('koa')
const app = new Koa();
const Router = require('koa-router');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');
const path = require('path');
const static = require('koa-static');

const staticPath = './public'

// 注册 onerror
onerror(app);

// 注册bodyparser
app.use(bodyparser());

app.use(logger());
app.use(static(path.join(__dirname, staticPath)));


const router = new Router();
router.get('/api/get/userInfo', async (context) => {
    const {id} = context.request.query;
    context.body = `接口参数为：${id}`
});
router.post('/api/update/userInfo', async (ctx) => {
    console.log(ctx.request);
    const {id} = ctx.request.body;
    ctx.body = `请求参数为：${id}`
})
/**
 * 注册路由
 */
app.use(router.routes(), router.allowedMethods()).use(async (context) => {
    context.body = "没有匹配的接口"
})

app.use(async (context, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${context.method} ${context.url} - ${ms}ms`)
})

module.exports = app;
