const Koa = require('koa')
const app = new Koa();

app.use(async (context,next)=>{
    console.log(1);
    await  next();
    console.log(6)
})
app.use(async (context,next)=>{
    console.log(2);
    await  next();
    console.log(5)
})
app.use(async (context,next)=>{
    console.log(3);
    await  next();
    console.log(4)
})


app.listen(3000,()=>{
    console.log('服务正在启动，端口号为：3000');
});



