// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

var views = require('koa-views');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// Must be used before any router is used
app.use(views(__dirname + '/dist'));

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

router.get('/', async (ctx, next) => {
  await ctx.render('index.html');
});

app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

// var http = require('http')
// var url = require("url")
// var path = require('path');
// var fs = require("fs")
// var zlib = require('zlib');
// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
//
// var mimeTypes = {
//     "css": "text/css",
//     "gif": "image/gif",
//     "html": "text/html",
//     "ico": "image/x-icon",
//     "jpeg": "image/jpeg"
// };
//
// function lookup(pathName){
//     let ext = path.extname(pathName);
//     ext = ext.split('.').pop();
//     return mimeTypes[ext] || mimeTypes['txt'];
// }
//
// function respondNotFound(req, res) {
//     res.writeHead(404, {
//         'Content-Type': 'text/html'
//     });
//     res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
// }
//
// function respondFile(pathName, req, res) {
//     var readStream = '';
//     var acceptEncoding = req.headers['accept-encoding'];
//
//
//     let ext = path.extname(pathName);
//      ext = ext.split('.').pop();
//      if(ext == 'html' || ext =='css'){
//        res.setHeader('Content-Type', lookup(pathName));
//     }
//
//     if(acceptEncoding && acceptEncoding.indexOf('gzip')!=-1){
//       const gzip = zlib.createGzip();
//
//       res.writeHead(200, {
//           'Content-Encoding': 'gzip'
//       });
//       readStream = fs.createReadStream(pathName).pipe(gzip);
//     }else{
//       readStream = fs.createReadStream(pathName);
//     }
//
//
//     readStream.pipe(res);
// }
//
//
// function routeHandler(pathName, req, res) {
//   fs.stat(pathName, (err, stat) => {
//       if (!err) {
//           respondFile(pathName, req, res);
//       } else {
//           respondNotFound(req, res);
//       }
//   });
// }
//
// //静态文件
// app.use(express.static(path.join(__dirname, 'dist')));
//
// app.get('/', function (req, res) {
//    handlers(req,res);
// });
// // 匹配根路径的请求
// app.get('/Home', function (req, res) {
//    handlers(req,res);
// });
//
// app.get('/Posts', function (req, res) {
//   handlers(req,res);
// });
//
// app.get('/About', function (req, res) {
//   handlers(req,res);
// });
//
// app.get('/Projects', function (req, res) {
//   handlers(req,res);
// });
//
// app.get('/Tags', function (req, res) {
//   handlers(req,res);
// });
// app.get(/\d{9}$/, function (req, res) {
//   handlers(req,res);
// });
//
// // 错误处理，一般都放在最后面
// app.use(path, function(err, req, res, next){
//     // error handling
// })
//
// function handlers(req,res){
//   var url = '';
//   req.url = '/index.html';
//   url = path.resolve(__dirname,'dist');
//       console.log(url);
//   var pathName = path.join(url, path.normalize(req.url));
//       console.log(pathName);
//   routeHandler(pathName, req, res);
// }
//
// server.listen(3000);
