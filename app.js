// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const views = require('koa-views');
const path = require('path');
const render = require('koa-ejs');
const static = require('koa-static');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// routes
const viewRouter = require('./router/view');
const apiRouter = require('./router/api');

//static -> dist
app.use(static(
  path.join(__dirname,'./dist')
));

//views
render(app, {
  root: path.join(__dirname, './dist'),
  layout: '',
  viewExt: 'html',
  cache: false,
  debug: false,
});

//错误信息
app.on('error', function(err,ctx){
	console.log(err);
});

app.use(apiRouter.routes(), apiRouter.allowedMethods());
app.use(viewRouter.routes(), viewRouter.allowedMethods());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
