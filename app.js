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
app.use(static(path.join(__dirname,staticPath)));



const router = new Router();
router.get('/api/get/userInfo', async (context) => {
    context.body = '获取用户信息的接口'
});

app.use(router.routes()).use(async (context) => {
    context.body = "没有匹配的接口"
})


app.listen(3000, () => {
    console.log('服务正在启动，端口号为：3000');
});



