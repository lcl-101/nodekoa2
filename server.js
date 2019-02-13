// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
// const Koa = require('koa');
//
// // 注意require('koa-router')返回的是函数:
// const router = require('koa-router')();
//
// var views = require('koa-views');
//
// // 创建一个Koa对象表示web app本身:
// const app = new Koa();
//
// // Must be used before any router is used
// app.use(views(__dirname + '/dist'));
//
// // log request URL:
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     await next();
// });
//
// router.get('/', async (ctx, next) => {
//   await ctx.render('index.html');
// });
//
// app.use(router.routes());
//
// // 在端口3000监听:
// app.listen(3000);
// console.log('app started at port 3000...');

var http = require('http')
var url = require("url")
var path = require('path');
var fs = require("fs")
var zlib = require('zlib');
var express = require('express');
var app = express();
var cors = require('cors')
var server = require('http').createServer(app);
var Axios = require('axios');
var redis = require('redis');
var schedule = require('node-schedule');

//链接redis服务器;
const client = redis.createClient('6379', '127.0.0.1');

app.use(cors());

var mimeTypes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg"
};

function lookup(pathName){
    let ext = path.extname(pathName);
    ext = ext.split('.').pop();
    return mimeTypes[ext] || mimeTypes['txt'];
}

function respondNotFound(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
}

function respondFile(pathName, req, res) {
    var readStream = '';
    var acceptEncoding = req.headers['accept-encoding'];


    let ext = path.extname(pathName);
     ext = ext.split('.').pop();
     if(ext == 'html' || ext =='css'){
       res.setHeader('Content-Type', lookup(pathName));
    }

    if(acceptEncoding && acceptEncoding.indexOf('gzip')!=-1){
      const gzip = zlib.createGzip();

      res.writeHead(200, {
          'Content-Encoding': 'gzip'
      });
      readStream = fs.createReadStream(pathName).pipe(gzip);
    }else{
      readStream = fs.createReadStream(pathName);
    }


    readStream.pipe(res);
}


function routeHandler(pathName, req, res) {
  fs.stat(pathName, (err, stat) => {
      if (!err) {
          respondFile(pathName, req, res);
      } else {
          respondNotFound(req, res);
      }
  });
}


// 判断origin是否在域名白名单列表中
function isOriginAllowed(origin, allowedOrigin) {
 if (_.isArray(allowedOrigin)) {
 for(let i = 0; i < allowedOrigin.length; i++) {
  if(isOriginAllowed(origin, allowedOrigin[i])) {
  return true;
  }
 }
 return false;
 } else if (_.isString(allowedOrigin)) {
 return origin === allowedOrigin;
 } else if (allowedOrigin instanceof RegExp) {
 return allowedOrigin.test(origin);
 } else {
 return !!allowedOrigin;
 }
}

/**
 * 路由
 */
//静态文件
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
   handlers(req,res);
});
// 匹配根路径的请求
app.get('/Home', function (req, res) {
   handlers(req,res);
});

app.get('/Posts', function (req, res) {
  handlers(req,res);
});

app.get('/About', function (req, res) {
  handlers(req,res);
});

app.get('/Projects', function (req, res) {
  handlers(req,res);
});

app.get('/Tags', function (req, res) {
  handlers(req,res);
});
app.get(/\d{9}$/, function (req, res) {
  console.log(123);

  handlers(req,res);
});

// 错误处理，一般都放在最后面
app.use(path, function(err, req, res, next){
    // error handling
})

function handlers(req,res){
  var url = '';
  req.url = '/index.html';
  url = path.resolve(__dirname,'dist');
  var pathName = path.join(url, path.normalize(req.url));
  routeHandler(pathName, req, res);
}

function getList(res){
  Axios.get('https://api.github.com/repos/lcl-101/webpack-blog/issues?client_id=149613f6b828472ab126&client_secret=c003cfeeafa97ca0f4c756aab3c2051447ddaab7')
    .then(function(data){
      if(data.status == 200){
        client.set('getList', JSON.stringify(data.data));
        if(res){
          res.send(data.data);
        }
      }else {
        if(res){
          res.send('');
        }
      }
    }).catch(function (error) {
      if(res){
        res.send(error);
      }
    });
}

/**
 * 接口
 */
app.get('/api/getList', function(req,res){
  client.get('getList', function(err, value){
    if(!value) {
      getList(res);
    }else {
      res.send(value);
    }
  })
  return;
})

//定时任务
function scheduleCronstyle(){
  schedule.scheduleJob('30 1 * * * *', function(){
    getList();
  });
}

scheduleCronstyle();

//test redis
client.set('hello', {a:1, b:2}) // 注意，value会被转为字符串,所以存的时候要先把value 转为json字符串
client.get('hello', function(err, value){
  console.log(value)
  console.log(err)
})


server.listen(3000);
