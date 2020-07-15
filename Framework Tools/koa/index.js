const Koa = require('koa');
const {
    ppid
} = require('process');
// 创建koa的实例app
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'hello world';
});

app.listen(3000, () => {
    console.log("server start");
});